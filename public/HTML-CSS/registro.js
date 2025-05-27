const contenedor = document.querySelector(".contenedor");
const btnInicioSesion = document.getElementById("btn-inicio-sesion")
const btnRegistrarse = document.getElementById("btn-registrarse")

//creo el evento click al boton de inicio de sesión
btnInicioSesion.addEventListener("click", ()=>{
    contenedor.classList.remove("toggle");
})

btnRegistrarse.addEventListener("click", ()=>{
    contenedor.classList.add("toggle");
})

//conexión al backend

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

        const datos = { username, email, password };  // Declaración correcta de `datos`

        console.log("Enviando datos al backend:", datos); // Verificación en consola

        try {
            const response = await fetch("http://localhost:8000/registro", {
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
            alert("Hubo un problema con el registro.");
        }
    });
});

