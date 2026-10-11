import { createFileRoute } from "@tanstack/react-router";
import { ArticleCard, Pagination } from "@/components/blog/Article";
import { paginate, publishedArticles } from "@/lib/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/artigos/")({
  validateSearch: (s: Record<string, unknown>) => ({ pagina: Number(s.pagina) > 1 ? Number(s.pagina) : undefined }),
  head: () => pageHead({ title: "Todos os comparativos e guias", description: "Lista completa de comparativos de produtos e guias de compra publicados.", path: "/artigos" }),
  component: ArticlesPage,
});

function ArticlesPage() {
  const { pagina } = Route.useSearch();
  const { items, page, totalPages } = paginate(publishedArticles(), pagina ?? 1);
  return (
    <div className="container-page py-14">
      <h1 className="text-4xl font-semibold md:text-5xl">Comparativos e guias</h1>
      {items.length ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map((a) => <ArticleCard key={a.id} article={a} />)}</div>
      ) : (
        <p className="mt-8 text-muted-foreground">Nenhum artigo publicado ainda.</p>
      )}
      <Pagination page={page} totalPages={totalPages} to="/artigos" />
    </div>
  );
}
