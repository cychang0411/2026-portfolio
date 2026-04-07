import { serveWebflowPage } from "@/lib/webflow-page";

export const runtime = "nodejs";

export async function GET() {
  return serveWebflowPage("design-cartify.html", [
    ['href="bonfire-os-7-0.html"', 'href="/work/bonfire-os-7-0"'],
    [
      'style="opacity:0" class="column-illustration bg-color case-two small bonfire"',
      'style="opacity:1;background-image:url(\'/webflow/images/Bonfire-OS7.0-cover_1.png\');background-size:cover;background-position:50% 50%;background-repeat:no-repeat" class="column-illustration bg-color case-two small bonfire"',
    ],
  ]);
}
