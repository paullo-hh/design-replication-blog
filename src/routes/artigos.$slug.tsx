import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArticleCard, FaqSection, TableOfContents } from "@/components/blog/Article";
import { Breadcrumbs } from "@/components/blog/Layout";
import { AffiliateDisclosure, ComparisonTable, ProductCard } from "@/components/blog/Product";
import type { Product } from "@/content/types";
import { formatDate, getArticle, getCategory, getProduct, publishedArticles } from "@/lib/content";
import { absUrl, breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/artigos/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData)
      return { meta: [{ title: "Artigo não encontrado" }, { name: "robots", content: "noindex" }] };
    const a = loaderData.article;
    const path = `/artigos/${params.slug}`;
    const cat = getCategory(a.categorySlug);
    return pageHead({
      title: a.seo.title,
      description: a.seo.description,
      path,
      type: "article",
      canonical: a.seo.canonical,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.seo.description,
          datePublished: a.createdAt,
          dateModified: a.updatedAt,
          author: { "@type": "Organization", name: a.author },
          mainEntityOfPage: absUrl(path),
        },
        breadcrumbLd([
          { name: "Início", path: "/" },
          ...(cat ? [{ name: cat.name, path: `/categorias/${cat.slug}` }] : []),
          { name: a.title, path },
        ]),
      ],
    });
  },
  component: ArticlePage,
});

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-14 text-3xl font-semibold">
      {children}
    </h2>
  );
}

function ArticlePage() {
  const { article: a } = Route.useLoaderData();
  const cat = getCategory(a.categorySlug);
  const items = a.items
    .map((i) => ({ ...i, product: getProduct(i.productId) }))
    .filter((i): i is typeof i & { product: Product } => !!i.product);
  const hasProducts = items.length > 0;
  const related = publishedArticles()
    .filter((x) => x.id !== a.id && x.categorySlug === a.categorySlug)
    .slice(0, 3);

  const toc = [
    { id: "introducao", label: "Introdução" },
    a.criteria.length && { id: "criterios", label: "Critérios de seleção" },
    a.picks.length && { id: "resumo", label: "Resumo: melhor para cada necessidade" },
    hasProducts && { id: "produtos", label: "Lista de produtos" },
    hasProducts && a.comparisonSpecs.length && { id: "comparativo", label: "Comparativo resumido" },
    a.buyingGuide.length && { id: "como-escolher", label: "Como escolher" },
    a.faq.length && { id: "faq", label: "Perguntas frequentes" },
    { id: "conclusao", label: "Conclusão" },
  ].filter(Boolean) as { id: string; label: string }[];

  return (
    <article className="container-page max-w-4xl py-12">
      <Breadcrumbs
        items={[
          {
            label: "Início",
            to: (
              <Link to="/" className="hover:text-foreground">
                Início
              </Link>
            ),
          },
          ...(cat
            ? [
                {
                  label: cat.name,
                  to: (
                    <Link
                      to="/categorias/$slug"
                      params={{ slug: cat.slug }}
                      className="hover:text-foreground"
                    >
                      {cat.name}
                    </Link>
                  ),
                },
              ]
            : []),
          { label: a.title },
        ]}
      />
      <header className="mt-6">
        <h1 className="text-4xl font-semibold leading-tight md:text-5xl">{a.title}</h1>
        <p className="mt-4 text-xl text-muted-foreground">{a.subtitle}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          Por {a.author} · Publicado em {formatDate(a.createdAt)} · Atualizado em{" "}
          {formatDate(a.updatedAt)}
        </p>
      </header>
      <img
        src={a.cover.src}
        alt={a.cover.alt}
        width={a.cover.width}
        height={a.cover.height}
        className="mt-8 aspect-[16/9] w-full rounded-xl object-cover"
      />
      {hasProducts && (
        <div className="mt-6">
          <AffiliateDisclosure />
        </div>
      )}
      <div className="mt-8">
        <TableOfContents items={toc} />
      </div>

      <section className="prose-editorial">
        <H2 id="introducao">Introdução</H2>
        <div className="mt-4">
          {a.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      {a.criteria.length > 0 && (
        <section className="prose-editorial">
          <H2 id="criterios">Critérios de seleção</H2>
          <ul className="mt-4 list-disc space-y-1 pl-6">
            {a.criteria.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          {a.methodology.length > 0 && (
            <>
              <h3 className="mt-6 text-xl font-semibold">Metodologia</h3>
              <div className="mt-2">
                {a.methodology.map((m) => (
                  <p key={m}>{m}</p>
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {a.picks.length > 0 && (
        <section>
          <H2 id="resumo">Resumo: melhor para cada necessidade</H2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {a.picks.map((pk) => {
              const idx = items.findIndex((i) => i.productId === pk.productId);
              const p = items[idx]?.product;
              if (!p) return null;
              return (
                <li key={pk.label} className="rounded-lg border border-border p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {pk.label}
                  </p>
                  <a
                    href={`#produto-${idx + 1}`}
                    className="mt-1 block font-medium hover:underline"
                  >
                    {idx + 1}. {p.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {hasProducts && (
        <section>
          <H2 id="produtos">Lista de produtos</H2>
          <div className="mt-6 space-y-8">
            {items.map((i, idx) => (
              <ProductCard
                key={i.productId}
                product={i.product}
                rank={idx + 1}
                highlight={i.highlight}
                analysis={i.analysis}
              />
            ))}
          </div>
        </section>
      )}

      {hasProducts && a.comparisonSpecs.length > 0 && (
        <section>
          <H2 id="comparativo">Comparativo resumido</H2>
          <div className="mt-6">
            <ComparisonTable rows={items.map((i) => i.product)} specs={a.comparisonSpecs} />
          </div>
        </section>
      )}

      {a.buyingGuide.length > 0 && (
        <section className="prose-editorial">
          <H2 id="como-escolher">Como escolher</H2>
          {a.buyingGuide.map((g) => (
            <div key={g.heading}>
              <h3 className="mt-6 text-xl font-semibold">{g.heading}</h3>
              <div className="mt-2">
                {g.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {a.faq.length > 0 && (
        <section>
          <H2 id="faq">Perguntas frequentes</H2>
          <div className="mt-6">
            <FaqSection faq={a.faq} />
          </div>
        </section>
      )}

      <section className="prose-editorial">
        <H2 id="conclusao">Conclusão</H2>
        <div className="mt-4">
          {a.conclusion.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <footer className="mt-12 space-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
        <p>Última atualização: {formatDate(a.updatedAt)}.</p>
        {hasProducts && <AffiliateDisclosure compact />}
      </footer>

      {related.length > 0 && (
        <aside className="mt-16">
          <h2 className="text-2xl font-semibold">Leia também</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ArticleCard key={r.id} article={r} />
            ))}
          </div>
        </aside>
      )}
    </article>
  );
}
