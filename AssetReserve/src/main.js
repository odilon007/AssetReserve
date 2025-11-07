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

modal.addEventListener("click", (e) => {
  if (e.target == modal) {
    fecharModal();
  }
});
