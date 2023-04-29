import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Search from "./Search";
import { Station } from "../types";
import { handleStationCalculations } from "../services/stationService";
import Modal from "./Modal";
import CancelIcon from "@mui/icons-material/Cancel";
import Map from "./Map";
import AddStation from "./AddStation";
import "../App.css";

interface Props {
  stations: Station[];
}

interface MarkerStation {
  x: number;
  y: number;
  name: string;
}

const Stations = ({ stations }: Props) => {
  const [filterWord, setFilterWord] = useState("");
  const [showStation, setShowStation] = useState(false);
  const [returns, setReturns] = useState(0);
  const [departures, setDepartures] = useState(0);
  const [chosenMonth, setChosenMonth] = useState("All");
  const [
    averageDistanceStartingAtStation,
    setAverageDistanceStartingAtStation,
  ] = useState(0);
  const [averageDistanceEndingAtStation, setAverageDistanceEndingAtStation] =
    useState(0);
  const [address, setAddress] = useState("");
  const [stationToShow, setStationToShow] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [popularDepartureStations, setPopularDepartureStations] = useState([]);
  const [popularReturnStations, setPopularReturnStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState<MarkerStation>({
    x: 0,
    y: 9,
    name: "",
  });

  const monthsList = [
    "All",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleJourneys = async (
    event: React.SyntheticEvent,
    stationName: string,
    month: string
  ) => {
    event.preventDefault();
    setIsLoading(true);

    await handleStationCalculations(stationName, month).then(
      (resultsOfStationSearches) => {
        setIsLoading(false);
        setAverageDistanceStartingAtStation(
          resultsOfStationSearches.averageDistanceFromStation
        );
        setAverageDistanceEndingAtStation(
          resultsOfStationSearches.averageDistanceEndingAtStation
        );
        setPopularDepartureStations(
          resultsOfStationSearches.popularDepartureStationsList
        );
        setPopularReturnStations(
          resultsOfStationSearches.popularReturnStationsList
        );
        setReturns(resultsOfStationSearches.totalReturnsToStation);
        setDepartures(resultsOfStationSearches.totalDeparturesFromStation);
        setAddress(resultsOfStationSearches.stationName[0].Osoite);
        setStationToShow(resultsOfStationSearches.stationName[0].Name);
        setShowStation(true);
      }
    );
  };

  const handleShowStation = (event: React.SyntheticEvent) => {
    setShowStation(false);
  };

  const handleShowMap = async (event: React.SyntheticEvent, row: any) => {
    event.preventDefault();
    console.log(row);
    setSelectedStation({ x: row.x, y: row.y, name: row.Nimi });
    setShowMap(true);
  };

  const handleChosenMonth = async (
    event: React.SyntheticEvent,
    month: string
  ) => {
    event.preventDefault();
    setChosenMonth(month);
    handleJourneys(event, stationToShow, month);
  };

  const columns: GridColDef[] = [
    {
      field: "FID",
      headerName: "FID",
      renderCell: () => (
        <div style={{ display: "none" }} />
      ),
      renderHeader: () => {
        return (
            <span style={{ display: "none" }} />
        );
      },
      sortable: false, 
      filterable: false,
      disableColumnMenu: true,
      width: 0,
      minWidth: 0
    },
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
              onClick={(e) => handleJourneys(e, row.row.Nimi, chosenMonth)}
              variant="contained"
            >
              INFO
            </Button>

            <Button
              onClick={(e) => handleShowMap(e, row.row)}
              variant="contained"
              style={{ marginLeft: "10px" }}
            >
              MAP
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

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <AddStation />
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
          initialState={{
            sorting: {
              sortModel: [{ field: 'FID', sort: 'desc' }],
            },
          }}
        />
      </Paper>

      <Modal show={showStation}>
        <div>
          {isLoading ? (
            <p>Loading</p>
          ) : (
            <div>
              <Button
                type="button"
                onClick={(event) => handleShowStation(event)}
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
                {monthsList.map((month) => (
                  <button
                    key={month}
                    onClick={(event) => handleChosenMonth(event, month)}
                  >
                    {month}
                  </button>
                ))}
              </div>

              <div>
                <h3>People start here: {departures} times</h3>
                <h3>
                  The average distance from this station is:{" "}
                  {averageDistanceStartingAtStation
                    ? averageDistanceStartingAtStation.toFixed(2)
                    : "0"}{" "}
                  kms.
                </h3>
                {popularReturnStations.length > 0 && (
                  <div>
                    <h3>Most go to:</h3>
                    {popularReturnStations
                      .map(
                        (station: { returnStation: string }) =>
                          station.returnStation
                      )
                      .join(", ")}
                  </div>
                )}
                <h3>Some have biked to go here: {returns} times</h3>
                <h3>
                  The average distance to this station is:{" "}
                  {averageDistanceEndingAtStation
                    ? averageDistanceEndingAtStation.toFixed(2)
                    : "0"}{" "}
                  kms.
                </h3>
                {popularDepartureStations.length > 0 && (
                  <div>
                    <h3>Most come from:</h3>
                    {popularDepartureStations
                      .map(
                        (station: { departureStation: string }) =>
                          station.departureStation
                      )
                      .join(", ")}
                  </div>
                )}
              </div>
            </div>
          )}
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
              zIndex: 2,
            }}
          >
            <CancelIcon style={{ color: "#ff8383", fontSize: 50 }} />
          </Button>
          <Map selectedStation={selectedStation} />
        </div>
      </Modal>
    </Paper>
  );
};

export default Stations;
