export function swapLatWithLng(cords: [number, number][]): [number, number][] {
  return cords.map(([lng, lat]) => [lat, lng]);
}
