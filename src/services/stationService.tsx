import axios from "axios";
import { Station } from "../types";

const baseUrl = "http://localhost:3007/stations";

export const getAllStations = async () => {
  const response = await axios.get<Station[]>(baseUrl);
  return response.data;
};

export const handleStationCalculations = async (
  stationName: string,
  month: string
) => {
  const response = await axios.post(baseUrl, {
    params: { stationName, month },
  });
  return response.data;
};

// export const handleAddNewStation= async ( nameStation: string, address: string, city: string, operator: string, capacity: number, xMap: number, yMap: number) => {
export const handleAddNewStation = async (newStation: any) => {
const response = await axios.post(`${baseUrl}/addNew`, newStation);
  return response.data;
};
