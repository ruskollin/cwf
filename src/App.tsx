import { useState, useEffect } from "react";
import { getAllStations } from "./services/stationService";
import { Station } from "./types";
import Stations from "./components/Stations";

import "./App.css";

function App() {
  const [stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    getAllStations().then((data) => {
      setStations(data);
    });
  }, []);

  return (
    <div className="App">
      <Stations stations={stations} />
    </div>
  );
}

export default App;
