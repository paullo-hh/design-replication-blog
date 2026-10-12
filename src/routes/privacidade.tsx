import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/blog/Layout";
import { institutional } from "@/content/institutional";
import { pageHead } from "@/lib/seo";

const page = institutional.privacidade;

export const Route = createFileRoute("/privacidade")({
  head: () => pageHead({ title: page.title, description: page.description, path: "/privacidade" }),
  component: () => <StaticPage title={page.title}>{page.body}</StaticPage>,
});
