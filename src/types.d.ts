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
