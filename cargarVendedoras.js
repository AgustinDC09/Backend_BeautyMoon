document.addEventListener("DOMContentLoaded", () => {
  const vendorGrid = document.getElementById("vendorGrid");
  if (!vendorGrid) return;

  vendorGrid.innerHTML = "";

  const vendedoras = JSON.parse(localStorage.getItem("vendedoras")) || [];

  vendedoras.forEach(v => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${v.imagen}" alt="${v.nombre}" class="vendor-photo" />
      <h3>${v.nombre}</h3>
      <p>${v.puesto}</p>
    `;
    vendorGrid.appendChild(card);
  });

  
});
function generarEstrellas(n) {
  return "⭐".repeat(n);
}

vendedoras.forEach(v => {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <img src="${v.imagen}" alt="${v.nombre}" />
    <div class="vendor-info">
      <h3>${v.nombre}</h3>
      <div class="vendor-location">${v.puesto}</div>
    </div>
    <p>${v.puesto}</p>
    <p class="estrellas">${generarEstrellas(v.calificacion)}</p>
    <p><strong>Productos vendidos:</strong> ${v.vendidos}</p>
  `;
  vendorGrid.appendChild(card);
});
