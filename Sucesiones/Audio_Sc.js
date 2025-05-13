let audio = document.getElementById('miAudio');

function reproducir() {
    audio.play();
}

function pausar() {
    audio.pause();
}

function detener() {
    audio.pause();
    audio.currentTime = 0;
}



function cambioAudio() {
    let audio = document.getElementById("miAudio");
    let button = document.getElementById("cambioAudio");

    if (audio.paused) {
        audio.play();
        button.innerHTML = "🎵"; // Cambia a nota sin diagonal
    } else {
        audio.pause();
        button.innerHTML = "🔇"; // Cambia a nota con diagonal
    }
}