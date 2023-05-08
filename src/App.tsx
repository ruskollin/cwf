import { useState, useEffect } from "react";
import { getAllStations } from "./services/stationService";
import { getAllJourneys, getSucceedingJourneys } from "./services/journeyService";
import { Station, Journey } from "./types";
import Stations from "./components/Stations";
import Journeys from "./components/Journeys";
import AddJourney from "./components/AddJourney";
import AddStation from "./components/AddStation";
import HomePage from "./components/Homepage";
import { Routes, Route } from "react-router-dom";
import SideBar from "./components/Sidebar";
import "./App.css";

function App() {
  const [stations, setStations] = useState<Station[]>([]);
  const [journeys, setJourneys] = useState<Journey[]>([]);

  useEffect(() => {
    getAllStations().then((data) => {
      setStations(data);
    });
  }, []);

  useEffect(() => {
    getAllJourneys().then((data) => {
      setJourneys(data);
    });
  }, []);

  const handleGetNextData = (pageNum: number) => {
    getSucceedingJourneys(pageNum).then((data: any) => {
      setJourneys(data);
    });
  };

  return (
    <div className="App">
      <SideBar />
      <div style={{ height: "90vh", marginTop: 60, overflow: "hidden" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stations" element={<Stations stations={stations} />} />
          <Route path="/journeys" element={<Journeys journeys={journeys} handleGetNextData={handleGetNextData} />} />
          <Route
            path="/addJourney"
            element={<AddJourney stations={stations} />}
          />
          <Route path="/addStation" element={<AddStation />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
