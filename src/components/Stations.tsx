import { useState, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Search from "./Search";
import { Station } from "../types";
import { handleCountJourneys } from "../services/stationService";
import Modal from "./Modal";
import CancelIcon from "@mui/icons-material/Cancel";

interface Props {
  stations: Station[];
}

const Stations = ({ stations }: Props) => {
  const [filterWord, setFilterWord] = useState("");
  const [showStation, setShowStation] = useState(false);
  const [returns, setReturns] = useState(0);
  const [departures, setDepartures] = useState(0);
  const [address, setAddress] = useState("");
  const [stationToShow, setStationToShow] = useState("");

  const handleJourneys = async (event: React.SyntheticEvent, row: any) => {
    event.preventDefault();
    const resultsOfStationSearches = await handleCountJourneys(row.Nimi);
    setReturns(resultsOfStationSearches.totalReturnsToStation);
    setDepartures(resultsOfStationSearches.totalDeparturesFromStation);
    setAddress(resultsOfStationSearches.stationName[0].Osoite);
    setStationToShow(resultsOfStationSearches.stationName[0].Name);
    setShowStation(true);
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
          <Button
            onClick={(e) => handleJourneys(e, row.row)}
            variant="contained"
            style={{margin: 'auto'}}
          >
            Check me out
          </Button>
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
    </Paper>
  );
};

export default Stations;
