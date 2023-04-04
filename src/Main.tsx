import { useState, useEffect } from "react";
import { getAllStations } from "./services/stationService";
import { Station } from "./types";
import Stations from "./components/Stations";
import May from "./components/May";
import HomePage from "./components/Homepage";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const Main = () => {
  const [stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    getAllStations().then((data) => {
      setStations(data);
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/stations" element={<Stations stations={stations} />} />
      <Route path="/may" element={<May />} />
    </Routes>
  );
};
export default Main;
