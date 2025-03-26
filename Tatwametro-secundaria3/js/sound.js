let soundEnabled = false;
let currentSound = "wind";
let audio = new Audio(`sounds/${currentSound}.mp3`);

function toggleSound() {
    soundEnabled = !soundEnabled;
    alert(`🔊 Sonido ${soundEnabled ? "Activado" : "Desactivado"}`);
}

function changeSound() {
    currentSound = currentSound === "wind" ? "bowl" : "wind";
    audio = new Audio(`sounds/${currentSound}.mp3`);
    alert(`🎵 Sonido cambiado a ${currentSound === "wind" ? "Susurro de viento" : "Cuenco tibetano"}`);
}
