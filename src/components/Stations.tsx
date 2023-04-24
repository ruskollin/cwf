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
import { Station, Bike } from "../types";
import { handleCountJourneys } from "../services/stationService";
import Modal from "./Modal";
import CancelIcon from "@mui/icons-material/Cancel";
import Lottie from "lottie-react";
import BikeAnimation from "../img/bike.json";
import Map from "./Map";
import "../App.css";

interface Props {
  stations: Station[];
  journeys: Bike[];
}

interface MarkerStation {
  x: number;
  y: number;
  name: string;
}

const Stations = ({ stations, journeys }: Props) => {
  const [filterWord, setFilterWord] = useState("");
  const [showStation, setShowStation] = useState(false);
  const [returns, setReturns] = useState(0);
  const [departures, setDepartures] = useState(0);
  const [
    averageDistanceStartingAtStation,
    setAverageDistanceStartingAtStation,
  ] = useState(0);
  const [averageDistanceEndingAtStation, setAverageDistanceEndingAtStation] =
    useState(0);
  const [address, setAddress] = useState("");
  const [stationToShow, setStationToShow] = useState("");
  const [isAnimationStopped, setIsAnimationStopped] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [popularDepartureStations, setPopularDepartureStations] = useState([]);
  const [popularReturnStations, setPopularReturnStations] = useState([]);
  const [chosenMonth, setChosenMonth] = useState(0);
  const [chosenStation, setChosenStation] = useState("");
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

  const handleJourneys = async (event: React.SyntheticEvent, row: any) => {
    event.preventDefault();
    const resultsOfStationSearches = await handleCountJourneys(row.Nimi);
    const averageDistanceStart = await handleAverageDistanceFromStation(
      row.Nimi,
      chosenMonth
    );
    handleAverageDistanceEndingAtStation(row.Nimi, chosenMonth);
    handlePopularReturnStationsStartingFromStation(row.Nimi, chosenMonth);
    handlePopularDepartureStationsEndingAtStation(row.Nimi, chosenMonth);
    setAverageDistanceStartingAtStation(averageDistanceStart);

    setReturns(resultsOfStationSearches.totalReturnsToStation);
    setDepartures(resultsOfStationSearches.totalDeparturesFromStation);
    setAddress(resultsOfStationSearches.stationName[0].Osoite);
    setStationToShow(resultsOfStationSearches.stationName[0].Name);
    setShowStation(true);
  };

  const handleShowMap = async (event: React.SyntheticEvent, row: any) => {
    event.preventDefault();
    console.log(row);
    setSelectedStation({ x: row.x, y: row.y, name: row.Nimi });
    setShowMap(true);
  };

  async function handleAverageDistanceFromStation(
    stationName: string,
    chosenMonth: number
  ) {
    console.log("Journeys length: ", journeys.length);
    const stationJourneys = journeys.filter(
      (journey) => journey.Departure_station_name === stationName
    );
    const totalDistance = stationJourneys.reduce(
      (acc, journey) => acc + journey.Covered_distance,
      0
    );
    const averageDistanceFromStation = totalDistance / stationJourneys.length;
    console.log(
      "departure station and distance ",
      stationName,
      stationJourneys.length,
      totalDistance,
      averageDistanceFromStation
    );
    return averageDistanceFromStation;
  }

  async function handleAverageDistanceEndingAtStation(
    stationName: string,
    chosenMonth: number
  ) {
    console.log("Journeys length: ", journeys.length);
    const stationJourneysList = journeys.filter(
      (journey) => journey.Return_station_name === stationName
    );
    const totalDistance = stationJourneysList.reduce(
      (acc, journey) => acc + journey.Covered_distance,
      0
    );
    const averageDistanceEndingAtStation =
      totalDistance / stationJourneysList.length;
    setAverageDistanceEndingAtStation(averageDistanceEndingAtStation);
  }

  function handlePopularReturnStationsStartingFromStation(
    stationName: string,
    chosenMonth: number
  ) {
    console.log("searching popular stations for: ", stationName);
    const filteredJourneys = journeys.filter(
      (journey) => journey.Departure_station_name === stationName
    );

    const counts = filteredJourneys.reduce((acc: any, journey) => {
      const returnStation = journey.Return_station_name;
      acc[returnStation] = (acc[returnStation] || 0) + 1;
      console.log(acc);
      return acc;
    }, {});

    const popularReturnStationsList: any = Object.entries(counts)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 5)
      .map(([returnStation, count]) => ({ returnStation, count }));

    setPopularReturnStations(popularReturnStationsList);
  }

  function handlePopularDepartureStationsEndingAtStation(
    stationName: string,
    chosenMonth: number
  ) {
    console.log("searching popular stations for: ", stationName);
    const filteredJourneys = journeys.filter(
      (journey) => journey.Return_station_name === stationName
    );

    const counts = filteredJourneys.reduce((acc: any, journey) => {
      const departureStation = journey.Departure_station_name;
      acc[departureStation] = (acc[departureStation] || 0) + 1;
      console.log(acc);
      return acc;
    }, {});

    const popularDepartureStationsList: any = Object.entries(counts)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 5)
      .map(([departureStation, count]) => ({ departureStation, count }));

    setPopularDepartureStations(popularDepartureStationsList);
  }

  function handleChosenMonth(month: string) {
    const monthIndex = monthsList.indexOf(month);
    console.log(monthIndex);
    setChosenMonth(monthIndex);

    // const stationJourneysList = journeys.filter((journey) => {
    //   const departureMonth = new Date(journey.Departure).getMonth() + 1;
    //   console.log(new Date(journey.Departure).getMonth() + 1)
    //   return departureMonth === 5;
    // });
    
    //working
    const stationJourneysList = journeys.filter((journey) => {
      const departureDate = new Date(journey.Departure);
      console.log(departureDate, month)
      return departureDate.toLocaleString('default', { month: 'long' }) === month;
    });


    console.log(stationJourneysList)

    // const stationJourneysList = journeys.filter(
    //   (journey) => new Date(journey.Departure).getMonth() === monthIndex
    // );

    // const stationJourneysList = journeys.filter((journey) => {
    //   const departureMonth = new Date(journey.Departure).getMonth();
    //   console.log(departureMonth, monthIndex, 'Haukilahdenkatu', 'Lintulahdenkatu');
    //   return (
    //     journey.Return_station_name === 'Lintulahdenkatu' && departureMonth === monthIndex
    //   );
    // });

    // const totalDistance = stationJourneysList.reduce(
    //   (acc, journey) => acc + journey.Covered_distance,
    //   0
    // );
    // const averageDistanceEndingAtStation =
    //   totalDistance / stationJourneysList.length;
    // console.log(averageDistanceEndingAtStation);
    // setAverageDistanceEndingAtStation(averageDistanceEndingAtStation);
  }

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
            {monthsList.map((month) => (
              <button key={month} onClick={() => handleChosenMonth(month)}>
                {month}
              </button>
            ))}
          </div>

          <div>
            <div>
              <h3>Returns: {returns}</h3>
              <h3>Departures: {departures}</h3>
              <h3>
                Average Distance From Station:{" "}
                {averageDistanceStartingAtStation.toFixed(2)} kms.
              </h3>
              <h3>
                Average Distance Ending at Station:{" "}
                {averageDistanceEndingAtStation.toFixed(2)} kms.
              </h3>
              {popularReturnStations.length > 0 && (
                <div>
                  <h3>Popular Return Stations From this Station:</h3>
                  {popularReturnStations
                    .map(
                      (station: { returnStation: string }) =>
                        station.returnStation
                    )
                    .join(", ")}
                </div>
              )}

              {popularDepartureStations.length > 0 && (
                <div>
                  <h3>Popular Departure Stations To this Station:</h3>
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
