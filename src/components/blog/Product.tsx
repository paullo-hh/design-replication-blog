import { Link } from "@tanstack/react-router";
import { Check, ExternalLink, Info, X } from "lucide-react";
import { siteConfig } from "@/content/site.config";
import type { Product } from "@/content/types";
import { formatDate, getProductLinks } from "@/lib/content";

export function AffiliateDisclosure({ compact }: { compact?: boolean }) {
  return (
    <p className={`flex gap-2 rounded-md border border-border bg-muted p-3 text-xs text-muted-foreground ${compact ? "" : "sm:text-sm"}`}>
      <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
      <span>
        {siteConfig.affiliate.shortDisclosure}{" "}
        <Link to="/aviso-de-afiliados" className="underline underline-offset-2">Saiba mais</Link>.
      </span>
    </p>
  );
}

export function AffiliateButtons({ product }: { product: Product }) {
  const links = getProductLinks(product);
  if (!links.length)
    return <p className="text-sm text-muted-foreground">Nenhuma loja cadastrada para este produto ainda.</p>;
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {links.map((l) => (
          <a
            key={l.marketplace + l.url}
            href={l.url}
            target="_blank"
            rel="sponsored nofollow noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            {l.label ?? siteConfig.marketplaces[l.marketplace].label}
            <ExternalLink className="size-3.5" aria-hidden />
            <span className="sr-only">(abre em nova aba)</span>
          </a>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">Preços e disponibilidade podem mudar. Confira na loja.</p>
    </div>
  );
}

export function PriceInfo({ product }: { product: Product }) {
  if (!product.price) return <p className="text-sm text-muted-foreground">Preço não informado — consulte a loja.</p>;
  return (
    <p className="text-sm">
      <span className="font-semibold">{product.price.text}</span>{" "}
      <span className="text-muted-foreground">(verificado em {formatDate(product.price.checkedAt)})</span>
    </p>
  );
}

export function ExampleBadge({ product }: { product: Product }) {
  if (!product.isExample) return null;
  return (
    <span className="inline-block rounded bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
      Exemplo fictício
    </span>
  );
}

export function ProsCons({ product }: { product: Product }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <p className="text-sm font-semibold">Pontos positivos</p>
        <ul className="mt-2 space-y-1.5 text-sm">
          {product.pros.map((p) => (
            <li key={p} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />{p}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-sm font-semibold">Limitações</p>
        <ul className="mt-2 space-y-1.5 text-sm">
          {product.cons.map((p) => (
            <li key={p} className="flex gap-2"><X className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden />{p}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ProductCard({ product, rank, highlight, analysis }: { product: Product; rank?: number; highlight?: string | undefined; analysis?: string[] }) {
  return (
    <article id={`produto-${rank ?? product.slug}`} className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="relative bg-muted">
          {product.image ? (
            <img src={product.image.src} alt={product.image.alt} width={1200} height={912} loading="lazy" className="aspect-[4/3] h-full w-full object-cover" />
          ) : (
            <div className="grid aspect-[4/3] place-items-center text-sm text-muted-foreground">Imagem pendente</div>
          )}
          {rank && (
            <span className="absolute left-3 top-3 grid size-10 place-items-center rounded-full bg-foreground font-display text-lg font-semibold text-background">
              {rank}
            </span>
          )}
        </div>
        <div className="space-y-4 p-5 md:p-6">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              {highlight && <span className="text-xs font-semibold uppercase tracking-wide text-primary">{highlight}</span>}
              <ExampleBadge product={product} />
            </div>
            <h3 className="text-2xl font-semibold">
              <Link to="/produtos/$slug" params={{ slug: product.slug }} className="hover:underline">{product.name}</Link>
            </h3>
            <p className="text-sm text-muted-foreground">{product.brand}</p>
          </div>
          <p className="text-sm">{product.shortDescription}</p>
          {analysis?.map((a) => <p key={a} className="text-sm text-muted-foreground">{a}</p>)}
          <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm sm:grid-cols-3">
            {product.specs.slice(0, 6).map((s) => (
              <div key={s.label}><dt className="text-muted-foreground">{s.label}</dt><dd className="font-medium">{s.value}</dd></div>
            ))}
          </dl>
          <ProsCons product={product} />
          <p className="text-sm"><span className="font-semibold">Indicado para: </span>{product.idealFor}</p>
          <PriceInfo product={product} />
          <AffiliateButtons product={product} />
        </div>
      </div>
    </article>
  );
}

export function ComparisonTable({ rows, specs }: { rows: Product[]; specs: string[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[640px] text-left text-sm">
        <caption className="sr-only">Comparativo resumido dos produtos</caption>
        <thead className="bg-muted">
          <tr>
            <th scope="col" className="p-3">#</th>
            <th scope="col" className="p-3">Produto</th>
            {specs.map((s) => <th key={s} scope="col" className="p-3">{s}</th>)}
            <th scope="col" className="p-3">Indicado para</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p, i) => (
            <tr key={p.id} className="border-t border-border align-top">
              <td className="p-3 font-semibold">{i + 1}</td>
              <th scope="row" className="p-3 font-medium">
                <a href={`#produto-${i + 1}`} className="hover:underline">{p.name}</a>
              </th>
              {specs.map((s) => <td key={s} className="p-3">{p.specs.find((x) => x.label === s)?.value ?? "—"}</td>)}
              <td className="p-3 text-muted-foreground">{p.idealFor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
