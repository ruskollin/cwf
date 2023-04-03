import axios from "axios";
import { Station } from "../types";

const baseUrl = "http://localhost:3007/stations";

export const getAllStations = async () => {
  const response = await axios.get<Station[]>(baseUrl);
  return response.data;
};