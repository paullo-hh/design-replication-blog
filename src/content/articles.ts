/**
 * ARTIGOS — veja docs/COMO-CADASTRAR-ARTIGO.md para o passo a passo.
 * A ordem de "items" é a ordem editorial do ranking.
 */
import cover from "@/assets/capa-bicicletas.jpg";
import type { Article } from "./types";

const ids = Array.from({ length: 10 }, (_, i) => `bike-exemplo-${String(i + 1).padStart(2, "0")}`);

export const articles: Article[] = [
  {
    id: "art-bicicletas-ate-1000",
    slug: "melhores-bicicletas-ate-1000-reais",
    type: "comparativo",
    title: "10 melhores bicicletas até R$ 1.000: como escolher",
    subtitle: "Um guia para comparar tipos de bike, aro, marchas e freios antes de comprar.",
    summary:
      "Entenda o que observar em uma bicicleta de entrada e veja uma lista de exemplo organizada por perfil de uso.",
    intro: [
      "Comprar a primeira bicicleta pode ser confuso: são muitos tipos, tamanhos de aro e combinações de peças. Este comparativo organiza as opções por perfil de uso para facilitar a decisão.",
      "Atenção: os produtos desta página são fictícios e servem apenas para demonstrar o template. Substitua-os por modelos reais, com informações verificadas.",
    ],
    categorySlug: "bicicletas",
    cover: {
      src: cover,
      alt: "Mountain bike encostada em um muro de pedra ao entardecer",
      width: 1600,
      height: 912,
    },
    items: ids.map((productId, i) => ({
      productId,
      highlight: [
        "Melhor equilíbrio geral",
        "Melhor para a cidade",
        "Mais em conta",
        "Melhor para asfalto",
        "Melhor para espaços pequenos",
        "Melhor para evoluir",
        "Mais simples de manter",
        "Mais ágil",
        "Para adolescentes",
        "Mais versátil",
      ][i]!,
      analysis: [
        "Análise de exemplo: descreva aqui, com base em dados do fabricante e em fontes verificáveis, por que este modelo entrou na lista e em quais situações ele faz sentido.",
      ],
    })),
    picks: [
      { label: "Equilíbrio geral", productId: ids[0]! },
      { label: "Uso urbano diário", productId: ids[1]! },
      { label: "Menor orçamento", productId: ids[2]! },
      { label: "Asfalto e terra", productId: ids[9]! },
    ],
    criteria: [
      "Faixa de preço declarada pelo editor no momento da pesquisa.",
      "Disponibilidade de peças de reposição no mercado brasileiro.",
      "Especificações informadas pelo fabricante (aro, quadro, freios, transmissão).",
      "Adequação a diferentes perfis de uso.",
    ],
    methodology: [
      "Comparamos especificações públicas dos fabricantes. Não realizamos testes práticos nos produtos listados, a menos que isso seja indicado explicitamente na análise.",
      "A ordem da lista é editorial e não depende de comissões, preço ou popularidade.",
    ],
    buyingGuide: [
      {
        heading: "Escolha o tipo de bicicleta",
        paragraphs: [
          "Mountain bikes lidam melhor com terra e buracos; urbanas e híbridas são mais eficientes no asfalto; dobráveis resolvem a falta de espaço.",
        ],
      },
      {
        heading: "Tamanho do quadro e do aro",
        paragraphs: [
          "O quadro deve ser compatível com a sua altura. O aro 29 rola com mais facilidade sobre obstáculos; o 26 e o 27,5 são mais ágeis.",
        ],
      },
      {
        heading: "Freios e marchas",
        paragraphs: [
          "Freios a disco costumam frear melhor na chuva. Mais marchas ajudam em subidas, mas exigem regulagem.",
        ],
      },
    ],
    faq: [
      {
        question: "Bicicleta até R$ 1.000 é boa para trilha?",
        answer:
          "Para trilhas leves, pode atender. Para trilhas técnicas, componentes mais robustos são recomendados.",
      },
      {
        question: "Aro 29 serve para pessoas baixas?",
        answer:
          "Depende do tamanho do quadro. Verifique a tabela de medidas do fabricante antes de comprar.",
      },
      {
        question: "Os preços desta página são atualizados?",
        answer:
          "Preços e disponibilidade mudam com frequência. Sempre confira o valor final na loja antes de comprar.",
      },
    ],
    conclusion: [
      "Não existe uma bicicleta perfeita para todos: defina primeiro onde você vai pedalar e quanto pode investir, depois compare as especificações.",
    ],
    comparisonSpecs: ["Aro", "Marchas", "Quadro", "Freio"],
    author: "Equipe editorial Escolha Certa",
    createdAt: "2026-10-01",
    updatedAt: "2026-10-11",
    status: "publicado",
    featured: true,
    seo: {
      title: "10 melhores bicicletas até R$ 1.000: como escolher",
      description:
        "Compare tipos de bicicleta, aro, marchas e freios e veja opções organizadas por perfil de uso.",
    },
  },
  {
    id: "art-guia-tamanho-quadro",
    slug: "como-escolher-tamanho-quadro-bicicleta",
    type: "guia",
    title: "Como escolher o tamanho do quadro da bicicleta",
    subtitle: "Medidas básicas para acertar na compra on-line.",
    summary:
      "Um guia rápido para relacionar sua altura ao tamanho de quadro indicado pelos fabricantes.",
    intro: [
      "O tamanho do quadro influencia conforto e segurança. Este guia mostra como usar a tabela de medidas do fabricante a seu favor.",
    ],
    categorySlug: "bicicletas",
    cover: { src: cover, alt: "Bicicleta estacionada ao ar livre", width: 1600, height: 912 },
    items: [],
    picks: [],
    criteria: [],
    methodology: [],
    buyingGuide: [
      {
        heading: "Meça a altura do cavalo",
        paragraphs: [
          "Fique descalço, encostado na parede, e meça do chão até a virilha. Essa medida é usada em muitas tabelas.",
        ],
      },
      {
        heading: "Consulte a tabela do fabricante",
        paragraphs: [
          "Cada marca tem a sua tabela. Use sempre a do modelo que você pretende comprar.",
        ],
      },
    ],
    faq: [
      {
        question: "Posso usar o mesmo tamanho em marcas diferentes?",
        answer: "Nem sempre. As geometrias variam; confira a tabela de cada fabricante.",
      },
    ],
    conclusion: [
      "Na dúvida entre dois tamanhos, prefira experimentar em uma loja física ou consultar o atendimento do fabricante.",
    ],
    comparisonSpecs: [],
    author: "Equipe editorial Escolha Certa",
    createdAt: "2026-10-05",
    updatedAt: "2026-10-05",
    status: "publicado",
    seo: {
      title: "Como escolher o tamanho do quadro da bicicleta",
      description:
        "Aprenda a medir sua altura e usar a tabela do fabricante para escolher o quadro certo.",
    },
  },
];
