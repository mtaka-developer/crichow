"use client";

import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Kisumu coordinates (approximate)
const KISUMU_CENTER = { lat: -0.0917, lng: 34.7680 };

// Ward locations for the 6 specific wards mentioned
const WARD_LOCATIONS = [
  { name: "Kaloleni Shaurimoyo", lat: -0.0850, lng: 34.7650, households: 0 },
  { name: "Nyalenda A", lat: -0.0980, lng: 34.7420, households: 0 },
  { name: "Nyalenda B", lat: -0.1020, lng: 34.7450, households: 0 },
  { name: "Railways", lat: -0.0900, lng: 34.7680, households: 0 },
  { name: "Manyatta A", lat: -0.0850, lng: 34.7700, households: 0 },
  { name: "Central", lat: -0.0917, lng: 34.7680, households: 0 }
];

interface DataLocation {
  lat: number;
  lng: number;
  group: string;
  householdName: string;
}

function parseLocationString(locationString: string): { lat: number; lng: number } | null {
  if (!locationString) return null;
  
  // Parse format like "-0.0833° 34.7667°"
  const match = locationString.match(/(-?\d+\.\d+)°\s*(-?\d+\.\d+)°/);
  if (!match) return null;
  
  return {
    lat: parseFloat(match[1]),
    lng: parseFloat(match[2])
  };
}

export default function KisumuMap() {
  const [leafletIcon, setLeafletIcon] = useState<L.DivIcon | null>(null);
  const [dataLocations, setDataLocations] = useState<DataLocation[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data from practical-action-data.json
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/practical-action-data.json');
        if (!response.ok) throw new Error('Failed to load data');
        
        const rawData = await response.json();
        
        // Process each record and extract unique locations
        const locationMap = new Map<string, DataLocation>();
        
        rawData.forEach((record: {
          Location?: string;
          Group?: string;
          "HOUSEHOLD NAME"?: string;
        }) => {
          if (record.Location && record.Group && record["HOUSEHOLD NAME"]) {
            const coords = parseLocationString(record.Location);
            if (coords) {
              const key = `${coords.lat}_${coords.lng}_${record.Group}`;
              if (!locationMap.has(key)) {
                locationMap.set(key, {
                  lat: coords.lat,
                  lng: coords.lng,
                  group: record.Group,
                  householdName: record["HOUSEHOLD NAME"]
                });
              }
            }
          }
        });
        
        setDataLocations(Array.from(locationMap.values()));
      } catch (error) {
        console.error('Error loading map data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

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
    <div className="h-80 rounded-lg overflow-hidden shadow-lg border border-gray-200 relative z-10">
      <style jsx>{`
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-container {
          z-index: 1 !important;
        }
        .leaflet-control-container {
          z-index: 10 !important;
        }
        .leaflet-popup {
          z-index: 20 !important;
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
        
        {/* Markers for ward locations */}
        {leafletIcon && WARD_LOCATIONS.map((ward, index) => (
          <Marker
            key={`ward-${index}`}
            position={[ward.lat, ward.lng]}
            icon={leafletIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg text-green-600 mb-1">
                  {ward.name} Ward
                </h3>
                <div className="text-sm text-gray-600">
                  <p className="text-xs mt-1">
                    CRICHOW project coverage area
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Markers for actual data collection points */}
        {leafletIcon && !loading && dataLocations.map((location, index) => (
          <Marker
            key={`data-${index}`}
            position={[location.lat, location.lng]}
            icon={leafletIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg text-blue-600 mb-1">
                  {location.group}
                </h3>
                <div className="text-sm text-gray-600">
                  <p><strong>Household:</strong> {location.householdName}</p>
                  <p className="text-xs mt-1">
                    Active data collection point
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
                6 wards currently covered<br/>
                Kaloleni Shaurimoyo, Nyalenda A, Nyalenda B, Railways, Manyatta A, Central
              </p>
            </div>
          </Popup>
        </Polygon>
      </MapContainer>
    </div>
  );
}