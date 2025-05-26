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