/**
 * PRODUTOS — dados de DEMONSTRAÇÃO, fictícios (isExample: true).
 * Substitua por produtos reais com informações verificadas.
 * Não informe preço sem verificação (use price: null).
 */
import exampleImg from "@/assets/produto-exemplo-bicicleta.jpg";
import type { Product } from "./types";

const img = (n: string) => ({ src: exampleImg, alt: `Imagem ilustrativa da ${n}` });

type Seed = {
  n: number;
  type: string;
  aro: string;
  marchas: string;
  quadro: string;
  freio: string;
  suspensao: string;
  ideal: string;
  pros: string[];
  cons: string[];
};

const seeds: Seed[] = [
  { n: 1, type: "Mountain bike", aro: "29", marchas: "21", quadro: "Alumínio", freio: "A disco mecânico", suspensao: "Dianteira", ideal: "Quem quer uma bike versátil para cidade e trilhas leves.", pros: ["Quadro de alumínio, mais leve que aço", "Freio a disco com boa modulação"], cons: ["Suspensão básica para trilhas exigentes"] },
  { n: 2, type: "Urbana", aro: "700", marchas: "7", quadro: "Aço", freio: "V-brake", suspensao: "Sem suspensão", ideal: "Deslocamentos diários em asfalto.", pros: ["Posição de pilotagem confortável", "Manutenção simples"], cons: ["Mais pesada", "Poucas marchas para subidas"] },
  { n: 3, type: "Mountain bike", aro: "26", marchas: "18", quadro: "Aço", freio: "V-brake", suspensao: "Dianteira", ideal: "Iniciantes com orçamento apertado.", pros: ["Peças fáceis de encontrar"], cons: ["Freios exigem mais ajuste", "Quadro pesado"] },
  { n: 4, type: "Híbrida", aro: "700", marchas: "21", quadro: "Alumínio", freio: "A disco mecânico", suspensao: "Sem suspensão", ideal: "Quem pedala longas distâncias no asfalto.", pros: ["Rodas finas e rápidas", "Leve"], cons: ["Não indicada para terra"] },
  { n: 5, type: "Dobrável", aro: "20", marchas: "6", quadro: "Aço", freio: "V-brake", suspensao: "Sem suspensão", ideal: "Quem combina bike com transporte público.", pros: ["Ocupa pouco espaço"], cons: ["Rodas pequenas, menos estabilidade"] },
  { n: 6, type: "Mountain bike", aro: "29", marchas: "24", quadro: "Alumínio", freio: "A disco mecânico", suspensao: "Dianteira com trava", ideal: "Quem quer evoluir no mountain bike.", pros: ["Trava de suspensão para asfalto", "Mais marchas"], cons: ["Ajuste inicial recomendado em oficina"] },
  { n: 7, type: "Urbana retrô", aro: "26", marchas: "Única", quadro: "Aço", freio: "Contra-pedal", suspensao: "Sem suspensão", ideal: "Passeios curtos em terreno plano.", pros: ["Visual clássico", "Quase sem manutenção"], cons: ["Inadequada para subidas"] },
  { n: 8, type: "Mountain bike", aro: "27,5", marchas: "21", quadro: "Alumínio", freio: "A disco mecânico", suspensao: "Dianteira", ideal: "Ciclistas de estatura menor.", pros: ["Aro 27,5 mais ágil"], cons: ["Menos opções de pneus no mercado"] },
  { n: 9, type: "Infantojuvenil", aro: "24", marchas: "18", quadro: "Aço", freio: "V-brake", suspensao: "Dianteira", ideal: "Adolescentes em fase de crescimento.", pros: ["Tamanho adequado para transição"], cons: ["Fica pequena para adultos"] },
  { n: 10, type: "Gravel de entrada", aro: "700", marchas: "14", quadro: "Alumínio", freio: "A disco mecânico", suspensao: "Sem suspensão", ideal: "Quem alterna asfalto e estradas de terra.", pros: ["Versátil", "Guidão com várias posições"], cons: ["Posição menos confortável para iniciantes"] },
];

export const products: Product[] = seeds.map((s) => {
  const id = `bike-exemplo-${String(s.n).padStart(2, "0")}`;
  const name = `Bicicleta Exemplo ${String.fromCharCode(64 + s.n)} — ${s.type}`;
  return {
    id,
    slug: id,
    name,
    brand: "Marca fictícia",
    categorySlug: "bicicletas",
    shortDescription: `${s.type} aro ${s.aro} com ${s.marchas} marcha(s) e freio ${s.freio.toLowerCase()}. Produto fictício para demonstração do template.`,
    longDescription: [
      `Este é um produto fictício criado para demonstrar o layout. Substitua por um modelo real e descreva-o com base nas informações oficiais do fabricante.`,
      `Como exemplo, consideramos uma ${s.type.toLowerCase()} com quadro de ${s.quadro.toLowerCase()} e suspensão ${s.suspensao.toLowerCase()}.`,
    ],
    image: img(name),
    specs: [
      { label: "Aro", value: s.aro },
      { label: "Marchas", value: s.marchas },
      { label: "Quadro", value: s.quadro },
      { label: "Freio", value: s.freio },
      { label: "Suspensão", value: s.suspensao },
    ],
    pros: s.pros,
    cons: s.cons,
    idealFor: s.ideal,
    editorialNotes: "Informações de exemplo. Não testamos este produto.",
    price: null,
    status: "publicado",
    isExample: true,
    alternatives: [],
  };
});

// Alternativas: vizinhos na lista (apenas para demonstração)
products.forEach((p, i) => {
  p.alternatives = [products[(i + 1) % products.length].id, products[(i + 2) % products.length].id];
});
