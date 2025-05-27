const contenedor = document.querySelector(".contenedor");
const btnInicioSesion = document.getElementById("btn-inicio-sesion");
const btnRegistrarse = document.getElementById("btn-registrarse");

// Evento click para alternar inicio de sesión y registro
btnInicioSesion.addEventListener("click", () => {
    contenedor.classList.remove("toggle");
});

btnRegistrarse.addEventListener("click", () => {
    contenedor.classList.add("toggle");
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
            alert("Debes ingresar un correo y una contraseña.");
            return;
        }

        const datos = { username, email, password }; // Datos del formulario
        console.log("Enviando datos al backend:", datos);

        try {
            // URL actualizada para Clever Cloud
            const BASE_URL = "https://backend-beautymoon.clever-cloud.com";

            const response = await fetch(`${BASE_URL}/registro`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: No se pudo registrar.`);
            }

            const resultado = await response.json();
            alert(resultado.mensaje);
        } catch (error) {
            console.error("❌ Error en la solicitud:", error);
            alert("Hubo un problema con el registro. Inténtalo nuevamente.");
        }
    });
});
