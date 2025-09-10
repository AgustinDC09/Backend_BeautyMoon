console.log("carrito.js loaded successfully!")
// js/carrito.js
document.addEventListener('DOMContentLoaded', () => {
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const contenedor = document.querySelector('.carrito-compras');
const resumen = document.querySelector('.resumen-carrito');

// Renderiza todos los productos del carrito en el DOM
function renderCart() {
// Elimina items estáticos o previos
contenedor.querySelectorAll('.item-carrito').forEach(nodo => nodo.remove());

carrito.forEach(producto => {
    const item = document.createElement('div');
    item.classList.add('item-carrito');
    item.dataset.id = producto.id;

    item.innerHTML = `
    <div class="imagen-producto">
        <img src="${producto.image}" alt="${producto.title}">
    </div>
    <div class="detalles-producto">
        <h3>${producto.title}</h3>
        <p class="precio">$${producto.price.toLocaleString('es-AR')}</p>
    </div>
    <div class="cantidad">
        <button class="boton-cantidad menos">-</button>
        <input type="number" class="input-cantidad" value="${producto.cantidad}" min="1">
        <button class="boton-cantidad mas">+</button>
    </div>
    <button class="boton-eliminar">
        <img src="public/basura.png" alt="Eliminar producto">
    </button>
    `;

    // Inserta cada item justo antes del resumen
    contenedor.insertBefore(item, resumen);
});

bindEvents();
calcularTotal();
}

// Conecta los botones y campos de cantidad/eliminar
function bindEvents() {
document.querySelectorAll('.boton-cantidad.mas')
    .forEach(btn => btn.addEventListener('click', () => changeQty(btn, +1)));

document.querySelectorAll('.boton-cantidad.menos')
    .forEach(btn => btn.addEventListener('click', () => changeQty(btn, -1)));

document.querySelectorAll('.input-cantidad')
    .forEach(input => input.addEventListener('change', () => setQty(input)));

document.querySelectorAll('.boton-eliminar')
    .forEach(btn => btn.addEventListener('click', () => removeItem(btn)));
}

// Aumenta o reduce la cantidad
function changeQty(btn, delta) {
const id = btn.closest('.item-carrito').dataset.id;
carrito = carrito.map(p => {
    if (p.id === id) {
    const nueva = p.cantidad + delta;
    return { ...p, cantidad: nueva < 1 ? 1 : nueva };
    }
    return p;
});
persistAndRerender();
}

// Establece la cantidad al valor del input
function setQty(input) {
const id = input.closest('.item-carrito').dataset.id;
let val = parseInt(input.value);
if (isNaN(val) || val < 1) val = 1;

carrito = carrito.map(p => p.id === id ? { ...p, cantidad: val } : p);
persistAndRerender();
}

// Elimina un producto del carrito
function removeItem(btn) {
const id = btn.closest('.item-carrito').dataset.id;
carrito = carrito.filter(p => p.id !== id);
persistAndRerender();
}

// Guarda en localStorage y vuelve a renderizar
function persistAndRerender() {
localStorage.setItem('carrito', JSON.stringify(carrito));
renderCart();
}

// Función global para calcular y mostrar el total
window.calcularTotal = function() {
const total = carrito
    .reduce((sum, p) => sum + p.price * p.cantidad, 0);

const totalElem = document.querySelector('.resumen-carrito .total');
totalElem.textContent = `Total: $${total.toLocaleString('es-AR')}`;

// Guarda total en localStorage para finalizar compra
localStorage.setItem('totalCarrito', total.toFixed(2));
};

renderCart();
});
