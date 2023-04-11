import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Station } from "../types";

interface Props {
  stations: Station[];
  handleJourneys: (params: any, row: any) => any;
}

const Stations = ({ stations, handleJourneys }: Props) => {
  const [page, setPage] = React.useState(0);

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
    </Paper>
  );
};

export default Stations;
