# Sophy Presentes 🎁

Bem-vindo ao **Sophy Presentes**, uma aplicação web de catálogo e vitrine de presentes. O projeto oferece tanto uma interface de usuário agradável para navegação de produtos quanto um painel administrativo completo para o gerenciamento do catálogo e das marcas.

## 🚀 Funcionalidades

- **Vitrine de Produtos (Home):** Navegação e visualização do catálogo de presentes disponíveis.
- **Filtro por Marcas:** Filtre facilmente os produtos por marcas específicas (ex: Natura, Boticário, Eudora, Cacau Show, etc.).
- **Detalhes do Produto:** Visualize informações completas sobre um item específico (descrição, foto e preço).
- **Painel Administrativo Segregado:**
  - **Dashboard:** Resumo e métricas gerais dos itens cadastrados.
  - **Gerenciamento de Produtos:** Operações de CRUD (Criar, Ler, Atualizar, Deletar) para todo o estoque.
  - **Gerenciamento de Marcas:** Cadastro e remoção das marcas disponíveis.
- **Integração Backend:** Dados persistidos e sincronizados via Supabase.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando as melhores e mais modernas ferramentas do ecossistema front-end:

- **[React 18](https://react.dev/):** Biblioteca principal para a construção da interface de usuário.
- **[Vite](https://vitejs.dev/):** Bundler extremamente rápido para o desenvolvimento.
- **[React Router 7](https://reactrouter.com/):** Gerenciamento das rotas da aplicação (Navegação entre Home, Produto e Admin).
- **[Tailwind CSS v4](https://tailwindcss.com/):** Estilização utilitária moderna e rápida.
- **[Radix UI](https://www.radix-ui.com/):** Componentes acessíveis como base para a interface (Dialog, Select, Label, etc).
- **[Lucide React](https://lucide.dev/):** Ícones modernos e flexíveis.
- **[Supabase](https://supabase.com/):** Backend-as-a-Service (BaaS) open-source atuando como nosso banco de dados.


## 📂 Estrutura Principal de Pastas

```text
Sophy_Presentes/
├── src/
│   ├── app/
│   │   ├── actions/      # Funções de interação com banco de dados (CRUD)
│   │   ├── components/   # Componentes React (Views, Admin, UI components)
│   │   └── App.tsx       # Componente raiz e definição de rotas
│   ├── assets/           # Imagens e arquivos estáticos (Sophy Logo)
│   ├── lib/              # Configurações de terceiros (Client do Supabase)
│   ├── styles/           # Arquivos base CSS e configuração Tailwind
│   └── main.tsx          # Ponto de entrada (Entrypoint) do React
├── dist/                 # Pasta de arquivos otimizados gerada após o build
└── package.json          # Dependências e scripts do projeto
```

---
*Projeto mantido e organizado seguindo as melhores práticas de Clean Code e arquitetura de componentes.*
