import { useState } from "react";
import Paper from "@mui/material/Paper";
import { Bike } from "../types";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Search from "./Search";

interface Props {
  bikes: Bike[];
  handleShowFilteredJourneys: (params: any) => any;
}

const Bikes = ({ bikes, handleShowFilteredJourneys }: Props) => {
  const [page, setPage] = useState(0);

  const columns: GridColDef[] = [
    {
      field: "Departure_station_name",
      headerName: "Departure Station Name",
      width: 150,
    },
    {
      field: "Return_station_name",
      headerName: "Return Station Name",
      width: 150,
    },
    {
      field: "Covered_distance",
      headerName: "Covered Distance",
      width: 150,
      valueGetter: (params) => (params?.value / 1000).toFixed(2),
    },
    {
      field: "Duration",
      headerName: "Duration",
      width: 150,
      valueGetter: (params) => (params?.value / 60).toFixed(2),
    },
  ];

  const rows = bikes?.map((x) => ({
    id: x.id,
    Departure_station_name: x.Departure_station_name,
    Return_station_name: x.Return_station_name,
    Covered_distance: x.Covered_distance,
    Duration: x.Duration,
  }));

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", height: 900 }}>
      <Search handleShowFilteredJourneys={handleShowFilteredJourneys} />
      <DataGrid rows={rows} columns={columns} />
    </Paper>
  );
};

export default Bikes;
