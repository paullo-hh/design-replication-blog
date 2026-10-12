import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArticleCard, Pagination } from "@/components/blog/Article";
import { Breadcrumbs } from "@/components/blog/Layout";
import { articlesInCategory, getCategory, paginate } from "@/lib/content";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/categorias/$slug")({
  validateSearch: (s: Record<string, unknown>): { pagina?: number } => (Number(s["pagina"]) > 1 ? { pagina: Number(s["pagina"]) } : {}),
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Categoria não encontrada" }, { name: "robots", content: "noindex" }] };
    const c = loaderData.category;
    const path = `/categorias/${params.slug}`;
    return pageHead({
      title: c.seoTitle ?? c.name,
      description: c.description,
      path,
      jsonLd: [breadcrumbLd([{ name: "Início", path: "/" }, { name: c.name, path }])],
    });
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const { pagina } = Route.useSearch();
  const { items, page, totalPages } = paginate(articlesInCategory(category.slug), pagina ?? 1);
  return (
    <div className="container-page py-12">
      <Breadcrumbs items={[{ label: "Início", to: <Link to="/" className="hover:text-foreground">Início</Link> }, { label: category.name }]} />
      <h1 className="mt-4 text-4xl font-semibold md:text-5xl">{category.name}</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{category.description}</p>
      {items.length ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map((a) => <ArticleCard key={a.id} article={a} />)}</div>
      ) : (
        <p className="mt-10 text-muted-foreground">Ainda não há artigos nesta categoria.</p>
      )}
      <Pagination page={page} totalPages={totalPages} to="/categorias/$slug" params={{ slug: category.slug }} />
    </div>
  );
}
