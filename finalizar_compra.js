    document.addEventListener('DOMContentLoaded', () => {
        // --- Lógica de Secciones Colapsables ---
        const sectionHeaders = document.querySelectorAll('.bloque-seccion h2');

        sectionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const parentSection = header.closest('.bloque-seccion');
                const collapsibleContent = parentSection.querySelector('.contenido-colapsable');

                // Alternar la clase 'activo' en el contenido colapsable
                collapsibleContent.classList.toggle('activo');

                // Encontrar el ícono y alternar su clase para la rotación
                const icon = header.querySelector('.flecha-icono');
                if (collapsibleContent.classList.contains('activo')) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                } else {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            });
        });

        // --- Lógica del Botón "CONTINUAR" ---
        const continueButtons = document.querySelectorAll('.boton-continuar');

        continueButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const currentSectionContent = event.target.closest('.contenido-colapsable');
                const requiredFields = currentSectionContent.querySelectorAll('input[required], select[required]');
                let valid = true;

                requiredFields.forEach(field => {
                if (field.offsetParent !== null && !field.value.trim()) {
                    field.classList.add('error');
                    valid = false;
                } else {
                    field.classList.remove('error');
                }
                });

                if (!valid) {
                alert("Por favor, completá los campos obligatorios antes de continuar.");
                return;
                }

                // Activar siguiente sección
                const currentSectionHeader = currentSectionContent.previousElementSibling;
                const targetSectionId = event.target.dataset.target;
                const targetSection = document.getElementById(targetSectionId);

                currentSectionContent.classList.remove('activo');
                currentSectionHeader.querySelector('.flecha-icono').classList.remove('fa-chevron-up');
                currentSectionHeader.querySelector('.flecha-icono').classList.add('fa-chevron-down');
                currentSectionContent.style.maxHeight = null;

                if (targetSection) {
                targetSection.classList.remove('colapsado');
                const targetCollapsibleContent = targetSection.querySelector('.contenido-colapsable');
                const targetIcon = targetSection.querySelector('.flecha-icono');

                targetCollapsibleContent.classList.add('activo');
                targetIcon.classList.remove('fa-chevron-down');
                targetIcon.classList.add('fa-chevron-up');
                }
            });
            });


        // --- Lógica de Opciones de Envío/Retiro ---
        const domicilioBtn = document.getElementById('btn-domicilio');
        const retiroBtn = document.getElementById('btn-retiro');
        const seccionEnvioDomicilio = document.querySelector('.seccion-envio-domicilio');
        const seccionRetiroPunto = document.querySelector('.seccion-retiro-punto');
        const domicilioFields = document.querySelectorAll('.campos-direccion-ocultos');
        const mensajeErrorCp = document.querySelector('.mensaje-error-cp');
        const codigoPostalInput = document.getElementById('codigo-postal-domicilio');

        // Función para mostrar/ocultar secciones según la selección
        function selectDeliveryOption(option) {
            if (option === 'domicilio') {
                domicilioBtn.classList.add('activo');
                retiroBtn.classList.remove('activo');
                seccionEnvioDomicilio.style.display = 'block';
                seccionRetiroPunto.style.display = 'none';
                // Ocultar campos de dirección si el CP está vacío
                if (codigoPostalInput.value.trim() === '') {
                    domicilioFields.forEach(field => field.style.display = 'none');
                    mensajeErrorCp.style.display = 'block';
                } else {
                    domicilioFields.forEach(field => field.style.display = 'block');
                    mensajeErrorCp.style.display = 'none';
                }
                // Limpiar campos de "Retirar por un punto" (opcional, pero buena práctica)
                document.getElementById('punto-retiro-nombre').value = '';
                document.getElementById('punto-retiro-direccion').value = '';

            } else if (option === 'retiro') {
                domicilioBtn.classList.remove('activo');
                retiroBtn.classList.add('activo');
                seccionEnvioDomicilio.style.display = 'none';
                seccionRetiroPunto.style.display = 'block';
                // Limpiar campos de "Enviar a domicilio" (opcional, pero buena práctica)
                codigoPostalInput.value = '';
                document.getElementById('calle').value = '';
                document.getElementById('numero').value = '';
                document.getElementById('piso-depto').value = '';
                document.getElementById('recibe-pedido').value = '';
            }
        }

        // Event listeners para los botones de envío/retiro
        domicilioBtn.addEventListener('click', () => selectDeliveryOption('domicilio'));
        retiroBtn.addEventListener('click', () => selectDeliveryOption('retiro'));

        // Estado inicial de la entrega: "Enviar a domicilio" activo por defecto
        selectDeliveryOption('domicilio');

        // Lógica para mostrar/ocultar campos de dirección al ingresar código postal
        codigoPostalInput.addEventListener('input', () => {
            if (codigoPostalInput.value.trim() === '') {
                domicilioFields.forEach(field => field.style.display = 'none');
                mensajeErrorCp.style.display = 'block';
            } else {
                domicilioFields.forEach(field => field.style.display = 'block');
                mensajeErrorCp.style.display = 'none';
            }
        });

        // --- Lógica de Opciones de Pago ---
        const paymentOptions = document.querySelectorAll('.opcion-pago');
        const campoTarjetaComun = document.querySelectorAll('.campo-tarjeta-comun');
        const campoSoloCredito = document.querySelector('.campo-solo-credito');
        // const mercadoPagoFields = document.querySelector('.mercado-pago-fields'); // Descomentar si añades campos específicos de Mercado Pago

        function showPaymentFields(paymentType) {
            // Ocultar todos los campos de pago específicos primero
            campoTarjetaComun.forEach(field => field.style.display = 'none');
            campoSoloCredito.style.display = 'none';
            // if (mercadoPagoFields) mercadoPagoFields.style.display = 'none'; // Descomentar si es necesario

            // Mostrar campos según el tipo de pago seleccionado
            if (paymentType === 'credit' || paymentType === 'debit') {
                campoTarjetaComun.forEach(field => field.style.display = 'block');
                if (paymentType === 'credit') {
                    campoSoloCredito.style.display = 'block';
                }
            } else if (paymentType === 'mercado-pago') {
                // if (mercadoPagoFields) mercadoPagoFields.style.display = 'block'; // Descomentar y añadir tus campos específicos de Mercado Pago en el HTML
            }
        }

        paymentOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Remover 'seleccionado' de todas las opciones
                paymentOptions.forEach(opt => opt.classList.remove('seleccionado'));
                // Añadir 'seleccionado' a la opción clickeada
                option.classList.add('seleccionado');

                const paymentType = option.dataset.payment;
                showPaymentFields(paymentType);
            });
        });

        // Selección inicial para el pago (Tarjeta de Crédito por defecto)
        const initialSelectedPayment = document.querySelector('.opcion-pago.seleccionado');
        if (initialSelectedPayment) {
            showPaymentFields(initialSelectedPayment.dataset.payment);
        }
    });
    document.addEventListener('DOMContentLoaded', () => {
    const botonFinalizar = document.querySelector('.boton-finalizar');

    botonFinalizar.addEventListener('click', async () => {
        const opcionSeleccionada = document.querySelector('.opcion-pago.seleccionado');
        if (!opcionSeleccionada) {
            alert("Por favor, selecciona un método de pago.");
            return;
        }

        const metodoPago = opcionSeleccionada.dataset.payment;

        // Validar términos y campos obligatorios antes de continuar
        const checkboxTerminos = document.querySelector('.opciones-checkbox input[type="checkbox"]');
        if (!checkboxTerminos.checked) {
            alert("Debes aceptar los Términos y Condiciones.");
            return;
        }

        const camposObligatorios = document.querySelectorAll('input[required], select[required]');
        let valid = true;
        camposObligatorios.forEach(campo => {
            if (campo.offsetParent !== null && !campo.value.trim()) {
            campo.classList.add('error');
            valid = false;
            } else {
            campo.classList.remove('error');
            }
        });

        if (!valid) {
            alert("Por favor, completá todos los campos obligatorios.");
            return;
        }

        calcularTotal();

        if (metodoPago === 'mercado-pago') {
            const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            const totalCarrito = carrito.reduce((sum, p) => sum + p.price * p.cantidad, 0);

            if (!totalCarrito || parseFloat(totalCarrito) <= 0) {
            alert("Debes ingresar algún producto a tu carrito");
            return;
            }

            const mercadoPagoURL = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=1485254307-a495b8c8-ebe3-47e7-8cf8-893d333ab444`;
            window.location.href = mercadoPagoURL;
        }
        });

});

document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const resumenProductos = document.querySelector(".resumen-productos");
    const detallesPrecios = document.querySelector(".detalles-precios");

    if (carrito.length === 0) {
        resumenProductos.innerHTML = `<p class="cantidad-productos">No hay productos en el carrito.</p>`;
        detallesPrecios.innerHTML = `
            <div class="fila-precio-total">
                <span>Total</span>
                <span class="monto-total">$0</span>
            </div>
        `;
        return;
    }
 

    let subtotal = 0;
    resumenProductos.innerHTML = `<p class="cantidad-productos">${carrito.length} PRODUCTO${carrito.length > 1 ? 'S' : ''}</p>`;

    carrito.forEach(producto => {
        subtotal += producto.price * producto.cantidad;

        const item = document.createElement("div");
        item.className = "item-resumen";
        item.innerHTML = `
            <div class="detalles-producto-resumen">
                <img src="${producto.image}" alt="${producto.title}">
                <p>${producto.title}</p>
            </div>
            <div class="precio-producto-resumen">
                <p>Cantidad: ${producto.cantidad}</p>
                <p>$${(producto.price * producto.cantidad).toLocaleString('es-AR')}</p>
            </div>
        `;
        resumenProductos.appendChild(item);
    });

    detallesPrecios.innerHTML = `
        <div class="fila-precio">
            <span>Subtotal</span>
            <span>$${subtotal.toLocaleString('es-AR')}</span>
        </div>
        <div class="fila-precio">
            <span>Gastos de envío</span>
            <span>$-</span>
        </div>
        <div class="fila-precio">
            <span>Impuestos Nacionales</span>
            <span>$-</span>
        </div>
        <div class="fila-precio-total">
            <span>Total</span>
            <span class="monto-total">$${subtotal.toLocaleString('es-AR')}</span>
        </div>
    `;
});

document.addEventListener("DOMContentLoaded", function () {
  const btnDomicilio = document.getElementById("btn-domicilio");
  const btnRetiro = document.getElementById("btn-retiro");
  const finalizarBtn = document.querySelector(".boton-finalizar");
  const checkboxTerminos = document.querySelector('.opciones-checkbox input[type="checkbox"]');

  const domicilioFields = document.querySelectorAll(".seccion-envio-domicilio input[required], .seccion-envio-domicilio select[required]");
  const retiroFields = document.querySelectorAll(".seccion-retiro-punto input[required]");
  const datosPersonalesFields = document.querySelectorAll("#seccion-datos-personales input[required]");
  const pagoFields = document.querySelectorAll("#seccion-pago input[required], #seccion-pago select[required]");

  let modoEnvio = "domicilio"; // por defecto

  btnDomicilio.addEventListener("click", () => {
    modoEnvio = "domicilio";
  });

  btnRetiro.addEventListener("click", () => {
    modoEnvio = "retiro";
  });

  finalizarBtn.addEventListener("click", function (e) {
    let valid = true;

    // Validar términos y condiciones
    if (!checkboxTerminos.checked) {
      alert("Debes aceptar los Términos y Condiciones.");
      valid = false;
    }

    // Validar datos personales
    datosPersonalesFields.forEach(field => {
      if (!field.value.trim()) {
        field.classList.add("error");
        valid = false;
      } else {
        field.classList.remove("error");
      }
    });

    // Validar pago
    pagoFields.forEach(field => {
      if (!field.value.trim()) {
        field.classList.add("error");
        valid = false;
      } else {
        field.classList.remove("error");
      }
    });

        // Validar envío o retiro
        if (modoEnvio === "domicilio") {
        domicilioFields.forEach(field => {
            if (!field.value.trim()) {
            field.classList.add("error");
            valid = false;
            } else {
            field.classList.remove("error");
            }
        });
        } else {
        retiroFields.forEach(field => {
            if (!field.value.trim()) {
            field.classList.add("error");
            valid = false;
            } else {
            field.classList.remove("error");
            }
        });
        }

        if (!valid) {
        e.preventDefault(); // bloquea el envío
        }
    });
    });


