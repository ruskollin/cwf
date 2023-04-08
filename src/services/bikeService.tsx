import axios from "axios";
import { Bike } from "../types";

const baseUrl = "http://localhost:3007/bikes";

export const getAllBikes = async () => {
  const response = await axios.get<Bike[]>(baseUrl);
  return response.data;
};