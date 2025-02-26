import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import './Map.css';  

const MapWithRoute = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [route, setRoute] = useState([]);
  const [markers, setMarkers] = useState([]);

  const fetchRoute = async () => {
    if (!source || !destination) return;

    const geocode = async (place) => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${place}`
      );
      const data = await response.json();
      return data.length ? [data[0].lat, data[0].lon] : null;
    };

    const sourceCoords = await geocode(source);
    const destCoords = await geocode(destination);

    if (!sourceCoords || !destCoords) {
      alert("Invalid locations");
      return;
    }

    setMarkers([sourceCoords, destCoords]);

    const routeResponse = await fetch(
      `https://api.openrouteservice.org/v2/directions/driving-car?api_key=YOUR_ORS_API_KEY&start=${sourceCoords[1]},${sourceCoords[0]}&end=${destCoords[1]},${destCoords[0]}`
    );
    const routeData = await routeResponse.json();
    setRoute(routeData.routes[0].geometry.coordinates.map(([lon, lat]) => [lat, lon]));
  };

  return (
    <div>
      <input type="text" placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)} />
      <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
      <button onClick={fetchRoute}>Get Route</button>
      <MapContainer center={[20, 78]} zoom={5} style={{ height: "500px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((pos, idx) => (
          <Marker key={idx} position={pos} icon={L.icon({ iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-red.png", iconSize: [25, 41] })} />
        ))}
        {route.length > 0 && <Polyline positions={route} color="blue" />}
      </MapContainer>
    </div>
  );
};

export default MapWithRoute;
