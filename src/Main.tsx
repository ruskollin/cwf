import { useState, useEffect } from "react";
import { getAllStations, handleCountJourneys } from "./services/stationService";
import { getAllJourneys } from "./services/bikeService";
import { Station, Bike } from "./types";
import Stations from "./components/Stations";
import Bikes from "./components/Bikes";
import HomePage from "./components/Homepage";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const Main = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [journeys, setJourneys] = useState<Bike[]>([]);

  useEffect(() => {
    getAllStations().then((data) => {
      console.log("data for staion done", data);
      setStations(data);
    });
  }, []);

  useEffect(() => {
    getAllJourneys(Math.floor(Math.random() * 11)).then((data) => {
      setJourneys(data);
    });
  }, []);

  const handleShowFilteredJourneys = (data: []) => {
    setJourneys(data);
  };

  const handleJourneys = async (event: React.SyntheticEvent, row: any) => {
    event.preventDefault();
    const resultsOfStationSearches = await handleCountJourneys(row.Nimi)
    console.log('End: ', resultsOfStationSearches)
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/stations"
        element={
          <Stations stations={stations} handleJourneys={handleJourneys} />
        }
      />
      <Route
        path="/journeys"
        element={
          <Bikes
            bikes={journeys}
            handleShowFilteredJourneys={handleShowFilteredJourneys}
          />
        }
      />
    </Routes>
  );
};
export default Main;
