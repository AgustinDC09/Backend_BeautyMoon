document.addEventListener("DOMContentLoaded", () => {
    const botonesAgregarCarrito = document.querySelectorAll(".boton-comprar");

    botonesAgregarCarrito.forEach(boton => {
        boton.addEventListener("click", async () => {
            const itemCarrito = boton.closest(".item-carrito");
            const usuario_id = localStorage.getItem("usuario_id"); // Supongamos que se guarda el ID del usuario al iniciar sesión
            const producto_nombre = itemCarrito.querySelector("h3").textContent;
            const cantidad = parseInt(itemCarrito.querySelector(".input-cantidad").value);

            if (!usuario_id) {
                alert("Debes iniciar sesión para agregar productos al carrito.");
                return;
            }

            try {
                // Obtener el ID del producto desde el backend antes de enviarlo
                const resProducto = await fetch(`http://localhost:8000/obtener_producto/${encodeURIComponent(producto_nombre)}`);
                const dataProducto = await resProducto.json();
                const producto_id = dataProducto.id;

                if (!producto_id) {
                    alert("Error: Producto no encontrado.");
                    return;
                }

                const datos = { usuario_id, producto_id, cantidad };

                const response = await fetch("http://localhost:8000/agregar_carrito", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datos)
                });

                const resultado = await response.json();
                alert(resultado.mensaje);
            } catch (error) {
                console.error("Error en la solicitud:", error);
                alert("Hubo un problema al agregar el producto al carrito.");
            }
        });
    });
});
