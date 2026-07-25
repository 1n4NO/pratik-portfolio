"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import { projects, type Project } from "@/data/projects";

// Reads a "R G B" CSS custom property (see globals.css) and returns a THREE.Color.
// Re-read whenever the site's data-theme attribute flips, so the scene stays in
// sync with the light/dark toggle without a page reload.
function readThemeColor(varName: string, fallback: [number, number, number]) {
  if (typeof window === "undefined") {
    return new THREE.Color(fallback[0] / 255, fallback[1] / 255, fallback[2] / 255);
  }
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  const parts = raw.split(/\s+/).map(Number);
  if (parts.length === 3 && parts.every((n) => !Number.isNaN(n))) {
    return new THREE.Color(parts[0] / 255, parts[1] / 255, parts[2] / 255);
  }
  return new THREE.Color(fallback[0] / 255, fallback[1] / 255, fallback[2] / 255);
}

function readAllThemeColors() {
  return {
    signal: readThemeColor("--color-signal", [54, 82, 224]),
    amber: readThemeColor("--color-amber", [184, 120, 22]),
    ink: readThemeColor("--color-ink", [20, 23, 31]),
    inkSoft: readThemeColor("--color-ink-soft", [64, 69, 79]),
    surface: readThemeColor("--color-surface", [255, 255, 255]),
    lineStrong: readThemeColor("--color-line-strong", [185, 192, 203]),
  };
}

type ThemeColors = ReturnType<typeof readAllThemeColors>;

function useThemeColors(): ThemeColors {
  const [colors, setColors] = useState<ThemeColors>(() => readAllThemeColors());

  useEffect(() => {
    const update = () => setColors(readAllThemeColors());
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return colors;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

type NodeDatum = {
  project: Project;
  position: [number, number, number];
};

function useLayout(): NodeDatum[] {
  return useMemo(() => {
    const count = projects.length;
    return projects.map((project, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radiusJitter = i % 2 === 0 ? 0.18 : -0.14;
      const radius = 3.1 + radiusJitter;
      const y = Math.sin(angle * 2) * 0.55;
      return {
        project,
        position: [Math.cos(angle) * radius, y, Math.sin(angle) * radius] as [number, number, number],
      };
    });
  }, []);
}

function Hub({ colors, reducedMotion }: { colors: ThemeColors; reducedMotion: boolean }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    if (coreRef.current) coreRef.current.rotation.y += delta * 0.15;
    if (haloRef.current) haloRef.current.rotation.y -= delta * 0.1;
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.4, 0]} />
        <meshBasicMaterial color={colors.surface} />
      </mesh>
      <mesh ref={haloRef} scale={1.4}>
        <icosahedronGeometry args={[0.4, 0]} />
        <meshBasicMaterial color={colors.signal} wireframe transparent opacity={0.55} />
      </mesh>
      <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
        <span className="whitespace-nowrap font-mono text-[10px] tracking-widest text-signal">
          [PS]
        </span>
      </Html>
    </group>
  );
}

function ProjectNode({
  datum,
  colors,
  reducedMotion,
}: {
  datum: NodeDatum;
  colors: ThemeColors;
  reducedMotion: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const coreRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const router = useRouter();
  const baseScale = datum.project.featured ? 0.5 : 0.4;
  const scratch = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    if (!reducedMotion) {
      if (coreRef.current) coreRef.current.rotation.y += delta * 0.25;
      if (haloRef.current) haloRef.current.rotation.y -= delta * 0.18;
    }
    const targetScale = hovered ? baseScale * 1.25 : baseScale;
    if (coreRef.current) {
      coreRef.current.scale.lerp(scratch.set(targetScale, targetScale, targetScale), 0.15);
    }
    if (haloRef.current) {
      const haloTarget = targetScale * 1.35;
      haloRef.current.scale.lerp(scratch.set(haloTarget, haloTarget, haloTarget), 0.15);
    }
  });

  return (
    <group
      position={datum.position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/work/${datum.project.slug}`);
      }}
    >
      <mesh ref={coreRef} scale={baseScale}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color={colors.surface} />
      </mesh>
      <mesh ref={haloRef} scale={baseScale * 1.35}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          color={hovered ? colors.amber : colors.signal}
          wireframe
          transparent
          opacity={hovered ? 0.9 : 0.5}
        />
      </mesh>

      {hovered && (
        <Html distanceFactor={7} style={{ pointerEvents: "none" }} zIndexRange={[10, 0]}>
          <div className="w-56 -translate-x-1/2 -translate-y-[120%] rounded-lg border border-line bg-surface/95 px-3 py-2.5 shadow-[0_12px_32px_rgb(var(--color-ink)_/_0.25)] backdrop-blur">
            <p className="mb-1 font-mono text-[9px] uppercase tracking-widest text-amber">
              {datum.project.industry}
            </p>
            <p className="mb-0.5 font-display text-sm font-bold leading-snug text-ink">
              {datum.project.name}
            </p>
            <p className="text-[11px] leading-snug text-ink-soft">{datum.project.tagline}</p>
          </div>
        </Html>
      )}
    </group>
  );
}

function ConnectionLines({ nodes, colors }: { nodes: NodeDatum[]; colors: ThemeColors }) {
  const hubLines = useMemo(
    () => nodes.map((n) => [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...n.position)]),
    [nodes]
  );
  const ringLines = useMemo(() => {
    const lines: THREE.Vector3[][] = [];
    for (let i = 0; i < nodes.length; i += 1) {
      const next = nodes[(i + 1) % nodes.length];
      lines.push([new THREE.Vector3(...nodes[i].position), new THREE.Vector3(...next.position)]);
    }
    return lines;
  }, [nodes]);

  return (
    <group>
      {hubLines.map((pts, i) => (
        <line key={`hub-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array(pts.flatMap((p) => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={colors.signal} transparent opacity={0.32} />
        </line>
      ))}
      {ringLines.map((pts, i) => (
        <line key={`ring-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array(pts.flatMap((p) => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={colors.lineStrong} transparent opacity={0.22} />
        </line>
      ))}
    </group>
  );
}

function Particles({ colors, reducedMotion }: { colors: ThemeColors; reducedMotion: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 220;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 5 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.cos(phi) * 0.6;
      arr[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!reducedMotion && ref.current) ref.current.rotation.y += delta * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color={colors.inkSoft} size={0.035} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function Scene() {
  const colors = useThemeColors();
  const reducedMotion = useReducedMotion();
  const nodes = useLayout();

  return (
    <>
      <ambientLight intensity={1.2} />
      <Particles colors={colors} reducedMotion={reducedMotion} />
      <ConnectionLines nodes={nodes} colors={colors} />
      <Hub colors={colors} reducedMotion={reducedMotion} />
      {nodes.map((datum) => (
        <ProjectNode key={datum.project.slug} datum={datum} colors={colors} reducedMotion={reducedMotion} />
      ))}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.6}
        enableDamping
        dampingFactor={0.08}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={(Math.PI * 2) / 3}
      />
    </>
  );
}

export function WorkConstellation() {
  return (
    <div className="relative h-[520px] overflow-hidden rounded-lg border border-line bg-surface/40 md:h-[620px]">
      <Canvas camera={{ position: [0, 1.4, 7.5], fov: 45 }} dpr={[1, 1.75]}>
        <Scene />
      </Canvas>
      <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-ink-soft/50">
        Drag to orbit · click a node
      </p>
    </div>
  );
}
