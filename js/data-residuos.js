/**
 * DATOS DE CLASIFICACIÓN DE RESIDUOS
 * Para agregar un residuo, añade un objeto a Eco.items con:
 *   nombre, cat (clave de categoría), claves (palabras de búsqueda), nota (consejo).
 */
window.Eco = window.Eco || {};

window.Eco.categorias = {
  papel: {
    nombre: "Papel y cartón", color: "#e0a526", icono: "i-papel",
    ejemplos: "Cuadernos, periódicos, cajas de cartón, sobres",
    pasos: ["Mantenlo seco y limpio.", "Aplana las cajas de cartón.", "Retira plásticos, grapas grandes y cintas."]
  },
  plastico: {
    nombre: "Plásticos", color: "#3b82c4", icono: "i-botella",
    ejemplos: "Botellas PET, envases, bolsas limpias, tapas",
    pasos: ["Vacía y enjuaga el envase.", "Aplástalo para ahorrar espacio.", "Revisa el número de reciclaje y las reglas de tu localidad."]
  },
  vidrio: {
    nombre: "Vidrio", color: "#1fa3a3", icono: "i-vidrio",
    ejemplos: "Botellas, frascos, envases de alimentos",
    pasos: ["Enjuaga y quita las tapas.", "No mezcles con cerámica ni espejos.", "Si hay piezas rotas, envuélvelas para evitar cortes."]
  },
  metal: {
    nombre: "Metales", color: "#7a8691", icono: "i-lata",
    ejemplos: "Latas de aluminio, latas de conserva, tapas metálicas",
    pasos: ["Enjuaga para quitar restos de comida.", "Aplasta las latas de aluminio.", "Separa las latas de aerosol vacías con cuidado."]
  },
  organico: {
    nombre: "Residuos orgánicos", color: "#7a5230", icono: "i-manzana",
    ejemplos: "Cáscaras, restos de frutas y verduras, café, hojas",
    pasos: ["Usa un recipiente con tapa.", "Puedes hacer composta casera.", "No mezcles con plásticos ni vidrio."]
  },
  noreciclable: {
    nombre: "No reciclables y especiales", color: "#5b5f66", icono: "i-basura",
    ejemplos: "Pañales, colillas, servilletas sucias, pilas, focos",
    pasos: ["Colócalos en la bolsa de residuos generales.", "Pilas, electrónicos y focos: llévalos a centros de acopio.", "Evita mezclarlos con los reciclables."]
  }
};

window.Eco.items = [
  // Papel y cartón
  { nombre: "Periódico", cat: "papel", claves: ["periodico", "diario", "revista"], nota: "Limpio y seco." },
  { nombre: "Cuaderno u hojas", cat: "papel", claves: ["cuaderno", "hojas", "papel", "folder", "libreta"], nota: "Retira espirales de plástico si es posible." },
  { nombre: "Caja de cartón", cat: "papel", claves: ["caja", "carton", "empaque", "paquete"], nota: "Aplástala y retira la cinta adhesiva." },
  { nombre: "Sobre", cat: "papel", claves: ["sobre", "carta"], nota: "Si tiene ventana de plástico, retírala." },
  { nombre: "Caja de huevo (cartón)", cat: "papel", claves: ["huevo", "huevos", "cartera"], nota: "También sirve para composta si está limpia." },
  { nombre: "Caja de pizza con grasa", cat: "organico", claves: ["pizza", "grasa"], nota: "La parte limpia va a papel; la parte con grasa va a orgánicos." },
  { nombre: "Papel con comida o muy sucio", cat: "noreciclable", claves: ["papel sucio", "servilleta", "papel higienico", "papel encerado"], nota: "El papel contaminado no se recicla." },
  { nombre: "Envase multicapa (tipo jugo o leche)", cat: "papel", claves: ["tetra", "tetrapak", "brik", "jugo", "leche", "multicapa"], nota: "Enjuaga y aplasta. Requiere plantas especiales: confirma si tu localidad lo acepta." },
  // Plásticos
  { nombre: "Botella de agua o refresco (PET)", cat: "plastico", claves: ["botella", "pet", "agua", "refresco", "garrafon"], nota: "Vacía, enjuaga y aplasta." },
  { nombre: "Envase de shampoo o detergente", cat: "plastico", claves: ["shampoo", "detergente", "jabon", "limpiador", "bote"], nota: "Enjuaga antes de separar." },
  { nombre: "Bolsa de plástico limpia", cat: "plastico", claves: ["bolsa", "bolsa plastico", "empaque"], nota: "Limpia y seca. Mejor reutilízala antes de desecharla." },
  { nombre: "Tapa de plástico", cat: "plastico", claves: ["tapa", "tapon", "tapadera"], nota: "Separa de la botella si tu centro de acopio lo pide." },
  { nombre: "Popote o cubiertos desechables", cat: "noreciclable", claves: ["popote", "pajilla", "cubiertos", "cubierto", "desechable"], nota: "Por su tamaño y material suelen no reciclarse. Mejor evítalos." },
  { nombre: "Unicel (poliestireno)", cat: "noreciclable", claves: ["unicel", "poliestireno", "espuma", "vaso termico"], nota: "Reduce su uso; rara vez se recicla." },
  { nombre: "Vaso de plástico limpio", cat: "plastico", claves: ["vaso", "vaso plastico"], nota: "Enjuaga antes de depositar." },
  // Vidrio
  { nombre: "Botella de vidrio", cat: "vidrio", claves: ["botella vidrio", "cerveza", "vino", "refresco vidrio"], nota: "Enjuaga y retira la tapa." },
  { nombre: "Frasco de vidrio", cat: "vidrio", claves: ["frasco", "mermelada", "conserva"], nota: "Reutilízalo para guardar alimentos antes de reciclar." },
  { nombre: "Vaso o copa de vidrio", cat: "vidrio", claves: ["copa", "vaso vidrio"], nota: "Si está roto, envuélvelo en papel." },
  { nombre: "Espejo o vidrio de ventana", cat: "noreciclable", claves: ["espejo", "ventana", "cristal", "parabrisas", "ceramica", "plato"], nota: "Tiene un tratamiento distinto al envase de vidrio; no se mezcla." },
  { nombre: "Foco o lámpara", cat: "noreciclable", claves: ["foco", "lampara", "bombilla", "fluorescente"], nota: "Residuo especial: llévalo a un centro de acopio." },
  // Metales
  { nombre: "Lata de aluminio (refresco o cerveza)", cat: "metal", claves: ["lata", "aluminio", "refresco", "cerveza"], nota: "Enjuaga y aplasta." },
  { nombre: "Lata de conserva (atún, frijoles)", cat: "metal", claves: ["conserva", "atun", "frijoles", "lata acero", "hojalata"], nota: "Quita restos de comida; dobla la tapa hacia dentro." },
  { nombre: "Papel aluminio limpio", cat: "metal", claves: ["papel aluminio", "aluminio", "foil"], nota: "Hazlo bolita; debe estar limpio." },
  { nombre: "Tapa metálica", cat: "metal", claves: ["tapa metalica", "corona", "chapa"], nota: "Puedes juntarlas dentro de una lata." },
  { nombre: "Llaves, clavos o piezas pequeñas de metal", cat: "metal", claves: ["llave", "llaves", "clavo", "clavos", "tornillo", "chatarra"], nota: "Llévalas a un centro de acopio de metales." },
  // Orgánicos
  { nombre: "Cáscaras de frutas y verduras", cat: "organico", claves: ["cascara", "cascaras", "fruta", "verdura", "platano", "naranja", "manzana"], nota: "Ideales para composta." },
  { nombre: "Restos de comida", cat: "organico", claves: ["comida", "sobras", "restos", "arroz", "pan", "tortilla"], nota: "Evita carnes y lácteos en composta casera." },
  { nombre: "Café molido y bolsitas de té", cat: "organico", claves: ["cafe", "te", "bolsita", "filtro"], nota: "Retira grapas y etiquetas." },
  { nombre: "Cascarón de huevo", cat: "organico", claves: ["cascaron", "huevo"], nota: "Tritúralo antes de agregarlo a la composta." },
  { nombre: "Hojas y restos de poda", cat: "organico", claves: ["hojas", "poda", "pasto", "jardin", "flores", "planta"], nota: "Excelente material para composta." },
  // No reciclables / especiales
  { nombre: "Pañal desechable", cat: "noreciclable", claves: ["panal", "toalla sanitaria", "higienico"], nota: "Envuélvelo y deposítalo en residuos generales." },
  { nombre: "Colilla de cigarro", cat: "noreciclable", claves: ["colilla", "cigarro", "cigarrillo"], nota: "Apágala por completo antes de tirarla." },
  { nombre: "Pila o batería", cat: "noreciclable", claves: ["pila", "pilas", "bateria", "baterias"], nota: "Residuo peligroso: nunca a la basura común. Llévala a un centro de acopio." },
  { nombre: "Celular o aparato electrónico", cat: "noreciclable", claves: ["celular", "telefono", "cargador", "cable", "electronico", "computadora", "laptop"], nota: "Residuo electrónico: busca centros de acopio o programas de reciclaje." },
  { nombre: "Chicle", cat: "noreciclable", claves: ["chicle", "goma de mascar"], nota: "Envuélvelo en papel y deposítalo en residuos generales." },
  { nombre: "Cubrebocas", cat: "noreciclable", claves: ["cubrebocas", "mascarilla", "tapabocas"], nota: "Córtale las tiras, envuélvelo y deséchalo en residuos generales." }
];
