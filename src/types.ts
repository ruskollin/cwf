export interface Station {
  FID: number;
  ID: number;
  Nimi: string;
  Namn: string;
  Name: string;
  Osoite: string;
  Adress: string;
  Kaupunki: string;
  Stad: string;
  Operaattor: string;
  Kapasiteet: string;
  x: number;
  y: number;
  id: string;
}

export interface Journey {
  Covered_distance: number;
  Departure: string;
  Departure_station_id: number;
  Departure_station_name: string;
  Duration: number;
  Return: string;
  Return_station_id: number;
  Return_station_name: string;
  id: string;
}

