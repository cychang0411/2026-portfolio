import { readFile } from "fs/promises";
import { join } from "path";

type Replacement = readonly [from: string, to: string];

const baseReplacements: Replacement[] = [
  ['href="css/', 'href="/webflow/css/'],
  ['src="js/', 'src="/webflow/js/'],
  ["images/", "/webflow/images/"],
];

export async function serveWebflowPage(
  fileName: string,
  extraReplacements: Replacement[] = [],
) {
  const filePath = join(process.cwd(), "src", "content", "webflow", fileName);
  let html = await readFile(filePath, "utf8");

  for (const [from, to] of [...baseReplacements, ...extraReplacements]) {
    html = html.replaceAll(from, to);
  }

  html = html.replace("<body", '<body id="page-top"');
  html = html.replaceAll('href="#" id="Top2"', 'href="#page-top" id="Top2"');
  html = html.replace(
    "</body>",
    `<script>
document.addEventListener("DOMContentLoaded", function () {
  var backToTopButtons = document.querySelectorAll("#Top2");

  backToTopButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
});
</script></body>`,
  );

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}
