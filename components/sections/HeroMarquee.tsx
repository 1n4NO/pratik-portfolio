import { projects } from "@/data/projects";
import type { Screenshot } from "@/data/projects";
import { BrowserFrame } from "@/components/ui/BrowserFrame";

export function HeroMarquee() {
  const media = getAlternatingHeroMedia();
  const durationSeconds = Math.max(70, media.length * 12);
  // Duplicate the list so the CSS translateX(-50%) loop is seamless.
  const track = [...media, ...media];

  return (
    <div className="overflow-hidden py-2" aria-hidden="true">
      <div
        className="flex gap-5 w-max animate-marquee-slow motion-reduce:animate-none"
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {track.map((item, i) => (
          <div key={`${item.id}-${i}`} className="w-[220px] md:w-[260px] shrink-0">
            <BrowserFrame src={item.src} alt="" priority={i < 3} />
          </div>
        ))}
      </div>
    </div>
  );
}

function getAlternatingHeroMedia() {
  const media = uniqueBySrc(projects.flatMap((project) =>
    [project.cover, ...project.screenshots].map((screenshot, index) => ({
      ...screenshot,
      id: `${project.slug}-hero-${index}`,
    }))
  ));

  return alternateMedia(media);
}

function alternateMedia<T extends Screenshot & { id: string }>(items: T[]) {
  const animated = items.filter(isAnimatedMedia);
  const statics = items.filter((item) => !isAnimatedMedia(item));

  if (animated.length === 0 || statics.length === 0) return items;

  const result: T[] = [];
  const pairs = Math.min(animated.length, statics.length);

  for (let index = 0; index < pairs; index += 1) {
    result.push(animated[index], statics[index]);
  }

  return result.concat(animated.slice(pairs), statics.slice(pairs));
}

function isAnimatedMedia(item: Screenshot) {
  return /\.(gif|webm|mp4)$/i.test(item.src);
}

function uniqueBySrc<T extends Screenshot>(items: T[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    if (seen.has(item.src)) return false;
    seen.add(item.src);
    return true;
  });
}
