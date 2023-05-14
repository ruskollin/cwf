import axios from "axios";
import { Journey } from "../types";

const baseUrl = "https://stations-backend.herokuapp.com/journeys";

export const getAllJourneys = async (pageSize: number, pageNum: number) => {
  const response = await axios.get<Journey[]>(`${baseUrl}`, {
    params: {
      page: pageNum,
      pageSize: pageSize
    },
  });
  return response.data;
};

export const handleAddNewJourney= async (newJourney: any) => {
  const response = await axios.post(`${baseUrl}/addNew`, newJourney);
  return response.data;
};