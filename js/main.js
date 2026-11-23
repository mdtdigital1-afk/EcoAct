/** Punto de entrada: inicializa los módulos en orden. */
document.addEventListener("DOMContentLoaded", () => {
  const { clasificador, ui, graficos, formularios } = window.Eco;
  clasificador.init();   // crea tarjetas antes de observar animaciones
  ui.init();
  graficos.init();
  formularios.init();
});
