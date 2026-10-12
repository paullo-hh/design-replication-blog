import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/blog/Layout";
import { institutional } from "@/content/institutional";
import { pageHead } from "@/lib/seo";

const page = institutional.cookies;

export const Route = createFileRoute("/cookies")({
  head: () => pageHead({ title: page.title, description: page.description, path: "/cookies" }),
  component: () => <StaticPage title={page.title}>{page.body}</StaticPage>,
});
