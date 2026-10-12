import { siteConfig } from "@/content/site.config";

export const absUrl = (path: string) => (siteConfig.siteUrl ? siteConfig.siteUrl + path : path);

export function pageHead(opts: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  canonical?: string | undefined;
  jsonLd?: object[];
}) {
  const title = opts.title.includes(siteConfig.name) ? opts.title : `${opts.title} | ${siteConfig.name}`;
  const url = opts.canonical ?? absUrl(opts.path);
  return {
    meta: [
      { title },
      { name: "description", content: opts.description },
      { property: "og:title", content: title },
      { property: "og:description", content: opts.description },
      { property: "og:type", content: opts.type ?? "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: (opts.jsonLd ?? []).map((d) => ({ type: "application/ld+json", children: JSON.stringify(d) })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absUrl(it.path) })),
  };
}
