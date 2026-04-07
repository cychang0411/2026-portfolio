import { readFile } from "fs/promises";
import { join } from "path";

type Replacement = readonly [from: string, to: string];

const baseReplacements: Replacement[] = [
  ['href="css/', 'href="/webflow/css/'],
  ['src="js/', 'src="/webflow/js/'],
  ["images/", "/webflow/images/"],
];

const homeIslandStyles = `<style>
.portfolio-home-island {
  position: fixed;
  top: 18px;
  left: 50%;
  z-index: 9999;
  transform: translateX(-50%);
  opacity: 1;
  text-decoration: none;
  transition: transform 240ms ease, opacity 240ms ease;
}

.portfolio-home-island.is-hidden {
  transform: translate(-50%, -12px) scale(0.94);
  opacity: 0;
  pointer-events: none;
}

.portfolio-home-island__pill {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  min-height: 46px;
  padding: 6px 11px;
  border: 1px solid rgba(242, 84, 48, 0.22);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: none;
  backdrop-filter: blur(12px) saturate(145%);
  -webkit-backdrop-filter: blur(12px) saturate(145%);
  transition: transform 220ms ease, box-shadow 220ms ease, background-color 220ms ease, border-color 220ms ease;
}

.portfolio-home-island:hover .portfolio-home-island__pill,
.portfolio-home-island:focus-visible .portfolio-home-island__pill {
  transform: translateY(-1px) scale(1.015);
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(242, 84, 48, 0.32);
  box-shadow: none;
}

.portfolio-home-island:focus-visible {
  outline: none;
}

.portfolio-home-island__orb {
  display: inline-flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: rgba(242, 84, 48, 0.1);
  color: #f25430;
  flex: 0 0 auto;
}

.portfolio-home-island__label {
  display: flex;
  align-items: center;
  color: #f25430;
}

.portfolio-home-island__title {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.go-up-button,
.go-up-button.w--current {
  background-color: #ffffff !important;
  background-image: none !important;
  border: 1.5px solid #f25430 !important;
  color: #f25430 !important;
  opacity: 1 !important;
}

.go-up-button::before {
  content: "";
  display: block;
  width: 12px;
  height: 12px;
  border-top: 3px solid #f25430;
  border-left: 3px solid #f25430;
  transform: translateY(2px) rotate(45deg);
  box-sizing: border-box;
}

@media screen and (max-width: 767px) {
  .portfolio-home-island {
    top: auto;
    bottom: max(12px, env(safe-area-inset-bottom));
  }

  .portfolio-home-island.is-hidden {
    transform: translate(-50%, 12px) scale(0.94);
  }

  .portfolio-home-island__pill {
    min-height: 42px;
    padding: 5px 10px;
    gap: 8px;
  }

  .portfolio-home-island__title {
    font-size: 13px;
  }

  .portfolio-home-island__orb {
    width: 22px;
    height: 22px;
  }

  .go-up-button::before {
    width: 11px;
    height: 11px;
  }

  .work-hero.case-two {
    background-image: url('/webflow/images/Bonchat_Concentric_Cover-mobile.webp') !important;
  }

  .work-hero.case-three {
    background-image: url('/webflow/images/Simppl-mobile.webp') !important;
  }

  .work-hero.case-one {
    background-image: url('/webflow/images/Cartify-BG-mobile.webp') !important;
  }
}
</style>`;

const homeIslandMarkup = `<a href="/" aria-label="Back to Home" class="portfolio-home-island">
  <span class="portfolio-home-island__pill">
    <span class="portfolio-home-island__orb" aria-hidden="true">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 10.75L12 4L20 10.75V20H14.75V14.75H9.25V20H4V10.75Z" fill="currentColor"/>
      </svg>
    </span>
    <span class="portfolio-home-island__label">
      <span class="portfolio-home-island__title">Home</span>
    </span>
  </span>
</a>`;

export async function serveWebflowPage(
  fileName: string,
  extraReplacements: Replacement[] = [],
) {
  const filePath = join(process.cwd(), "src", "content", "webflow", fileName);
  let html = await readFile(filePath, "utf8");

  for (const [from, to] of [...baseReplacements, ...extraReplacements]) {
    html = html.replaceAll(from, to);
  }

  html = html
    .replaceAll('<link href="https://fonts.googleapis.com" rel="preconnect">', "")
    .replaceAll(
      '<link href="https://fonts.gstatic.com" rel="preconnect" crossorigin="anonymous">',
      "",
    )
    .replaceAll(
      '<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" type="text/javascript"></script>',
      "",
    )
    .replaceAll(
      '<script type="text/javascript">WebFont.load({  google: {    families: ["Montserrat:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic"]  }});</script>',
      "",
    );

  html = html.replace("</head>", `${homeIslandStyles}</head>`);
  html = html.replace("<body", '<body id="page-top"');
  html = html.replace('<div class="content">', `${homeIslandMarkup}<div class="content">`);
  html = html.replaceAll('href="#" id="Top2"', 'href="#page-top" id="Top2"');
  html = html.replace(
    "</body>",
    `<script>
document.addEventListener("DOMContentLoaded", function () {
  var backToTopButtons = document.querySelectorAll("#Top2");
  var homeIsland = document.querySelector(".portfolio-home-island");
  var lastScrollY = window.scrollY;

  backToTopButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  window.addEventListener(
    "scroll",
    function () {
      if (!homeIsland) {
        return;
      }

      var currentScrollY = window.scrollY;
      var scrollingDown = currentScrollY > lastScrollY;
      var shouldHide = scrollingDown && currentScrollY > 96;

      homeIsland.classList.toggle("is-hidden", shouldHide);
      lastScrollY = currentScrollY;
    },
    { passive: true },
  );
});
</script></body>`,
  );

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}
