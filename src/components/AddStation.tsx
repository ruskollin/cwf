import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import Box from "@mui/material/Box";
import { handleAddNewStation } from "../services/stationService";

const AddStation = () => {
  const [nameStation, setNameStation] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [operator, setOperator] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [xMap, setXMap] = useState(0.0);
  const [yMap, setYMap] = useState(0.0);

  const handleAddStation = () => {
    handleAddNewStation({
      nameStation,
      address,
      city,
      operator,
      capacity,
      xMap,
      yMap,
    });
    setNameStation("");
    setAddress("");
    setCity("");
    setOperator("");
    setCapacity(0);
    setXMap(0.0);
    setYMap(0.0);
  };

  return (
    <Box>
      <TableRow>
        <TableCell>
          <TextField
            label="Station Name"
            value={nameStation}
            onChange={(e) => setNameStation(e.target.value)}
          />
        </TableCell>
        <TableCell>
          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </TableCell>
        <TableCell>
          <TextField
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </TableCell>
        <TableCell>
          <TextField
            label="Operator"
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
          />
        </TableCell>
        <TableCell>
          <TextField
            label="Capacity"
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
          />
        </TableCell>
        <TableCell>
          <TextField
            label="X"
            type="number"
            value={xMap}
            onChange={(e) => setXMap(Number(e.target.value))}
          />
        </TableCell>
        <TableCell>
          <TextField
            label="Y"
            type="number"
            value={yMap}
            onChange={(e) => setYMap(Number(e.target.value))}
          />
        </TableCell>
        <TableCell>
          <Button variant="contained" color="primary" onClick={handleAddStation}>
            Add
          </Button>
        </TableCell>
      </TableRow>
    </Box>
  );
};

export default AddStation;
