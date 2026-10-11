/**
 * LINKS DE AFILIADOS — separados dos produtos e artigos.
 * Chave = id do produto. Troque um link aqui sem mexer no artigo.
 * URL vazia ("") = botão não é exibido. Use apenas links reais que você gerou.
 *
 * Exemplo preenchido:
 *   "bike-exemplo-01": [
 *     { marketplace: "mercadolivre", url: "https://mercadolivre.com/sec/SEU_LINK" },
 *     { marketplace: "amazon", url: "https://amzn.to/SEU_LINK" },
 *     { marketplace: "shopee", url: "https://s.shopee.com.br/SEU_LINK" },
 *   ],
 */
import type { AffiliateLink } from "./types";

const pending = (): AffiliateLink[] => [
  { marketplace: "mercadolivre", url: "" },
  { marketplace: "amazon", url: "" },
  { marketplace: "shopee", url: "" },
];

export const affiliateLinks: Record<string, AffiliateLink[]> = {
  "bike-exemplo-01": pending(),
  "bike-exemplo-02": pending(),
  "bike-exemplo-03": pending(),
  "bike-exemplo-04": pending(),
  "bike-exemplo-05": pending(),
  "bike-exemplo-06": pending(),
  "bike-exemplo-07": pending(),
  "bike-exemplo-08": pending(),
  "bike-exemplo-09": pending(),
  "bike-exemplo-10": pending(),
};
