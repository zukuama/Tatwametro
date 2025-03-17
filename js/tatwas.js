document.addEventListener("DOMContentLoaded", () => {
    const tatwas = [
        { name: "Akash", color: "#000000", description: "Elemento del éter, expansión y espiritualidad." },
        { name: "Vayu", color: "#3366cc", description: "Elemento del aire, movimiento y creatividad." },
        { name: "Tejas", color: "#ff6666", description: "Elemento del fuego, transformación y energía." },
        { name: "Prithvi", color: "#ffcc66", description: "Elemento de la tierra, estabilidad y fortaleza." },
        { name: "Apas", color: "#99ccff", description: "Elemento del agua, fluidez y emoción." }
    ];

    const tatwaList = document.getElementById("tatwa-list");
    if (!tatwaList) {
        console.error("⚠️ Error: No se encontró el elemento con id 'tatwa-list'");
        return;
    }

    tatwas.forEach(tatwa => {
        const li = document.createElement("li");
        li.classList.add("tatwa-item");
        li.style.backgroundColor = tatwa.color;
        li.innerHTML = `<h2>${tatwa.name}</h2><p>${tatwa.description}</p>`;
        tatwaList.appendChild(li);
    });

    console.log("✅ Lista de Tatwas cargada correctamente.");
});
