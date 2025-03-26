function openModal() {
    const tatwaName = document.getElementById("tatwa-name").textContent;
    const tatwaDescription = document.getElementById("tatwa-description").textContent;

    // ✅ Verificamos que haya datos antes de abrir el modal
    if (!tatwaName || tatwaName === "Cargando...") {
        alert("⚠️ Aún no se ha cargado un Tatwa.");
        return;
    }

    document.getElementById("modal-title").textContent = tatwaName;
    document.getElementById("modal-description").textContent = tatwaDescription;
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// ✅ Cerramos el modal si el usuario hace clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        closeModal();
    }
};