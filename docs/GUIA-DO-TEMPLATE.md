# Guia do template de blog de comparativos

## Onde editar cada coisa

| O quê | Arquivo |
|---|---|
| Nome, slogan, cores, menu, contato, avisos de afiliado, rótulos dos botões | `src/content/site.config.ts` |
| Categorias | `src/content/categories.ts` |
| Produtos (descrição, especificações, prós/contras, preço verificado) | `src/content/products.ts` |
| Links de afiliados (por produto e marketplace) | `src/content/affiliate-links.ts` |
| Artigos (comparativos e guias) | `src/content/articles.ts` |
| Sobre, privacidade, cookies, termos, aviso de afiliados | `src/content/institutional.tsx` |
| Imagens | `src/assets/` (importe no arquivo de conteúdo) |
| Favicon | `public/` + campo `favicon` no config |

## Como cadastrar um artigo com 10 produtos

1. **Produtos** — em `products.ts`, adicione 10 objetos `Product`:
```ts
{
  id: "furadeira-x200", slug: "furadeira-x200", name: "Furadeira X200", brand: "Marca",
  categorySlug: "ferramentas",
  shortDescription: "…", longDescription: ["…"],
  image: { src: imgX200, alt: "Furadeira X200 vista lateral" },
  specs: [{ label: "Potência", value: "650 W" }],
  pros: ["…"], cons: ["…"], idealFor: "…",
  price: { text: "R$ 299,90", checkedAt: "2026-10-11" }, // ou null
  status: "publicado",
}
```
2. **Links** — em `affiliate-links.ts`:
```ts
"furadeira-x200": [
  { marketplace: "mercadolivre", url: "https://mercadolivre.com/sec/SEU_LINK" },
  { marketplace: "amazon", url: "https://amzn.to/SEU_LINK" },
  { marketplace: "shopee", url: "https://s.shopee.com.br/SEU_LINK" },
],
```
   URLs vazias ou que não começam com `https://` não geram botão.
3. **Artigo** — em `articles.ts`, adicione um `Article` com `items: [{ productId: "furadeira-x200", highlight: "Melhor custo-benefício", analysis: ["…"] }, …]`. A ordem do array é o ranking. `comparisonSpecs` define as colunas da tabela (use os mesmos `label` das specs).
4. Use `status: "rascunho"` para esconder algo do site.

## Regras editoriais

- Não invente preços, notas, avaliações, número de vendas nem testes.
- Produtos com `isExample: true` exibem o selo "Exemplo fictício" — remova ao trocar por produtos reais.
- Atualize `updatedAt` sempre que revisar um artigo.

## Testar

- Abra a pré-visualização e percorra: início → categoria → artigo → produto → páginas institucionais.
- `bunx vitest run` roda os testes de regras (links válidos, rascunhos, paginação).

## Publicar

1. Publique pelo botão Publish.
2. Preencha `siteUrl` em `site.config.ts` com o domínio final (gera canonical absoluta).
3. Envie `https://seudominio/sitemap.xml` ao Google Search Console.

## Criar a próxima cópia do blog

1. Duplique o projeto no Lovable (Remix).
2. Edite `site.config.ts` (nome, cores, contato, avisos).
3. Troque categorias, produtos, links e artigos em `src/content/`.
4. Substitua as imagens em `src/assets/` e o favicon.
5. Revise os textos institucionais e publique.
