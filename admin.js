// Cargar vendedoras desde localStorage o usar valores iniciales
let vendedoras = JSON.parse(localStorage.getItem("vendedoras")) || [
];

// Guardar en localStorage
function guardarVendedoras() {
  localStorage.setItem("vendedoras", JSON.stringify(vendedoras));
}

// Renderizar en el panel de administrador
function renderVendedoras() {
  const contenedor = document.getElementById("listaVendedoras");
  contenedor.innerHTML = "";

  vendedoras.forEach(v => {
    const card = document.createElement("div");
    card.className = "card-vendedora";
    card.innerHTML = `
    <div class="vendor-info">
        <h3>${v.nombre}</h3>
        <div class="vendor-location">${v.puesto}</div>
    </div>
    <button onclick="modificarVendedora(${v.id})">Modificar</button>
    <button onclick="eliminarVendedora(${v.id})">Eliminar</button>
    `;


    contenedor.appendChild(card);
  });
}

// Crear nueva vendedora
document.getElementById("crearVendedora").addEventListener("click", () => {
  const nombre = document.getElementById("nombreVendedora").value.trim();
  const puesto = document.getElementById("puestoVendedora").value.trim();
  const imagen = document.getElementById("imagenVendedora").value.trim();
  const calificacion = parseInt(document.getElementById("calificacionVendedora").value);
  const vendidos = parseInt(document.getElementById("productosVendidos").value);

  if (!nombre || !puesto || !imagen || isNaN(calificacion) || isNaN(vendidos)) {
    alert("Completá todos los campos.");
    return;
  }

  const nueva = {
    id: Date.now(),
    nombre,
    puesto,
    imagen,
    calificacion,
    vendidos
  };

  vendedoras.push(nueva);
  guardarVendedoras();
  renderVendedoras();

  document.getElementById("nombreVendedora").value = "";
  document.getElementById("puestoVendedora").value = "";
  document.getElementById("imagenVendedora").value = "";
  document.getElementById("calificacionVendedora").value = "";
  document.getElementById("productosVendidos").value = "";
});


// Modificar vendedora
function modificarVendedora(id) {
  const v = vendedoras.find(v => v.id === id);
  const nuevoNombre = prompt("Nuevo nombre:", v.nombre);
  const nuevoPuesto = prompt("Nueva descripción:", v.puesto);
  const nuevaImagen = prompt("Nueva URL de imagen:", v.imagen);

  if (nuevoNombre && nuevoPuesto && nuevaImagen) {
    v.nombre = nuevoNombre;
    v.puesto = nuevoPuesto;
    v.imagen = nuevaImagen;
    guardarVendedoras();
    renderVendedoras();
  }
}

// Eliminar vendedora
function eliminarVendedora(id) {
  if (confirm("¿Eliminar esta vendedora?")) {
    vendedoras = vendedoras.filter(v => v.id !== id);
    guardarVendedoras();
    renderVendedoras();
  }
}



// Inicializar
renderVendedoras();
