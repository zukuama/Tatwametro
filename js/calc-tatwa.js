async function calculateTatwa() {
    const birthDateInput = document.getElementById("birth-date").value;
    const birthTimeInput = document.getElementById("birth-time").value;

    if (!birthDateInput || !birthTimeInput) {
        alert("⚠️ Ingrese una fecha y hora válidas.");
        return;
    }

    const birthDateTime = new Date(`${birthDateInput}T${birthTimeInput}`);
    if (isNaN(birthDateTime)) {
        alert("⚠️ Fecha inválida. Intente nuevamente.");
        return;
    }

    const tatwas = [
        { name: "Akash", color: "#000000", description: "Elemento del éter, expansión y espiritualidad." },
        { name: "Vayu", color: "#3366cc", description: "Elemento del aire, movimiento y creatividad." },
        { name: "Tejas", color: "#ff6666", description: "Elemento del fuego, transformación y energía." },
        { name: "Prithvi", color: "#ffcc66", description: "Elemento de la tierra, estabilidad y fortaleza." },
        { name: "Apas", color: "#99ccff", description: "Elemento del agua, fluidez y emoción." }
    ];
    const duration = 24; // Duración en minutos

    const sunriseTime = await getSunriseTime(birthDateInput);
    if (!sunriseTime || isNaN(sunriseTime.getTime())) {
        alert("⚠️ Error calculando la hora de salida del sol.");
        return;
    }

    const diffMinutes = Math.floor((birthDateTime - sunriseTime) / (1000 * 60));
    if (diffMinutes < 0) {
        alert("⚠️ La fecha ingresada es antes del amanecer. Intente nuevamente.");
        return;
    }

    const tatwaIndex = Math.floor((diffMinutes % (tatwas.length * duration)) / duration);
    const userTatwa = tatwas[tatwaIndex] || tatwas[0];

    alert(`✨ Tu Tatwa Personal es: ${userTatwa.name}\n📖 ${userTatwa.description}`);
    closeCalculatorModal();
}
