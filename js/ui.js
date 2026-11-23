/**
 * UI general: menú móvil, header, scrollspy, animaciones al desplazarse,
 * botón "volver arriba", diálogo de privacidad y utilidades.
 */
window.Eco = window.Eco || {};

window.Eco.util = {
  /** Minúsculas y sin acentos, para comparar textos. */
  normalizar(t) {
    return String(t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
  },
  /** Evita inyección de HTML al mostrar texto del usuario. */
  escapar(t) {
    const d = document.createElement("div");
    d.textContent = t;
    return d.innerHTML;
  }
};

window.Eco.ui = {
  init() {
    this.menu();
    this.header();
    this.scrollspy();
    this.reveal();
    this.privacidad();
    this.social();
  },

  menu() {
    const btn = document.getElementById("navToggle");
    const links = document.getElementById("navLinks");
    const header = document.getElementById("header");
    const cerrar = () => {
      links.classList.remove("abierto");
      header.classList.remove("menu-abierto");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Abrir menú");
      btn.querySelector("use").setAttribute("href", "#i-menu");
    };
    btn.addEventListener("click", () => {
      const abierto = links.classList.toggle("abierto");
      header.classList.toggle("menu-abierto", abierto);
      btn.setAttribute("aria-expanded", String(abierto));
      btn.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
      btn.querySelector("use").setAttribute("href", abierto ? "#i-cerrar" : "#i-menu");
    });
    links.addEventListener("click", e => { if (e.target.closest("a")) cerrar(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") cerrar(); });
  },

  header() {
    const header = document.getElementById("header");
    const arriba = document.getElementById("arriba");
    const alScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 30);
      arriba.classList.toggle("visible", window.scrollY > 600);
    };
    window.addEventListener("scroll", alScroll, { passive: true });
    alScroll();
    arriba.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  },

  /** Resalta en el menú la sección visible. */
  scrollspy() {
    const enlaces = [...document.querySelectorAll(".nav-links a")];
    const mapa = new Map(enlaces.map(a => [a.getAttribute("href").slice(1), a]));
    const obs = new IntersectionObserver(entradas => {
      entradas.forEach(en => {
        if (en.isIntersecting) {
          enlaces.forEach(a => a.classList.remove("activo"));
          const a = mapa.get(en.target.id);
          if (a) a.classList.add("activo");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    mapa.forEach((_, id) => { const s = document.getElementById(id); if (s) obs.observe(s); });
  },

  reveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("visible")); return; }
    const obs = new IntersectionObserver((lista, o) => {
      lista.forEach(en => { if (en.isIntersecting) { en.target.classList.add("visible"); o.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach(e => obs.observe(e));
  },

  privacidad() {
    const dlg = document.getElementById("privacidad");
    document.querySelectorAll("[data-abrir-privacidad]").forEach(b =>
      b.addEventListener("click", () => dlg.showModal()));
    document.getElementById("cerrarPriv").addEventListener("click", () => dlg.close());
    dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
  },

  /** Aplica los enlaces de redes definidos en config.js. */
  social() {
    const redes = window.Eco.config.social;
    document.querySelectorAll("[data-social]").forEach(a => {
      const url = redes[a.dataset.social];
      if (url) a.href = url;
    });
  }
};
