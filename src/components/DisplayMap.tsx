import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Display } from "../types";

interface DisplayMapProps {
  displays: Display[];
}

const DisplayMap: React.FC<DisplayMapProps> = ({ displays }) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([-34.6037, -58.3816], 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }

    const map = mapRef.current;

    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    displays.forEach((display) => {
      const marker = L.marker([display.latitude, display.longitude]).addTo(map)
        .bindPopup(`
          <strong>${display.name}</strong><br>
          ${display.formatted_address}<br>
          Precio: $${display.price_per_day.toFixed(2)} ${
        display.price_currency
      }/día
        `);
    });

    if (displays.length > 0) {
      const bounds = L.latLngBounds(
        displays.map((d) => [d.latitude, d.longitude])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [displays]);

  return (
    <div
      id="map"
      className="h-[calc(100vh-20px)] w-full mt-3 rounded-lg shadow-md"
    />
  );
};

export default DisplayMap;
