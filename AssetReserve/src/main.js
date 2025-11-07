import ativos from './data.js'

// CARDS

function ativocard(ativo) {
  return `
    
      <div id="${ativo.id}" class="col-md-4 col-sm-6" data-category="${ativo.tipo}">
        <div class="card shadow-sm ativo" data-category="sala" data-capacity="medium">
          <div class="card-body">  
            <img src="${ativo.image}" class="card-img-top" alt="${ativo.title}">
            <h5 class="card-title">${ativo.title}</h5>
            <p class="card-text text-muted">${ativo.descricao}</p>
            <button class="btn open-modal btn-primary btn-reservar" data-id="1">Reservar</button>
          </div> 
        </div> 
      </div>
  `;
}

const allcards = ativos.map( (ativo) => ativocard(ativo));

const main = document.querySelector('main');
main.innerHTML = allcards.join('');

//  MODAL

const modal = document.getElementById("meuModal");
const botoesAbrir = document.querySelectorAll(".open-modal");
const btnFechar = document.getElementById("btnFechar")

function abrirModal() {
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function fecharModal() {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

botoesAbrir.forEach(btn => {
  btn.addEventListener("click", abrirModal);
});

btnFechar.addEventListener("click", fecharModal);
debugger
modal.addEventListener("click", (e) => {
  if (e.target == modal) {
    fecharModal();
  }
});

//  FILTRAR CARDS PELO SELETOR

document.getElementById('filter-category').addEventListener('change', function() {
  const category = this.value;
  const cards = document.querySelectorAll("#container .card")
  cards.forEach(card => {
    const cardCatergory = card.getAttribute('data-category');

    // VERIFICA SE O CARD CORRESPONDE A SELECIONADA

    if (category === '' || cardCatergory === category) {
      card.style.display = "";
    } else {
      card.style.display = 'none';
    }
  })
})
