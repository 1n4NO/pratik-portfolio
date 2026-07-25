import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="bg-deep border-t border-deep-line">
      <Container className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-[11px] text-[#F7F8FA]/50">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex gap-6">
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
