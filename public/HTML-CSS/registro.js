const contenedor = document.querySelector(".contenedor");
const btnInicioSesion = document.getElementById("btn-inicio-sesion");
const btnRegistrarse = document.getElementById("btn-registrarse");

// Alternar entre inicio de sesión y registro
btnInicioSesion.addEventListener("click", () => contenedor.classList.remove("toggle"));
btnRegistrarse.addEventListener("click", () => contenedor.classList.add("toggle"));

// Conexión al backend
document.addEventListener("DOMContentLoaded", () => {
    const formRegistro = document.querySelector(".registrarse");
    const mensajeRegistro = document.getElementById("mensaje-registro");

    formRegistro.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = formRegistro.querySelector("input[placeholder='Nombre de Usuario']").value;
        const email = formRegistro.querySelector("input[placeholder='Ingrese su Email']").value;
        const password = formRegistro.querySelector("input[placeholder='Ingrese su Contraseña']").value;

        if (!email || !password) {
            mostrarMensaje("❌ Debes ingresar un correo y una contraseña.", "red");
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
            mostrarMensaje(`✅ ${resultado.mensaje}`, "green");
        } catch (error) {
            console.error("❌ Error en la solicitud:", error);
            mostrarMensaje(`⚠️ Error en el registro: ${error.message}`, "red");
        }
    });

    function mostrarMensaje(texto, color) {
        if (!mensajeRegistro) return;

        mensajeRegistro.textContent = texto;
        mensajeRegistro.style.color = color;
        mensajeRegistro.style.display = "block";

        setTimeout(() => {
            mensajeRegistro.style.display = "none";
        }, 3000);
    }
});
