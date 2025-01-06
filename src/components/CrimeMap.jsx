import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  Popup,
  useMap,
  ZoomControl,
} from "react-leaflet";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Mock data for demonstration
const crimeHotspots = [
  {
    id: 1,
    lat: 40.7128,
    lng: -74.006,
    intensity: 0.8,
    type: "Theft",
    count: 245,
    time: "2:30 PM",
    date: "2024-01-05",
  },
  {
    id: 2,
    lat: 40.758,
    lng: -73.9855,
    intensity: 0.6,
    type: "Assault",
    count: 156,
    time: "11:45 PM",
    date: "2024-01-04",
  },
  {
    id: 3,
    lat: 40.7829,
    lng: -73.9654,
    intensity: 0.9,
    type: "Burglary",
    count: 312,
    time: "3:15 AM",
    date: "2024-01-05",
  },
];

const getHeatmapColor = (intensity) => {
  const colors = {
    high: {
      color: "#ef4444",
      gradient:
        "radial-gradient(circle at center, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.1) 50%, transparent 70%)",
    },
    medium: {
      color: "#f59e0b",
      gradient:
        "radial-gradient(circle at center, rgba(245, 158, 11, 0.2) 0%, rgba(245, 158, 11, 0.1) 50%, transparent 70%)",
    },
    low: {
      color: "#10b981",
      gradient:
        "radial-gradient(circle at center, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.1) 50%, transparent 70%)",
    },
  };

  if (intensity >= 0.7) return colors.high;
  if (intensity >= 0.4) return colors.medium;
  return colors.low;
};

function MapControls() {
  const map = useMap();

  useEffect(() => {
    // Add custom controls to the map
    const customControl = L.Control.extend({
      options: {
        position: "topright",
      },
      onAdd: function () {
        const container = L.DomUtil.create(
          "div",
          "leaflet-bar leaflet-control overflow-hidden"
        );
        container.innerHTML = `
          <div class="bg-background-light shadow-lg rounded-lg p-2 space-y-2">
            <button class="p-2 hover:bg-background-dark rounded-lg transition-colors" title="Center Map">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
            <button class="p-2 hover:bg-background-dark rounded-lg transition-colors" title="Toggle Heatmap">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </button>
          </div>
        `;
        return container;
      },
    });
    map.addControl(new customControl());
  }, [map]);

  return null;
}

function CrimeMap() {
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative h-full rounded-xl overflow-hidden shadow-card"
    >
      <MapContainer
        center={[40.7128, -74.006]}
        zoom={13}
        className="h-full w-full z-0"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <ZoomControl position="topright" />
        <MapControls />

        {crimeHotspots.map((hotspot) => {
          const heatmapColor = getHeatmapColor(hotspot.intensity);
          return (
            <Circle
              key={hotspot.id}
              center={[hotspot.lat, hotspot.lng]}
              radius={600}
              pathOptions={{
                color: heatmapColor.color,
                weight: 2,
                fillOpacity: 0.35,
                fillColor: heatmapColor.color,
              }}
              eventHandlers={{
                click: () => setSelectedHotspot(hotspot),
                mouseover: (e) => {
                  const layer = e.target;
                  layer.setStyle({
                    fillOpacity: 0.5,
                    weight: 3,
                  });
                },
                mouseout: (e) => {
                  const layer = e.target;
                  layer.setStyle({
                    fillOpacity: 0.35,
                    weight: 2,
                  });
                },
              }}
            >
              <Popup className="custom-popup">
                <div className="p-4 min-w-[250px]">
                  <h3 className="text-lg font-bold text-content-primary mb-2">
                    {hotspot.type}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-content-secondary text-sm">
                        Risk Level
                      </span>
                      <span
                        className="font-semibold text-sm"
                        style={{ color: heatmapColor.color }}
                      >
                        {Math.round(hotspot.intensity * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-content-secondary text-sm">
                        Incidents
                      </span>
                      <span className="font-semibold text-sm text-content-primary">
                        {hotspot.count}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-content-secondary text-sm">
                        Last Incident
                      </span>
                      <span className="font-semibold text-sm text-content-primary">
                        {hotspot.time}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-content-secondary text-sm">
                        Date
                      </span>
                      <span className="font-semibold text-sm text-content-primary">
                        {hotspot.date}
                      </span>
                    </div>
                  </div>
                </div>
              </Popup>
            </Circle>
          );
        })}
      </MapContainer>

      {selectedHotspot && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute bottom-6 left-6 right-6 bg-background-light rounded-xl shadow-card-lg p-4 z-[400]"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-3">
              <div>
                <h2 className="text-lg font-bold text-content-primary">
                  {selectedHotspot.type} Hotspot
                </h2>
                <p className="text-sm text-content-secondary">
                  Location coordinates: {selectedHotspot.lat.toFixed(4)},{" "}
                  {selectedHotspot.lng.toFixed(4)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-content-secondary">Risk Level</p>
                  <p
                    className="font-semibold"
                    style={{
                      color: getHeatmapColor(selectedHotspot.intensity).color,
                    }}
                  >
                    {Math.round(selectedHotspot.intensity * 100)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-content-secondary">Incidents</p>
                  <p className="font-semibold text-content-primary">
                    {selectedHotspot.count}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-content-secondary">Time</p>
                  <p className="font-semibold text-content-primary">
                    {selectedHotspot.time}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-content-secondary">Date</p>
                  <p className="font-semibold text-content-primary">
                    {selectedHotspot.date}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedHotspot(null)}
              className="text-content-secondary hover:text-content-primary transition-colors p-1"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default CrimeMap;
