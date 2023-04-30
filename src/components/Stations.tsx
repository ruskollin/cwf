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
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
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
  const [openFilterTab, setOpenFilterTab] = useState(false);

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

  const handleJourneys = async (stationName: string, month: string) => {
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

  const handleShowStation = () => {
    setChosenMonth("All");
    setShowStation(false);
  };

  const handleShowMap = async (row: any) => {
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
    handleJourneys(stationToShow, month);
  };

  const columns: GridColDef[] = [
    {
      field: "FID",
      headerName: "FID",
      renderCell: () => <div style={{ display: "none" }} />,
      renderHeader: () => {
        return <span style={{ display: "none" }} />;
      },
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      width: 0,
      minWidth: 0,
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
              onClick={() => handleJourneys(row.row.Nimi, chosenMonth)}
              variant="contained"
            >
              INFO
            </Button>

            <Button
              onClick={() => handleShowMap(row.row)}
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
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "98.5%",
          marginLeft: 3,
        }}
      >
        <AddStation />
        <Search filterWord={filterWord} setFilterWord={setFilterWord} />
      </Box>
      <Box
        sx={{
          width: "100%",
          overflow: "auto",
          height: "76vh",
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
              sortModel: [{ field: "FID", sort: "desc" }],
            },
          }}
        />
      </Box>

      <Modal show={showStation}>
        <div>
          {isLoading ? (
            <p>Loading</p>
          ) : (
            <div>
              <Button
                type="button"
                onClick={handleShowStation}
                style={{
                  position: "absolute",
                  marginTop: "-52px",
                  marginLeft: "-33px"
                }}
              >
                <CancelIcon
                  style={{
                    color: "#ff8383",
                    background: "white",
                    borderRadius: 24,
                    fontSize: 50,
                  }}
                />
              </Button>
              <Box className="hexagonDiv">
                <Box style={{ paddingLeft: 25, paddingRight: 25}}>
                  <h2 className="hexagonContent">{stationToShow}</h2>
                </Box>
              </Box>
              <p style={{ textAlign: "center",marginTop: 0 }}>Address: {address}</p>

              <div>
                <Button
                  type="button"
                  title="Close tab"
                  onClick={() => setOpenFilterTab(!openFilterTab)}
                  style={{ height: 10, color: "#6E7D8E" }}
                >
                  <CalendarMonthIcon style={{ fontSize: 30, margin: 0 }} />
                  <p>Filter by month</p>
                </Button>
                {openFilterTab && (
                  <div style={{ marginTop: 5 }}>
                    {monthsList.map((month) => (
                      <button
                        className="buttonStation"
                        style={{
                          background:
                            chosenMonth === month ? "#766a8d" : "inherit",
                          color: chosenMonth === month ? "white" : "inherit",
                        }}
                        key={month}
                        onClick={(event) => handleChosenMonth(event, month)}
                      >
                        {month}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <table className="tableStation">
                <tr>
                  <th></th>
                  <th>Departures</th>
                  <th>Returns</th>
                </tr>
                <tr>
                  <td>Count</td>
                  <td>{departures}</td>
                  <td>{returns}</td>
                </tr>
                <tr>
                  <td>Average Distance</td>
                  <td>
                    {averageDistanceStartingAtStation
                      ? averageDistanceStartingAtStation.toFixed(2)
                      : "0"}{" "}
                    kms.
                  </td>
                  <td>
                    {averageDistanceEndingAtStation
                      ? averageDistanceEndingAtStation.toFixed(2)
                      : "0"}{" "}
                        kms.
                  </td>
                </tr>
                <tr>
                  <td>Popular Stations</td>
                  <td>
                    {" "}
                    {popularReturnStations
                      .map(
                        (station: { returnStation: string }) =>
                        <p>{station.returnStation}</p>
                      )}
                  </td>
                  <td>
                    {" "}
                    {popularDepartureStations
                      .map(
                        (station: { departureStation: string }) =>
                          <p>{station.departureStation}</p>
                      )}
                  </td>
                </tr>
              </table>

              {/* <div>
                <p>Departures: {departures}</p>

                <p>Average Distance: </p>
                <Box className="geometricalDiv">
                  {averageDistanceStartingAtStation
                    ? averageDistanceStartingAtStation.toFixed(2)
                    : "0"}
                  kms.
                </Box>
                {popularReturnStations.length > 0 && (
                  <div>
                    <p>Most go to:</p>
                    {popularReturnStations
                      .map(
                        (station: { returnStation: string }) =>
                          station.returnStation
                      )
                      .join(", ")}
                  </div>
                )}
                <p>Returns: {returns}</p>
                <p>
                  Average Distance:{" "}
                  {averageDistanceEndingAtStation
                    ? averageDistanceEndingAtStation.toFixed(2)
                    : "0"}
                  kms.
                </p>
                {popularDepartureStations.length > 0 && (
                  <div>
                    <p>Most come from:</p>
                    {popularDepartureStations
                      .map(
                        (station: { departureStation: string }) =>
                          station.departureStation
                      )
                      .join(", ")}
                  </div>
                )}
              </div> */}
            </div>
          )}
        </div>
      </Modal>

      <Modal show={showMap}>
        <div>
          <Button
            type="button"
            onClick={() => setShowMap(false)}
            style={{
              position: "absolute",
              marginTop: "-30px",
              marginLeft: "-33px",
              zIndex: 2,
            }}
          >
            <CancelIcon
              style={{
                color: "#ff8383",
                background: "white",
                borderRadius: 24,
                fontSize: 50,
              }}
            />
          </Button>
          <Map selectedStation={selectedStation} />
        </div>
      </Modal>
    </Box>
  );
};

export default Stations;
