<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Arquitetura
- Todo conteúdo (config, categorias, produtos, links de afiliados, artigos, textos institucionais) vive em `src/content/`; componentes em `src/components/blog/` só leem esses dados — mantém o template replicável por nicho.
- Links de afiliados ficam em `src/content/affiliate-links.ts` separados dos produtos, para trocar links sem editar artigos.
- Cores do blog vêm de `siteConfig.theme` e são injetadas no `<head>` pelo root — uma só fonte para a identidade visual.
- Sem backend: conteúdo estático tipado, para que cada cópia funcione sem serviços externos.
