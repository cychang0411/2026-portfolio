type ProjectCardProps = {
  title: string;
  description: string;
  meta: string;
  href: string;
  cta: string;
  tone?: "work" | "play";
};

export function ProjectCard({
  title,
  description,
  meta,
  href,
  cta,
  tone = "work",
}: ProjectCardProps) {
  return (
    <article
      className={`group flex h-full flex-col justify-between rounded-[1.75rem] border border-[var(--line)] p-6 transition-transform duration-500 hover:-translate-y-1 ${
        tone === "play"
          ? "bg-[linear-gradient(145deg,rgba(248,241,231,0.92),rgba(252,251,248,0.98))]"
          : "bg-[linear-gradient(145deg,rgba(255,255,255,0.94),rgba(250,248,242,0.94))]"
      }`}
    >
      <div className="space-y-5">
        <p className="font-mono text-[0.74rem] uppercase tracking-[0.24em] text-[var(--muted)]">
          {meta}
        </p>
        <div className="space-y-3">
          <h3 className="text-[1.35rem] font-semibold leading-tight text-[var(--ink)]">
            {title}
          </h3>
          <p className="max-w-[34ch] text-sm leading-7 text-[var(--muted)]">
            {description}
          </p>
        </div>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex items-center gap-3 text-sm font-medium text-[var(--ink)] transition-colors duration-300 hover:text-[var(--accent)]"
      >
        <span>{cta}</span>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] text-base transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </a>
    </article>
  );
}
