"use client";

import Image from "next/image";
import type { CSSProperties, MouseEventHandler, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Asterisk,
  Camera,
  Cat,
  Cube,
  DeviceMobile,
  DownloadSimple,
  EnvelopeSimple,
  FileText,
  Globe,
  LinkedinLogo,
  MagicWand,
  MediumLogo,
  PaintBrush,
  ThreadsLogo,
  X,
} from "@phosphor-icons/react";
import { MapPinned, Speech } from "lucide-react";
import { portfolioContent } from "@/data/portfolio-content";
import { PhotoCarousel } from "@/components/portfolio/photo-carousel";

type CardProps = Readonly<{
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}>;

type SpotlightCardProps = Readonly<{
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  style?: CSSProperties;
}>;

type SocialButtonProps = Readonly<{
  href: string;
  label: string;
  icon: ReactNode;
  filled?: boolean;
  className?: string;
}>;

type MiniProjectProps = Readonly<{
  title: string;
  description: string;
  logo: "vibelingo" | "pinsight";
  onClick: () => void;
}>;

type ProjectCardProps = Readonly<{
  index: string;
  title: string;
  subtitle?: string;
  language?: "en" | "zh";
  icon: ReactNode;
  href?: string;
  className?: string;
  backgroundImageSrc?: string;
  backgroundImageAlt?: string;
  hideTopIcon?: boolean;
  hideTopAction?: boolean;
  hideText?: boolean;
  revealTextOnHover?: boolean;
  imageLoading?: "lazy" | "eager";
  style?: CSSProperties;
}>;

type IntroMotionOptions = Readonly<{
  x?: string;
  y?: string;
  scale?: number;
  delayMs?: number;
  durationMs?: number;
}>;

type PlaygroundProject = Readonly<{
  id: string;
  index: string;
  title: string;
  logo: "vibelingo" | "pinsight";
  subtitle: {
    en: string;
    zh: string;
  };
  overview: {
    en: string;
    zh: string;
  };
  tools?: string[];
  posterSrc: string;
  posterAlt: string;
  videoSrc: string;
  videoType: string;
  videoHint: string;
}>;

const playgroundProjects: PlaygroundProject[] = [
  {
    id: "ai-bento-portfolio-lab",
    index: "01",
    title: "VibeLingo",
    logo: "vibelingo",
    subtitle: {
      en: "Language Learning",
      zh: "语言学习",
    },
    overview: {
      en: "Master languages through bilingual videos and audio-enhanced reading.",
      zh: "透过双语影片与语音强化阅读来精通语言。",
    },
    tools: ["Codex", "Stitch", "Vercel"],
    posterSrc: "/playground/posters/ai-bento-portfolio-lab-first-frame.jpg",
    posterAlt: "AI Bento Portfolio Lab poster",
    videoSrc: "/playground/ai-bento-portfolio-lab.mp4",
    videoType: "video/mp4",
    videoHint: "已接入附件影片 /public/playground/ai-bento-portfolio-lab.mp4。",
  },
  {
    id: "motion-prompt-playground",
    index: "02",
    title: "PinSight",
    logo: "pinsight",
    subtitle: {
      en: "Trip Planner",
      zh: "旅游规划",
    },
    overview: {
      en: "Transform social media content into ready-to-go itineraries.",
      zh: "将社群内容转化为随时可出发的旅游行程。",
    },
    tools: ["Codex", "Stitch", "Variant"],
    posterSrc: "/playground/posters/pinsight-first-frame.jpg",
    posterAlt: "Motion Prompt Playground poster",
    videoSrc: "/playground/pinsight.mp4",
    videoType: "video/mp4",
    videoHint: "已接入附件影片 /public/playground/pinsight.mp4。",
  },
];

function useTypewriter(text: string, speed: number, delay: number) {
  const [typed, setTyped] = useState("");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const start = window.setTimeout(() => {
      let index = 0;
      const interval = window.setInterval(() => {
        index += 1;
        setTyped(text.slice(0, index));

        if (index >= text.length) {
          window.clearInterval(interval);
          setFinished(true);
        }
      }, speed);

      return () => window.clearInterval(interval);
    }, delay);

    return () => window.clearTimeout(start);
  }, [delay, speed, text]);

  return { typed, finished };
}

function createIntroMotionStyle(
  index: number,
  { x = "0px", y = "28px", scale = 1, delayMs = 0, durationMs }: IntroMotionOptions = {},
): CSSProperties {
  return {
    "--intro-index": index,
    "--intro-x": x,
    "--intro-y": y,
    "--intro-scale": scale.toString(),
    "--intro-delay": `${index * 72 + delayMs}ms`,
    ...(durationMs ? { "--intro-duration": `${durationMs}ms` } : {}),
  } as CSSProperties;
}

function Card({ children, className = "", style }: CardProps) {
  return (
    <section
      className={`rounded-[32px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] ${className}`}
      style={style}
    >
      {children}
    </section>
  );
}

function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.15)",
  style,
}: SpotlightCardProps) {
  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    event.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    event.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden ${className}`}
      style={
        {
          ...style,
          "--mouse-x": "50%",
          "--mouse-y": "50%",
          "--spotlight-color": spotlightColor,
        } as CSSProperties
      }
    >
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),var(--spotlight-color)_0%,transparent_60%)]" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

function TypingLine({
  text,
  className,
  speed,
  delay,
}: Readonly<{
  text: string;
  className?: string;
  speed: number;
  delay: number;
}>) {
  const { typed, finished } = useTypewriter(text, speed, delay);

  return (
    <span className={`${finished ? "typing-finished" : ""} ${className ?? ""}`}>
      <span className="typing-text">{typed}</span>
      <span className="typing-cursor" />
    </span>
  );
}

function SocialButton({
  href,
  label,
  icon,
  filled = true,
  className = "",
}: SocialButtonProps) {
  const isExternalLink = href.startsWith("http://") || href.startsWith("https://");

  return (
    <a
      href={href}
      target={isExternalLink ? "_blank" : undefined}
      rel={isExternalLink ? "noreferrer" : undefined}
      aria-label={label}
      className={`group/social relative flex items-center justify-center transition-all duration-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/85 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f93b38] ${
        filled
          ? "bg-[#FEF0EC] text-[#F25430] hover:bg-[#F25430] hover:text-white"
          : "border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-[#f93b38]"
      } ${className}`}
    >
      <span
        className={`transition-transform duration-300 group-hover/social:scale-110 ${
          filled ? "text-current" : "text-white group-hover/social:text-[#f93b38]"
        }`}
      >
        {icon}
      </span>
    </a>
  );
}

function MiniProject({ title, description, logo, onClick }: MiniProjectProps) {
  const isVibeLingo = logo === "vibelingo";

  return (
    <button
      type="button"
      onClick={onClick}
      className="group/item flex w-full min-w-0 flex-1 flex-col justify-center rounded-[20px] bg-[#FEF0EC] px-5 py-3.5 text-left transition-all duration-300 hover:bg-[#F25430] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F25430]/75 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      aria-label={`Open ${title} preview`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex size-10 shrink-0 items-center justify-center transition-colors duration-300 ${
            isVibeLingo
              ? "rounded-[12px] bg-[#e72855] text-white group-hover/item:bg-white/16 group-hover/item:text-white"
              : "rounded-[12px] bg-[#0a0a0a] text-white group-hover/item:bg-white/16 group-hover/item:text-white"
          }`}
        >
          {isVibeLingo ? <Speech className="size-5" strokeWidth={2.2} /> : <MapPinned className="size-5" strokeWidth={1.8} />}
        </div>

        <div className="min-w-0">
          <h3 className="text-base font-extrabold text-[#F25430] group-hover/item:text-white">
            {title}
          </h3>
          <p className="mt-0.5 text-sm text-[#F25430]/70 group-hover/item:text-white/70">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}

function ProjectCard({
  index,
  title,
  subtitle,
  language = "en",
  icon,
  href,
  className = "",
  backgroundImageSrc,
  backgroundImageAlt = "",
  hideTopIcon = false,
  hideTopAction = false,
  hideText = false,
  revealTextOnHover = false,
  imageLoading = "lazy",
  style,
}: ProjectCardProps) {
  const responsiveHeightClass = hideText ? "min-h-[12rem] md:min-h-[12.5rem] lg:min-h-0" : "";

  return (
    <Card
      className={`portfolio-intro-item group relative flex cursor-pointer flex-col justify-between overflow-hidden bg-white p-5 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(242,84,48,0.08)] ${responsiveHeightClass} ${className}`}
      style={style}
    >
      <a
        href={href}
        aria-label={title}
        className="flex h-full w-full flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F25430]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      >
        {backgroundImageSrc ? (
          <>
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={backgroundImageSrc}
                alt={backgroundImageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 24vw"
                loading={imageLoading}
                quality={72}
                className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.08]"
              />
            </div>
          </>
        ) : null}

        <div className={`relative z-10 flex items-start ${hideTopIcon ? "justify-end" : "justify-between"}`}>
          {!hideTopIcon ? (
            <div className="flex size-10 items-center justify-center rounded-[14px] bg-[#fdf1eb] text-[#F25430] transition-transform duration-300 group-hover:rotate-[-10deg]">
              {icon}
            </div>
          ) : null}
          {!hideTopAction ? (
            <div className="flex size-10 items-center justify-center rounded-full border-2 border-[#f5e7de] bg-white/82 text-[#F25430] transition-all duration-300 group-hover:border-[#f93b38] group-hover:bg-[#F25430] group-hover:text-white">
              <ArrowUpRight size={18} weight="bold" />
            </div>
          ) : null}
        </div>

        {!hideText ? (
          <div className="relative z-10">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#F25430]/60">
              {index}
            </p>
            <h3 className="text-lg font-extrabold leading-tight text-[#F25430]">{title}</h3>
          </div>
        ) : null}

        {revealTextOnHover ? (
          <div className="project-card-caption">
            {subtitle ? (
              <span
                className={`project-card-caption-subtitle ${
                  language === "zh" ? "project-card-caption-subtitle--zh" : ""
                }`}
              >
                {subtitle}
              </span>
            ) : null}
            <span className="project-card-caption-title">{title}</span>
          </div>
        ) : null}
      </a>
    </Card>
  );
}

export function PortfolioPage() {
  const [language, setLanguage] = useState<"en" | "zh">("en");
  const [introReady, setIntroReady] = useState(false);
  const [shanghaiTime, setShanghaiTime] = useState<string | null>(null);
  const [activePlaygroundProjectId, setActivePlaygroundProjectId] = useState<string | null>(null);
  const content = portfolioContent[language];
  const activePlaygroundProject =
    playgroundProjects.find((project) => project.id === activePlaygroundProjectId) ?? null;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIntroReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Shanghai",
    });

    const update = () => {
      setShanghaiTime(formatter.format(new Date()));
    };

    update();
    const interval = window.setInterval(update, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!activePlaygroundProject) {
      return undefined;
    }

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActivePlaygroundProjectId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePlaygroundProject]);

  const introCopy =
    language === "en"
      ? "Designing with systemic thinking and agility across multi-platform experiences and cross-functional teams."
      : "结合系统化思维与敏捷学习力，专注于跨平台设计与高效协作。";

  const displayName = "Vicky Chang";
  const roleLabel = language === "en" ? "UX/UI Designer" : "UX/UI 设计师";
  const aiLabsLabel =
    language === "en"
      ? { firstLine: "AI", secondLine: "Labs" }
      : { firstLine: "AI", secondLine: "实验室" };
  const modalOverviewLabel = language === "en" ? "Overview" : "作品介绍";
  const modalToolsLabel = language === "en" ? "Software Tools" : "软件工具";
  const modalSectionLabelClass =
    language === "en"
      ? "text-[11px] font-bold uppercase tracking-[0.2em] text-white/42"
      : "text-[13px] font-semibold tracking-[0.08em] text-white/46";

  const languageButton = useMemo(
    () => (
        <button
          type="button"
          onClick={() => setLanguage((current) => (current === "en" ? "zh" : "en"))}
          className="cursor-pointer rounded-full border border-white/50 bg-white/10 px-3 py-2 text-white drop-shadow-md backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#f93b38] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/85 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f93b38]"
          aria-label={language === "en" ? "Switch to Chinese" : "Switch to English"}
        >
        <span className="flex items-center justify-center gap-1.5">
          <Globe size={18} weight="regular" />
          <span className="text-[14px] font-black leading-none">
            {language === "en" ? "中" : "EN"}
          </span>
        </span>
      </button>
    ),
    [language],
  );

  return (
    <>
      <main
        data-intro-ready={introReady ? "true" : "false"}
        className="flex min-h-[100dvh] items-start justify-center bg-[#FDF4F0] px-4 py-10 text-[#f93b38] selection:bg-[#f93b38] selection:text-white"
      >
        <div className="relative isolate grid min-h-[calc(100dvh-80px)] w-full max-w-[1400px] grid-cols-1 gap-5 md:grid-cols-2 lg:h-[calc(100dvh-80px)] lg:min-h-0 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,0.82fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-[1fr_1fr_1fr] xl:grid-cols-[minmax(0,0.92fr)_minmax(0,0.92fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <SpotlightCard
            className="portfolio-intro-item col-span-1 row-span-1 min-w-0 rounded-[32px] bg-gradient-to-tr from-[#f93b38] to-[#ffd37c] p-6 text-white shadow-[0_8px_30px_rgba(249,59,56,0.2)] md:col-span-2 md:p-7 lg:col-span-2 lg:col-start-1 lg:h-full lg:row-span-3 lg:row-start-1 lg:p-8"
            style={createIntroMotionStyle(0, { x: "-96px", y: "0px", delayMs: 160 })}
          >
            <div className="absolute -right-20 -top-20 size-96 rounded-full bg-white/5 blur-3xl transition-colors duration-700 group-hover:bg-white/10" />

            <div className="relative z-10 flex h-full flex-col lg:justify-between">
              <div className="mb-3 flex justify-end md:mb-4 lg:mb-8">{languageButton}</div>

              <div className="mt-1 md:mt-2 lg:mt-auto">
                <h1 className="mb-3 font-extrabold leading-[1.05] tracking-tighter md:mb-4">
                  <TypingLine
                    text={displayName}
                    speed={80}
                    delay={300}
                    className="block text-[2.55rem] leading-none sm:text-[2.8rem] lg:text-[3.5rem]"
                  />
                  <TypingLine
                    text={roleLabel}
                    speed={100}
                    delay={1200}
                    className="mt-3 block text-[23px] md:mt-4 md:text-[25px] lg:text-[28px]"
                  />
                </h1>

                <p className="mb-6 max-w-sm text-base font-medium leading-relaxed text-white/80 md:mb-7 md:text-[1.05rem] lg:mb-8 lg:text-lg">
                  {introCopy}
                </p>

                <div className="flex flex-wrap gap-3 md:gap-4">
                  <SocialButton
                    href="https://www.linkedin.com/in/vicky-chang-926a38207/"
                    label="LinkedIn"
                    filled={false}
                    className="size-11 rounded-full md:size-12"
                    icon={<LinkedinLogo size={20} weight="fill" />}
                  />
                  <SocialButton
                    href="https://medium.com/@vickychang_"
                    label="Medium"
                    filled={false}
                    className="size-11 rounded-full md:size-12"
                    icon={<MediumLogo size={20} weight="fill" />}
                  />
                  <SocialButton
                    href="https://www.threads.com/@cychangyy_?igshid=NTc4MTIwNjQ2YQ=="
                    label="Threads"
                    filled={false}
                    className="size-11 rounded-full md:size-12"
                    icon={<ThreadsLogo size={20} weight="fill" />}
                  />
                  <SocialButton
                    href="mailto:yaya810411@gmail.com"
                    label="Email"
                    filled={false}
                    className="size-11 rounded-full md:size-12"
                    icon={<EnvelopeSimple size={20} weight="fill" />}
                  />
                </div>
              </div>
            </div>

            <Asterisk
              size={240}
              weight="fill"
              className="pointer-events-none absolute -bottom-16 -right-16 text-white/5 transition-transform duration-1000 ease-out group-hover:rotate-45"
            />
          </SpotlightCard>

          <Card
            className="portfolio-intro-item group relative col-span-1 row-span-1 flex flex-row items-center gap-8 overflow-hidden p-6 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(249,59,56,0.08)] lg:col-span-2 lg:col-start-3 lg:row-start-1"
            style={createIntroMotionStyle(1, {
              x: "0px",
              y: "-58px",
              delayMs: 28,
              durationMs: 2280,
            })}
          >
            <div className="flex flex-none flex-col justify-between self-stretch">
	              <MagicWand
	                size={34}
	                weight="fill"
	                className="text-[#F25430] transition-transform duration-300 group-hover:rotate-[-10deg] lg:size-10"
	              />
	              <h2 className="gradient-time-text pb-1 text-[1.65rem] font-extrabold leading-[1.08] tracking-tight sm:text-[1.8rem] lg:text-3xl lg:leading-[1.2]">
	                {aiLabsLabel.firstLine}
	                <br />
	                {aiLabsLabel.secondLine}
	              </h2>
            </div>

            <div className="flex w-full min-w-0 flex-1 flex-col gap-4 self-stretch lg:ml-auto lg:max-w-[16.25rem]">
              {playgroundProjects.map((project) => (
                <MiniProject
                  key={project.id}
                  title={project.title}
                  description={project.subtitle[language]}
                  logo={project.logo}
                  onClick={() => setActivePlaygroundProjectId(project.id)}
                />
              ))}
            </div>
          </Card>

          <SpotlightCard
            className="portfolio-intro-item col-span-1 row-span-1 min-h-[11rem] rounded-[32px] bg-gradient-to-tr from-[#f93b38] via-[#ff6b35] to-[#ffd37c] p-6 text-white shadow-[0_8px_30px_rgba(249,59,56,0.15)] transition-transform duration-300 hover:scale-[1.02] md:min-h-[12.5rem] lg:col-start-5 lg:row-start-1 lg:min-h-0"
            style={createIntroMotionStyle(2, {
              x: "0px",
              y: "-58px",
              delayMs: 92,
              durationMs: 2360,
            })}
          >
            <a
              href={content.resume.href}
              target="_blank"
              rel="noreferrer"
              aria-label={content.resume.label}
              className="relative z-10 flex h-full flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <FileText size={34} weight="fill" className="text-white/90 lg:size-10" />
                <div className="flex size-12 translate-x-0 translate-y-0 items-center justify-center rounded-full bg-white text-[#F25430] shadow-md transition-transform duration-500 lg:translate-x-12 lg:-translate-y-12 lg:group-hover:translate-x-0 lg:group-hover:translate-y-0">
                  <DownloadSimple size={20} weight="bold" />
                </div>
              </div>

              <div className="mt-auto">
                <h3 className="text-[1.65rem] font-extrabold tracking-tight sm:text-[1.8rem] lg:text-3xl">
                  {content.labels.resume}
                </h3>
              </div>
            </a>
          </SpotlightCard>

          <ProjectCard
            index="Smart Hardware"
            title="Bonfire OS 7.0"
            subtitle={language === "zh" ? "智能硬件" : "Smart Hardware"}
            language={language}
            icon={<Cube size={18} weight="fill" />}
            href="/work/bonfire-os-7-0"
            className="lg:col-start-3 lg:row-start-2"
            backgroundImageSrc="/portfolio/optimized/bonfire-os7-cover16.jpg"
            backgroundImageAlt="Bonfire OS 7.0 project cover"
            hideTopIcon
            hideTopAction
            hideText
            revealTextOnHover
            imageLoading="eager"
            style={createIntroMotionStyle(3, { x: "260px", y: "0px", delayMs: 120 })}
          />
          <ProjectCard
            index="Project 02"
            title="Simppl"
            subtitle={language === "zh" ? "手机应用" : "Mobile App"}
            language={language}
            icon={<DeviceMobile size={18} weight="fill" />}
            href="/work/design-simppl"
            className="lg:col-start-4 lg:row-start-2"
            backgroundImageSrc="/portfolio/optimized/simppl-cover2.jpg"
            backgroundImageAlt="Simppl mobile app project cover"
            hideTopIcon
            hideTopAction
            hideText
            revealTextOnHover
            imageLoading="eager"
            style={createIntroMotionStyle(4, { x: "260px", y: "0px", delayMs: 210 })}
          />

          <ProjectCard
            index="Project 03"
            title="Cartify"
            subtitle={language === "zh" ? "网页插件" : "Web Plugin"}
            language={language}
            icon={<PaintBrush size={18} weight="fill" />}
            href="/work/design-cartify"
            className="lg:col-start-5 lg:row-start-2"
            backgroundImageSrc="/portfolio/optimized/cartify-cover3.jpg"
            backgroundImageAlt="Cartify project cover"
            hideTopIcon
            hideTopAction
            hideText
            revealTextOnHover
            imageLoading="eager"
            style={createIntroMotionStyle(5, { x: "260px", y: "0px", delayMs: 300 })}
          />

          <Card
            className="portfolio-intro-item group relative min-h-[12rem] overflow-hidden md:min-h-[13.5rem] lg:col-start-4 lg:row-start-3 lg:min-h-0"
            style={createIntroMotionStyle(6, { x: "0px", y: "56px", delayMs: 220 })}
          >
            <div className="pointer-events-none absolute left-5 top-5 z-20 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 p-2.5 text-white backdrop-blur-sm">
              <Camera size={14} weight="fill" />
            </div>
            <PhotoCarousel
              photos={content.photos}
              locale={language}
              fillContainer
              framed={false}
              showIndicators={false}
              showControls={false}
            />
          </Card>

          <Card
            className="portfolio-intro-item group relative min-h-[12rem] overflow-hidden md:min-h-[13.5rem] lg:col-start-5 lg:row-start-3 lg:min-h-0"
            style={createIntroMotionStyle(7, { x: "0px", y: "56px", delayMs: 260 })}
          >
            <div className="pointer-events-none absolute left-5 top-5 z-20 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 p-2.5 text-white backdrop-blur-sm">
              <Cat size={14} weight="fill" />
            </div>
            <PhotoCarousel
              photos={content.catPhotos}
              locale={language}
              fillContainer
              framed={false}
              showIndicators={false}
              showControls={false}
            />
          </Card>

          <div className="col-span-1 row-span-1 flex flex-col gap-5 md:min-h-[22rem] lg:col-start-3 lg:row-start-3 lg:min-h-0">
            <Card
              className="portfolio-intro-item flex min-h-[11rem] flex-1 flex-col items-center justify-center border border-transparent p-3 text-center transition-colors duration-300 hover:border-[#F25430]/10 md:min-h-0"
              style={createIntroMotionStyle(8, { x: "0px", y: "56px", delayMs: 310 })}
            >
              <span
                className={`mb-1 block font-bold uppercase tracking-[0.2em] text-[#F25430]/55 ${
                  language === "zh" ? "text-sm" : "text-xs"
                }`}
              >
                {language === "zh" ? "离线日常" : "Off Screen"}
              </span>
              <div className="flex gap-3 text-[24px]">
                <span
                  data-cursor-hover
                  data-cursor-size="large"
                  className="cursor-default drop-shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                >
                  ☕️
                </span>
                <span
                  data-cursor-hover
                  data-cursor-size="large"
                  className="cursor-default drop-shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                >
                  ✈️
                </span>
                <span
                  data-cursor-hover
                  data-cursor-size="large"
                  className="cursor-default drop-shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                >
                  📷
                </span>
                <span
                  data-cursor-hover
                  data-cursor-size="large"
                  className="cursor-default drop-shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                >
                  🖼️
                </span>
              </div>
            </Card>

            <Card
              className="portfolio-intro-item flex min-h-[11rem] flex-1 flex-col items-center justify-center overflow-hidden border border-transparent p-3 text-center transition-colors duration-300 hover:border-[#F25430]/10 md:min-h-0"
              style={createIntroMotionStyle(9, { x: "0px", y: "56px", delayMs: 350 })}
            >
              <span
                className={`mb-1 block font-bold uppercase tracking-[0.2em] text-[#F25430]/55 ${
                  language === "zh" ? "text-sm" : "text-xs"
                }`}
              >
                {language === "zh" ? "上海" : "Shanghai"}
              </span>
              <div suppressHydrationWarning className="gradient-static text-3xl font-extrabold">
                {shanghaiTime ?? "--:--"}
              </div>
            </Card>
          </div>
        </div>
      </main>

      {activePlaygroundProject ? (
        <div
          className="fixed inset-0 z-[80] bg-[rgba(20,14,10,0.7)] backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="playground-modal-title"
          onClick={() => setActivePlaygroundProjectId(null)}
        >
          <div className="flex min-h-[100dvh] items-stretch justify-center p-[max(0.75rem,env(safe-area-inset-top))] pr-[max(0.75rem,env(safe-area-inset-right))] pb-[max(0.75rem,env(safe-area-inset-bottom))] pl-[max(0.75rem,env(safe-area-inset-left))] md:p-6">
            <div
              className="relative grid h-[calc(100dvh-1.5rem)] w-full max-w-[1440px] overflow-y-auto rounded-[32px] bg-[#17120f] text-white shadow-[0_20px_90px_rgba(0,0,0,0.32)] md:h-[calc(100dvh-3rem)] lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,22.5rem)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative flex min-h-[clamp(15.5rem,40vh,20rem)] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(249,59,56,0.16),transparent_40%),linear-gradient(180deg,#241b16_0%,#110d0b_100%)] px-4 py-[clamp(0.75rem,2vh,1rem)] md:min-h-[52vh] md:px-8 md:py-10">
                <div className="aspect-video w-full overflow-hidden rounded-[24px]">
                  <video
                    key={activePlaygroundProject.videoSrc}
                    className="h-full w-full object-cover"
                    autoPlay
                    controls
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={`${activePlaygroundProject.title} demo video`}
                    poster={activePlaygroundProject.posterSrc}
                  >
                    <source
                      src={activePlaygroundProject.videoSrc}
                      type={activePlaygroundProject.videoType}
                    />
                  </video>
                </div>
              </div>

              <div className="relative flex flex-col border-t border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-6 md:p-8 lg:justify-center lg:border-l lg:border-t-0">
                <button
                  type="button"
                  onClick={() => setActivePlaygroundProjectId(null)}
                  className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white/78 transition-colors duration-300 hover:bg-white/12 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#17120f]"
                  aria-label="Close playground preview"
                >
                  <X size={20} weight="bold" />
                </button>

                <div className="space-y-6 lg:w-full">
                  <div className="space-y-3">
                    <span className="inline-flex rounded-full border border-[#f8b7a7]/20 bg-[#f25430]/12 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#ffd4c8]">
                      {activePlaygroundProject.index}
                    </span>
                    <div className="space-y-2">
                      <h2
                        id="playground-modal-title"
                        className="text-[clamp(1.7rem,1.15rem+1.35vw,2.75rem)] font-extrabold leading-[0.95] tracking-[-0.04em]"
                      >
                        {activePlaygroundProject.title}
                      </h2>
                      <p className="max-w-[26ch] text-sm leading-7 text-white/62">
                        {activePlaygroundProject.subtitle[language]}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5 pt-6">
                    <div className="space-y-1.5">
                      <p className={modalSectionLabelClass}>
                        {modalOverviewLabel}
                      </p>
                      <p className="text-sm leading-7 text-white/82">
                        {activePlaygroundProject.overview[language]}
                      </p>
                    </div>

                    {activePlaygroundProject.tools?.length ? (
                      <div className="space-y-1.5">
                        <p className={modalSectionLabelClass}>
                          {modalToolsLabel}
                        </p>
                        <p className="text-sm leading-7 text-white/82">
                          {activePlaygroundProject.tools.join(", ")}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
