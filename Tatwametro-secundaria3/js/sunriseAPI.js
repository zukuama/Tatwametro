// js/sunriseAPI.js
const SUNRISE_CACHE_KEY = 'tatwametro_sunrise_cache';
const EXPIRE_HOUR = 4;
const EXPIRE_MINUTE = 40;

async function getSunriseWithFallback(date) {
    // 1. Verificar caché válido primero
    const cached = getValidCachedSunrise(date);
    if (cached) return cached;

    // 2. Intentar APIs en secuencia
    const apis = [
        openMeteoAPI,
        sunriseSunsetAPI,
        fallbackEstimation
    ];

    for (const api of apis) {
        try {
            const result = await api(date);
            if (result) {
                cacheSunrise(result, date);
                return result;
            }
        } catch (error) {
            console.warn(`API falló: ${api.name}`, error);
            continue;
        }
    }

    throw new Error("Todas las APIs fallaron");
}

async function openMeteoAPI(date) {
    const lat = -34.6131, lon = -58.3772;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=sunrise&timezone=auto&start_date=${date}&end_date=${date}`;
    
    const response = await fetch(url);
    const data = await response.json();
    return new Date(data.daily.sunrise[0]);
}

async function sunriseSunsetAPI(date) {
    const lat = -34.6131, lon = -58.3772;
    const formattedDate = date.split('-').join('');
    const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&date=${formattedDate}&formatted=0`;
    
    const response = await fetch(url);
    const data = await response.json();
    return new Date(data.results.sunrise);
}

function fallbackEstimation(date) {
    console.log("Usando estimación local");
    return estimateSunrise(date, -34.6131);
}

function cacheSunrise(sunriseTime, date) {
    const cacheData = {
        date: date,
        sunrise: sunriseTime.toISOString(),
        timestamp: new Date().toISOString()
    };
    localStorage.setItem(SUNRISE_CACHE_KEY, JSON.stringify(cacheData));
}

function getValidCachedSunrise(currentDate) {
    const cache = localStorage.getItem(SUNRISE_CACHE_KEY);
    if (!cache) return null;

    const { date, sunrise, timestamp } = JSON.parse(cache);
    const now = new Date();
    const cacheTime = new Date(timestamp);
    
    // Verificar si es del mismo día o si aún no pasó la hora de expiración
    if (date === currentDate || 
       (now.getHours() < EXPIRE_HOUR || 
       (now.getHours() === EXPIRE_HOUR && now.getMinutes() < EXPIRE_MINUTE))) {
        return new Date(sunrise);
    }
    
    return null;
}

// Mantenemos tu función existente
function estimateSunrise(date, latitude) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    let baseSunrise = 6.5;
    if (month >= 5 && month <= 8) baseSunrise = 7.5;
    if (latitude < 0) baseSunrise += 0.5;
    return new Date(`${year}-${month}-${day}T${Math.floor(baseSunrise)}:${Math.floor((baseSunrise % 1) * 60)}:00`);
}

export { getSunriseWithFallback };