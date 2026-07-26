import { Mail } from "lucide-react";
import { profile } from "@/data/profile";

export function DisabledContactOverlay() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-paper/80 p-5 text-center backdrop-blur-sm">
      <div className="max-w-xs rounded-lg border border-line bg-surface p-5 shadow-overlay">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-signal/12 text-signal">
          <Mail size={18} className="icon-amber" aria-hidden="true" />
        </div>
        <p className="font-display text-lg font-bold">Contact form is paused.</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Send mail to{" "}
          <a
            href={`mailto:${profile.email}`}
            className="font-medium text-signal hover:text-signal-dark focus-ring rounded"
          >
            {profile.email}
          </a>
        </p>
      </div>
    </div>
  );
}
