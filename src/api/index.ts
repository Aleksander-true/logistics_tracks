export const getLatestNews = async (searchQuery: string) => {
  console.log(searchQuery);
  const res = await fetch(
    `https://hn.algolia.com/api/v1/search?query=${searchQuery}&hitsPerPage=10&page=0`
  );
  return await res.json();
};

export const getCargoData = async (): Promise<CargoData[]> => {
  const res = await fetch("db/cargos.json");
  console.log("responce", res);
  const out = await res.json();
  console.log("out", out);
  return out;
};

const API_KEY = "b621f408-22ce-421a-854c-43ac71865504";

export const getCoordinates = async (city: string): Promise<GeocodingRes> => {
  const url = `https://graphhopper.com/api/1/geocode?q=${city}&key=${API_KEY}`;
  const res = await fetch(url);
  return await res.json();
};

export const getRoute = async ({
  departure = { lat: 0, lng: 0 },
  arrival = { lat: 0, lng: 0 },
}): Promise<RouteAPIRes> => {
  const method = "POST";
  const headers = { "Content-Type": "application/json" };
  const body = JSON.stringify({
    points: [
      [departure.lng, departure.lat],
      [arrival.lng, arrival.lat],
    ],
    instructions: true,
    calc_points: true,
    points_encoded: false,
  });
  console.log("body", body);
  const url = `https://graphhopper.com/api/1/route?key=${API_KEY}`;
  const res = await fetch(url, { method, headers, body });
  return await res.json();
};
