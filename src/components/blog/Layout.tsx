import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { siteConfig } from "@/content/site.config";
import { getCategories } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-2.5"
          aria-label={`${siteConfig.name} — início`}
        >
          <span className="grid size-9 place-items-center rounded-md bg-primary font-display text-sm font-bold text-primary-foreground">
            {siteConfig.logoText}
          </span>
          <span className="font-display text-xl font-semibold">{siteConfig.name}</span>
        </Link>
        <nav aria-label="Principal" className="flex gap-1 overflow-x-auto text-sm">
          {siteConfig.nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="whitespace-nowrap rounded-md px-3 py-2 text-muted-foreground hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const statements = Object.values(siteConfig.affiliate.programStatements).filter(Boolean);
  return (
    <footer className="mt-24 border-t border-border bg-muted">
      <div className="container-page grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-xl font-semibold">{siteConfig.name}</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">{siteConfig.tagline}</p>
          <p className="mt-4 text-xs text-muted-foreground">
            {siteConfig.affiliate.shortDisclosure}
          </p>
          {statements.map((s) => (
            <p key={s} className="mt-1 text-xs text-muted-foreground">
              {s}
            </p>
          ))}
        </div>
        <div>
          <p className="text-sm font-semibold">Categorias</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {getCategories().map((c) => (
              <li key={c.slug}>
                <Link
                  to="/categorias/$slug"
                  params={{ slug: c.slug }}
                  className="hover:text-foreground"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Institucional</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/sobre" className="hover:text-foreground">
                Sobre
              </Link>
            </li>
            <li>
              <Link to="/contato" className="hover:text-foreground">
                Contato
              </Link>
            </li>
            <li>
              <Link to="/aviso-de-afiliados" className="hover:text-foreground">
                Aviso de afiliados
              </Link>
            </li>
            <li>
              <Link to="/privacidade" className="hover:text-foreground">
                Privacidade
              </Link>
            </li>
            <li>
              <Link to="/cookies" className="hover:text-foreground">
                Cookies
              </Link>
            </li>
            <li>
              <Link to="/termos" className="hover:text-foreground">
                Termos de uso
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {siteConfig.name}. Preços e disponibilidade podem mudar sem
        aviso.
      </div>
    </footer>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: ReactNode }[] }) {
  return (
    <nav aria-label="Trilha de navegação" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden>/</span>}
            {it.to ?? (
              <span aria-current="page" className="text-foreground">
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function StaticPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="container-page max-w-3xl py-14">
      <h1 className="text-4xl font-semibold md:text-5xl">{title}</h1>
      <div className="prose-editorial mt-8 space-y-4 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold">
        {children}
      </div>
    </div>
  );
}
