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
