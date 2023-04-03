import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Station } from "../types";

interface Props {
  stations: Station[];
}

const Stations = ({ stations }: Props) => {
  const [page, setPage] = React.useState(0);

  function createData(
    Name: string,
    Osoite: any,
    Kaupunki: any,
    Operaattor: any,
    Kapasiteet: any,
    x: any,
    y: any,
    ID: number
  ) {
    return { Name, Osoite, Kaupunki, Operaattor, Kapasiteet, x, y, ID };
  }

  const columns = [
    {
      id: "Name",
      label: "Name",
      minWidth: 170,
      align: "right",
    },
    {
      id: "Osoite",
      label: "Address",
      minWidth: 170,
      align: "right",
    },
    {
      id: "Kaupunki",
      label: "City",
      minWidth: 170,
      align: "right",
    },
    {
      id: "Operaattor",
      label: "Operator",
      minWidth: 170,
      align: "right",
    },
    {
      id: "Kapasiteet",
      label: "Capacity",
      minWidth: 170,
      align: "right",
    },
    {
      id: "x",
      label: "X",
      minWidth: 170,
      align: "right",
    },
    {
      id: "y",
      label: "Y",
      minWidth: 170,
      align: "right",
    },
  ];

  const rows = stations.map((item: any) =>
    createData(
      item.Name,
      item.Osoite,
      item.Kaupunki,
      item.Operaattor,
      item.Kapasiteet,
      item.x,
      item.y,
      item.ID
    )
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: '100vh' }}>
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
                  <TableCell> {row.Name} </TableCell>
                  <TableCell>{row.Osoite}</TableCell>
                  <TableCell>{row.Kaupunki}</TableCell>
                  <TableCell>{row.Operaattor}</TableCell>
                  <TableCell>{row.Kapasiteet}</TableCell>
                  <TableCell>{row.x}</TableCell>
                  <TableCell>{row.y}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]}
        component="div"
        count={stations.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
      /> */}
    </Paper>
  );
};

export default Stations;
