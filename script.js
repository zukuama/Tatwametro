document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu-button");
    const menu = document.getElementById("menu");

    // Función para abrir/cerrar el menú hamburguesa
    menuButton.addEventListener("click", () => {
        menu.classList.toggle("active");
    });

    // Cierra el menú si se hace clic fuera de él
    document.addEventListener("click", (event) => {
        if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
            menu.classList.remove("active");
        }
    });
});

// Función para abrir el modal de más información
function openModal() {
    document.getElementById("modal").style.display = "flex";
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Cierra el modal si se hace clic fuera de él
window.onclick = function (event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        closeModal();
    }
};

// Función para establecer la hora manualmente
function setManualSunrise() {
    const input = prompt("Ingrese la hora de salida del sol (HH:MM):");
    if (!input) {
        alert("⚠️ No ingresaste una hora válida.");
        return;
    }
    console.log(`Hora manual ingresada: ${input}`);
    alert(`🌅 Tatwa calculado según la hora ${input}`);
}

// Función para actualizar el Tatwa actual
async function getTatwa() {
    try {
        const tatwas = [
            { name: "Akash", color: "#000000", image: "akash.webp", description: "Elemento del éter, expansión y espiritualidad." },
            { name: "Vayu", color: "#3366cc", image: "vayu.webp", description: "Elemento del aire, movimiento y creatividad." },
            { name: "Tejas", color: "#ff6666", image: "tejas.webp", description: "Elemento del fuego, transformación y energía." },
            { name: "Prithvi", color: "#ffcc66", image: "prithvi.webp", description: "Elemento de la tierra, estabilidad y fortaleza." },
            { name: "Apas", color: "#99ccff", image: "apas.webp", description: "Elemento del agua, fluidez y emoción." }
        ];
        const duration = 24; // Duración de cada Tatwa en minutos

        // Obtener la hora de salida del sol desde la API
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
        document.getElementById("tatwa-description").textContent = currentTatwa.description;
        document.getElementById("modal-title").textContent = currentTatwa.name;
        document.getElementById("modal-description").textContent = currentTatwa.description;

        // Cargar imagen con respaldo
        const imgElement = document.getElementById("tatwa-image");
        let imagePath = `img/${currentTatwa.image}`;
        imgElement.onerror = function () {
            imagePath = `img/${currentTatwa.image.replace('.webp', '.png')}`;
            imgElement.src = imagePath;
            imgElement.onerror = function () {
                imgElement.src = "img/default.png";
                imgElement.alt = "Imagen no disponible";
            };
        };
        imgElement.src = imagePath;

        updateCountdown(duration);
    } catch (error) {
        console.error("Error en getTatwa:", error.message);
    }
}

// Función para actualizar el indicador radial de progreso
function updateCountdown(duration) {
    const totalTime = duration * 60;
    let timeLeft = totalTime;
    const circumference = 2 * Math.PI * 50;
    const radialCircle = document.querySelector("#radial-progress .progress-bar");

    function update() {
        timeLeft--;
        document.getElementById("countdown").textContent = `Próximo cambio en: ${Math.floor(timeLeft / 60)}m ${timeLeft % 60}s`;
        const dashoffset = circumference * (1 - (totalTime - timeLeft) / totalTime);
        radialCircle.style.strokeDashoffset = dashoffset;

        if (timeLeft > 0) {
            setTimeout(update, 1000);
        } else {
            getTatwa();
        }
    }
    update();
}

// Función para activar/desactivar sonido
function toggleSound() {
    alert("🔊 Activando/desactivando sonido..."); // Solo para prueba
}

// Función para cambiar el sonido
function changeSound() {
    alert("🎵 Cambiando sonido..."); // Solo para prueba
}

// Cargar el Tatwa al iniciar la página
getTatwa();
