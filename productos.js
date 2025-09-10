document.addEventListener("DOMContentLoaded", () => {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  const grid = document.getElementById("allProductsGrid");

  const categoryFilter = document.getElementById("categoryFilter");
  const priceFilter = document.getElementById("priceFilter");
  const vendorFilter = document.getElementById("vendorFilter");
  const sortFilter = document.getElementById("productSortFilter");

  function renderizarProductos(lista) {
    grid.innerHTML = "";

    if (lista.length === 0) {
      grid.innerHTML = "<p>No se encontraron productos.</p>";
      return;
    }

    lista.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <div class="product-image">
          <img src="${p.imagen}" alt="${p.nombre}" class="product-img">

          ${p.descuento ? `<div class="discount-badge">-${p.descuento}%</div>` : ""}
        </div>
        <div class="product-info">
          <h3>${p.nombre}</h3>
          <p class="product-category">${p.categoria}</p>
          <p class="product-price">$${(p.precio * (1 - p.descuento / 100)).toFixed(2)}</p>
          <p class="product-vendor">Vendedor: ${p.vendedor}</p>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function aplicarFiltros() {
    let filtrados = [...productos];

    const categoria = categoryFilter.value;
    const precio = priceFilter.value;
    const vendedor = vendorFilter.value;
    const orden = sortFilter.value;

    if (categoria) {
      filtrados = filtrados.filter(p => p.categoria === categoria);
    }

    if (precio) {
      const [min, max] = precio === "35+" ? [35, Infinity] : precio.split("-").map(Number);
      filtrados = filtrados.filter(p => p.precio >= min && p.precio <= max);
    }

    if (vendedor) {
      filtrados = filtrados.filter(p => p.vendedor === vendedor);
    }

    if (orden === "price-low") {
      filtrados.sort((a, b) => a.precio - b.precio);
    } else if (orden === "price-high") {
      filtrados.sort((a, b) => b.precio - a.precio);
    } else if (orden === "discount") {
      filtrados.sort((a, b) => b.descuento - a.descuento);
    } else if (orden === "name") {
      filtrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }

    renderizarProductos(filtrados);
  }

  categoryFilter.addEventListener("change", aplicarFiltros);
  priceFilter.addEventListener("change", aplicarFiltros);
  vendorFilter.addEventListener("change", aplicarFiltros);
  sortFilter.addEventListener("change", aplicarFiltros);
  document.getElementById("clearProductFilters").addEventListener("click", () => {
    categoryFilter.value = "";
    priceFilter.value = "";
    vendorFilter.value = "";
    sortFilter.value = "featured";
    renderizarProductos(productos);
  });

  renderizarProductos(productos);
});
