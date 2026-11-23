/**
 * Gráficos y contadores animados. Se activan al entrar en pantalla.
 * Datos y fuentes: ver sección #datos de index.html.
 */
window.Eco = window.Eco || {};

window.Eco.graficos = {
  init() {
    this.crearPila();
    const seccion = document.getElementById("datos");
    if (!("IntersectionObserver" in window)) { this.animar(); return; }
    const obs = new IntersectionObserver(([en], o) => {
      if (en.isIntersecting) { this.animar(); o.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(seccion);
  },

  animar() {
    this.contadores();
    document.querySelectorAll(".barra").forEach(b => { b.style.height = b.dataset.alto + "%"; });
    const circ = 2 * Math.PI * 40;
    document.querySelectorAll(".dona .seg").forEach(c => {
      const largo = circ * parseFloat(c.dataset.pct) / 100;
      c.style.strokeDasharray = `${largo} ${circ - largo}`;
      c.style.strokeDashoffset = -circ * parseFloat(c.dataset.offset) / 100;
    });
    document.querySelectorAll("#pila span").forEach((s, i) => {
      if (i < 9) setTimeout(() => s.classList.add("on"), 80 * i);
    });
  },

  contadores() {
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.querySelectorAll("[data-contar]").forEach(el => {
      const meta = parseFloat(el.dataset.contar);
      const dec = parseInt(el.dataset.decimales || "0", 10);
      const fmt = v => v.toLocaleString("es-MX", { minimumFractionDigits: dec, maximumFractionDigits: dec });
      if (reducido) { el.textContent = fmt(meta); return; }
      const dur = 1800, ini = performance.now();
      const paso = t => {
        const p = Math.min((t - ini) / dur, 1);
        el.textContent = fmt(meta * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(paso);
      };
      requestAnimationFrame(paso);
    });
  },

  /** 100 cuadros: 9 se iluminan (≈9 % del plástico se recicla). */
  crearPila() {
    const pila = document.getElementById("pila");
    pila.innerHTML = Array.from({ length: 100 }, () => "<span></span>").join("");
  }
};
