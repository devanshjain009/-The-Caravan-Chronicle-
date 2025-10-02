import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet.heat";

export default function MapComponent() {
  const mapRef = useRef(null);
  const heatLayerRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    // initialize map once
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([20.5937, 78.9629], 5);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
      }).addTo(mapRef.current);
    }

    async function loadHeatmap() {
      try {
        const res = await fetch("http://localhost:3000/api/complaints");
        const data = await res.json();

        // remove previous heat
        if (heatLayerRef.current) {
          mapRef.current.removeLayer(heatLayerRef.current);
          heatLayerRef.current = null;
        }

        // create heat data [lat, lng, weight] (weight=1 each; density causes intensity)
        const heatData = data.map(c => [c.lat, c.lng, 1]);
        heatLayerRef.current = L.heatLayer(heatData, { radius: 35, blur: 25 }).addTo(mapRef.current);

        // remove old markers
        markersRef.current.forEach(m => mapRef.current.removeLayer(m));
        markersRef.current = [];

        // add circle markers for SLA (red = overdue, blue = within SLA)
        data.forEach(c => {
          const circle = L.circleMarker([c.lat, c.lng], {
            radius: 6,
            color: "#000",
            weight: 1,
            fillColor: c.overdue ? "red" : "blue",
            fillOpacity: 0.9
          }).addTo(mapRef.current);

          circle.bindPopup(`
            <b>${c.city}, ${c.country}</b><br/>
            ${c.description}<br/>
            Status: ${c.status}<br/>
            Created: ${new Date(c.createdAt).toLocaleString()}<br/>
            SLA: ${c.slaHours}h<br/>
            ${c.overdue ? "<b style='color:red'>⚠ Overdue!</b>" : "<span style='color:green'>Within SLA</span>"}
          `);

          markersRef.current.push(circle);
        });

      } catch (err) {
        console.error("Error loading complaints:", err);
      }
    }

    // initial
    loadHeatmap();

    // auto refresh every 30s
    const id = setInterval(loadHeatmap, 30000);
    return () => clearInterval(id);
  }, []);

  return <div id="map" style={{height: "100vh", width: "100%"}} />;
}
