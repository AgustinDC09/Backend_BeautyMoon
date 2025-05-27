const contenedor = document.querySelector(".contenedor");
const btnInicioSesion = document.getElementById("btn-inicio-sesion");
const btnRegistrarse = document.getElementById("btn-registrarse");

btnInicioSesion.addEventListener("click", () => contenedor.classList.remove("toggle"));
btnRegistrarse.addEventListener("click", () => contenedor.classList.add("toggle"));

// Conexión al backend
document.addEventListener("DOMContentLoaded", () => {
    const formRegistro = document.querySelector(".registrarse");
    const mensajeDiv = document.querySelector("#mensaje"); // 🔹 Elemento donde aparecerá el mensaje

    formRegistro.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = formRegistro.querySelector("input[placeholder='Nombre de Usuario']").value;
        const email = formRegistro.querySelector("input[placeholder='Ingrese su Email']").value;
        const password = formRegistro.querySelector("input[placeholder='Ingrese su Contraseña']").value;

        if (!email || !password) {
            mostrarMensaje("❌ Debes ingresar un correo y una contraseña.", "error");
            return;
        }

        const datos = { username, email, password };
        console.log("Enviando datos al backend:", datos);

        try {
            const BASE_URL = "https://backend-beautymoon.onrender.com";
            const response = await fetch(`${BASE_URL}/usuarios/registro`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos)
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: No se pudo registrar.`);
            }

            const resultado = await response.json();
            mostrarMensaje(`✅ ${resultado.mensaje}`, "success"); // 🔹 Mensaje en pantalla, sin `alert()`
        } catch (error) {
            console.error("❌ Error en la solicitud:", error);
            mostrarMensaje(`⚠️ Error en el registro: ${error.message}`, "error");
        }
    });

    function mostrarMensaje(texto, tipo) {
        mensajeDiv.textContent = texto;
        mensajeDiv.style.display = "block";

        setTimeout(() => {
            mensajeDiv.textContent = "";
        }, 3000);
    }
});
