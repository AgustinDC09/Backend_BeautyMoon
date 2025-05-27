const contenedor = document.querySelector(".contenedor");
const btnInicioSesion = document.getElementById("btn-inicio-sesion");
const btnRegistrarse = document.getElementById("btn-registrarse");
const mensajeRegistro = document.createElement("div"); // 🔹 Creamos un elemento para mensajes

mensajeRegistro.classList.add("mensaje-registro");
document.body.appendChild(mensajeRegistro);

// Evento click para alternar inicio de sesión y registro
btnInicioSesion.addEventListener("click", () => {
    contenedor.classList.remove("toggle");
    mensajeRegistro.style.display = "none"; // 🔹 Oculta el mensaje si el usuario cambia de pestaña
});

btnRegistrarse.addEventListener("click", () => {
    contenedor.classList.add("toggle");
    mensajeRegistro.style.display = "none";
});

// Conexión al backend
document.addEventListener("DOMContentLoaded", () => {
    const formRegistro = document.querySelector(".registrarse");

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

            const response = await fetch(`${BASE_URL}/usuarios/registro`, { // 🔹 Ruta corregida
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos)
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: No se pudo registrar.`);
            }

            const resultado = await response.json();
            mostrarMensaje(`✅ ${resultado.mensaje}`, "success"); // 🔹 Mostramos el mensaje en pantalla
        } catch (error) {
            console.error("❌ Error en la solicitud:", error);
            mostrarMensaje(`⚠️ Error en el registro: ${error.message}`, "error");
        }
    });
});

// 🔹 Función para mostrar mensajes en pantalla
function mostrarMensaje(texto, tipo) {
    mensajeRegistro.textContent = texto;
    mensajeRegistro.style.display = "block";
    mensajeRegistro.className = `mensaje-registro ${tipo}`;

    setTimeout(() => {
        mensajeRegistro.style.opacity = "0";
        setTimeout(() => mensajeRegistro.style.display = "none", 500);
    }, 3000);
}
