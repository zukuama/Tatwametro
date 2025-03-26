function updateCountdown(endTime) {
    function update() {
        const now = new Date();
        const diff = Math.floor((endTime - now) / 1000);
        if (diff < 0) {
            getTatwa();
            return;
        }
        const minutes = Math.floor(diff / 60);
        const seconds = diff % 60;
        document.getElementById("countdown").textContent = `${minutes}m ${seconds}s`;

        setTimeout(update, 1000);
    }
    update();
}
