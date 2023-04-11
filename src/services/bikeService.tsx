import axios from "axios";
import { Bike } from "../types";

const baseUrl = "http://localhost:3007/journeys";

export const getAllJourneys = async (pageNum: any) => {
  const response = await axios.get<Bike[]>(baseUrl, {
    params: { pageNum },
  });
  return response.data;
};
