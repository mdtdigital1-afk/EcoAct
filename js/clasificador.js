/**
 * Clasificador: tarjetas de categorías + buscador de residuos.
 */
window.Eco = window.Eco || {};

window.Eco.clasificador = {
  init() {
    this.pintarCategorias();
    this.buscador();
  },

  pintarCategorias() {
    const cont = document.getElementById("categorias");
    const cats = window.Eco.categorias;
    cont.innerHTML = Object.entries(cats).map(([clave, c], i) => `
      <button class="cat reveal d${i % 3}" style="--c:${c.color}" data-cat="${clave}" aria-expanded="false">
        <div class="cab">
          <span class="ico"><svg aria-hidden="true"><use href="#${c.icono}"/></svg></span>
          <h3>${c.nombre}</h3>
        </div>
        <p class="ej"><strong>Ejemplos:</strong> ${c.ejemplos}</p>
        <span class="mas">Ver cómo separarlo ＋</span>
        <div class="detalle">
          <strong>Cómo separarlo</strong>
          <ul>${c.pasos.map(p => `<li>${p}</li>`).join("")}</ul>
        </div>
      </button>`).join("");

    cont.addEventListener("click", e => {
      const btn = e.target.closest(".cat");
      if (!btn) return;
      const abierto = btn.getAttribute("aria-expanded") === "true";
      cont.querySelectorAll(".cat").forEach(b => b.setAttribute("aria-expanded", "false"));
      btn.setAttribute("aria-expanded", String(!abierto));
    });
    // Las tarjetas se crean después de iniciar el observador: las mostramos.
    cont.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
  },

  buscador() {
    const input = document.getElementById("busca");
    const salida = document.getElementById("resultado");
    const sug = document.getElementById("sugerencias");
    const { normalizar, escapar } = window.Eco.util;
    const items = window.Eco.items.map(it => ({
      ...it,
      texto: normalizar([it.nombre, ...it.claves].join(" "))
    }));

    const vacio = msg => { salida.innerHTML = `<div class="vacio">${msg}</div>`; };
    vacio("Escribe un residuo o elige una sugerencia para ver dónde depositarlo.");

    const mostrar = consulta => {
      const q = normalizar(consulta);
      if (q.length < 2) { vacio("Escribe un residuo o elige una sugerencia para ver dónde depositarlo."); return; }
      const palabras = q.split(/\s+/);
      const encontrados = items.filter(it => palabras.every(p => it.texto.includes(p))).slice(0, 5);
      if (!encontrados.length) {
        vacio(`No encontramos “${escapar(consulta)}”. Prueba con otro nombre o revisa las categorías de arriba. En caso de duda, consulta las reglas de tu municipio.`);
        return;
      }
      salida.innerHTML = encontrados.map(it => {
        const c = window.Eco.categorias[it.cat];
        return `<div class="res-item" style="--c:${c.color}">
          <span class="res-punto"></span>
          <div><h4>${it.nombre}</h4><span class="badge">${c.nombre}</span><p>${it.nota}</p></div>
        </div>`;
      }).join("");
    };

    input.addEventListener("input", () => mostrar(input.value));
    document.getElementById("formBusca").addEventListener("submit", e => { e.preventDefault(); mostrar(input.value); });

    ["botella", "cáscara", "pila", "caja de cartón", "lata", "popote", "frasco", "pañal"].forEach(s => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "chip"; b.textContent = s;
      b.addEventListener("click", () => { input.value = s; mostrar(s); });
      sug.appendChild(b);
    });
  }
};
