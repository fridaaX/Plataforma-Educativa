const piezas = document.querySelectorAll('.draggable');
const zonas = document.querySelectorAll('.drop-img');

piezas.forEach(pieza => {
  pieza.addEventListener('dragstart', e => {
    e.dataTransfer.setData('numero', pieza.dataset.shape);
    e.dataTransfer.setDragImage(pieza, 50, 50);
  });
});

zonas.forEach(zona => {
  zona.addEventListener('dragover', e => e.preventDefault());

  zona.addEventListener('drop', e => {
    e.preventDefault();
    const numeroSoltado = e.dataTransfer.getData('numero');
    const numeroZona = zona.dataset.shape;

    if (numeroSoltado === numeroZona) {
      const piezaCorrecta = document.querySelector(`.draggable[data-shape="${numeroSoltado}"]`);
      zona.src = piezaCorrecta.src;
      piezaCorrecta.classList.add('hidden');
      verificarCompletado();
    } else {
      zona.classList.add('wrong');
      setTimeout(() => zona.classList.remove('wrong'), 800);
    }
  });
});

function verificarCompletado() {
  const piezasRestantes = document.querySelectorAll('.draggable:not(.hidden)');
  if (piezasRestantes.length === 0) {
    setTimeout(() => {
      localStorage.setItem("nivelCompleto", "el nivel de números");
      window.location.href = "final.html";
    }, 800);
  }
}
