// Constantes accesibles globalmente
const iconoMenu = document.getElementById('icono-menu');
const menu = document.getElementById('menu');
const cerrarMenu = document.getElementById('cerrar-menu');
const agregar = document.getElementById('agregar-producto');
const botonVendedor = document.getElementById('boton-vendedor');

// Si las referencias aún no existen (ej. el script está en <head>), esperar al DOM
if (
  !iconoMenu || !menu || !cerrarMenu || !agregar || !botonVendedor
) {
  document.addEventListener('DOMContentLoaded', initMenu);
} else {
  initMenu(); // Ya está todo listo
}

// Función principal
function initMenu() {
  // Alternar menú
  iconoMenu.addEventListener('click', () => {
    menu.classList.toggle('abierto');
  });

  cerrarMenu.addEventListener('click', () => {
    menu.classList.remove('abierto');
  });

  // Función para mostrar u ocultar el botón y el enlace
  function actualizarEstadoVendedor() {
    const esVendedor = localStorage.getItem('esVendedor') === 'true';

    agregar.style.display = esVendedor ? 'block' : 'none';

    botonVendedor.textContent = esVendedor
      ? 'Dejar de ser vendedor'
      : 'Convertirme en vendedor';

    botonVendedor.onclick = () => {
      if (esVendedor) {
        localStorage.removeItem('esVendedor');
      } else {
        localStorage.setItem('esVendedor', 'true');
      }
      actualizarEstadoVendedor();
    };
  }

  actualizarEstadoVendedor();
}
