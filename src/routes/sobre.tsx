import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/blog/Layout";
import { institutional } from "@/content/institutional";
import { pageHead } from "@/lib/seo";

const page = institutional.sobre;

export const Route = createFileRoute("/sobre")({
  head: () => pageHead({ title: page.title, description: page.description, path: "/sobre" }),
  component: () => <StaticPage title={page.title}>{page.body}</StaticPage>,
});
