let soundEnabled = false;
let currentSound = "wind";
let audio = new Audio(`sounds/${currentSound}.mp3`);

async function getTatwa() {
    try {
        const tatwas = [
            { name: "Akash", color: "#000000", image: "akash.webp", description: "Momento de introspección y conexión espiritual." },
            { name: "Vayu", color: "#3366cc", image: "vayu.webp", description: "Energía de movimiento, cambio y comunicación." },
            { name: "Tejas", color: "#ff6666", image: "tejas.webp", description: "Fuerza, acción y transformación." },
            { name: "Prithvi", color: "#ffcc66", image: "prithvi.webp", description: "Estabilidad, enraizamiento y bienestar." },
            { name: "Apas", color: "#99ccff", image: "apas.webp", description: "Fluidez, emociones y descanso." }
        ];
        const duration = 24; // Duración de cada Tatwa en minutos

        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-34.6131&longitude=-58.3772&daily=sunrise&timezone=auto&forecast_days=1");
        if (!response.ok) throw new Error("Error al obtener datos de la API.");
        const data = await response.json();

        const sunriseTime = new Date(data.daily.sunrise[0]);
        const now = new Date();
        const diffMinutes = Math.floor((now - sunriseTime) / (1000 * 60));

        if (diffMinutes < 0) {
            document.getElementById("tatwa-name").textContent = "Esperando la salida del sol...";
            return;
        }

        const tatwaIndex = Math.floor((diffMinutes % (tatwas.length * duration)) / duration);
        const currentTatwa = tatwas[tatwaIndex];

        document.body.style.backgroundColor = currentTatwa.color;
        document.getElementById("tatwa-name").textContent = currentTatwa.name;
        document.getElementById("tatwa-image").src = `img/${currentTatwa.image}`;
        document.getElementById("tatwa-description").textContent = currentTatwa.description;

        if (soundEnabled) {
            audio.play();
        }

        updateCountdown(duration);
    } catch (error) {
        console.error(error);
        document.getElementById("error-message").textContent = "Error al cargar el Tatwa.";
    }
}

function updateCountdown(duration) {
    let timeLeft = duration * 60;
    function update() {
        timeLeft--;
        document.getElementById("countdown").textContent = `Próximo cambio en: ${Math.floor(timeLeft / 60)}m ${timeLeft % 60}s`;

        const progress = (1 - timeLeft / (duration * 60)) * 100;
        document.getElementById("progress").style.width = `${progress}%`;

        if (timeLeft > 0) {
            setTimeout(update, 1000);
        } else {
            getTatwa();
        }
    }
    update();
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    alert(`Sonido ${soundEnabled ? "Activado" : "Desactivado"}`);
}

function changeSound() {
    currentSound = currentSound === "wind" ? "bowl" : "wind";
    audio = new Audio(`sounds/${currentSound}.mp3`);
    alert(`Sonido cambiado a ${currentSound === "wind" ? "Susurro de viento" : "Cuenco tibetano"}`);
}

// Ejecutar la primera carga del Tatwa
getTatwa();
