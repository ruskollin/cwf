import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Bike } from "../types";
import { DataGrid , GridColDef, GridRowsProp} from '@mui/x-data-grid';

interface Props {
  bikes: Bike[];
}

const Bikes = ({ bikes }: Props) => {
  const [page, setPage] = React.useState(0);

  // function createData(
  //   Covered_distance: string,
  //   Departure: any,
  //   Departure_station_id: any,
  //   Departure_station_name: any,
  //   Duration: any,
  //   Return: any,
  //   Return_station_id: any,
  //   Return_station_name: number
  // ) {
  //   return {
  //     Covered_distance,
  //     Departure,
  //     Departure_station_id,
  //     Departure_station_name,
  //     Duration,
  //     Return,
  //     Return_station_id,
  //     Return_station_name,
  //   };
  // }

  const columns: GridColDef[] = [
    { field: 'Departure_station_name', headerName: 'Departure Station Name', width: 150 },
    { field: 'Return_station_name', headerName: 'Return Station Name', width: 150 },
    { field: 'Covered_distance', headerName: 'Covered Distance', width: 150 },
    { field: 'Duration', headerName: 'Duration', width: 150 }
  ];

  const rows = bikes?.map(x => ({ id: x.id, Departure_station_name: x.Departure_station_name, Return_station_name: x.Return_station_name, Covered_distance: x.Covered_distance, Duration: x.Duration }));

  // const rows: GridRowsProp = [
  //   { id: 1, col1: 'Hello', col2: 'World' },
  //   { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  //   { id: 3, col1: 'MUI', col2: 'is Amazing' },
  // ];

    // const rows = bikes.map((item: any) =>
  //   createData(
  //     item.Covered_distance,
  //     item.Departure,
  //     item.Departure_station_id,
  //     item.Return_station_id,
  //     item.Return,
  //     item.Duration,
  //     item.Departure_station_name,
  //     item.Return_station_name
  //   )
  // );

  // const columns = [
  //   {
  //     id: "Covered_distance",
  //     label: "Covered Distance",
  //     minWidth: 170,
  //     align: "right",
  //   },
  //   {
  //     id: "Departure",
  //     label: "Departure",
  //     minWidth: 170,
  //     align: "right",
  //   },
  //   {
  //     id: "Return",
  //     label: "Return",
  //     minWidth: 170,
  //     align: "right",
  //   },
  //   {
  //     id: "Duration",
  //     label: "Duration",
  //     minWidth: 170,
  //     align: "right",
  //   },
  //   {
  //     id: "Departure_station_name",
  //     label: "Departure Station Name",
  //     minWidth: 170,
  //     align: "right",
  //   },
  //   {
  //     id: "Return_station_name",
  //     label: "Return Station Name",
  //     minWidth: 170,
  //     align: "right",
  //   },
  // ];

  // const rows = bikes.map((item: any) =>
  //   createData(
  //     item.Covered_distance,
  //     item.Departure,
  //     item.Departure_station_id,
  //     item.Return_station_id,
  //     item.Return,
  //     item.Duration,
  //     item.Departure_station_name,
  //     item.Return_station_name
  //   )
  // );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", height: 900}}>
       <DataGrid rows={rows} columns={columns} />
      {/* <TableContainer sx={{ maxHeight: "100vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(100).map((row: any) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.ID}>
                  <TableCell> {row.Covered_distance} </TableCell>
                  <TableCell>{row.Departure}</TableCell>
                  <TableCell>{row.Return}</TableCell>
                  <TableCell>{row.Duration}</TableCell>
                  <TableCell>{row.Departure_station_name}</TableCell>
                  <TableCell>{row.Return_station_name}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer> */}
    </Paper>
  );
};

export default Bikes;
