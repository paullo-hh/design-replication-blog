import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleCard } from "@/components/blog/Article";
import { siteConfig } from "@/content/site.config";
import { articlesInCategory, getCategories, publishedArticles } from "@/lib/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: `${siteConfig.name} — ${siteConfig.tagline}`,
      description: siteConfig.description,
      path: "/",
    }),
  component: Home,
});

function Home() {
  const all = publishedArticles();
  const featured = all.find((a) => a.featured) ?? all[0];
  const comparisons = all
    .filter((a) => a.type === "comparativo" && a.id !== featured?.id)
    .slice(0, 6);
  const guides = all.filter((a) => a.type === "guia").slice(0, 3);

  return (
    <>
      <section className="border-b border-border">
        <div className="container-page grid gap-10 py-14 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              {siteConfig.tagline}
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              {siteConfig.name}
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">{siteConfig.description}</p>
          </div>
          {featured && (
            <Link to="/artigos/$slug" params={{ slug: featured.slug }} className="group block">
              <img
                src={featured.cover.src}
                alt={featured.cover.alt}
                width={featured.cover.width}
                height={featured.cover.height}
                className="aspect-[16/10] w-full rounded-xl object-cover"
              />
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-primary">
                Em destaque
              </p>
              <h2 className="mt-1 text-2xl font-semibold group-hover:underline">
                {featured.title}
              </h2>
              <p className="mt-1 text-muted-foreground">{featured.summary}</p>
            </Link>
          )}
        </div>
      </section>

      <section className="container-page py-14">
        <h2 className="text-3xl font-semibold">Categorias</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {getCategories().map((c) => (
            <li key={c.slug}>
              <Link
                to="/categorias/$slug"
                params={{ slug: c.slug }}
                className="block h-full rounded-xl border border-border p-5 hover:bg-muted"
              >
                <p className="font-display text-xl font-semibold">{c.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {articlesInCategory(c.slug).length} artigo(s)
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page py-6">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-semibold">Últimos comparativos</h2>
          <Link to="/artigos" className="text-sm text-primary hover:underline">
            Ver todos
          </Link>
        </div>
        {comparisons.length ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {comparisons.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-muted-foreground">Novos comparativos em breve.</p>
        )}
      </section>

      <section className="container-page py-14">
        <h2 className="text-3xl font-semibold">Guias de compra</h2>
        {guides.length ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-muted-foreground">Novos guias em breve.</p>
        )}
      </section>
    </>
  );
}
