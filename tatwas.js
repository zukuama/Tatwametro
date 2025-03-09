document.addEventListener("DOMContentLoaded", () => {
    const tatwas = [
        { name: "Akash", color: "#000000", description: "Elemento del éter, expansión y espiritualidad." },
        { name: "Vayu", color: "#3366cc", description: "Elemento del aire, movimiento y creatividad." },
        { name: "Tejas", color: "#ff6666", description: "Elemento del fuego, transformación y energía." },
        { name: "Prithvi", color: "#ffcc66", description: "Elemento de la tierra, estabilidad y fortaleza." },
        { name: "Apas", color: "#99ccff", description: "Elemento del agua, fluidez y emoción." }
    ];

    const tatwaList = document.getElementById("tatwa-list");
    tatwas.forEach(tatwa => {
        const div = document.createElement("div");
        div.classList.add("tatwa-card");
        div.style.backgroundColor = tatwa.color;
        div.innerHTML = `<h2>${tatwa.name}</h2><p>${tatwa.description}</p>`;
        tatwaList.appendChild(div);
    });
});
