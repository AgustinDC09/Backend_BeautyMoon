let productos = JSON.parse(localStorage.getItem("productos")) || [];

function guardarProductos() {
  localStorage.setItem("productos", JSON.stringify(productos));
}

function renderProductos() {
  const contenedor = document.getElementById("listaProductos");
  contenedor.innerHTML = "";

  productos.forEach(p => {
    const card = document.createElement("div");
    card.className = "card-producto";
    card.innerHTML = `
      <strong>${p.nombre}</strong> - ${p.categoria} - $${p.precio}
      <br><em>Descuento: ${p.descuento}%</em>
      <br><small>Vendedor: ${p.vendedor}</small>
      <button onclick="modificarProducto(${p.id})">Modificar</button>
      <button onclick="eliminarProducto(${p.id})">Eliminar</button>
    `;
    contenedor.appendChild(card);
  });
}

document.getElementById("agregarProducto").addEventListener("click", () => {
  const nombre = document.getElementById("nombreProducto").value.trim();
  const categoria = document.getElementById("categoriaProducto").value.trim();
  const precio = parseFloat(document.getElementById("precioProducto").value);
  const descuento = parseInt(document.getElementById("descuentoProducto").value);
  const imagen = document.getElementById("imagenProducto").value.trim();
  const vendedor = document.getElementById("vendedorProducto").value.trim();

  if (!nombre || !categoria || isNaN(precio) || isNaN(descuento) || !imagen || !vendedor) {
    alert("Completá todos los campos correctamente.");
    return;
  }

  const nuevo = {
    id: Date.now(),
    nombre,
    categoria,
    precio,
    descuento,
    imagen,
    vendedor
  };

  productos.push(nuevo);
  guardarProductos();
  renderProductos();

  // Limpiar campos
  document.getElementById("nombreProducto").value = "";
  document.getElementById("categoriaProducto").value = "";
  document.getElementById("precioProducto").value = "";
  document.getElementById("descuentoProducto").value = "";
  document.getElementById("imagenProducto").value = "";
  document.getElementById("vendedorProducto").value = "";
});

function modificarProducto(id) {
  const p = productos.find(p => p.id === id);
  const nuevoNombre = prompt("Nuevo nombre:", p.nombre);
  const nuevaCategoria = prompt("Nueva categoría:", p.categoria);
  const nuevoPrecio = parseFloat(prompt("Nuevo precio:", p.precio));
  const nuevoDescuento = parseInt(prompt("Nuevo descuento:", p.descuento));
  const nuevaImagen = prompt("Nueva URL de imagen:", p.imagen);
  const nuevoVendedor = prompt("Nuevo vendedor:", p.vendedor);

  if (nuevoNombre && nuevaCategoria && !isNaN(nuevoPrecio) && !isNaN(nuevoDescuento) && nuevaImagen && nuevoVendedor) {
    p.nombre = nuevoNombre;
    p.categoria = nuevaCategoria;
    p.precio = nuevoPrecio;
    p.descuento = nuevoDescuento;
    p.imagen = nuevaImagen;
    p.vendedor = nuevoVendedor;
    guardarProductos();
    renderProductos();
  }
}

function eliminarProducto(id) {
  if (confirm("¿Eliminar este producto?")) {
    productos = productos.filter(p => p.id !== id);
    guardarProductos();
    renderProductos();
  }
}

renderProductos();
