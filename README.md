# Volo Visual

Site institucional da **Volo Visual** — empresa de produções cinematográficas aéreas com drones, localizada em Curitiba, Paraná.

---

## Visão Geral

Landing page profissional desenvolvida em React com design cinematográfico em tons de preto e dourado. O site apresenta os serviços, portfólio, processo de trabalho e canal de contato da empresa.

## Tecnologias

- **React 18** — biblioteca de interface
- **Vite** — bundler e servidor de desenvolvimento
- **CSS-in-JS** (estilos inline + injeção de estilos globais)
- **Google Fonts** — Cinzel Decorative, Cinzel, Montserrat

## Funcionalidades

- Cursor personalizado com anel animado
- Navbar com efeito de scroll (transparente → sólida)
- Hero com parallax, grade cinematográfica e scanline animada
- Scroll reveal com `IntersectionObserver`
- Seção de serviços com hover animado
- Portfólio em grid assimétrico de 12 colunas
- Player de vídeo (YouTube / Vimeo) incorporado
- Formulário de contato com feedback visual
- Layout totalmente responsivo

## Estrutura do Projeto

```
VoloVisual/
├── public/
│   └── assets/          # imagens e favicon
├── src/
│   ├── assets/
│   ├── App.jsx           # entrada da aplicação
│   ├── index.css         # reset global
│   ├── main.jsx
│   └── VoloVisual.jsx    # componente principal
├── index.html
├── package.json
└── vite.config.js
```

## Como Rodar Localmente

**Pré-requisitos:** Node.js 18+ instalado

```bash
# 1. Clone o repositório
git clone https://github.com/EderJZ/VoloVisual.git

# 2. Entre na pasta
cd VoloVisual

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no navegador.

## Como Fazer Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`, prontos para deploy.

## Como Personalizar os Vídeos

Abra `src/VoloVisual.jsx` e localize o array `videos` próximo à seção `Videos`:

```js
const videos = [
  {
    url: "https://www.youtube.com/embed/SEU_VIDEO_ID",
    title: "Título do Vídeo",
    desc: "Descrição do projeto.",
    label: "Tipo de Produção",
  },
  ...
];
```

Para obter a URL correta do YouTube: **Compartilhar → Incorporar** e copie o valor do atributo `src`.

## Fluxo de Contribuição

```bash
# Após fazer alterações
git add .
git commit -m "feat: descrição da mudança"
git push
```

### Convenção de commits

| Prefixo | Uso |
|---------|-----|
| `feat:` | nova funcionalidade ou seção |
| `fix:` | correção de bug |
| `style:` | ajuste visual ou de CSS |
| `content:` | atualização de texto, vídeo ou imagem |
| `refactor:` | reorganização de código |

## Licença

Projeto privado — todos os direitos reservados © 2025 Volo Visual.
