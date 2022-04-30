import "./map.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { useAppSelector } from "../../redux/hooks";

export default function Map() {
  const cords = useAppSelector((store) => store.cords);
  const position = [55.7767, 37.6066];
  const limeOptions = { color: "red" };
  const polyline = cords.path
    ? cords.path
    : [
        [cords.arrival.lat, cords.arrival.lng],
        [cords.departure.lat, cords.departure.lng],
      ];
  return (
    <div className="map">
      <MapContainer
        className="map"
        center={position}
        zoom={6}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Polyline pathOptions={limeOptions} positions={polyline} />
      </MapContainer>
    </div>
  );
}
