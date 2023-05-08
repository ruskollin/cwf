import axios from "axios";
import { Journey } from "../types";

// const baseUrl = "https://stations-backend.herokuapp.com/journeys";
const baseUrl = "http://localhost:3007/journeys";

export const getAllJourneys = async () => {
  const response = await axios.get<Journey[]>(baseUrl);
  return response.data;
};

export const getSucceedingJourneys = async (pageNum: number) => {
  const response = await axios.get<Journey[]>(`${baseUrl}/nextPages`, {
    params: {
      page: pageNum,
    },
  });
  console.log(response);
  return response.data;
};

export const handleAddNewJourney= async (newJourney: any) => {
  const response = await axios.post(`${baseUrl}/addNew`, newJourney);
  return response.data;
};