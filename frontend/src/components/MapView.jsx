import { useEffect, useRef } from "react";
import L from "leaflet";

// Same map as public/js/map.js, wrapped in a React component
function MapView({ lat, lon, name }) {
    const mapRef = useRef(null);

    useEffect(() => {
        if (lat === undefined || lon === undefined) return;

        const map = L.map("map").setView([lat, lon], 7);
        mapRef.current = map;

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        const redIcon = L.icon({
            iconUrl: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" height="12" width="9" viewBox="0 0 384 512">
    <path fill="rgb(234, 67, 53)" d="M0 188.6C0 84.4 86 0 192 0S384 84.4 384 188.6c0 119.3-120.2 262.3-170.4 316.8-11.8 12.8-31.5 12.8-43.3 0-50.2-54.5-170.4-197.5-170.4-316.8zM192 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z"/>
    </svg>`),
            iconSize: [30, 36],
            iconAnchor: [16, 32],
        });

        L.marker([lat, lon], { icon: redIcon }).addTo(map);

        const popup = L.popup();

        function onMapClick() {
            popup
                .setLatLng([lat, lon])
                .setContent(`<h4>${name}</h4><p>Exact Location provided</p>`)
                .openOn(map);
        }

        map.on('click', onMapClick);

        return () => {
            map.remove();
        };
    }, [lat, lon, name]);

    return <div id="map"></div>;
}

export default MapView;
