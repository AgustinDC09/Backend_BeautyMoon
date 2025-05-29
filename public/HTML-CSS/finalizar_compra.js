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
                const currentSectionHeader = currentSectionContent.previousElementSibling; // Obtener el H2
                const targetSectionId = event.target.dataset.target; // ID de la siguiente sección
                const targetSection = document.getElementById(targetSectionId);

                // Desactivar la sección actual
                currentSectionContent.classList.remove('activo');
                currentSectionHeader.querySelector('.flecha-icono').classList.remove('fa-chevron-up');
                currentSectionHeader.querySelector('.flecha-icono').classList.add('fa-chevron-down');
                currentSectionContent.style.maxHeight = null; // Reiniciar max-height

                // Activar la sección objetivo
                if (targetSection) {
                    targetSection.classList.remove('colapsado'); // Asegurarse de que no esté oculto por la clase 'colapsado'
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
        console.log("🔹 Página cargada, ejecutando calcularTotal()...");
        calcularTotal();  

        if (metodoPago === 'mercado-pago') {
            const totalCarrito = localStorage.getItem('totalCarrito');

            if (!totalCarrito || parseFloat(totalCarrito) <= 0) {
                alert("Hubo un problema al calcular el total. Verifica tu carrito.");
                return;
            }

            console.log("🔹 Redirigiendo manualmente a Mercado Pago...");

            // ✅ Simulación de pago con un enlace generado manualmente
            const mercadoPagoURL = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=1485254307-a495b8c8-ebe3-47e7-8cf8-893d333ab444`;

            window.location.href = mercadoPagoURL;
        }
    });
});
