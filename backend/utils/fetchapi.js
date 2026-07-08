const fetch = require("node-fetch");

const getCoordinates = async (location) => {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`,
        { headers: { "User-Agent": "my-app" } }
    );

    const data = await response.json();
    if (!data.length) return null;

    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);

    return { lat, lon };
};

module.exports = getCoordinates;