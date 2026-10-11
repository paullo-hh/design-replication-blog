import { affiliateLinks } from "@/content/affiliate-links";
import { articles } from "@/content/articles";
import { categories } from "@/content/categories";
import { products } from "@/content/products";
import { siteConfig } from "@/content/site.config";
import type { AffiliateLink, Article, Product } from "@/content/types";

const byDateDesc = (a: Article, b: Article) => b.updatedAt.localeCompare(a.updatedAt);

export const publishedArticles = () => articles.filter((a) => a.status === "publicado").sort(byDateDesc);
export const getArticle = (slug: string) => publishedArticles().find((a) => a.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getCategories = () => categories;
export const articlesInCategory = (slug: string) => publishedArticles().filter((a) => a.categorySlug === slug);
export const publishedProducts = () => products.filter((p) => p.status === "publicado");
export const getProduct = (idOrSlug: string) =>
  publishedProducts().find((p) => p.id === idOrSlug || p.slug === idOrSlug);
export const articlesWithProduct = (id: string) => publishedArticles().filter((a) => a.items.some((i) => i.productId === id));

/** Só retorna links com URL https válida. Links inválidos ou vazios são ignorados. */
export function validLinks(links: AffiliateLink[] | undefined): AffiliateLink[] {
  return (links ?? []).filter((l) => {
    if (!l.url) return false;
    try {
      return new URL(l.url).protocol === "https:";
    } catch {
      return false;
    }
  });
}

export const getProductLinks = (p: Product) => validLinks(affiliateLinks[p.id]);

export function paginate<T>(list: T[], page: number, perPage = siteConfig.articlesPerPage) {
  const totalPages = Math.max(1, Math.ceil(list.length / perPage));
  const current = Math.min(Math.max(1, page || 1), totalPages);
  return { items: list.slice((current - 1) * perPage, current * perPage), page: current, totalPages };
}

export const formatDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
