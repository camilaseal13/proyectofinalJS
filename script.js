
let datosUsuario = {
    usuario: null,
    contrasenia: null,
    ingreso: false
};

async function obtenerDatosExternos(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        window.rutinas = data.rutinas;
        window.comidas = data.comidas;
        console.log("Datos cargados:", data);
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
}
obtenerDatosExternos('data.json');


document.getElementById("create-account").addEventListener("click", () => {
    const nombreUsuario = document.getElementById("username").value;
    const contrasenia = document.getElementById("password").value;

    if (/^[a-zA-Z0-9]+$/.test(nombreUsuario) && /^[a-zA-Z0-9]+$/.test(contrasenia)) {
        datosUsuario.usuario = nombreUsuario;
        datosUsuario.contrasenia = contrasenia;
        localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));
        Swal.fire('Cuenta creada con éxito. Ya puede continuar e iniciar sesión.');
    } else {
        Swal.fire('Entrada incorrecta. El usuario y la contraseña solo pueden contener letras y números.');
    }
});

document.getElementById("login").addEventListener("click", () => {
    const usuarioIngresado = document.getElementById("login-username").value;
    const contraseniaIngresada = document.getElementById("login-password").value;
    const datosGuardados = JSON.parse(localStorage.getItem("datosUsuario"));

    if (datosGuardados && usuarioIngresado === datosGuardados.usuario && contraseniaIngresada === datosGuardados.contrasenia) {
        datosUsuario.ingreso = true;
        document.getElementById("login-section").style.display = "none";
        document.getElementById("goal-selection").style.display = "block";
        document.getElementById("logout").style.display = "inline-block"; // Mostrar el botón de cerrar sesión
    } else {
        document.getElementById("login-message").textContent = "Credenciales incorrectas. Por favor inténtelo de nuevo.";
    }
});


document.getElementById("logout").addEventListener("click", () => {
    datosUsuario.ingreso = false;
    localStorage.removeItem("datosUsuario");
    document.getElementById("login-section").style.display = "block";
    document.getElementById("goal-selection").style.display = "none";
    document.getElementById("logout").style.display = "none"; // Ocultar el botón de cerrar sesión
    Swal.fire('Has cerrado sesión con éxito.');
});


document.querySelectorAll("#goal-selection button").forEach(boton => {
    boton.addEventListener("click", (evento) => {
        const objetivo = evento.target.getAttribute("data-goal");
        mostrarRutinaYComida(objetivo);
    });
});

function mostrarRutinaYComida(objetivo) {
    const ejercicios = obtenerRutina(objetivo);
    const comidasRecomendadas = obtenerComidas(objetivo);

    const listaEjercicios = document.getElementById("exercise-list");
    listaEjercicios.innerHTML = "<h3>Rutina diaria:</h3>";
    ejercicios.forEach(ejercicio => {
        const item = document.createElement("li");
        item.textContent = ejercicio;
        listaEjercicios.appendChild(item);
    });

    const listaComidas = document.getElementById("meal-list");
    listaComidas.innerHTML = "<h3>Comidas recomendadas:</h3>";
    comidasRecomendadas.forEach(comida => {
        const item = document.createElement("li");
        item.textContent = comida;
        listaComidas.appendChild(item);
    });

    document.getElementById("results").style.display = "block";
}

function obtenerRutina(objetivo) {
    switch (objetivo) {
        case "1": return window.rutinas.deficitCalorico;
        case "2": return window.rutinas.ganarMusculo;
        case "3": return window.rutinas.mantenerseForma;
        default: return [];
    }
}


function obtenerComidas(objetivo) {
    switch (objetivo) {
        case "1": return window.comidas.deficitCalorico;
        case "2": return window.comidas.ganarMusculo;
        case "3": return window.comidas.mantenerseForma;
        default: return [];
    }
}



