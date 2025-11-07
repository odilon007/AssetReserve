# 🚀AssetReserve - Interface de Reserva de Ativos

Este projeto foi desenvolvido como parte das disciplinas PW2 (Programação para Web 2) e Engenharia de Requisitos.
O objetivo é apresentar um site interativo para reserva de ativos (salas e equipamentos), utilizando HTML, CSS e JavaScript.

O site exibe uma galeria de ativos disponíveis, permite ao usuário ver detalhes sobre os itens e interagir com o conteúdo de forma dinâmica para simular uma reserva.

## 📌Funcionalidades

Galeria de Ativos Disponíveis: Exibição de todas as salas de reunião e equipamentos (projetores, câmeras, etc.) com imagens e status.

Modal de Detalhes/Reserva: Ao clicar em um ativo, o usuário visualiza informações adicionais (capacidade da sala, conexões, etc.) e um formulário de agendamento.

Filtro Dinâmico: Permite filtrar ativos por categoria (sala ou equipamento) e capacidade.

Calendário Interativo: Seletor de data para simular escolha de dia e horário.

Estilo Responsivo: Layout adaptável para desktop, tablet e celular.

## 🛠️Tecnologias Utilizadas

 HTML5: Estrutura do conteúdo da página.

 CSS3: Estilização e design moderno (usando Flexbox, Grid e Media Queries).

 JavaScript: Interatividade — modais, filtros e calendário.

 Vite: Build tool para desenvolvimento rápido (com HMR e ES Modules).

 Bootstrap (opcional): Facilita componentes e sistema de grid responsivo.

## 📂Estrutura do Projeto

```
AssetReserve/
├── index.html                 # Página principal com a galeria de ativos
├── public/
│   └── imgs/                  # Imagens dos ativos (salas, projetores, etc.)
├── src/
│   ├── assets/                # Arquivos estáticos (ícones, etc.)
│   ├── css/
│   │   └── style.css          # Estilos do layout e design do site
│   ├── js/
│   │   └── script.js          # Scripts (modais, filtros, calendário)
│   └── main.js                # Ponto de entrada JS (inicia a aplicação)
├── package-lock.json
├── package.json               # Dependências e scripts do projeto
└── README.md                  # Este arquivo
```

## ⚙️Instalação

### 🧩Pré-requisitos

Node.js (versão 14 ou superior)

NPM ou Yarn

### 🚀Passos para configuração

#### Clone o repositório
git clone https://github.com/odilon007/Projeto-PW2.git

#### Acesse o diretório do projeto
cd Projeto-PW2

#### Instale as dependências
npm install

#### Inicie o servidor de desenvolvimento
npm run dev

A aplicação estará disponível em:
👉 http://localhost:5173

## 🌟Melhorias Futuras

💾 Persistência de Dados: Integração com LocalStorage ou backend real.

🔐 Autenticação de Usuários: Sistema de login e controle de reservas.

🔔 Notificações de Reservas: Alertas e lembretes de agendamento.

🎨 Interface Avançada: Animações e integração com Tailwind CSS ou Bootstrap.

## 🤝Contribuindo

Contribuições são bem-vindas! 💡
Para contribuir:

### Faça um fork do repositório
### Crie uma branch para sua feature
git checkout -b minha-feature

### Realize as alterações e envie
git push origin minha-feature

Depois, abra um Pull Request descrevendo suas modificações.

## 👨‍💻Equipe

[@odilon007](https://github.com/odilon007)

[@MatheusMachado16](https://github.com/MatheusMachado16)

[@omarhenriqu3](https://github.com/omarhenriqu3)

[@DaviPatricio06](https://github.com/DaviPatricio06)