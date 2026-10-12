import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/blog/Layout";
import { institutional } from "@/content/institutional";
import { pageHead } from "@/lib/seo";

const page = institutional.termos;

export const Route = createFileRoute("/termos")({
  head: () => pageHead({ title: page.title, description: page.description, path: "/termos" }),
  component: () => <StaticPage title={page.title}>{page.body}</StaticPage>,
});
