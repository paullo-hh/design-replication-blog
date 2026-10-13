/**
 * TEXTOS INSTITUCIONAIS — revise com orientação jurídica antes de publicar.
 */
import { siteConfig } from "./site.config";

const s = siteConfig;

export const institutional = {
  sobre: {
    title: "Sobre o site",
    description: `Conheça a proposta editorial do ${s.name}.`,
    body: (
      <>
        <p>
          O {s.name} publica comparativos e guias de compra para ajudar você a escolher produtos com
          critérios claros.
        </p>
        <h2>Como trabalhamos</h2>
        <p>
          Baseamos as listas em especificações públicas dos fabricantes e em fontes verificáveis.
          Quando um produto não foi testado por nós, isso não é apresentado como teste prático.
        </p>
        <p>A ordem das listas é editorial e não é determinada por comissões.</p>
      </>
    ),
  },
  afiliados: {
    title: "Aviso de afiliados",
    description: "Como o site é monetizado por links de afiliados.",
    body: (
      <>
        <p>
          Alguns links do {s.name} são links de afiliados. Quando você compra por meio de
          determinados links, podemos receber uma comissão da loja, sem custo adicional para você.
        </p>
        <p>Nem todos os links geram comissão: isso depende do programa e do link utilizado.</p>
        <p>
          Preços e disponibilidade são definidos pelas lojas e podem mudar a qualquer momento.
          Confira sempre as condições finais no site da loja.
        </p>
        {Object.values(s.affiliate.programStatements)
          .filter(Boolean)
          .map((t) => (
            <p key={t}>
              <strong>{t}</strong>
            </p>
          ))}
      </>
    ),
  },
  privacidade: {
    title: "Política de privacidade",
    description: "Como tratamos dados pessoais neste site.",
    body: (
      <>
        <p>
          Este site não exige cadastro e não coleta dados pessoais por formulários. Ao clicar em
          links de lojas, você passa a estar sujeito às políticas de privacidade delas.
        </p>
        <h2>Contato do responsável</h2>
        <p>
          {s.contact.responsible} — {s.contact.email}
        </p>
      </>
    ),
  },
  cookies: {
    title: "Política de cookies",
    description: "Uso de cookies neste site.",
    body: (
      <>
        <p>
          Este site não utiliza cookies próprios de rastreamento. As lojas parceiras podem usar
          cookies para identificar compras originadas por links de afiliados, conforme as políticas
          delas.
        </p>
        <p>Se você adicionar ferramentas de análise, atualize esta página.</p>
      </>
    ),
  },
  termos: {
    title: "Termos de uso",
    description: "Condições de uso do conteúdo do site.",
    body: (
      <>
        <p>
          O conteúdo tem caráter informativo e reflete opiniões editoriais. Não vendemos produtos:
          as compras são feitas diretamente nas lojas.
        </p>
        <p>
          Não nos responsabilizamos por preços, estoque, entrega ou garantia, que são de
          responsabilidade das lojas e fabricantes.
        </p>
      </>
    ),
  },
};
