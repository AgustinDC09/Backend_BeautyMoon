document.addEventListener("DOMContentLoaded", () => {
    const botonesAgregarCarrito = document.querySelectorAll(".boton-comprar");

    botonesAgregarCarrito.forEach(boton => {
        boton.addEventListener("click", async () => {
            const itemCarrito = boton.closest(".item-carrito");
            const usuario_id = localStorage.getItem("usuario_id"); // ID del usuario guardado en localStorage
            const producto_nombre = itemCarrito.querySelector("h3").textContent;
            const cantidad = parseInt(itemCarrito.querySelector(".input-cantidad").value, 10);

            if (!usuario_id) {
                alert("Debes iniciar sesión para agregar productos al carrito.");
                return;
            }

            try {
                // URL del backend en Clever Cloud
                const BASE_URL = "https://backend-beautymoon.clever-cloud.com";

                // Obtener el ID del producto desde el backend antes de enviarlo
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

                // Datos para enviar al carrito
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
            } catch (error) {
                console.error("❌ Error en la solicitud:", error);
                alert("Hubo un problema al agregar el producto al carrito. Inténtalo de nuevo.");
            }
        });
    });
});
