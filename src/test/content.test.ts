import { describe, expect, it } from "vitest";
import { paginate, publishedArticles, validLinks } from "@/lib/content";

describe("regras de conteúdo", () => {
  it("só exibe links de afiliado com URL https válida", () => {
    const links = validLinks([
      { marketplace: "amazon", url: "" },
      { marketplace: "shopee", url: "http://inseguro.com" },
      { marketplace: "outro", url: "não é url" },
      { marketplace: "mercadolivre", url: "https://exemplo.com/x" },
    ]);
    expect(links.map((l) => l.marketplace)).toEqual(["mercadolivre"]);
  });

  it("rascunhos não aparecem", () => {
    expect(publishedArticles().every((a) => a.status === "publicado")).toBe(true);
  });

  it("paginação limita a página ao total", () => {
    expect(paginate([1, 2, 3], 9, 2)).toEqual({ items: [3], page: 2, totalPages: 2 });
  });
});
