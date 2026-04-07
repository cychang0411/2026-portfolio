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

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}
