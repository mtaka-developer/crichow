"use client";

import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Kisumu coordinates (approximate)
const KISUMU_CENTER = { lat: -0.0917, lng: 34.7680 };

// Ward locations (approximate coordinates for covered areas)
const wardLocations = [
  { name: "Manyatta", lat: -0.0850, lng: 34.7650, households: 15 },
  { name: "Nyalenda", lat: -0.0980, lng: 34.7420, households: 12 },
  { name: "Kibuye", lat: -0.0800, lng: 34.7600, households: 8 },
  { name: "Obunga", lat: -0.1100, lng: 34.7500, households: 10 },
  { name: "Otonglo", lat: -0.0750, lng: 34.7750, households: 9 },
  { name: "Kamakowa", lat: -0.0900, lng: 34.7800, households: 11 },
  { name: "Migosi", lat: -0.0950, lng: 34.7900, households: 13 },
  { name: "Kolwa Central", lat: -0.1000, lng: 34.7300, households: 14 },
  { name: "Kolwa East", lat: -0.1050, lng: 34.7350, households: 16 },
  { name: "South West Kisumu", lat: -0.1200, lng: 34.7400, households: 7 },
  { name: "Central Kisumu", lat: -0.0917, lng: 34.7680, households: 18 },
  { name: "Market Milimani", lat: -0.0850, lng: 34.7720, households: 5 },
  { name: "Kondele", lat: -0.0800, lng: 34.7500, households: 10 }
];

export default function KisumuMap() {
  const [leafletIcon, setLeafletIcon] = useState<L.DivIcon | null>(null);

  useEffect(() => {
    // Fix default marker icon issue - TypeScript-compatible approach
    // @ts-expect-error: _getIconUrl is a private method we need to delete for webpack compatibility
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });

    // Create custom icon for waste collection points
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div class="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
        <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" />
        </svg>
      </div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12]
    });

    setLeafletIcon(customIcon);
  }, []);

  return (
    <div className="h-80 rounded-lg overflow-hidden shadow-lg border border-gray-200">
      <style jsx>{`
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
      
      <MapContainer
        center={[KISUMU_CENTER.lat, KISUMU_CENTER.lng]}
        zoom={12}
        className="h-full w-full"
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Markers for each ward */}
        {leafletIcon && wardLocations.map((ward, index) => (
          <Marker
            key={index}
            position={[ward.lat, ward.lng]}
            icon={leafletIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg text-green-600 mb-1">
                  {ward.name}
                </h3>
                <div className="text-sm text-gray-600">
                  <p><strong>{ward.households}</strong> active households</p>
                  <p className="text-xs mt-1">
                    CRICHOW project coverage area
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Coverage area highlight (simplified polygon) */}
        <Polygon
          positions={[
            [-0.0700, 34.7200],
            [-0.0700, 34.8000],
            [-0.1300, 34.8000],
            [-0.1300, 34.7200]
          ]}
          color="#24B81C"
          fillColor="#24B81C"
          fillOpacity={0.1}
          weight={2}
          opacity={0.6}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-lg text-green-600 mb-1">
                CRICHOW Coverage Area
              </h3>
              <p className="text-sm text-gray-600">
                13 wards currently covered<br/>
                Expanding to 14 wards in Phase 2
              </p>
            </div>
          </Popup>
        </Polygon>
      </MapContainer>
    </div>
  );
}