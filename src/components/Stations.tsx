import { useState, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridActionsCellItem,
  gridColumnsTotalWidthSelector,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Search from "./Search";
import { Station } from "../types";
import { handleCountJourneys } from "../services/stationService";
import Modal from "./Modal";
import CancelIcon from "@mui/icons-material/Cancel";
import Lottie from "lottie-react";
import BikeAnimation from "../img/bike.json";
import Map from "./Map"
import "../App.css";

interface Props {
  stations: Station[];
}

interface MarkerStation {
  x: number,
  y: number,
  name: string
}

const Stations = ({ stations }: Props) => {
  const [filterWord, setFilterWord] = useState("");
  const [showStation, setShowStation] = useState(false);
  const [returns, setReturns] = useState(0);
  const [departures, setDepartures] = useState(0);
  const [address, setAddress] = useState("");
  const [stationToShow, setStationToShow] = useState("");
  const [isAnimationStopped, setIsAnimationStopped] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedStation, setSelectedStation] = useState<MarkerStation>({x: 0, y: 9, name: ""});

  const handleJourneys = async (event: React.SyntheticEvent, row: any) => {
    event.preventDefault();
    const resultsOfStationSearches = await handleCountJourneys(row.Nimi);
    setReturns(resultsOfStationSearches.totalReturnsToStation);
    setDepartures(resultsOfStationSearches.totalDeparturesFromStation);
    setAddress(resultsOfStationSearches.stationName[0].Osoite);
    setStationToShow(resultsOfStationSearches.stationName[0].Name);
    setShowStation(true);
  };

  const handleShowMap = async (event: React.SyntheticEvent, row: any) => {
    event.preventDefault();
    console.log(row)
    setSelectedStation({x: row.x, y: row.y, name: row.Nimi})
    setShowMap(true);
  };

  const columns: GridColDef[] = [
    {
      field: "Name",
      headerName: "Name",
      minWidth: 170,
    },
    {
      field: "Osoite",
      headerName: "Address",
      minWidth: 170,
    },
    {
      field: "Kaupunki",
      headerName: "City",
      minWidth: 170,
    },
    {
      field: "Operaattor",
      headerName: "Operator",
      minWidth: 170,
    },
    {
      field: "Kapasiteet",
      headerName: "Capacity",
      minWidth: 170,
    },
    {
      field: "x",
      headerName: "X",
      minWidth: 170,
    },
    {
      field: "y",
      headerName: "Y",
      minWidth: 170,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 200,
      renderCell: (row) => {
        return (
          <Box>
            <Button
              onClick={(e) => handleJourneys(e, row.row)}
              variant="contained"
              style={{ margin: "auto" }}
            >
              Check me out
            </Button>
            <Button
              onClick={(e) => handleShowMap(e, row.row)}
              variant="contained"
              style={{ margin: "auto" }}
            >
              Map
            </Button>
          </Box>
        );
      },
    },
  ];

  const rows = stations?.map((x: any) => ({
    id: x.id,
    FID: x.FID,
    Nimi: x.Nimi,
    ID: x.ID,
    Name: x.Name,
    Osoite: x.Osoite,
    Kaupunki: x.Kaupunki,
    Operaattor: x.Operaattor,
    Kapasiteet: x.Kapasiteet,
    x: x.x,
    y: x.y,
  }));

  const stopAnimation = () => {
    console.log(isAnimationStopped);
    setIsAnimationStopped(!isAnimationStopped);
    const animationDiv: any = document.querySelector(".moveAnimation");
    if (isAnimationStopped) {
      animationDiv.classList.remove("paused");
    } else {
      animationDiv.classList.add("paused");
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "50%",
          padding: 2,
        }}
      >
        <Search filterWord={filterWord} setFilterWord={setFilterWord} />
      </Box>

      <Box
        sx={{ width: "100%", marginBottom: "-94px" }}
        className="moveAnimation"
      >
        <Button type="button" onClick={stopAnimation}>
          <Lottie
            animationData={BikeAnimation}
            loop={true}
            style={{ width: 200 }}
          />
        </Button>
      </Box>

      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          height: 950,
          margin: "auto",
        }}
      >
        <DataGrid
          rows={rows.filter((row) =>
            Object.values(row)
              .join(" ")
              .toLowerCase()
              .includes(filterWord.toLowerCase())
          )}
          columns={columns}
        />
      </Paper>

      <Modal show={showStation}>
        <div>
          <Button
            type="button"
            onClick={(event) => setShowStation(false)}
            style={{
              position: "absolute",
              marginLeft: 200,
              marginTop: "-12px",
            }}
          >
            <CancelIcon style={{ color: "#ff8383", fontSize: 50 }} />
          </Button>
          <h1
            style={{
              textTransform: "uppercase",
              margin: "auto",
              marginTop: 20,
            }}
          >
            {stationToShow}
          </h1>
          <p>Address: {address}</p>
          <div>
            <div>
              <h2>Returns: {returns}</h2>
              <h2>Departures: {departures}</h2>
            </div>
          </div>
        </div>
      </Modal>

      <Modal show={showMap}>
        <div>
          <Button
            type="button"
            onClick={(event) => setShowMap(false)}
            style={{
              position: "absolute",
              marginLeft: 200,
              marginTop: "-12px",
              zIndex: 2
            }}
          >
            <CancelIcon style={{ color: "#ff8383", fontSize: 50 }} />
          </Button>
          <Map selectedStation={selectedStation}/>
        </div>
      </Modal>

    </Paper>
  );
};

export default Stations;
