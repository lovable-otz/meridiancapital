import { INDEXABLE, SITE_URL } from "./site-config";

export function buildRobotsTxt(): string {
  if (!INDEXABLE) {
    return "User-agent: *\nDisallow: /\n";
  }

  const lines = [
    "User-agent: *",
    "Allow: /",
    "Content-Signal: search=yes, ai-input=yes, ai-train=no",
    "",
    "User-agent: Googlebot",
    "Allow: /",
    "",
    "User-agent: Bingbot",
    "Allow: /",
    "",
    "User-agent: OAI-SearchBot",
    "Allow: /",
    "",
    "User-agent: PerplexityBot",
    "Allow: /",
    "",
    "User-agent: Claude-SearchBot",
    "Allow: /",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ];
  return lines.join("\n");
}

export function robotsTxtResponse(): Response {
  return new Response(buildRobotsTxt(), {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
