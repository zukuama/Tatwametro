async function getSunriseTime(date) {
    const latitude = -34.6131; // Buenos Aires
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=-58.3772&daily=sunrise&timezone=auto&start_date=${date}&end_date=${date}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.daily && data.daily.sunrise && data.daily.sunrise.length > 0) {
            return new Date(data.daily.sunrise[0]);
        } else {
            return estimateSunrise(date, latitude);
        }
    } catch (error) {
        console.error("❌ Error en getSunriseTime:", error);
        return estimateSunrise(date, latitude);
    }
}

function estimateSunrise(date, latitude) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();

    let baseSunrise = 6.5; // Aproximadamente 6:30 AM
    if (month >= 5 && month <= 8) baseSunrise = 7.5;
    if (latitude < 0) baseSunrise += 0.5;

    return new Date(`${year}-${month}-${day}T${Math.floor(baseSunrise)}:${Math.floor((baseSunrise % 1) * 60)}:00`);
}
