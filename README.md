## 🚀 AssetBook - Interface de Reserva de Ativos

Este projeto foi desenvolvido como parte das disciplinas PW2 (Programação para Web 2) e Engenharia de Requisitos. Ele tem como objetivo apresentar um site interativo para reserva de ativos (salas e equipamentos), utilizando HTML, CSS e JavaScript. O site exibe uma galeria de ativos disponíveis, permite ao usuário ver detalhes sobre os itens e interagir com o conteúdo de forma dinâmica para simular uma reserva.

## 📌 Funcionalidades

Galeria de Ativos Disponíveis: Exibição de todas as salas de reunião e equipamentos (projetores, câmeras, etc.) com imagens e status.

Modal de Detalhes/Reserva: Ao clicar em um ativo, o usuário pode visualizar informações adicionais (como capacidade da sala, conexões disponíveis) e ver um formulário para agendamento.

Filtro Dinâmico: Permite ao usuário filtrar os ativos visíveis por categoria (sala ou equipamento) e capacidade.

Calendário Interativo: Um seletor de data para simular a escolha do dia e horário da reserva.

Estilo Responsivo: O layout do site é responsivo, adaptando-se a diferentes tamanhos de tela (desktop, tablet e celular).

## 🛠️ Tecnologias Utilizadas

HTML: Para estruturar o conteúdo da página (os "cards" dos ativos, os filtros, etc.).

CSS: Para estilizar a página e criar um design moderno e responsivo (usando Flexbox, Grid e Media Queries).

JavaScript: Para criar interatividade no site, como a exibição dos modais de reserva, o funcionamento dos filtros e a interação com o calendário.

Vite: Ferramenta de build para criar o ambiente de desenvolvimento rápido e eficiente, com suporte a ES Modules e Hot Module Replacement (HMR).

Bootstrap (opcional): Para facilitar o design responsivo e a criação de componentes como botões, modais e o sistema de grid.

## 📂 Estrutura do Projeto

A estrutura do projeto foi organizada da seguinte maneira, seguindo a convenção de arquivos do Vite:

AssetBook/
├── index.html          # Página principal com a galeria de ativos
├── public/
│   └── imgs/           # Imagens dos ativos (salas, projetores, etc.)
├── src/
│   ├── assets/         # Arquivos estáticos (imagens, ícones, etc.)
│   ├── css/
│   │   └── style.css   # Estilos para o layout e design do site
│   ├── js/
│   │   └── script.js   # Scripts para interatividade (modais, filtros, calendário)
│   └── main.js         # Ponto de entrada do JavaScript (inicia a aplicação)
├── package-lock.json
├── package.json        # Dependências e scripts de desenvolvimento
└── README.md           # Este arquivo

## ⚙️ Instalação
Pré-requisitos

Node.js
 (versão 14 ou superior)

NPM
 ou Yarn
 para gerenciar pacotes

Passos para configuração:

Clone o repositório:

git clone https://github.com/usuario/assetbook.git

Instale as dependências:
Navegue até a pasta do projeto e instale as dependências:

cd assetbook
npm install

Inicie o servidor de desenvolvimento com o Vite:

npm run dev

A aplicação estará disponível no navegador em http://localhost:5173.

## 🌟 Melhorias Futuras

O projeto pode ser expandido com várias funcionalidades adicionais, como:
Persistência de Dados: Adicionar um sistema de armazenamento local (como LocalStorage) ou um backend para salvar as reservas feitas.
Autenticação de Usuários: Implementar um sistema de login para usuários, permitindo controle de reservas por perfil.
Notificações de Reservas: Implementar um sistema de alertas ou notificações para confirmar ou lembrar os usuários sobre suas reservas.
Interface Avançada: Aprimorar o design e a experiência do usuário com animações, transições e integração com frameworks de UI (como Tailwind CSS ou Bootstrap).

## 🤝 Contribuindo

Se você deseja contribuir com o projeto, fique à vontade! Para isso, siga os seguintes passos:
Faça um fork do repositório
Crie uma branch para sua feature ou correção (git checkout -b minha-feature)
Realize suas alterações
Envie suas alterações para o repositório principal (git push origin minha-feature)
Abra um pull request explicando suas modificações

## 👨‍💻 Equipe

[@odilon007](https://github.com/odilon007)

[@MatheusMachado16](https://github.com/MatheusMachado16)

[@omarhenriqu3](https://github.com/omarhenriqu3)

[@DaviPatricio06](https://github.com/DaviPatricio06)
