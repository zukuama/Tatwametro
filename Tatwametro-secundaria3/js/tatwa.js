async function getTatwa(useManualTime = false) {
    try {
        const tatwas = [
            { name: "Akash", color: "#000000", image: "akasha", description: "Elemento del éter, expansión y espiritualidad." },
            { name: "Vayu", color: "#3366cc", image: "vayu", description: "Elemento del aire, movimiento y creatividad." },
            { name: "Tejas", color: "#ff6666", image: "tejas", description: "Elemento del fuego, transformación y energía." },
            { name: "Prithvi", color: "#ffcc66", image: "prithvi", description: "Elemento de la tierra, estabilidad y fortaleza." },
            { name: "Apas", color: "#99ccff", image: "apas", description: "Elemento del agua, fluidez y emoción." }
        ];
        const duration = 24; // Cada Tatwa dura 24 minutos

        let sunriseTime;
        if (useManualTime && manualSunriseTime) {
            const [hours, minutes] = manualSunriseTime.split(":").map(Number);
            sunriseTime = new Date();
            sunriseTime.setHours(hours, minutes, 0, 0);
            console.log(`⏰ Usando hora manual: ${sunriseTime.toLocaleTimeString()}`);
        } else {
            const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-34.6131&longitude=-58.3772&daily=sunrise&timezone=auto&forecast_days=1");
            if (!response.ok) throw new Error("❌ Error al obtener datos de la API.");
            const data = await response.json();
            sunriseTime = new Date(data.daily.sunrise[0]);
            console.log(`🌅 Hora de salida del sol: ${sunriseTime.toLocaleTimeString()}`);
        }

        const now = new Date();
        const diffMinutes = Math.floor((now - sunriseTime) / (1000 * 60));
        if (diffMinutes < 0) {
            console.log("⌛ Esperando la salida del sol...");
            document.getElementById("tatwa-name").textContent = "Esperando la salida del sol...";
            return;
        }

        // Calcular cuántos ciclos de 24 minutos han pasado desde el amanecer
        const tatwaCycle = Math.floor(diffMinutes / duration);
        const tatwaIndex = tatwaCycle % tatwas.length;
        const currentTatwa = tatwas[tatwaIndex];

        // Calcular la hora de inicio y fin del ciclo actual
        const tatwaStartTime = new Date(sunriseTime.getTime() + tatwaCycle * duration * 60000);
        const tatwaEndTime = new Date(tatwaStartTime.getTime() + duration * 60000);

        document.body.style.backgroundColor = currentTatwa.color;
        document.getElementById("tatwa-name").textContent = currentTatwa.name;
        document.getElementById("tatwa-description").textContent = currentTatwa.description;
        document.getElementById("start-time").textContent = tatwaStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        document.getElementById("end-time").textContent = tatwaEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        loadTatwaImage(currentTatwa.image);
        updateCountdown(tatwaEndTime);
    } catch (error) {
        console.error("❌ Error en getTatwa():", error);
    }
}
