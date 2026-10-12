import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/blog/Layout";
import { siteConfig } from "@/content/site.config";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contato")({
  head: () => pageHead({ title: "Contato", description: `Fale com a equipe do ${siteConfig.name}.`, path: "/contato" }),
  component: () => (
    <StaticPage title="Contato">
      <p>Dúvidas, correções ou sugestões de produtos? Escreva para:</p>
      <p><a href={`mailto:${siteConfig.contact.email}`} className="font-medium text-primary underline underline-offset-2">{siteConfig.contact.email}</a></p>
      <p className="text-sm text-muted-foreground">Responsável: {siteConfig.contact.responsible}</p>
    </StaticPage>
  ),
});
