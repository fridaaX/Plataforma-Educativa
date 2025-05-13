const banco = [
    { imagen: "imagenes/gato.png", sonido: "sonidos/gato.mp3", nombre: "gato" },
    { imagen: "imagenes/perro.png", sonido: "sonidos/perro.mp3", nombre: "perro" },
    { imagen: "imagenes/pollito.png", sonido: "sonidos/pollito.mp3", nombre: "pollito" },
    { imagen: "imagenes/vaca.png", sonido: "sonidos/vaca.mp3", nombre: "vaca" },
    { imagen: "imagenes/caballo.png", sonido: "sonidos/caballo.mp3", nombre: "caballo" },
    { imagen: "imagenes/oveja.png", sonido: "sonidos/oveja.mp3", nombre: "oveja" },
    { imagen: "imagenes/pato.png", sonido: "sonidos/pato.mp3", nombre: "pato" },
    { imagen: "imagenes/cerdo.png", sonido: "sonidos/cerdo.mp3", nombre: "cerdo" },
    { imagen: "imagenes/gallo.png", sonido: "sonidos/gallo.mp3", nombre: "gallo" },
    { imagen: "imagenes/burro.png", sonido: "sonidos/burro.mp3", nombre: "burro" },
    { imagen: "imagenes/leon.png", sonido: "sonidos/leon.mp3", nombre: "leon" },
    { imagen: "imagenes/tigre.png", sonido: "sonidos/tigre.mp3", nombre: "tigre" },
    { imagen: "imagenes/elefante.png", sonido: "sonidos/elefante.mp3", nombre: "elefante" },
    { imagen: "imagenes/mono.png", sonido: "sonidos/mono.mp3", nombre: "mono" },
    { imagen: "imagenes/lobo.png", sonido: "sonidos/lobo.mp3", nombre: "lobo" }
];

let rondas = 5;
let errores = 0;
let intentos = 0;
let rondaActual = 0;
let sonidoActual = new Audio();
let nivel = new URLSearchParams(window.location.search).get('nivel') || 1;

// Mostrar el nivel en la página
document.getElementById("nivel-texto").textContent = "Nivel " + nivel;

function iniciarJuego() {
    rondaActual = 0;
    errores = 0;
    intentos = 0;
    siguienteRonda();
}

function siguienteRonda() {
    if (rondaActual >= rondas) {
        mostrarMensaje("🎉 ¡Felicidades! Has completado el juego. 🎉", "exito");
        document.getElementById("siguiente").style.display = "inline-block";
        document.getElementById("reiniciar").style.display = "inline-block";
        return;
    }

    intentos = 0;
    let opciones = [...banco];
    let sonidoCorrecto = opciones.splice(Math.floor(Math.random() * opciones.length), 1)[0];
    let distractores = [];

    while (distractores.length < 2) {
        let elegido = opciones[Math.floor(Math.random() * opciones.length)];
        if (!distractores.includes(elegido)) distractores.push(elegido);
    }

    let imagenes = [sonidoCorrecto, ...distractores].sort(() => Math.random() - 0.5);

    sonidoActual.src = sonidoCorrecto.sonido;
    sonidoActual.play();

    let contenedor = document.getElementById("imagenes");
    contenedor.innerHTML = "";

    imagenes.forEach(img => {
        let imagenElemento = document.createElement("img");
        imagenElemento.src = img.imagen;
        imagenElemento.classList.add("imagen");
        imagenElemento.dataset.sonido = img.nombre;
        imagenElemento.addEventListener("click", () => validarRespuesta(img.nombre, sonidoCorrecto.nombre));
        contenedor.appendChild(imagenElemento);
    });

    document.getElementById("bocina").onclick = () => sonidoActual.play();
    rondaActual++;
}

function validarRespuesta(eleccion, correcto) {
    if (eleccion === correcto) {
        mostrarMensaje("✅ ¡Correcto! Avanzas a la siguiente ronda.", "exito");
        setTimeout(siguienteRonda, 2000);
    } else {
        intentos++;
        errores++;
        mostrarMensaje(`❌ Incorrecto. Intento ${intentos} de 3.`, "error");

        if (errores >= 2) {
            setTimeout(() => {
                mostrarMensaje("💔 ¡Has perdido! Inténtalo de nuevo.", "error");
                setTimeout(iniciarJuego, 2000);
            }, 2000);
        } else if (intentos >= 3) {
            setTimeout(() => {
                mostrarMensaje("🚨 Has agotado tus intentos. Pasando a la siguiente ronda.", "error");
                setTimeout(siguienteRonda, 2000);
            }, 2000);
        }
    }
}

function mostrarMensaje(texto, tipo) {
    let mensajeElemento = document.getElementById("mensaje");
    mensajeElemento.textContent = texto;
    mensajeElemento.className = "mensaje " + (tipo === "exito" ? "mensaje-exito" : "mensaje-error");
    mensajeElemento.style.display = "block";

    setTimeout(() => mensajeElemento.style.display = "none", 2000);
}

document.getElementById("reiniciar").addEventListener("click", () => location.href = "index.html");
document.getElementById("siguiente").addEventListener("click", iniciarJuego);
window.onload = iniciarJuego;