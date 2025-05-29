document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica de Secciones Colapsables ---
    const sectionHeaders = document.querySelectorAll('.bloque-seccion h2');

    sectionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const parentSection = header.closest('.bloque-seccion');
            const collapsibleContent = parentSection.querySelector('.contenido-colapsable');

            collapsibleContent.classList.toggle('activo');

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

    // --- Lógica del Botón "Continuar" ---
    const continueButtons = document.querySelectorAll('.boton-continuar');

    continueButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const currentSectionContent = event.target.closest('.contenido-colapsable');
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

    // --- Lógica de Opciones de Pago ---
    const paymentOptions = document.querySelectorAll('.opcion-pago');
    const campoTarjetaComun = document.querySelectorAll('.campo-tarjeta-comun');
    const campoSoloCredito = document.querySelector('.campo-solo-credito');

    function showPaymentFields(paymentType) {
        campoTarjetaComun.forEach(field => field.style.display = 'none');
        campoSoloCredito.style.display = 'none';

        if (paymentType === 'credit' || paymentType === 'debit') {
            campoTarjetaComun.forEach(field => field.style.display = 'block');
            if (paymentType === 'credit') {
                campoSoloCredito.style.display = 'block';
            }
        }
    }

    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            paymentOptions.forEach(opt => opt.classList.remove('seleccionado'));
            option.classList.add('seleccionado');

            const paymentType = option.dataset.payment;
            showPaymentFields(paymentType);
        });
    });

    const initialSelectedPayment = document.querySelector('.opcion-pago.seleccionado');
    if (initialSelectedPayment) {
        showPaymentFields(initialSelectedPayment.dataset.payment);
    }

    // --- Integración con Mercado Pago ---
    const botonFinalizar = document.querySelector('.boton-finalizar');

    botonFinalizar.addEventListener('click', async () => {
        const opcionSeleccionada = document.querySelector('.opcion-pago.seleccionado');

        if (!opcionSeleccionada) {
            alert("Por favor, selecciona un método de pago.");
            return;
        }

        const metodoPago = opcionSeleccionada.dataset.payment;

        if (metodoPago === 'mercado-pago') {
            const nombre = document.getElementById('nombre-tarjeta').value.trim();
            const dni = document.getElementById('dni-pago').value.trim();

            if (!nombre || !dni) {
                alert("Completa todos los datos antes de finalizar la compra.");
                return;
            }

            try {
                const response = await fetch('https://backend-beautymoon.onrender.com/crear-pago', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: "Compra en Beauty Moon",
                        price: 1000, // 🔹 Reemplaza esto con el total de la compra
                        quantity: 1
                    })
                });

                const data = await response.json();

                if (data && data.init_point) {
                    window.location.href = data.init_point;
                } else {
                    alert("Hubo un problema al generar el pago. Inténtalo nuevamente.");
                }
            } catch (error) {
                console.error("❌ Error en la solicitud de pago:", error);
                alert("No se pudo procesar el pago.");
            }
        }
    });
});
