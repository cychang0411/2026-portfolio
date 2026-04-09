export type Locale = "zh" | "en";

type LocalizedText = {
  zh: string;
  en: string;
};

export type ProjectItem = {
  title: string;
  description: string;
  href: string;
  meta: string;
  cta: string;
};

export type PhotoItem = {
  src: string;
  alt: LocalizedText;
};

export type SocialItem = {
  label: string;
  href: string;
};

export type PortfolioContent = {
  profile: {
    name: string;
    title: string;
    intro: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    locationLabel: string;
    locationValue: string;
    availability: string;
  };
  labels: {
    selectedWork: string;
    playground: string;
    city: string;
    interests: string;
    dailyFrames: string;
    socials: string;
    resume: string;
    contact: string;
    email: string;
    language: string;
    now: string;
    identity: string;
    atmosphere: string;
    stack: string;
    currentBase: string;
    curiosities: string;
    work: string;
    about: string;
  };
  workProjects: ProjectItem[];
  playgroundProjects: ProjectItem[];
  city: {
    name: string;
    description: string;
    coordinates: string;
  };
  interests: string[];
  stack: string[];
  now: string[];
  photos: PhotoItem[];
  catPhotos: PhotoItem[];
  socialLinks: SocialItem[];
  footerLinks: SocialItem[];
  resume: {
    label: string;
    href: string;
  };
  contact: {
    title: string;
    description: string;
    email: string;
    cta: string;
    mailSubject: string;
    mailBody: string;
  };
};

const driveLifePhotoIds = [
  "17_SvBxF0ynPe1Vg17DT2EDzcLj5eDw5N",
  "1A4pu6rzR78qEpOUAUr-ZzwvMFTc7VODQ",
  "1EmHR9eoDsU3Gk91t1MyvSAO226GZ_nN8",
  "1FVConlh98220QZ3BK_Cu5TVTu9AqXoM2",
  "1GogM6RVv4xAPeVPNkqqentzviqz-5l4B",
  "1NIM_Ze31ybz-P5b_mrQ8Iy9pwnKjmCOz",
  "1RrIhoKrNMDdMi3XyGUV66tJd-P4Nd_lM",
  "1YxOnL1PHITmLAQ_P4pzXGbdB6PXDxLqY",
  "1cCXc4D3fzSK4-B73uUgRdYk0CrPg-jgA",
  "1gzsaMhqDV8yp6MkWLLiM6Snm_3dCwUCB",
  "1hr7iRnNXClBMfh69vH7AvJAxI-t16tem",
  "1nAA6MN4GU5la_MN6PdvjCnSRwLraeK42",
  "1pVYidWs53OiWDvrqmqKNclQqfc73ARxq",
  "1pZ9JaBL21Av3vyNcfwaygbKlX64_lbIR",
  "1qVWp4HE1Je1xwc4sdZpfDYWtOON25k-S",
  "1qwCvrS6bqrFmZyuP4jm9Oh6VJ9OUM2Oo",
  "1qxiieNEf-94jJeGQkWUpAYyh3p1bpbRS",
  "1sCtJdRBG9FzHCFlyS_H1z5MQ5dTMwCcM",
  "1v2myC5_w-NeG5of48vAn2c1KEvpxO4WJ",
  "1vEHVnme9WRd5w6dc4Rl9Z4oSEi69BfaA",
  "1vuTRovmWbVnx-FeNxniEJ_iQOitr5EnF",
  "1ym1LseTLnWVz251BHjzsx7IxzSrJXuQS",
] as const;

const drivePhotoSrc = (id: string) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;

const lifePhotos: PhotoItem[] = driveLifePhotoIds.map((id, index) => {
  const order = String(index + 1).padStart(2, "0");

  return {
    src: drivePhotoSrc(id),
    alt: {
      zh: `生活攝影輪播照片 ${order}`,
      en: `Life photo ${order}.`,
    },
  };
});

const driveCatPhotoIds = [
  "15pj0h5OZli64sE0qsoHCFR_0RjRRq3QI",
  "19CsO_kqBQdA4kPKQzlFnd9Tf2AQeM-n3",
  "1FhpciCldpQ_WaGYUu_oApEop72dTUyL1",
  "1Gz7ivZ68zdcJxCCF0pWFbMA9m7Tj2O-5",
  "1QGbffZ3pJJia4xSkesJ9M0hT5323ke2R",
  "1SU_Ai1N357TVmimhMFUJqwEHMbMx42bR",
  "1TmcRj_StGa7eUjUivZF1uhcXP7u4-wiV",
  "1fKJfV3NRXgLcT0n8lfh5oci9Tk25EvS6",
  "1ke-8Rk5h7nHhv6ehWTu0SXV1Ji4OO7Cw",
  "1uhpdjDnCMiM7Z4hsVovKjmrdHyNiWZqH",
  "1zObgcnn0CuBoDnT6yffSz1pzmoY0RygZ",
] as const;

const catPhotos: PhotoItem[] = driveCatPhotoIds.map((id, index) => {
  const order = String(index + 1).padStart(2, "0");

  return {
    src: drivePhotoSrc(id),
    alt: {
      zh: `貓咪輪播照片 ${order}`,
      en: `Cat photo ${order}.`,
    },
  };
});

export const portfolioContent: Record<Locale, PortfolioContent> = {
  zh: {
    profile: {
      name: "Vicky Chang",
      title: "UX/UI Designer",
      intro: "我把複雜的資訊與互動整理成清晰、安靜、卻有記憶點的數位體驗。",
      description:
        "目前以上海為基地，專注於產品體驗、視覺系統與有溫度的互動細節。這裡收錄過往工作、Vibe coding 實驗，以及我日常生活裡的觀察。",
      primaryCta: "下載履歷",
      secondaryCta: "寫信給我",
      locationLabel: "Base",
      locationValue: "Shanghai",
      availability: "Open for product design, design system, and AI-native product collaborations.",
    },
    labels: {
      selectedWork: "過往工作作品",
      playground: "Playground",
      city: "所在城市",
      interests: "興趣愛好",
      dailyFrames: "日常照片",
      socials: "社交媒體",
      resume: "简历",
      contact: "聯繫方式",
      email: "Email",
      language: "語言",
      now: "最近在關注",
      identity: "身份",
      atmosphere: "氛圍",
      stack: "工具棧",
      currentBase: "目前據點",
      curiosities: "好奇心",
      work: "作品",
      about: "關於",
    },
    workProjects: [
      {
        title: "Bonfire OS 7.0",
        description: "重新梳理註冊流程與資訊優先級，讓新手更快理解產品價值。",
        href: "https://example.com/fintech-onboarding",
        meta: "Product Design · 2024",
        cta: "查看作品",
      },
      {
        title: "Design System for Enterprise Suite",
        description: "建立跨團隊使用的元件規範與設計節奏，提升一致性與交付效率。",
        href: "https://example.com/design-system-suite",
        meta: "Design System · 2023",
        cta: "查看作品",
      },
      {
        title: "AI Workspace Dashboard",
        description: "為 AI 協作工具定義資訊架構，讓複雜操作變得更直覺。",
        href: "https://example.com/ai-workspace-dashboard",
        meta: "UX Strategy · 2024",
        cta: "查看作品",
      },
      {
        title: "Lifestyle Commerce Experience",
        description: "用更細膩的視覺語言與內容排序，提升品牌感與轉化體驗。",
        href: "https://example.com/lifestyle-commerce",
        meta: "E-commerce · 2022",
        cta: "查看作品",
      },
    ],
    playgroundProjects: [
      {
        title: "AI Bento Portfolio Lab",
        description: "用生成式工作流快速迭代首頁構圖與互動節奏的實驗。",
        href: "https://example.com/ai-bento-lab",
        meta: "Vibe Coding · React",
        cta: "打開實驗",
      },
      {
        title: "Motion Prompt Playground",
        description: "把設計語氣翻譯成可執行的動態規則，測試不同節奏的感受。",
        href: "https://example.com/motion-prompt-playground",
        meta: "Vibe Coding · Motion",
        cta: "打開實驗",
      },
    ],
    city: {
      name: "上海",
      description:
        "我喜歡這座城市的速度與密度，也喜歡在快速變化裡保留一點留白。很多對節奏、材質和界面的敏感，都是在這裡被放大的。",
      coordinates: "31.2304° N / 121.4737° E",
    },
    interests: ["城市散步", "展覽與空間", "產品敘事", "攝影", "AI 工具", "咖啡與器物"],
    stack: ["Figma", "Stitch", "Claude", "Codex"],
    now: ["AI-native 產品體驗", "更克制的動態語言", "把設計系統做得更有人味"],
    photos: lifePhotos,
    catPhotos,
    socialLinks: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/vicky-chang-926a38207/" },
      { label: "Medium", href: "https://medium.com/@vickychang_" },
      {
        label: "Threads",
        href: "https://www.threads.com/@cychangyy_?igshid=NTc4MTIwNjQ2YQ==",
      },
      { label: "Email", href: "mailto:yaya810411@gmail.com" },
    ],
    footerLinks: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/vicky-chang-926a38207/" },
      { label: "Medium", href: "https://medium.com/@vickychang_" },
      {
        label: "Threads",
        href: "https://www.threads.com/@cychangyy_?igshid=NTc4MTIwNjQ2YQ==",
      },
      { label: "Email", href: "mailto:yaya810411@gmail.com" },
    ],
    resume: {
      label: "下載履歷",
      href: "https://drive.google.com/file/d/1Gscx49yF2wIkf0wi8eHbXlfJ1n7aKBlo/view?usp=sharing",
    },
    contact: {
      title: "一起做更有質感的產品",
      description:
        "如果你正在找 UX/UI 設計、設計系統整理，或想一起探索 AI 與產品體驗的交會，歡迎來信。",
      email: "yaya810411@gmail.com",
      cta: "發送 Email",
      mailSubject: "一起聊聊設計合作",
      mailBody:
        "Hi Vicky,\n\n我看了你的作品集，想和你聊聊一個可能的合作。\n\n",
    },
  },
  en: {
    profile: {
      name: "Vicky Chang",
      title: "UX/UI Designer",
      intro: "I turn complex flows into calm, tactile digital experiences with clarity and character.",
      description:
        "Based in Shanghai, I focus on product experience, visual systems, and the softer details that make interfaces feel considered. This space brings together selected work, vibe-coded experiments, and a few frames from everyday life.",
      primaryCta: "Download resume",
      secondaryCta: "Email me",
      locationLabel: "Base",
      locationValue: "Shanghai",
      availability: "Open for product design, design system, and AI-native product collaborations.",
    },
    labels: {
      selectedWork: "Selected Work",
      playground: "Playground",
      city: "City",
      interests: "Interests",
      dailyFrames: "Daily Frames",
      socials: "Social",
      resume: "Resume",
      contact: "Contact",
      email: "Email",
      language: "Language",
      now: "Currently Exploring",
      identity: "Identity",
      atmosphere: "Atmosphere",
      stack: "Stack",
      currentBase: "Current Base",
      curiosities: "Curiosities",
      work: "Work",
      about: "About",
    },
    workProjects: [
      {
        title: "Bonfire OS 7.0",
        description: "A clearer signup journey with stronger information hierarchy and earlier value recognition.",
        href: "https://example.com/fintech-onboarding",
        meta: "Product Design · 2024",
        cta: "View project",
      },
      {
        title: "Design System for Enterprise Suite",
        description: "A shared component language built to improve team alignment and shipping speed.",
        href: "https://example.com/design-system-suite",
        meta: "Design System · 2023",
        cta: "View project",
      },
      {
        title: "AI Workspace Dashboard",
        description: "Information architecture and interaction patterns for a more legible AI collaboration tool.",
        href: "https://example.com/ai-workspace-dashboard",
        meta: "UX Strategy · 2024",
        cta: "View project",
      },
      {
        title: "Lifestyle Commerce Experience",
        description: "A more editorial visual rhythm for commerce, balancing conversion and brand atmosphere.",
        href: "https://example.com/lifestyle-commerce",
        meta: "E-commerce · 2022",
        cta: "View project",
      },
    ],
    playgroundProjects: [
      {
        title: "AI Bento Portfolio Lab",
        description: "A fast experiment in generating layout rhythm and homepage composition with AI workflows.",
        href: "https://example.com/ai-bento-lab",
        meta: "Vibe Coding · React",
        cta: "Open prototype",
      },
      {
        title: "Motion Prompt Playground",
        description: "A sandbox for translating design tone into executable motion systems and timing rules.",
        href: "https://example.com/motion-prompt-playground",
        meta: "Vibe Coding · Motion",
        cta: "Open prototype",
      },
    ],
    city: {
      name: "Shanghai",
      description:
        "I love the speed and density of this city, and I love finding moments of stillness inside it. A lot of my sensitivity to rhythm, texture, and interface comes from living here.",
      coordinates: "31.2304° N / 121.4737° E",
    },
    interests: ["City walks", "Exhibitions & spaces", "Product storytelling", "Photography", "AI tools", "Coffee & objects"],
    stack: ["Figma", "Stitch", "Claude", "Codex"],
    now: ["AI-native product experiences", "More restrained motion language", "Making design systems feel more human"],
    photos: lifePhotos,
    catPhotos,
    socialLinks: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/vicky-chang-926a38207/" },
      { label: "Medium", href: "https://medium.com/@vickychang_" },
      {
        label: "Threads",
        href: "https://www.threads.com/@cychangyy_?igshid=NTc4MTIwNjQ2YQ==",
      },
      { label: "Email", href: "mailto:yaya810411@gmail.com" },
    ],
    footerLinks: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/vicky-chang-926a38207/" },
      { label: "Medium", href: "https://medium.com/@vickychang_" },
      {
        label: "Threads",
        href: "https://www.threads.com/@cychangyy_?igshid=NTc4MTIwNjQ2YQ==",
      },
      { label: "Email", href: "mailto:yaya810411@gmail.com" },
    ],
    resume: {
      label: "Download resume",
      href: "https://drive.google.com/file/d/1RaxKxFtIkyEiY2ks0p7aifVsE6xAvTlg/view?usp=sharing",
    },
    contact: {
      title: "Let’s shape a more thoughtful product",
      description:
        "If you are looking for UX/UI design, design system support, or someone to explore the overlap between AI and product experience with, I would love to hear from you.",
      email: "yaya810411@gmail.com",
      cta: "Send email",
      mailSubject: "Let's talk about a design collaboration",
      mailBody:
        "Hi Vicky,\n\nI found your portfolio and would love to connect about a project.\n\n",
    },
  },
};
