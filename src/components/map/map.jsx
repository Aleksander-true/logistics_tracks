import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { useAppSelector } from "../../redux/hooks";
import {
  INIT_MAP_CENTER,
  INIT_MAP_ZOOM,
  MAP_ATTRIBUTION,
  MAP_TILE_LAYER_URL,
  MAP_PATH_LINE_COLOR,
} from "./../../constants";
import "./map.css";

const NULL_PATH_COORDS = [
  [0, 0],
  [0, 0],
];

export default function Map() {
  const cords = useAppSelector((store) => store.cords);
  const { arrival, departure, customer, cargo } = useAppSelector(
    (store) => store.route
  );
  const arrivalCoords = [cords.arrival.lat, cords.arrival.lng];
  const departureCoords = [cords.departure.lat, cords.departure.lng];

  const lineOptions = { color: MAP_PATH_LINE_COLOR };
  const polyline = cords.path ? cords.path : NULL_PATH_COORDS;
  return (
    <div className="map">
      <MapContainer
        className="map"
        center={INIT_MAP_CENTER}
        zoom={INIT_MAP_ZOOM}
        scrollWheelZoom={false}
      >
        <TileLayer attribution={MAP_ATTRIBUTION} url={MAP_TILE_LAYER_URL} />
        <Marker position={arrivalCoords}>
          <Popup>
            Отправление: <b>{arrival}</b> <br />
            Заказчик: <i>{customer} </i> <br />
            Груз: <i>{cargo}</i> <br />
          </Popup>
        </Marker>
        <Marker position={departureCoords}>
          <Popup>
            Отправление: <b>{departure}</b> <br />
            Заказчик: <i>{customer}</i> <br />
            Груз: <i>{cargo}</i> <br />
          </Popup>
        </Marker>
        <Polyline pathOptions={lineOptions} positions={polyline} />
      </MapContainer>
    </div>
  );
}
