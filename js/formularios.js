/**
 * Formularios con validación, compromisos (localStorage) y acciones.
 */
window.Eco = window.Eco || {};

window.Eco.formularios = {
  acciones: {
    casa: ["Separa tus residuos en al menos tres botes.", "Haz composta con cáscaras y restos de frutas y verduras.", "Usa bolsas de tela y envases reutilizables.", "Enjuaga y aplasta los envases antes de reciclarlos.", "Repara o dona lo que ya no uses en vez de tirarlo."],
    escuela: ["Propón botes de separación en tu salón.", "Usa ambos lados de las hojas de tus cuadernos.", "Lleva una botella reutilizable y evita desechables.", "Organiza una campaña de acopio de papel o tapas.", "Comparte lo aprendido con tus compañeros."],
    trabajo: ["Imprime solo lo indispensable y usa ambas caras.", "Lleva tu taza y tus cubiertos reutilizables.", "Propón puntos de acopio de pilas y electrónicos.", "Elige proveedores con empaques reducidos.", "Apaga y desconecta equipos que no uses."]
  },

  init() {
    this.acciones_ui();
    this.compromisos();
    this.contacto();
    this.hashtag();
  },

  /* ---------- Validación genérica ---------- */
  marcar(campo, ok) {
    campo.closest(".campo").classList.toggle("error", !ok);
    return ok;
  },

  /* ---------- Acciones por lugar ---------- */
  acciones_ui() {
    const lista = document.getElementById("acciones");
    const tabs = document.querySelectorAll(".tab");
    const pintar = lugar => {
      lista.innerHTML = this.acciones[lugar].map(a =>
        `<li><span>${a}</span><button type="button" class="usar" data-texto="${a}">Usar como compromiso</button></li>`).join("");
    };
    tabs.forEach(t => t.addEventListener("click", () => {
      tabs.forEach(x => x.setAttribute("aria-selected", String(x === t)));
      pintar(t.dataset.lugar);
    }));
    lista.addEventListener("click", e => {
      const b = e.target.closest(".usar");
      if (!b) return;
      const area = document.getElementById("cTexto");
      area.value = "Me comprometo a: " + b.dataset.texto.replace(/\.$/, "").replace(/^./, c => c.toLowerCase()) + ".";
      area.dispatchEvent(new Event("input"));
      document.getElementById("formCompromiso").scrollIntoView({ behavior: "smooth", block: "center" });
      area.focus({ preventScroll: true });
    });
    pintar("casa");
  },

  /* ---------- Compromisos guardados en el navegador ---------- */
  leer() {
    try { return JSON.parse(localStorage.getItem(window.Eco.config.claveCompromisos)) || []; }
    catch { return []; }
  },
  guardar(lista) {
    try { localStorage.setItem(window.Eco.config.claveCompromisos, JSON.stringify(lista)); return true; }
    catch { return false; }
  },

  compromisos() {
    const form = document.getElementById("formCompromiso");
    const nombre = document.getElementById("cNombre");
    const texto = document.getElementById("cTexto");
    const acepto = document.getElementById("cAcepto");
    const estado = document.getElementById("estadoComp");
    const cuenta = document.getElementById("cuenta");
    const lista = document.getElementById("listaComp");
    const total = document.getElementById("totalComp");
    const { escapar } = window.Eco.util;

    const pintar = () => {
      const datos = this.leer();
      total.textContent = datos.length;
      lista.innerHTML = datos.length
        ? datos.slice().reverse().map(c => `<li>“${escapar(c.texto)}”<span class="quien">— ${escapar(c.nombre)} · <button type="button" class="link-btn" style="color:var(--verde)" data-borrar="${c.id}">Eliminar</button></span></li>`).join("")
        : `<li class="lista-vacia" style="background:none;border:0;box-shadow:none">Aún no hay compromisos. ¡Sé la primera persona en registrar el tuyo!</li>`;
    };

    texto.addEventListener("input", () => { cuenta.textContent = texto.value.length; });
    lista.addEventListener("click", e => {
      const b = e.target.closest("[data-borrar]");
      if (!b) return;
      this.guardar(this.leer().filter(c => String(c.id) !== b.dataset.borrar));
      pintar();
    });

    form.addEventListener("submit", e => {
      e.preventDefault();
      estado.className = "estado";
      const v1 = this.marcar(nombre, nombre.value.trim().length >= 2);
      const v2 = this.marcar(texto, texto.value.trim().length >= 15);
      const v3 = this.marcar(acepto, acepto.checked);
      if (!(v1 && v2 && v3)) return;
      const datos = this.leer();
      datos.push({ id: Date.now(), nombre: nombre.value.trim(), texto: texto.value.trim() });
      if (this.guardar(datos)) {
        estado.textContent = "¡Gracias! Tu compromiso quedó registrado en este navegador.";
        estado.className = "estado ok";
        form.reset(); cuenta.textContent = "0";
        pintar();
      } else {
        estado.textContent = "No se pudo guardar en este navegador (almacenamiento bloqueado).";
        estado.className = "estado mal";
      }
    });
    [nombre, texto].forEach(c => c.addEventListener("input", () => c.closest(".campo").classList.remove("error")));
    pintar();
  },

  /* ---------- Contacto: valida y prepara el correo (mailto) ---------- */
  contacto() {
    const form = document.getElementById("formContacto");
    const n = document.getElementById("kNombre");
    const c = document.getElementById("kCorreo");
    const m = document.getElementById("kMensaje");
    const a = document.getElementById("kAcepto");
    const estado = document.getElementById("estadoContacto");
    const reCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    form.addEventListener("submit", e => {
      e.preventDefault();
      estado.className = "estado";
      const ok = [
        this.marcar(n, n.value.trim().length >= 2),
        this.marcar(c, reCorreo.test(c.value.trim())),
        this.marcar(m, m.value.trim().length >= 10),
        this.marcar(a, a.checked)
      ].every(Boolean);
      if (!ok) return;
      const asunto = encodeURIComponent("Mensaje desde EcoAcción");
      const cuerpo = encodeURIComponent(`Nombre: ${n.value.trim()}\nCorreo: ${c.value.trim()}\n\n${m.value.trim()}`);
      window.location.href = `mailto:${window.Eco.config.correoContacto}?subject=${asunto}&body=${cuerpo}`;
      estado.textContent = "Abrimos tu programa de correo con el mensaje listo. Envíalo desde ahí para completarlo.";
      estado.className = "estado ok";
    });
    [n, c, m].forEach(x => x.addEventListener("input", () => x.closest(".campo").classList.remove("error")));
  },

  /* ---------- Copiar hashtag ---------- */
  hashtag() {
    const btn = document.getElementById("copiarHashtag");
    const estado = document.getElementById("estadoHash");
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText("#EcoAccion");
        estado.textContent = "Hashtag copiado: #EcoAccion";
        estado.className = "estado ok";
      } catch {
        estado.textContent = "No se pudo copiar automáticamente. El hashtag es #EcoAccion.";
        estado.className = "estado mal";
      }
    });
  }
};
