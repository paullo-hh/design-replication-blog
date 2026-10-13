import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/blog/Layout";
import {
  AffiliateButtons,
  AffiliateDisclosure,
  ExampleBadge,
  PriceInfo,
  ProsCons,
} from "@/components/blog/Product";
import type { Product } from "@/content/types";
import { articlesWithProduct, getCategory, getProduct } from "@/lib/content";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/produtos/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData)
      return {
        meta: [{ title: "Produto não encontrado" }, { name: "robots", content: "noindex" }],
      };
    const p = loaderData.product;
    const path = `/produtos/${params.slug}`;
    const cat = getCategory(p.categorySlug);
    return pageHead({
      title: p.name,
      description: p.shortDescription,
      path,
      jsonLd: [
        breadcrumbLd([
          { name: "Início", path: "/" },
          ...(cat ? [{ name: cat.name, path: `/categorias/${cat.slug}` }] : []),
          { name: p.name, path },
        ]),
      ],
    });
  },
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const cat = getCategory(p.categorySlug);
  const alternatives = (p.alternatives ?? [])
    .map((id) => getProduct(id))
    .filter((x): x is Product => !!x);
  const inArticles = articlesWithProduct(p.id);

  return (
    <div className="container-page max-w-5xl py-12">
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
          { label: p.name },
        ]}
      />
      <div className="mt-8 grid gap-10 md:grid-cols-2">
        {p.image ? (
          <img
            src={p.image.src}
            alt={p.image.alt}
            width={1200}
            height={912}
            className="aspect-[4/3] w-full rounded-xl bg-muted object-cover"
          />
        ) : (
          <div className="grid aspect-[4/3] place-items-center rounded-xl bg-muted text-muted-foreground">
            Imagem pendente
          </div>
        )}
        <div className="space-y-5">
          <ExampleBadge product={p} />
          <h1 className="text-4xl font-semibold leading-tight">{p.name}</h1>
          <p className="text-muted-foreground">{p.brand}</p>
          <p className="text-lg">{p.shortDescription}</p>
          <PriceInfo product={p} />
          <AffiliateButtons product={p} />
          <AffiliateDisclosure compact />
        </div>
      </div>

      <section className="prose-editorial mt-14 max-w-3xl">
        <h2 className="text-3xl font-semibold">Descrição</h2>
        <div className="mt-4">
          {p.longDescription.map((d) => (
            <p key={d}>{d}</p>
          ))}
        </div>
        {p.editorialNotes && (
          <p className="mt-4 text-sm text-muted-foreground">Nota editorial: {p.editorialNotes}</p>
        )}
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold">Especificações</h2>
        <dl className="mt-6 divide-y divide-border rounded-xl border border-border">
          {p.specs.map((s) => (
            <div key={s.label} className="grid grid-cols-2 gap-4 p-4 text-sm">
              <dt className="text-muted-foreground">{s.label}</dt>
              <dd className="font-medium">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold">Pontos positivos e limitações</h2>
        <div className="mt-6">
          <ProsCons product={p} />
        </div>
        <p className="mt-6">
          <span className="font-semibold">Perfil indicado: </span>
          {p.idealFor}
        </p>
      </section>

      {alternatives.length > 0 && (
        <section className="mt-12">
          <h2 className="text-3xl font-semibold">Alternativas relacionadas</h2>
          <div className="mt-6 overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-muted">
                <tr>
                  <th scope="col" className="p-3">
                    Produto
                  </th>
                  {p.specs.slice(0, 4).map((s) => (
                    <th key={s.label} scope="col" className="p-3">
                      {s.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[p, ...alternatives].map((x) => (
                  <tr key={x.id} className="border-t border-border">
                    <th scope="row" className="p-3 font-medium">
                      {x.id === p.id ? (
                        x.name
                      ) : (
                        <Link
                          to="/produtos/$slug"
                          params={{ slug: x.slug }}
                          className="hover:underline"
                        >
                          {x.name}
                        </Link>
                      )}
                    </th>
                    {p.specs.slice(0, 4).map((s) => (
                      <td key={s.label} className="p-3">
                        {x.specs.find((y) => y.label === s.label)?.value ?? "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {inArticles.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Aparece nos comparativos</h2>
          <ul className="mt-4 space-y-2">
            {inArticles.map((a) => (
              <li key={a.id}>
                <Link
                  to="/artigos/$slug"
                  params={{ slug: a.slug }}
                  className="text-primary hover:underline"
                >
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
