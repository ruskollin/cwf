import { useState, useEffect } from "react";
import { getAllStations } from "./services/stationService";
import { getAllJourneys } from "./services/bikeService";
import { Station, Bike } from "./types";
import Stations from "./components/Stations";
import Bikes from "./components/Bikes";
import AddJourney from "./components/AddJourney";
import AddStation from "./components/AddStation";
import Map from "./components/Map";
import HomePage from "./components/Homepage";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const Main = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [journeys, setJourneys] = useState<Bike[]>([]);

  useEffect(() => {
    getAllStations().then((data) => {
      console.log(data[0]);
      setStations(data);
    });
  }, []);

  useEffect(() => {
    getAllJourneys(Math.floor(Math.random() * 11)).then((data) => {
      console.log(data[0]);
      setJourneys(data);
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/stations" element={<Stations stations={stations} />} />
      <Route
        path="/journeys"
        element={<Bikes stations={stations} journeys={journeys} />}
      />
      <Route path="/addJourney" element={<AddJourney stations={stations} />} />
      <Route path="/addStation"element={<AddStation/>} />
      {/* <Route path="/maps" element={<Map stations={stations}/>} /> */}
    </Routes>
  );
};
export default Main;
