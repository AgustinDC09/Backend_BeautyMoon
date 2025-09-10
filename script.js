// Sample data for vendors and products

const vendorsData = [
  {
    id: 1,
    name: "María González",
    location: "Centro",
    avatar: "public/middle-aged-woman-vendor-natural-products.jpg",
    rating: 4.8,
    reviews: 124,
    specialties: ["Maquillaje", "Fragancias"],
    products: 45,
    sales: 230,
    verified: true,
  },
  {
    id: 2,
    name: "Ana Rodríguez",
    location: "Zona Norte",
    avatar: "public/young-woman-vendor-trendy.jpg",
    rating: 4.9,
    reviews: 89,
    specialties: ["Cuidado de la Piel", "Anti-edad"],
    products: 32,
    sales: 156,
    verified: true,
  },
  {
    id: 3,
    name: "Carmen López",
    location: "Zona Sur",
    avatar: "public/beautiful-woman-vendor-smiling.jpg",
    rating: 4.7,
    reviews: 203,
    specialties: ["Cuidado del Cabello", "Accesorios"],
    products: 67,
    sales: 445,
    verified: true,
  },
  {
    id: 4,
    name: "Isabel Martín",
    location: "Zona Este",
    avatar: "/young-latina-woman.png",
    rating: 4.6,
    reviews: 76,
    specialties: ["Maquillaje", "Cuidado de la Piel"],
    products: 28,
    sales: 98,
    verified: false,
  },
  {
    id: 5,
    name: "Rosa Fernández",
    location: "Zona Oeste",
    avatar: "/middle-aged-latina-woman.jpg",
    rating: 4.9,
    reviews: 167,
    specialties: ["Fragancias", "Maquillaje"],
    products: 53,
    sales: 312,
    verified: true,
  },
  {
    id: 6,
    name: "Lucía Herrera",
    location: "Centro",
    avatar: "/young-professional-latina.jpg",
    rating: 4.5,
    reviews: 45,
    specialties: ["Cuidado de la Piel"],
    products: 19,
    sales: 67,
    verified: false,
  },
]

const productsData = [
  {
    id: 1,
    name: "Labial Mate Avón True",
    vendor: "María González",
    image: "public/red-lipstick-avon-cosmetic-product.jpg",
    currentPrice: 1200,
    originalPrice: 1500,
    discount: 20,
    inStock: true,
  },
  {
    id: 2,
    name: "Crema Anti-edad Anew",
    vendor: "Ana Rodríguez",
    image: "public/anti-aging-cream-jar-avon-anew.jpg",
    currentPrice: 2500,
    originalPrice: 3247,
    discount: 23,
    inStock: true,
  },
  {
    id: 3,
    name: "Perfume Far Away",
    vendor: "Rosa Fernández",
    image: "public/elegant-perfume-bottle-avon-far-away.jpg",
    currentPrice: 3500,
    originalPrice: 4321,
    discount: 19,
    inStock: false,
  },
  {
    id: 4,
    name: "Máscara de pestañas Avon",
    vendor: "Carmen López",
    image: "public/black-mascara-tube-avon-supershock.jpg",
    currentPrice: 1800,
    originalPrice: 2188,
    discount: 23,
    inStock: true,
  },
  {    name: "Protector solar Avon",
    vendor: "Isabel Martín",
    image: "public/sunscreen-bottle-avon-planet-spa.jpg",
    currentPrice: 1500,
    originalPrice: 1899,
    discount: 21,
    inStock: true,
  },
  {
    id: 6,
    name: "colonia negra Avon",
    vendor: "Lucía Herrera",
    image: "public/black-cologne-bottle-avon-mesmerize.jpg",
    currentPrice: 3200,
    originalPrice: 4325,
    discount: 26,
    inStock: true,
  },
]

// DOM Elements
                  // usa estos datos de ejemplo
const searchBtn = document.getElementById("searchBtn")
const searchModal = document.getElementById("searchModal")
const closeSearch = document.getElementById("closeSearch")
const searchInput = document.getElementById("searchInput")

// Search Modal Functionality
if (searchBtn && searchModal) {
  searchBtn.addEventListener("click", () => {
    searchModal.classList.add("active")
    searchInput.focus()
  })
}

if (closeSearch && searchModal) {
  closeSearch.addEventListener("click", () => {
    searchModal.classList.remove("active")
  })
}

if (searchModal) {
  searchModal.addEventListener("click", (e) => {
    if (e.target === searchModal) {
      searchModal.classList.remove("active")
    }
  })
}

// Escape key to close search
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && searchModal && searchModal.classList.contains("active")) {
    searchModal.classList.remove("active")
  }
})

// Generate stars for rating
function generateStars(rating) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  let starsHTML = ""

  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<img src="public/star.png" alt="Estrella" class="star-icon" />'
  }

  if (hasHalfStar) {
    starsHTML += '<img src="public/star.png" alt="Estrella" class="star-icon" />'
  }

  const emptyStars = 5 - Math.ceil(rating)
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<img src="public/star.png" alt="Estrella" class="star-icon" />'
  }

  return starsHTML
}

// Create vendor card HTML
function createVendorCard(vendor) {
  return `
        <div class="vendor-card">
            <div class="vendor-header">
                <img src="${vendor.avatar}" alt="${vendor.name}" class="vendor-avatar">
                <div class="vendor-info">
                    <h3>${vendor.name} ${vendor.verified ? '<span class="verified-badge"><img src="public/check.png" alt="Verificado" class="icon-img" /></i> Verificado</span>' : ""}</h3>
                    <div class="vendor-location">
                        <img src="public/location.png" alt="Ubicación" class="icon-img" />
                        ${vendor.location}
                    </div>
                </div>
            </div>
            <div class="vendor-rating">
                <div class="stars">
                    ${generateStars(vendor.rating)}
                </div>
                <span class="rating-text">${vendor.rating} (${vendor.reviews} reseñas)</span>
            </div>
            <div class="vendor-specialties">
                ${vendor.specialties.map((specialty) => `<span class="specialty-tag">${specialty}</span>`).join("")}
            </div>
            <div class="vendor-stats">
                <div class="stat">
                    <div class="stat-value">${vendor.products}</div>
                    <div class="stat-label">Productos</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${vendor.sales}</div>
                    <div class="stat-label">Ventas</div>
                </div>
            </div>
            <div class="vendor-actions">
                <button class="btn btn-primary">Ver Puesto</button>
                <button class="btn btn-outline">Contactar</button>
            </div>
        </div>
    `
}

// Create product card HTML
function createProductCard(product) {
  return `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.discount ? `<div class="discount-badge">-${product.discount}%</div>` : ""}
                
            </div>
            <div class="product-content">
                <div class="product-vendor">Por ${product.vendor}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    <span class="current-price">$${product.currentPrice}</span>
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ""}
                </div>
                <div class="product-actions">
                    ${
                      product.inStock
                        ? `<button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">Agregar al Carrito</button>`
                        : '<div class="stock-status out-of-stock">Agotado</div>'
                    }
                </div>
            </div>
        </div>
    `
}

// Load vendors on homepage
function loadVendors() {
  const vendorGrid = document.getElementById("vendorGrid")
  if (vendorGrid) {
    const featuredVendors = vendorsData.slice(0, 3)
    vendorGrid.innerHTML = featuredVendors.map((vendor) => createVendorCard(vendor)).join("")
  }
}

// Load products on homepage
function loadProducts() {
  const productsGrid = document.getElementById("productsGrid")
  if (productsGrid) {
    const featuredProducts = productsData.slice(0, 6)
    productsGrid.innerHTML = featuredProducts.map((product) => createProductCard(product)).join("")
  }
}

// Load all vendors on vendors page
function loadAllVendors() {
  const allVendorsGrid = document.getElementById("allVendorsGrid")
  if (allVendorsGrid) {
    allVendorsGrid.innerHTML = vendorsData.map((vendor) => createVendorCard(vendor)).join("")
    updateResultsCount(vendorsData.length)
  }
}

// Update results count
function updateResultsCount(count) {
  const resultsCount = document.getElementById("resultsCount")
  if (resultsCount) {
    resultsCount.textContent = `Mostrando ${count} de ${vendorsData.length} vendedores`
  }
}

// Filter functionality for vendors page
function setupFilters() {
  const locationFilter = document.getElementById("locationFilter")
  const specialtyFilter = document.getElementById("specialtyFilter")
  const ratingFilter = document.getElementById("ratingFilter")
  const sortFilter = document.getElementById("sortFilter")
  const clearFilters = document.getElementById("clearFilters")

  function applyFilters() {
    let filteredVendors = [...vendorsData]

    // Location filter
    if (locationFilter && locationFilter.value) {
      filteredVendors = filteredVendors.filter((vendor) =>
        vendor.location.toLowerCase().includes(locationFilter.value.toLowerCase()),
      )
    }

    // Specialty filter
    if (specialtyFilter && specialtyFilter.value) {
      filteredVendors = filteredVendors.filter((vendor) =>
        vendor.specialties.some((specialty) => specialty.toLowerCase().includes(specialtyFilter.value.toLowerCase())),
      )
    }

    // Rating filter
    if (ratingFilter && ratingFilter.value) {
      const minRating = Number.parseFloat(ratingFilter.value)
      filteredVendors = filteredVendors.filter((vendor) => vendor.rating >= minRating)
    }

    // Sort filter
    if (sortFilter && sortFilter.value) {
      switch (sortFilter.value) {
        case "rating":
          filteredVendors.sort((a, b) => b.rating - a.rating)
          break
        case "products":
          filteredVendors.sort((a, b) => b.products - a.products)
          break
        case "recent":
          // For demo purposes, we'll sort by ID (assuming higher ID = more recent)
          filteredVendors.sort((a, b) => b.id - a.id)
          break
        case "name":
          filteredVendors.sort((a, b) => a.name.localeCompare(b.name))
          break
      }
    }

    // Update the vendors grid
    const allVendorsGrid = document.getElementById("allVendorsGrid")
    if (allVendorsGrid) {
      allVendorsGrid.innerHTML = filteredVendors.map((vendor) => createVendorCard(vendor)).join("")
      updateResultsCount(filteredVendors.length)
    }
  }

  // Add event listeners to filters
  if (locationFilter) locationFilter.addEventListener("change", applyFilters)
  if (specialtyFilter) specialtyFilter.addEventListener("change", applyFilters)
  if (ratingFilter) ratingFilter.addEventListener("change", applyFilters)
  if (sortFilter) sortFilter.addEventListener("change", applyFilters)

  // Clear filters
  if (clearFilters) {
    clearFilters.addEventListener("click", () => {
      if (locationFilter) locationFilter.value = ""
      if (specialtyFilter) specialtyFilter.value = ""
      if (ratingFilter) ratingFilter.value = ""
      if (sortFilter) sortFilter.value = "rating"
      applyFilters()
    })
  }
}

// Add favorite functionality
function setupFavorites() {
  document.addEventListener("click", (e) => {
    if (e.target.closest(".favorite-btn")) {
      const btn = e.target.closest(".favorite-btn")
      const icon = btn.querySelector("i")

      if (icon.classList.contains("far")) {
        icon.classList.remove("far")
        icon.classList.add("fas")
        btn.style.color = "#ff6b35"
      } else {
        icon.classList.remove("fas")
        icon.classList.add("far")
        btn.style.color = ""
      }
    }
  })
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  loadVendors()
  loadProducts()
  loadAllVendors()
  setupFilters()
  setupFavorites()
  setupSmoothScrolling()

  console.log("Beauty Moon marketplace loaded successfully!")
})

// Add some interactive animations
function addInteractiveAnimations() {
  document.addEventListener(
    "mouseenter",
    (e) => {
      if (!(e.target instanceof Element)) return;

      const card = e.target.closest(".vendor-card, .product-card");
      if (card) {
        card.style.transform = "translateY(-4px)";
      }
    },
    true
  );

  document.addEventListener(
    "mouseleave",
    (e) => {
      if (!(e.target instanceof Element)) return;

      const card = e.target.closest(".vendor-card, .product-card");
      if (card) {
        card.style.transform = "translateY(0)";
      }
    },
    true
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("allProductsGrid");
  const categoryFilter = document.getElementById("categoryFilter");
  const priceFilter = document.getElementById("priceFilter");
  const vendorFilter = document.getElementById("vendorFilter");
  const sortFilter = document.getElementById("productSortFilter");
  const clearFilters = document.getElementById("clearProductFilters");

  function renderProductos(lista) {
    if (!grid) return;

    grid.innerHTML = "";
    lista.forEach(producto => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image">
        <div class="product-info">
          <h4 class="product-name">${producto.nombre}</h4>
          <p class="product-price">$${producto.precio.toFixed(2)}</p>
          <p class="product-vendor">Vendedor: ${producto.vendedor}</p>
          ${producto.descuento ? `<span class="product-discount">${producto.descuento}% OFF</span>` : ""}
          <button class="btn btn-primary add-to-cart-btn" data-id="${producto.id}">Agregar al Carrito</button>
        </div>
      `;
      grid.appendChild(card);
    });

    
  }
  bindAddToCartButtons();

  function bindAddToCartButtons() {
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const producto = Array.isArray(window.productos)
        ? window.productos.find(p => p.id == id): null;

        if (producto) {
          agregarAlCarrito(producto);
        }
      });
    });
  }


  function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const existe = carrito.find(p => p.id === producto.id);
    if (existe) {
      carrito = carrito.map(p =>
        p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
      );
    } else {
      carrito.push({
        id: producto.id,
        title: producto.nombre,
        price: producto.precio,
        image: producto.imagen,
        cantidad: 1
      });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    actualizarTotalCarrito();
  }


  function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((sum, p) => sum + p.cantidad, 0);
    const badge = document.querySelector('.icon-img + .badge');
    if (badge) badge.textContent = totalItems;
  }

  function actualizarTotalCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const total = carrito.reduce((sum, p) => sum + p.price * p.cantidad, 0);
    localStorage.setItem('totalCarrito', total.toFixed(2));
  }

  function aplicarFiltros() {
    let filtrados = [...window.productos];

    const categoria = categoryFilter?.value;
    const precio = priceFilter?.value;
    const vendedor = vendorFilter?.value;
    const orden = sortFilter?.value;

    if (categoria) {
      filtrados = filtrados.filter(p => p.categoria === categoria);
    }

    if (precio) {
      const [min, max] = precio.split("-");
      filtrados = filtrados.filter(p => {
        if (max) return p.precio >= parseFloat(min) && p.precio <= parseFloat(max);
        return p.precio >= parseFloat(min);
      });
    }

    if (vendedor) {
      filtrados = filtrados.filter(p => p.vendedor === vendedor);
    }

    switch (orden) {
      case "price-low":
        filtrados.sort((a, b) => a.precio - b.precio);
        break;
      case "price-high":
        filtrados.sort((a, b) => b.precio - a.precio);
        break;
      case "discount":
        filtrados.sort((a, b) => b.descuento - a.descuento);
        break;
      case "name":
        filtrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      default:
        filtrados.sort((a, b) => b.destacado - a.destacado);
    }

    renderProductos(filtrados);
  }

  // Conectar filtros si existen
  if (categoryFilter) categoryFilter.addEventListener("change", aplicarFiltros);
  if (priceFilter) priceFilter.addEventListener("change", aplicarFiltros);
  if (vendorFilter) vendorFilter.addEventListener("change", aplicarFiltros);
  if (sortFilter) sortFilter.addEventListener("change", aplicarFiltros);
  if (clearFilters) {
    clearFilters.addEventListener("click", () => {
      categoryFilter.value = "";
      priceFilter.value = "";
      vendorFilter.value = "";
      sortFilter.value = "featured";
      aplicarFiltros();
    });
  }

  // Inicializar
  renderProductos(window.productos);
  actualizarContadorCarrito();
});
window.productos = [];

document.querySelectorAll('.product-card').forEach((card, index) => {
  const nombre = card.querySelector('h3')?.textContent.trim();
  const precioTexto = card.querySelector('p')?.textContent.trim().replace('$', '').replace('.', '').replace(',', '.');
  const precio = parseFloat(precioTexto);
  const imagen = card.querySelector('img')?.getAttribute('src');

  const producto = {
    id: String(index + 1),
    nombre,
    precio,
    imagen,
    vendedor: "Beauty Moon", // o lo que corresponda
    categoria: "General",     // si querés categorizar
    descuento: 0,
    destacado: false
  };

  window.productos.push(producto);

  // Agregar botón dinámicamente si no existe
  if (!card.querySelector('.add-to-cart-btn')) {
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary add-to-cart-btn';
    btn.textContent = 'Agregar al Carrito';
    btn.dataset.id = producto.id;
    card.appendChild(btn);
  }
});
