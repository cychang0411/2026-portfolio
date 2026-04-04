import type { Locale } from "@/data/portfolio-content";

type LanguageToggleProps = Readonly<{
  locale: Locale;
  label: string;
  onChange: (locale: Locale) => void;
}>;

const locales: Locale[] = ["zh", "en"];

export function LanguageToggle({
  locale,
  label,
  onChange,
}: LanguageToggleProps) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.84)] p-1 text-[var(--muted)] shadow-[0_12px_24px_-20px_var(--shadow)]">
      <span className="hidden pl-2 text-[0.58rem] font-semibold uppercase tracking-[0.18em] lg:inline">
        {label}
      </span>
      <div className="flex rounded-full bg-[var(--surface-alt)] p-0.5">
        {locales.map((language) => {
          const isActive = locale === language;

          return (
            <button
              key={language}
              type="button"
              onClick={() => onChange(language)}
              aria-pressed={isActive}
              className={`rounded-full px-2.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.08em] transition-all duration-200 ${
                isActive
                  ? "bg-[var(--ink)] text-white shadow-[0_12px_22px_-18px_var(--shadow)]"
                  : "text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              {language}
            </button>
          );
        })}
      </div>
    </div>
  );
}
