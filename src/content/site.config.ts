/**
 * CONFIGURAÇÃO CENTRAL DO BLOG
 * Altere aqui nome, cores, navegação, contato, SEO e avisos de afiliados.
 * Nenhum componente deve ter esses textos "fixos".
 */
import type { MarketplaceId } from "./types";

export const siteConfig = {
  name: "Escolha Certa",
  tagline: "Comparativos honestos para comprar melhor",
  description:
    "Guias de compra e comparativos de produtos com critérios claros, para ajudar você a escolher sem pressa e sem exageros.",
  /** Domínio público, sem barra no final. Deixe "" até publicar. */
  siteUrl: "",
  locale: "pt-BR",
  logoText: "EC", // monograma exibido no cabeçalho
  favicon: "/favicon.ico",

  /** Cores em oklch. Elas sobrescrevem os padrões de src/styles.css. */
  theme: {
    background: "oklch(0.985 0.008 85)",
    foreground: "oklch(0.22 0.02 60)",
    primary: "oklch(0.42 0.09 160)",
    primaryForeground: "oklch(0.98 0.01 85)",
    accent: "oklch(0.78 0.13 75)",
    accentForeground: "oklch(0.25 0.04 60)",
    muted: "oklch(0.95 0.012 85)",
    mutedForeground: "oklch(0.48 0.02 60)",
    border: "oklch(0.89 0.015 80)",
  },

  nav: [
    { label: "Início", to: "/" },
    { label: "Comparativos", to: "/artigos" },
    { label: "Sobre", to: "/sobre" },
    { label: "Contato", to: "/contato" },
  ] as const,

  contact: {
    email: "contato@seudominio.com.br", // SUBSTITUA
    responsible: "Equipe editorial Escolha Certa",
  },

  author: "Equipe editorial Escolha Certa",

  affiliate: {
    /** Aviso curto exibido perto dos botões de compra. */
    shortDisclosure:
      "Alguns links desta página são de afiliados: podemos receber uma comissão por compras qualificadas, sem custo adicional para você.",
    /** Declarações específicas dos programas que você usa. Deixe "" para ocultar. */
    programStatements: {
      amazon: "Como associado da Amazon, eu ganho com compras qualificadas.",
      mercadolivre: "",
      shopee: "",
    },
  },

  marketplaces: {
    mercadolivre: { name: "Mercado Livre", label: "Consultar no Mercado Livre" },
    amazon: { name: "Amazon", label: "Consultar na Amazon" },
    shopee: { name: "Shopee", label: "Consultar na Shopee" },
    magalu: { name: "Magalu", label: "Consultar no Magalu" },
    outro: { name: "Loja", label: "Consultar na loja" },
  } satisfies Record<MarketplaceId, { name: string; label: string }>,

  articlesPerPage: 9,
};

export type SiteConfig = typeof siteConfig;
