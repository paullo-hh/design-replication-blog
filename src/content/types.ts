/**
 * Tipos do conteúdo do blog. Os dados ficam em src/content/*.ts e
 * são independentes dos componentes visuais.
 */

export type PublishStatus = "rascunho" | "publicado";

export type MarketplaceId = "mercadolivre" | "amazon" | "shopee" | "magalu" | "outro";

export interface AffiliateLink {
  marketplace: MarketplaceId;
  /** URL completa (https). Deixe "" enquanto não tiver o link — o botão não aparece. */
  url: string;
  /** Rótulo opcional; por padrão usa o rótulo do marketplace em site.config.ts */
  label?: string;
}

export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  categorySlug: string;
  shortDescription: string;
  longDescription: string[];
  image?: { src: string; alt: string };
  specs: Spec[];
  pros: string[];
  cons: string[];
  idealFor: string;
  editorialNotes?: string;
  /** Preço só quando verificado. checkedAt no formato AAAA-MM-DD. */
  price?: { text: string; checkedAt: string } | null;
  status: PublishStatus;
  /** true = produto fictício de demonstração (mostra um aviso). */
  isExample?: boolean;
  /** IDs de produtos alternativos para comparação na página do produto. */
  alternatives?: string[];
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  seoTitle?: string;
}

export interface ArticleItem {
  productId: string;
  /** Ex.: "Melhor custo-benefício" */
  highlight?: string | undefined;
  analysis: string[];
}

export interface Article {
  id: string;
  slug: string;
  type: "comparativo" | "guia";
  title: string;
  subtitle: string;
  summary: string;
  intro: string[];
  categorySlug: string;
  cover: { src: string; alt: string; width: number; height: number };
  /** Ordem editorial: a posição no array define o ranking. */
  items: ArticleItem[];
  /** Resumo "melhor para cada necessidade" */
  picks: { label: string; productId: string }[];
  criteria: string[];
  methodology: string[];
  buyingGuide: { heading: string; paragraphs: string[] }[];
  faq: { question: string; answer: string }[];
  conclusion: string[];
  /** Colunas da tabela comparativa (rótulos das especificações). */
  comparisonSpecs: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
  status: PublishStatus;
  featured?: boolean;
  seo: { title: string; description: string; canonical?: string };
}
