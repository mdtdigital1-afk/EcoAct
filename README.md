# EcoAcción · Pequeñas acciones, grandes cambios

Campaña digital de concientización sobre el reciclaje (HTML5 + CSS3 + JavaScript, sin dependencias).

## Cómo abrirla
Doble clic en `index.html` (o `python -m http.server 8123` y abrir http://localhost:8123).

## Estructura
```
index.html            Estructura y contenido (7 apartados)
css/styles.css        Estilos y diseño responsivo
js/config.js          ENLACES DE REDES, correo de contacto (editar aquí)
js/data-residuos.js   Categorías y lista de residuos del buscador
js/ui.js              Menú móvil, scrollspy, animaciones, privacidad
js/clasificador.js    Tarjetas de categorías y buscador
js/graficos.js        Contadores y gráficos animados
js/formularios.js     Validación, compromisos y contacto
js/main.js            Inicialización
assets/favicon.svg
```

## Por completar antes de publicar
- **Redes sociales:** `@ecoaccion.mx` es ficticio. Cambia los enlaces en `js/config.js`.
- **Correo:** el formulario de contacto abre el programa de correo (`mailto:`) hacia `correoContacto` en `js/config.js`; no hay servidor. Sustitúyelo por un correo real.
- **Compromisos:** se guardan en `localStorage` del navegador. El contador es local, no global. Un contador global requeriría backend (p. ej. Python + MySQL).
- **Fotografías:** la página usa ilustraciones vectoriales. Puedes añadir fotos propias o con licencia libre.
- **Tipografía:** Poppins vía Google Fonts (con respaldo del sistema).

## Fuentes de las estadísticas
- Banco Mundial, *What a Waste 2.0*: 2.01 mil millones t (2016) → 3.40 mil millones t (2050); ≥33 % mal gestionado. https://datatopics.worldbank.org/what-a-waste (existe una edición 3.0 con cifras más recientes: conviene actualizarlas si se desea).
- SEMARNAT, *Diagnóstico Básico para la Gestión Integral de los Residuos* (2020): 120,128 t/día; 46.42 % orgánicos, 31.56 % potencialmente reciclables, 22 % otros. Se enlaza una copia alojada en ceiba.org.mx; verifica contra la versión oficial en gob.mx/semarnat.
- PNUMA: más de 400 millones t de plástico al año, la mitad de un solo uso; 19–23 millones t/año llegan a ecosistemas acuáticos; ~9 % reciclado (OCDE). https://www.unep.org/beatplasticpollution
