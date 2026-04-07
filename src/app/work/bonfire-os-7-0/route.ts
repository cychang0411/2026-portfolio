import { serveWebflowPage } from "@/lib/webflow-page";

export const runtime = "nodejs";

export async function GET() {
  return serveWebflowPage("bonfire-os-7-0.html", [
    ['href="design-simppl.html"', 'href="/work/design-simppl"'],
    [
      'style="opacity:0" class="column-illustration bg-color case-two small cartify"',
      'style="opacity:1;background-image:url(\'/webflow/images/Simppl-case-cover.png\');background-size:cover;background-position:50% 50%;background-repeat:no-repeat" class="column-illustration bg-color case-two small cartify"',
    ],
  ]);
}
