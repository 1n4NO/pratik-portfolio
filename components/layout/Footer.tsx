import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="bg-deep border-t border-deep-line">
      <Container className="py-8 grid grid-cols-1 md:grid-cols-3 items-center gap-4 text-center md:text-left">
        <p className="font-mono text-[11px] text-[#F7F8FA]/50">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <Link
          href="/downloads"
          className="font-mono text-[11px] text-[#F7F8FA]/70 hover:text-[#F7F8FA] transition-colors focus-ring rounded justify-self-center"
        >
          Downloads
        </Link>
        <div className="flex gap-6 justify-center md:justify-self-end">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] text-[#F7F8FA]/70 hover:text-[#F7F8FA] transition-colors focus-ring rounded"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] text-[#F7F8FA]/70 hover:text-[#F7F8FA] transition-colors focus-ring rounded"
          >
            LinkedIn
          </a>
        </div>
      </Container>
    </footer>
  );
}
