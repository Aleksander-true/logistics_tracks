declare type Route = { departure: string; arrival: string };

type CargoData = {
  key: string;
  customer: string;
  cargo: string;
  departure: string;
  arrival: string;
};

type RouteAction = {
  type: keyof typeof ACTIONS;
  data: CargoData;
};

type CargoAction = {
  type: keyof typeof ACTIONS;
  data: CargoDate[];
};

type GeocodingHit = {
  country: string;
  countrycode: string;
  extent: number[];
  name: string;
  osm_id: number;
  osm_key: string;
  osm_type: string;
  osm_value: string;
  point: { lat: number; lng: number };
};

type GeocodingRes = {
  hits: GeocodingHit[];
  locale: string;
};

type CordAction = {
  type: keyof typeof ACTIONS;
  data: RouteCords;
};

type RoutePath = {
  ascend: number;
  bbox: number[];
  descend: number;
  details: Record<string, string>;
  distance: number;
  instructions: any[];
  legs: any[];
  points: { type: string; coordinates: [number, number][] };
  points_encoded: boolean;
  snapped_waypoints: { type: string; coordinates: [number, number][] };
  time: number;
  transfers: number;
  weight: number;
};

type RouteAPIRes = {
  hints: any;
  info: { copyrights: any[]; took: number };
  paths: RoutePath[];
};

type RouteCords = {
  arrival: GeocodingHit["point"];
  departure: GeocodingHit["point"];
  path?: [number, number][];
};
