import { Link } from "@tanstack/react-router";
import type { Article } from "@/content/types";
import { formatDate, getCategory } from "@/lib/content";

export function ArticleCard({ article, eager }: { article: Article; eager?: boolean }) {
  const cat = getCategory(article.categorySlug);
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card">
      <Link to="/artigos/$slug" params={{ slug: article.slug }} className="block overflow-hidden" tabIndex={-1} aria-hidden>
        <img src={article.cover.src} alt="" width={article.cover.width} height={article.cover.height} loading={eager ? "eager" : "lazy"} className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          {article.type === "guia" ? "Guia de compra" : "Comparativo"} · {cat?.name}
        </p>
        <h3 className="text-xl font-semibold leading-snug">
          <Link to="/artigos/$slug" params={{ slug: article.slug }} className="hover:underline">{article.title}</Link>
        </h3>
        <p className="text-sm text-muted-foreground">{article.summary}</p>
        <p className="mt-auto pt-2 text-xs text-muted-foreground">Atualizado em {formatDate(article.updatedAt)}</p>
      </div>
    </article>
  );
}

export function TableOfContents({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav aria-label="Índice" className="rounded-xl border border-border bg-muted p-5">
      <p className="font-display text-lg font-semibold">Neste artigo</p>
      <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm">
        {items.map((i) => (
          <li key={i.id}><a href={`#${i.id}`} className="hover:underline">{i.label}</a></li>
        ))}
      </ol>
    </nav>
  );
}

export function FaqSection({ faq }: { faq: Article["faq"] }) {
  return (
    <div className="divide-y divide-border rounded-xl border border-border">
      {faq.map((f) => (
        <details key={f.question} className="group p-5">
          <summary className="cursor-pointer list-none font-medium marker:hidden">
            <span className="flex justify-between gap-4">{f.question}<span aria-hidden className="text-muted-foreground group-open:rotate-45 transition-transform">+</span></span>
          </summary>
          <p className="mt-3 text-muted-foreground">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function Pagination({ page, totalPages, to, params }: { page: number; totalPages: number; to: string; params?: Record<string, string> }) {
  if (totalPages <= 1) return null;
  return (
    <nav aria-label="Paginação" className="mt-10 flex items-center justify-center gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          to={to as never}
          params={params as never}
          search={{ pagina: n } as never}
          aria-current={n === page ? "page" : undefined}
          className={`grid size-10 place-items-center rounded-md border border-border text-sm ${n === page ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
        >
          {n}
        </Link>
      ))}
    </nav>
  );
}
