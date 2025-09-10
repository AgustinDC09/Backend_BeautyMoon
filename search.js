// script.js (o js/search.js)
document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://backend-beautymoon.onrender.com/';
  const searchBtn     = document.getElementById('searchBtn');
  const searchModal   = document.getElementById('searchModal');
  const closeSearch   = document.getElementById('closeSearch');
  const searchInput   = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  let allProducts = [];

  // 1. Abre la modal
  searchBtn.addEventListener('click', () => {
    searchModal.style.display = 'flex';
    searchInput.focus();
  });

  // 2. Cierra la modal
  closeSearch.addEventListener('click', () => {
    searchModal.style.display = 'none';
    searchResults.innerHTML = '';
    searchInput.value = '';
  });

  // 3. Carga productos desde tu API o localStorage
  async function fetchProducts() {
    try {
      const res = await fetch(`${API_URL}/productos`);
      allProducts = await res.json();
    } catch (e) {
      console.error('Error al cargar productos:', e);
    }
  }

  // 4. Filtra y renderiza según término
  function renderSearchResults(term) {
    const filtro = term.trim().toLowerCase();
    const matches = allProducts.filter(p =>
      p.title.toLowerCase().includes(filtro)
    );

    // Si no hay coincidencias
    if (!matches.length) {
      searchResults.innerHTML = `<p>No se encontraron productos para “${term}”</p>`;
      return;
    }

    // Muestra tarjetas
    searchResults.innerHTML = matches.map(p => `
      <div class="search-result-card" data-id="${p.id}">
        <img src="${p.image}" alt="${p.title}">
        <h4>${p.title}</h4>
        <p>$${p.price.toLocaleString('es-AR')}</p>
      </div>
    `).join('');
  }

  // 5. Debounce para no filtrar en cada pulsación
  let timer;
  searchInput.addEventListener('input', () => {
    clearTimeout(timer);
    const term = searchInput.value;
    timer = setTimeout(() => renderSearchResults(term), 300);
  });

  // 6. Click en tarjeta → llevar a detalle o agregar al carrito
  searchResults.addEventListener('click', e => {
    const card = e.target.closest('.search-result-card');
    if (!card) return;
    const id = card.dataset.id;
    // Ejemplo: redirigir al detalle
    window.location.href = `producto.html?id=${id}`;
  });

  // Arranca cargando todos los productos
  fetchProducts();
});
