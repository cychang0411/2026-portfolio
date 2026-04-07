import { serveWebflowPage } from "@/lib/webflow-page";

export const runtime = "nodejs";

export async function GET() {
  return serveWebflowPage("design-simppl.html", [
    ['href="design-cartify.html"', 'href="/work/design-cartify"'],
    [
      'style="opacity:0" class="column-illustration bg-color case-two small case-three"',
      'style="opacity:1;background-image:url(\'/webflow/images/Cartify-cover.png\');background-size:cover;background-position:50% 50%;background-repeat:no-repeat" class="column-illustration bg-color case-two small case-three"',
    ],
  ]);
}
