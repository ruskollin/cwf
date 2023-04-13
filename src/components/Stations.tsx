import { useState, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Station } from "../types";
import { handleCountJourneys } from "../services/stationService";
import Modal from "./Modal";

interface Props {
  stations: Station[];
}

const Stations = ({ stations }: Props) => {
  const [page, setPage] = useState(0);
  const [showStation, setShowStation] = useState(false);
  const [returns, setReturns] = useState(0);
  const [departures, setDepartures] = useState(0);
  const [address, setAddress] = useState('');

  const handleJourneys = async (event: React.SyntheticEvent, row: any) => {
    event.preventDefault();
    const resultsOfStationSearches = await handleCountJourneys(row.Nimi);
    console.log(resultsOfStationSearches)
    setReturns(resultsOfStationSearches.totalReturnsToStation);
    setDepartures(resultsOfStationSearches.totalDeparturesFromStation);
    setAddress(resultsOfStationSearches.stationName)
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
      width: 400,
      renderCell: (row) => {
        return (
          <Button
            onClick={(e) => handleJourneys(e, row.row)}
            variant="contained"
          >
            Check me out
          </Button>
        );
      },
    },
  ];

  const rows = stations?.map((x) => ({
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
      <Paper sx={{ width: "100%", overflow: "hidden", height: 900 }}>
        <DataGrid rows={rows} columns={columns} />
      </Paper>

      <Modal show={showStation}>
        <div>
          <p>Hi!</p>
          <div>
            <div>
              <p>Returns: {returns}</p>
              <p>Departures: {departures}</p>
              <p>Address: {address}</p>
              {/* <p>
                    Total Departures from Station:{" "}
                    {stationData.totalDeparturesFromStation}
                  </p>
                  <p>
                    Total Returns To Station:{" "}
                    {stationData.totalReturnsToStation}
                  </p> */}
            </div>
          </div>
        </div>
      </Modal>
    </Paper>
  );
};

export default Stations;
