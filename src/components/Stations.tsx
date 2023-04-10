import * as React from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Station } from "../types";

interface Props {
  stations: Station[];
}

const Stations = ({ stations }: Props) => {
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
  ];

  const rows = stations?.map((x) => ({
    id: x.id,
    FID: x.FID,
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
