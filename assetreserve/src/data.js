const ativos = [
  {
    titulo: 'Sala de Aula 101',
    categoria: 'Sala',
    capacidade: 'média',
    disponivel: true,
    imagem: "imgs/sala-101.jpeg",
    detalhes: { capacidade: '40 alunos', conexoes: 'Wi-Fi, Projetor HDMI, Caixa de Som' }
  },
  {
    titulo: 'Sala de Aula 204',
    categoria: 'Sala',
    capacidade: 'alta',
    disponivel: true,
    imagem: "imgs/sala-204.jpeg",
    detalhes: { capacidade: '60 alunos', conexoes: 'Wi-Fi, Projetor HDMI' }
  },
  {
    titulo: 'Sala de Reuniões - Bloco B',
    categoria: 'Sala',
    capacidade: 'pequena',
    disponivel: false,
    imagem: "imgs/sala-reunioes-b.jpeg",
    detalhes: { capacidade: '12 pessoas', conexoes: 'Wi-Fi, Smart TV com HDMI' }
  },

  {
    titulo: 'Laboratório de Informática 1',
    categoria: 'Sala',
    capacidade: 'alta',
    disponivel: true,
    imagem: "imgs/lab-info1.jpeg",
    detalhes: { capacidade: '35 computadores', conexoes: 'Wi-Fi, Rede Cabeada, HDMI' }
  },
  {
    titulo: 'Laboratório de Redes',
    categoria: 'Sala',
    capacidade: 'média',
    disponivel: true,
    imagem: "imgs/lab-redes.jpeg",
    detalhes: { capacidade: '25 alunos', conexoes: 'Switches, Roteadores, Cabeamento, Wi-Fi' }
  },
  {
    titulo: 'Laboratório de Eletrônica',
    categoria: 'Sala',
    capacidade: 'média',
    disponivel: false,
    imagem: "imgs/lab-eletronica.jpeg",
    detalhes: { capacidade: '20 alunos', conexoes: 'Osciloscópios, Fontes, Protoboards' }
  },

  {
    titulo: 'Auditório Principal',
    categoria: 'Sala',
    capacidade: 'muito alta',
    disponivel: true,
    imagem: "imgs/auditorio-principal.jpeg",
    detalhes: { capacidade: '150 pessoas', conexoes: 'Som Profissional, Projetor HD, Wi-Fi' }
  },
  {
    titulo: 'Mini Auditório - Bloco C',
    categoria: 'Sala',
    capacidade: 'média',
    disponivel: false,
    imagem: "imgs/mini-auditorio.jpeg",
    detalhes: { capacidade: '70 pessoas', conexoes: 'Projetor, HDMI, Wi-Fi' }
  },

  {
    titulo: 'Projetor Epson X200',
    categoria: 'Equipamento',
    disponivel: true,
    imagem: "imgs/projetor-epson.jpeg",
    detalhes: { capacidade: 'N/A', conexoes: 'HDMI, VGA, USB' }
  },
  {
    titulo: 'Projetor Portátil Acer',
    categoria: 'Equipamento',
    disponivel: true,
    imagem: "imgs/projetor-acer.jpeg",
    detalhes: { capacidade: 'N/A', conexoes: 'HDMI, USB-C' }
  },
  {
  titulo: 'Notebook Lenovo ThinkPad',
  categoria: 'Equipamento',
  disponivel: true,
  imagem: "imgs/notebook-thinkpad.jpeg",
  detalhes: { capacidade: 'N/A', conexoes: 'Wi-Fi, HDMI, USB-C, USB 3.0'}
  },
{
  titulo: 'Impressora HP LaserJet Pro',
  categoria: 'Equipamento',
  disponivel: false,
  imagem: "imgs/impressora-hp-laserjet.jpeg",
  detalhes: { capacidade: 'N/A', conexoes: 'Wi-Fi, USB, Ethernet'}
},
];


export default ativos;