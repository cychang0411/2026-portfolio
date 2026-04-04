import Image from "next/image";
import type { ReactNode } from "react";
import { portfolioContent, type ProjectItem, type SocialItem } from "@/data/portfolio-content";
import { buildMailtoLink } from "@/lib/mailto";

type CardProps = Readonly<{
  children: ReactNode;
  className?: string;
}>;

type IconBadgeProps = Readonly<{
  children: ReactNode;
  className?: string;
}>;

function Card({ children, className = "" }: CardProps) {
  return (
    <section
      className={`bento-card relative overflow-hidden rounded-[1.15rem] border border-[rgba(255,110,86,0.08)] ${className}`}
    >
      {children}
    </section>
  );
}

function Label({
  children,
  className = "",
}: Readonly<{ children: ReactNode; className?: string }>) {
  return (
    <p className={`text-[0.42rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent-deep)] ${className}`}>
      {children}
    </p>
  );
}

function IconBadge({ children, className = "" }: IconBadgeProps) {
  return (
    <div
      className={`flex h-7 w-7 items-center justify-center rounded-[0.8rem] bg-[rgba(255,255,255,0.75)] text-[var(--accent)] shadow-[0_10px_24px_-18px_rgba(255,87,60,0.6)] md:h-10 md:w-10 md:rounded-[1rem] ${className}`}
    >
      {children}
    </div>
  );
}

function FileIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6" />
      <path d="M9 17h4" />
    </svg>
  );
}

function OutboundIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function AvailabilityPill() {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(255,245,239,0.28)] px-3 py-1 text-[0.48rem] font-semibold tracking-[0.08em] text-white/92 backdrop-blur-sm md:gap-2 md:px-5 md:py-2 md:text-[0.9rem]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#ffd598] md:h-3 md:w-3" />
      <span>Available for work</span>
    </div>
  );
}

function SparkShape() {
  return (
    <svg
      aria-hidden="true"
      className="h-11 w-11 text-[#ff9d84] md:h-20 md:w-20"
      viewBox="0 0 44 44"
      fill="currentColor"
    >
      <path d="M22 4c1.7 8.4 3.8 10.7 12 12-8.2 1.3-10.3 3.6-12 12-1.7-8.4-3.8-10.7-12-12 8.2-1.3 10.3-3.6 12-12Zm12 16c.8 4 1.8 5 6 6-4.2 1-5.2 2-6 6-.8-4-1.8-5-6-6 4.2-1 5.2-2 6-6Z" />
    </svg>
  );
}

function ConnectGlyph({ label }: Readonly<{ label: string }>) {
  const glyphMap: Record<string, string> = {
    LinkedIn: "in",
    Threads: "@",
    Medium: "M",
    Dribbble: "D",
  };

  return <span className="text-[0.62rem] font-extrabold uppercase">{glyphMap[label] ?? label.slice(0, 1)}</span>;
}

function ConnectButton({ social }: Readonly<{ social: SocialItem }>) {
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noreferrer"
      aria-label={social.label}
      className="flex h-7 w-7 items-center justify-center rounded-[0.75rem] bg-white text-[var(--accent)] shadow-[0_10px_24px_-18px_rgba(255,87,60,0.56)] transition duration-200 hover:-translate-y-0.5 md:h-14 md:w-14 md:rounded-[1rem]"
    >
      <ConnectGlyph label={social.label} />
    </a>
  );
}

function PlaygroundTile({
  project,
  icon,
}: Readonly<{ project: ProjectItem; icon: string }>) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col justify-between rounded-[0.95rem] bg-[rgba(255,255,255,0.4)] p-3 transition duration-200 hover:bg-white/70 md:rounded-[1.3rem] md:p-5"
    >
      <IconBadge className="h-6 w-6 rounded-full text-[var(--accent)] md:h-12 md:w-12">
        <span className="text-[0.52rem] font-bold uppercase md:text-[0.8rem]">{icon}</span>
      </IconBadge>
      <div>
        <h3 className="text-[0.62rem] font-semibold tracking-[-0.03em] text-[var(--accent-deep)] transition group-hover:text-[var(--accent)] md:text-[1.05rem]">
          {project.title}
        </h3>
        <p className="mt-1 text-[0.46rem] leading-[1.35] text-[var(--muted)] md:text-[0.9rem]">
          {project.meta}
        </p>
      </div>
    </a>
  );
}

function ProjectCard({
  project,
  index,
}: Readonly<{ project: ProjectItem; index: number }>) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col justify-between p-3 md:p-6"
    >
      <div className="flex items-start justify-between gap-2">
        <Label>{`Project ${String(index + 1).padStart(2, "0")}`}</Label>
        <IconBadge className="h-5.5 w-5.5 rounded-full bg-[rgba(255,239,234,0.92)] text-[var(--accent)] md:h-11 md:w-11">
          <OutboundIcon />
        </IconBadge>
      </div>

      <div>
        <h3 className="text-[0.72rem] font-semibold tracking-[-0.04em] text-[var(--accent)] transition group-hover:text-[var(--accent-deep)] md:text-[1.1rem] md:leading-[1.15]">
          {project.title}
        </h3>
        <p className="mt-1 text-[0.46rem] leading-[1.35] text-[var(--muted)] md:text-[0.9rem]">
          {project.meta}
        </p>
      </div>
    </a>
  );
}

export function PortfolioPage() {
  const content = portfolioContent.en;
  const socialLinks = content.socialLinks.slice(0, 4);
  const playgroundProjects = content.playgroundProjects.slice(0, 2);
  const workProjects = content.workProjects.slice(0, 3);

  const mailtoLink = buildMailtoLink({
    email: content.contact.email,
    subject: content.contact.mailSubject,
    body: content.contact.mailBody,
  });

  const resumeExtension = content.resume.href.split(".").pop()?.toUpperCase() ?? "FILE";

  return (
    <div className="site-shell min-h-screen bg-[var(--background)] px-2.5 py-2.5 text-[var(--foreground)] sm:px-5 sm:py-5 lg:px-6 lg:py-5">
      <main className="mx-auto grid w-full max-w-[1280px] grid-cols-4 gap-2.5 md:gap-6">
        <Card className="col-span-3 min-h-[102px] bg-[linear-gradient(135deg,#ff5b3f_0%,#ff6e4e_58%,#ff7d55_100%)] p-4 text-white md:min-h-[285px] md:p-9 lg:p-10">
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-start justify-between gap-3">
              <div className="max-w-[170px] md:max-w-[480px]">
                <h1 className="text-[1.02rem] font-extrabold leading-[0.92] tracking-[-0.08em] md:text-[4.35rem]">
                  <span className="block">{`${content.profile.name}.`}</span>
                  <span className="block">{`${content.profile.title}.`}</span>
                </h1>
                <p className="mt-3 max-w-[140px] text-[0.5rem] leading-[1.45] text-white/82 md:mt-6 md:max-w-[340px] md:text-[1.08rem] md:leading-[1.5]">
                  I blend code and design to shape unique digital experiences.
                </p>
              </div>

              <AvailabilityPill />
            </div>

            <div className="absolute bottom-3 right-3 md:bottom-5 md:right-7">
              <SparkShape />
            </div>
          </div>
        </Card>

        <a
          href={content.resume.href}
          download
          className="bento-card col-span-1 flex min-h-[102px] flex-col justify-between rounded-[1.15rem] bg-[linear-gradient(135deg,#ef4d39_0%,#de2e2a_100%)] p-4 text-white transition duration-200 hover:-translate-y-0.5 md:min-h-[285px] md:p-9 lg:p-10"
        >
          <IconBadge className="bg-[rgba(255,255,255,0.14)] text-white shadow-none">
            <FileIcon />
          </IconBadge>

          <div>
            <p className="text-[0.72rem] font-semibold tracking-[-0.04em] md:text-[1.05rem]">
              Resume
            </p>
            <p className="mt-1 text-[0.46rem] text-white/75 md:text-[0.95rem]">
              {`CV.${resumeExtension.toLowerCase()} file`}
            </p>
          </div>
        </a>

        <Card className="col-span-1 min-h-[102px] bg-[var(--surface-soft)] p-3 md:min-h-[250px] md:p-6">
          <Label>Connect</Label>
          <div className="mt-4 grid grid-cols-2 gap-2 md:mt-6 md:gap-4">
            {socialLinks.map((social) => (
              <ConnectButton key={social.label} social={social} />
            ))}
          </div>
          <a
            href={mailtoLink}
            className="mt-3 inline-block text-[0.42rem] font-medium text-[var(--muted)] md:mt-5 md:text-[0.78rem]"
          >
            {content.contact.email}
          </a>
        </Card>

        <Card className="col-span-1 min-h-[102px] bg-[var(--surface-soft)] p-3 md:min-h-[250px] md:p-6">
          <Label>Vibe</Label>
          <div className="mt-6 flex items-center gap-2 text-[0.8rem] md:mt-16 md:justify-center md:gap-4 md:text-[1.8rem]">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-[0_10px_24px_-18px_rgba(255,87,60,0.3)] md:h-14 md:w-14">
              ☕
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-[0_10px_24px_-18px_rgba(255,87,60,0.3)] md:h-14 md:w-14">
              📷
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-[0_10px_24px_-18px_rgba(255,87,60,0.3)] md:h-14 md:w-14">
              🎧
            </span>
          </div>
          <p className="mt-4 text-[0.42rem] font-medium text-[var(--accent)] md:mt-10 md:text-[0.8rem] md:text-center">
            Coffee · Photo · Music
          </p>
        </Card>

        <Card className="col-span-2 min-h-[102px] bg-[var(--surface-soft)] p-3 md:min-h-[250px] md:p-6">
          <Label>Playground</Label>
          <div className="mt-3 grid h-[64px] grid-cols-2 gap-2 md:mt-5 md:h-[168px] md:gap-5">
            <PlaygroundTile project={playgroundProjects[0]} icon="ai" />
            <PlaygroundTile project={playgroundProjects[1]} icon="3d" />
          </div>
        </Card>

        <Card className="col-span-1 min-h-[102px] bg-white p-0 md:min-h-[260px]">
          <div className="relative h-full w-full overflow-hidden rounded-[1.15rem]">
            <Image
              src="/photos/daily-01.svg"
              alt="Featured scene"
              fill
              sizes="(max-width: 768px) 25vw, 280px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,8,6,0.08),rgba(12,8,6,0.3))]" />
            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1 md:bottom-5 md:gap-2">
              <span className="h-1 w-1 rounded-full bg-white md:h-2 md:w-2" />
              <span className="h-1 w-1 rounded-full bg-white/55 md:h-2 md:w-2" />
              <span className="h-1 w-1 rounded-full bg-white/55 md:h-2 md:w-2" />
            </div>
          </div>
        </Card>

        {workProjects.map((project, index) => (
          <Card key={project.title} className="col-span-1 min-h-[102px] bg-white md:min-h-[260px]">
            <ProjectCard project={project} index={index} />
          </Card>
        ))}
      </main>
    </div>
  );
}
