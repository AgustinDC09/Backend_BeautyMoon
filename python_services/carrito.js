document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ carrito.js cargado");
    const botonesAgregarCarrito = document.querySelectorAll(".boton-comprar");
    const totalElement = document.querySelector(".total");

    // ✅ Definimos calcularTotal como global en window
    window.calcularTotal = function () {
        let total = 0;

        // ✅ Cargando datos manualmente para verificar cálculos
        const productos = [
            { precio: 20700, cantidad: 1 },
            { precio: 4800, cantidad: 1 }
        ];

        productos.forEach(producto => {
            console.log(`🔹 Producto: Precio ${producto.precio} - Cantidad ${producto.cantidad}`);
            total += producto.precio * producto.cantidad;
        });

        console.log("🔹 Total calculado (manual):", total);

        const totalElement = document.querySelector('.monto-total');
        if (totalElement) {
            totalElement.textContent = `Total: $${total.toFixed(2)}`;
        }

        localStorage.setItem('totalCarrito', total.toFixed(2));
    };



    // ✅ Detectar cambios en la cantidad de productos
    document.querySelectorAll(".input-cantidad").forEach(input => {
        input.addEventListener("change", window.calcularTotal);
    });

    document.querySelectorAll(".boton-cantidad").forEach(button => {
        button.addEventListener("click", () => setTimeout(window.calcularTotal, 100)); // 🔹 Espera un poco para capturar el nuevo valor
    });

    // ✅ Calcular total cuando se agrega un producto
    botonesAgregarCarrito.forEach(boton => {
        boton.addEventListener("click", async () => {
            const itemCarrito = boton.closest(".item-carrito");
            const usuario_id = localStorage.getItem("usuario_id");
            const producto_nombre = itemCarrito.querySelector("h3").textContent;
            const cantidad = parseInt(itemCarrito.querySelector(".input-cantidad").value, 10);

            if (!usuario_id) {
                alert("Debes iniciar sesión para agregar productos al carrito.");
                return;
            }

            try {
                const BASE_URL = "https://backend-beautymoon.onrender.com";

                const resProducto = await fetch(`${BASE_URL}/obtener_producto/${encodeURIComponent(producto_nombre)}`);

                if (!resProducto.ok) {
                    throw new Error(`Error ${resProducto.status}: No se pudo obtener el producto.`);
                }

                const dataProducto = await resProducto.json();
                const producto_id = dataProducto.id;

                if (!producto_id) {
                    alert("Error: Producto no encontrado.");
                    return;
                }

                const datos = { usuario_id, producto_id, cantidad };

                const response = await fetch(`${BASE_URL}/agregar_carrito`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datos)
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: No se pudo agregar al carrito.`);
                }

                const resultado = await response.json();
                alert(resultado.mensaje);

                // ✅ Recalcular el total después de agregar un producto
                window.calcularTotal();
            } catch (error) {
                console.error("❌ Error en la solicitud:", error);
                alert("Hubo un problema al agregar el producto al carrito. Inténtalo de nuevo.");
            }
        });
    });

    // ✅ Calcular total inicial al cargar la página
    window.calcularTotal();
});
