import { useState, useEffect } from "react";
import { getAllStations } from "./services/stationService";
import {
  getAllJourneys
} from "./services/journeyService";
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
  const [totalJourneys, setTotalJourneys] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 100,
    page: 0,
  });

  useEffect(() => {
    getAllStations().then((data) => {
      setStations(data);
    });
  }, []);

  useEffect(() => {
    // getAllJourneys().then((data: any) => {
    //   setJourneys(data.journeys);
    //   setTotalJourneys(data.total)
    // });
    getAllJourneys(paginationModel.pageSize, paginationModel.page).then(
      (data: any) => {
        setJourneys(data.data);
        setTotalJourneys(data.total);
        setTotalPages(data.totalPages);
      }
    );
  }, []);

  const handleGetNextData = (newPaginationModel: any) => {
    getAllJourneys(newPaginationModel.pageSize, newPaginationModel.page).then(
      (data: any) => {
        setJourneys(data.data);
        setTotalJourneys(data.total);
        setTotalPages(data.totalPages);
      }
    );
  };

  return (
    <div className="App">
      <SideBar />
      <div style={{ height: "90vh", marginTop: 60, overflow: "hidden" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stations" element={<Stations stations={stations} />} />
          <Route
            path="/journeys"
            element={
              <Journeys
                journeys={journeys}
                handleGetNextData={handleGetNextData}
                totalJourneys={totalJourneys}
                setPaginationModel={setPaginationModel}
                paginationModel={paginationModel}
                totalPages={totalPages}
              />
            }
          />
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
