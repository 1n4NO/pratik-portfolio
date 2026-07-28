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
type PerformanceProfile = {
  tier: "full" | "reduced";
  coarsePointer: boolean;
  particleCount: number;
  particleOpacity: number;
  particleSize: number;
  autoRotate: boolean;
  enableDamping: boolean;
  showHoverCard: boolean;
  dpr: [number, number];
};

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

function usePerformanceProfile(reducedMotion: boolean): PerformanceProfile {
  const [profile, setProfile] = useState<PerformanceProfile>(() =>
    createPerformanceProfile(reducedMotion, false, undefined, undefined)
  );

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: coarse)");

    function update() {
      setProfile(
        createPerformanceProfile(
          reducedMotion,
          pointerQuery.matches,
          navigator.hardwareConcurrency,
          getDeviceMemory()
        )
      );
    }

    update();
    pointerQuery.addEventListener("change", update);
    return () => pointerQuery.removeEventListener("change", update);
  }, [reducedMotion]);

  return profile;
}

function createPerformanceProfile(
  reducedMotion: boolean,
  coarsePointer: boolean,
  hardwareConcurrency?: number,
  deviceMemory?: number
): PerformanceProfile {
  const lowCoreCount = typeof hardwareConcurrency === "number" && hardwareConcurrency <= 4;
  const lowMemory = typeof deviceMemory === "number" && deviceMemory <= 4;
  const reduced = reducedMotion || coarsePointer || lowCoreCount || lowMemory;

  return {
    tier: reduced ? "reduced" : "full",
    coarsePointer,
    particleCount: reduced ? 70 : 220,
    particleOpacity: reduced ? 0.28 : 0.5,
    particleSize: reduced ? 0.025 : 0.035,
    autoRotate: !reduced,
    enableDamping: !reduced,
    showHoverCard: !coarsePointer,
    dpr: reduced ? [1, 1] : [1, 1.75],
  };
}

function getDeviceMemory() {
  const nav = navigator as Navigator & { deviceMemory?: number };
  return nav.deviceMemory;
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
  showHoverCard,
  onHoverChange,
  onActivate,
}: {
  datum: NodeDatum;
  colors: ThemeColors;
  reducedMotion: boolean;
  showHoverCard: boolean;
  onHoverChange: (slug: string | null) => void;
  onActivate: (slug: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [activated, setActivated] = useState(false);
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
    const targetScale = activated ? baseScale * 1.55 : hovered ? baseScale * 1.25 : baseScale;
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
        onHoverChange(datum.project.slug);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        if (!activated) onHoverChange(null);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        setActivated(true);
        onHoverChange(datum.project.slug);
        onActivate(datum.project.slug);
        document.body.style.cursor = "auto";
        window.setTimeout(() => {
          router.push(`/work/${datum.project.slug}`);
        }, 180);
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

      <Html center distanceFactor={9} position={[0, -0.78, 0]} style={{ pointerEvents: "none" }}>
        <span
          className={`inline-flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.22em] drop-shadow transition-colors ${
            hovered || activated
              ? "text-amber"
              : "text-ink-soft"
          }`}
        >
          <span
            className={`h-1 w-1 rounded-full ${hovered || activated ? "bg-amber" : "bg-line-strong"}`}
            aria-hidden="true"
          />
          {projectInitials(datum.project.name)}
        </span>
      </Html>

      {hovered && showHoverCard && (
        <Html distanceFactor={7} style={{ pointerEvents: "none" }} zIndexRange={[10, 0]}>
          <div className="w-56 -translate-x-1/2 -translate-y-[120%] rounded-lg border border-line bg-surface/95 px-3 py-2.5 shadow-card backdrop-blur">
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

function ConnectionLines({
  nodes,
  colors,
  hoveredSlug,
  pulseSlug,
}: {
  nodes: NodeDatum[];
  colors: ThemeColors;
  hoveredSlug: string | null;
  pulseSlug: string | null;
}) {
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
      {hubLines.map((pts, i) => {
        const active = nodes[i]?.project.slug === hoveredSlug;
        const pulsing = nodes[i]?.project.slug === pulseSlug;
        return (
          <group key={`hub-${i}`}>
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array(pts.flatMap((p) => [p.x, p.y, p.z]))}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial
                color={active || pulsing ? colors.amber : colors.signal}
                transparent
                opacity={hoveredSlug || pulseSlug ? (active || pulsing ? 0.9 : 0.08) : 0.32}
              />
            </line>
            {(active || pulsing) && (
              <>
                <DirectionMarker from={pts[0]} to={pts[1]} color={colors.amber} progress={0.72} />
                {pulsing && <PulseTrail from={pts[0]} to={pts[1]} color={colors.amber} />}
              </>
            )}
          </group>
        );
      })}
      {ringLines.map((pts, i) => {
        const current = nodes[i]?.project.slug;
        const next = nodes[(i + 1) % nodes.length]?.project.slug;
        const active = hoveredSlug === current || hoveredSlug === next;
        return (
          <group key={`ring-${i}`}>
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array(pts.flatMap((p) => [p.x, p.y, p.z]))}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial
                color={active ? colors.amber : colors.lineStrong}
                transparent
                opacity={hoveredSlug ? (active ? 0.66 : 0.07) : 0.22}
              />
            </line>
            {active && <DirectionMarker from={pts[0]} to={pts[1]} color={colors.amber} progress={0.58} />}
          </group>
        );
      })}
    </group>
  );
}

function DirectionMarker({
  from,
  to,
  color,
  progress,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  color: THREE.Color;
  progress: number;
}) {
  const { position, quaternion } = useMemo(() => {
    const direction = new THREE.Vector3().subVectors(to, from).normalize();
    return {
      position: new THREE.Vector3().lerpVectors(from, to, progress),
      quaternion: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction),
    };
  }, [from, to, progress]);

  return (
    <mesh position={position} quaternion={quaternion}>
      <coneGeometry args={[0.055, 0.18, 3]} />
      <meshBasicMaterial color={color} transparent opacity={0.88} />
    </mesh>
  );
}

function PulseTrail({ from, to, color }: { from: THREE.Vector3; to: THREE.Vector3; color: THREE.Color }) {
  const ref = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const progressRef = useRef(0);
  const position = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    progressRef.current = Math.min(1, progressRef.current + delta / 0.18);
    position.lerpVectors(from, to, progressRef.current);
    if (ref.current) {
      ref.current.position.copy(position);
      const scale = 1 + progressRef.current * 1.6;
      ref.current.scale.setScalar(scale);
    }
    if (materialRef.current) {
      materialRef.current.opacity = Math.max(0, 0.95 - progressRef.current * 0.75);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.065, 12, 12]} />
      <meshBasicMaterial ref={materialRef} color={color} transparent opacity={0.95} />
    </mesh>
  );
}

function Particles({
  colors,
  reducedMotion,
  profile,
}: {
  colors: ThemeColors;
  reducedMotion: boolean;
  profile: PerformanceProfile;
}) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = profile.particleCount;
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
  }, [profile.particleCount]);

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
      <pointsMaterial
        color={colors.inkSoft}
        size={profile.particleSize}
        transparent
        opacity={profile.particleOpacity}
        sizeAttenuation
      />
    </points>
  );
}

function Scene({
  profile,
  reducedMotion,
}: {
  profile: PerformanceProfile;
  reducedMotion: boolean;
}) {
  const colors = useThemeColors();
  const nodes = useLayout();
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [pulseSlug, setPulseSlug] = useState<string | null>(null);

  function activateNode(slug: string) {
    setPulseSlug(slug);
    window.setTimeout(() => setPulseSlug(null), 220);
  }

  return (
    <>
      <ambientLight intensity={1.2} />
      <Particles colors={colors} reducedMotion={reducedMotion} profile={profile} />
      <ConnectionLines nodes={nodes} colors={colors} hoveredSlug={hoveredSlug} pulseSlug={pulseSlug} />
      <Hub colors={colors} reducedMotion={reducedMotion} />
      {nodes.map((datum) => (
        <ProjectNode
          key={datum.project.slug}
          datum={datum}
          colors={colors}
          reducedMotion={reducedMotion}
          showHoverCard={profile.showHoverCard}
          onHoverChange={setHoveredSlug}
          onActivate={activateNode}
        />
      ))}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={profile.autoRotate}
        autoRotateSpeed={0.6}
        enableDamping={profile.enableDamping}
        dampingFactor={profile.enableDamping ? 0.08 : 0}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={(Math.PI * 2) / 3}
      />
    </>
  );
}

function projectInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

export function WorkConstellation() {
  const reducedMotion = useReducedMotion();
  const profile = usePerformanceProfile(reducedMotion);

  return (
    <div className="relative h-[520px] overflow-hidden rounded-lg border border-line bg-[#1b2030] md:h-[620px]">
      <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-widest text-ink-soft/60">
        <span className="rounded border border-line bg-surface/70 px-2 py-1 backdrop-blur">
          Hover: inspect
        </span>
        <span className="rounded border border-line bg-surface/70 px-2 py-1 backdrop-blur">
          Click: open case study
        </span>
      </div>
      <Canvas camera={{ position: [0, 1.4, 7.5], fov: 45 }} dpr={profile.dpr}>
        <Scene profile={profile} reducedMotion={reducedMotion} />
      </Canvas>
      <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-ink-soft/50">
        {profile.coarsePointer ? "Swipe to orbit · tap a node" : "Drag to orbit · click a node"}
      </p>
    </div>
  );
}
