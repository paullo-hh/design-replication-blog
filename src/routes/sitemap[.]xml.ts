import { createFileRoute } from "@tanstack/react-router";
import { getCategories, publishedArticles, publishedProducts } from "@/lib/content";
import { siteConfig } from "@/content/site.config";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const base = siteConfig.siteUrl || new URL(request.url).origin;
        const fixed = [
          "/",
          "/artigos",
          "/sobre",
          "/contato",
          "/aviso-de-afiliados",
          "/privacidade",
          "/cookies",
          "/termos",
        ].map((p) => ({ p }));
        const urls = [
          ...fixed,
          ...getCategories().map((c) => ({ p: `/categorias/${c.slug}` })),
          ...publishedArticles().map((a) => ({ p: `/artigos/${a.slug}`, d: a.updatedAt })),
          ...publishedProducts().map((x) => ({ p: `/produtos/${x.slug}` })),
        ] as { p: string; d?: string }[];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls
          .map(
            (u) => `<url><loc>${base}${u.p}</loc>${u.d ? `<lastmod>${u.d}</lastmod>` : ""}</url>`,
          )
          .join("")}</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
      },
    },
  },
});
