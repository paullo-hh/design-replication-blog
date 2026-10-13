import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/blog/Layout";
import { institutional } from "@/content/institutional";
import { pageHead } from "@/lib/seo";

const page = institutional.afiliados;

export const Route = createFileRoute("/aviso-de-afiliados")({
  head: () =>
    pageHead({ title: page.title, description: page.description, path: "/aviso-de-afiliados" }),
  component: () => <StaticPage title={page.title}>{page.body}</StaticPage>,
});
