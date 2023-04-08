import { useState, useEffect } from "react";
import { getAllStations } from "./services/stationService";
import { getAllBikes } from "./services/bikeService";
import { Station, Bike } from "./types";
import Stations from "./components/Stations";
import Bikes from "./components/Bikes";
import HomePage from "./components/Homepage";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const Main = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [bikes, setBikes] = useState<Bike[]>([]);

  useEffect(() => {
    getAllStations().then((data) => {
      console.log('data for staion done' )
      setStations(data);
    });
  }, []);

  useEffect(() => {
    getAllBikes().then((data) => {
      setBikes(data);
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/stations" element={<Stations stations={stations} />} />
      <Route path="/may" element={<Bikes bikes={bikes} />} />
    </Routes>
  );
};
export default Main;
