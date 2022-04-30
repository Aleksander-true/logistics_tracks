import { openNotification } from "../components/notification/notification";
import { BASE_GEOCODE_URL, BASE_ROUTE_URL } from "../constants";

export const getCargoData = async (): Promise<CargoData[]> => {
  return api.get("db/cargos.json");
};

export const getCityData = async (): Promise<CargoData[]> => {
  return api.get("db/cities.json");
};

const API_KEY = "b621f408-22ce-421a-854c-43ac71865504";

export const getCoordinates = async (
  city: string
): Promise<GeocodingRes | null> => {
  const url = new URL(BASE_GEOCODE_URL);
  url.searchParams.set("q", city);
  url.searchParams.set("key", API_KEY);
  return api.get(url.href);
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
  const url = new URL(BASE_ROUTE_URL);
  url.searchParams.set("key", API_KEY);
  return api.post(url.href, { method, headers, body });
};

const api = {
  async get(url: string) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        return await res.json();
      } else {
        openNotification({
          message: `Ошибка ${res.statusText} `,
          description: "Попробуйте позже",
        });
        return Promise.resolve(null);
      }
    } catch (e: any) {
      const { message } = e;
      openNotification({ message });
      return Promise.resolve(null);
    }
  },

  async post(url: string, options: RequestInit) {
    try {
      const res = await fetch(url, options);
      if (res.ok) {
        return await res.json();
      } else {
        openNotification({
          message: `Ошибка ${res.statusText} `,
          description: "Попробуйте позже",
        });
        return Promise.resolve(null);
      }
    } catch (e: any) {
      const { message } = e;
      openNotification({ message });
      return Promise.resolve(null);
    }
  },
};
