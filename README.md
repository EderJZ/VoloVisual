# 🚁 Volo Visual — Site Institucional

> Site institucional de uma empresa de **cinematografia aérea com drones**, desenvolvido do zero com React + Vite e hospedado na Vercel.

![Deploy](https://img.shields.io/badge/deploy-Vercel-black?style=flat-square&logo=vercel)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)
![Status](https://img.shields.io/badge/status-em%20produção-brightgreen?style=flat-square)

---

## 🌐 Acesse o Projeto

🔗 **[volovisual.com.br](https://www.volovisual.com.br/)**

---

## 📸 Sobre o Projeto

A **Volo Visual** é uma empresa de produções audiovisuais aéreas baseada em Curitiba, PR. Este projeto é o site institucional completo da empresa, desenvolvido com foco em design cinematográfico, experiência do usuário e conversão de clientes via WhatsApp.

O site foi construído inteiramente em um único componente React modular, sem dependências de bibliotecas de UI externas — todo o design, animações e responsividade foram implementados manualmente.

---

## ✨ Funcionalidades

- **Design cinematográfico** com paleta preta e dourada, tipografia Cinzel e Montserrat
- **Cursor personalizado animado** com efeito de anel seguidor (desktop)
- **Navbar responsiva** com efeito de scroll e menu hambúrguer animado no mobile
- **Hero section** com parallax, grid decorativo e scanline animada
- **Scroll reveal** com IntersectionObserver para animações ao rolar a página
- **Portfólio interativo** com grid assimétrico e hover com overlay
- **Formulário de contato** integrado ao WhatsApp com mensagem pré-formatada
- **Botão flutuante** de WhatsApp fixo na tela
- **Totalmente responsivo** para mobile, tablet e desktop
- **Deploy automático** via Vercel integrado ao GitHub

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| React 18 | Biblioteca principal de UI |
| Vite 5 | Bundler e servidor de desenvolvimento |
| CSS-in-JS (inline styles) | Estilização sem dependências externas |
| IntersectionObserver API | Animações de scroll reveal |
| Web Animations API | Cursor animado com requestAnimationFrame |
| Google Fonts | Cinzel Decorative, Cinzel, Montserrat |
| WhatsApp API | Integração do formulário de contato |
| Vercel | Hospedagem e deploy contínuo |
| Git + GitHub | Versionamento de código |

---

## 📁 Estrutura do Projeto

```
VoloVisual/
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   └── src/
│       ├── assets/
│       │   ├── img01.jpg         # Foto seção Sobre
│       │   ├── port01.jpg        # Portfólio — Eventos
│       │   ├── port02.jpg        # Portfólio — Mapeamento
│       │   ├── port03.jpg        # Portfólio — Inspeção
│       │   ├── port04.jpg        # Portfólio — Documentário
│       │   ├── port05.jpg        # Portfólio — Natureza
│       │   └── port06.jpg        # Portfólio — Aéreo
│       ├── App.jsx
│       ├── main.jsx
│       └── VoloVisual.jsx        # Componente principal
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── vercel.json
└── README.md
```

---

## 🧩 Arquitetura de Componentes

O projeto é organizado em componentes funcionais dentro de um único arquivo principal:

```
VoloVisual (root)
├── CustomCursor       — Cursor personalizado animado
├── WhatsAppButton     — Botão flutuante fixo
├── Navbar             — Navegação com menu hambúrguer
├── Hero               — Seção principal com parallax
├── Sobre              — História e valores da empresa
├── Servicos           — Cards de serviços oferecidos
├── Portfolio          — Grid assimétrico com imagens reais
├── Processo           — Etapas de trabalho
├── Videos             — Player de vídeos incorporados
├── Contato            — Formulário integrado ao WhatsApp
└── Footer             — Rodapé com links e redes sociais
```

---

## 🚀 Como Rodar Localmente

```bash
# Clone o repositório
git clone https://github.com/EderJZ/VoloVisual.git

# Entre na pasta do frontend
cd VoloVisual/frontend

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
```

Acesse em `http://localhost:5173`

---

## 📦 Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run preview  # Preview do build local
```

---

## 📱 Responsividade

O site é totalmente responsivo com breakpoints em:

- **Desktop** — acima de 900px: layout completo com cursor personalizado
- **Tablet** — até 900px: menu hambúrguer, grids em coluna única
- **Mobile** — até 480px: tipografia e espaçamentos otimizados, botões em largura total

---

## 🔗 Integração WhatsApp

O formulário de contato coleta os dados do usuário e abre o WhatsApp com uma mensagem pré-formatada contendo nome, empresa, e-mail, serviço de interesse e mensagem. Sem necessidade de backend ou serviços de e-mail.

---

## 👨‍💻 Desenvolvedor

Desenvolvido por **Eder JZ**

[![GitHub](https://img.shields.io/badge/GitHub-EderJZ-181717?style=flat-square&logo=github)](https://github.com/EderJZ)

---

## 📄 Licença

Este projeto é de uso privado. Todos os direitos reservados à Volo Visual.