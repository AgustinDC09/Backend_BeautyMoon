const contenedor = document.querySelector(".contenedor");
const btnInicioSesion = document.getElementById("btn-inicio-sesion");
const btnRegistrarse = document.getElementById("btn-registrarse");

// Alternar entre inicio de sesión y registro
btnInicioSesion.addEventListener("click", () => contenedor.classList.remove("toggle"));
btnRegistrarse.addEventListener("click", () => contenedor.classList.add("toggle"));

// Conexión al backend
document.addEventListener("DOMContentLoaded", () => {
    const formRegistro = document.querySelector(".registrarse");
    const recuperarLink = document.getElementById("recuperar-password");

    formRegistro.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = formRegistro.querySelector("input[placeholder='Nombre de Usuario']").value;
        const email = formRegistro.querySelector("input[placeholder='Ingrese su Email']").value;
        const password = formRegistro.querySelector("input[placeholder='Ingrese su Contraseña']").value;

        if (!email || !password) {
            return; // 🔹 Ya no muestra mensajes si faltan datos
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

            await response.json(); // 🔹 No hace nada con la respuesta del backend
        } catch (error) {
            console.error("❌ Error en la solicitud:", error);
        }
    });

    recuperarLink.addEventListener("click", () => {
        const email = prompt("Ingrese su correo electrónico para recuperar la contraseña:");
        if (!email) return;

        const BASE_URL = "https://backend-beautymoon.onrender.com";

        fetch(`${BASE_URL}/usuarios/recuperar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        })
        .then(response => {
            if (!response.ok) throw new Error("No se pudo enviar el correo de recuperación.");
            alert("📧 Si el correo está registrado, recibirás instrucciones para recuperar tu contraseña.");
        })
        .catch(error => {
            console.error("❌ Error al recuperar contraseña:", error);
            alert("Hubo un problema al intentar recuperar la contraseña.");
        });
    });
    

});

