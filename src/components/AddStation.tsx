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
} from "@mui/material";
import Box from "@mui/material/Box";
import CancelIcon from "@mui/icons-material/Cancel";
import { handleAddNewStation } from "../services/stationService";
import Modal from "./Modal";
import { Player } from "@lottiefiles/react-lottie-player";
import heartAnimation from "../lotties/heart.json";
import brainAnimation from "../lotties/thinking.json";

const AddStation = () => {
  const [nameStation, setNameStation] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [operator, setOperator] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [xMap, setXMap] = useState(0.0);
  const [yMap, setYMap] = useState(0.0);
  const [showMissingField, setShowMissingField] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddStation = () => {
    if (
      !nameStation ||
      !address ||
      !city ||
      !operator ||
      !capacity ||
      !xMap ||
      !yMap
    ) {
      setShowMissingField(true);
    } else {
      handleAddNewStation({
        nameStation,
        address,
        city,
        operator,
        capacity,
        xMap,
        yMap,
      }).then((response) => {
        if (response.success === true) {
          setShowSuccess(true);
          setNameStation("");
          setAddress("");
          setCity("");
          setOperator("");
          setCapacity(0);
          setXMap(0.0);
          setYMap(0.0);
          setShowMissingField(false);
        } else {
          setShowError(true);
          console.log("Error");
        }
      });
    }
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddStation}
          >
            Add
          </Button>
        </TableCell>
      </TableRow>

      <Modal show={showSuccess}>
        <div>
          <Button
            type="button"
            onClick={(event) => setShowSuccess(false)}
            style={{
              position: "absolute",
              marginLeft: 200,
              marginTop: "-12px",
              zIndex: 2,
            }}
          >
            <CancelIcon style={{ color: "#ff8383", fontSize: 50 }} />
          </Button>
          <h3>Good job! Successfully added the station!</h3>
          <Player src={heartAnimation} loop autoplay/>
        </div>
      </Modal>

      <Modal show={showError}>
        <div>
          <Button
            type="button"
            onClick={(event) => setShowError(false)}
            style={{
              position: "absolute",
              marginLeft: 200,
              marginTop: "-12px",
              zIndex: 2,
            }}
          >
            <CancelIcon style={{ color: "#ff8383", fontSize: 50 }} />
          </Button>
          <h3>
            Sorry! We are experiencing technical problems now. We are fixing
            this now.
          </h3>
          <Player src={brainAnimation} loop autoplay />
        </div>
      </Modal>

      <Modal show={showMissingField}>
        <div>
          <Button
            type="button"
            onClick={(event) => setShowMissingField(false)}
            style={{
              position: "absolute",
              marginLeft: 200,
              marginTop: "-12px",
              zIndex: 2,
            }}
          >
            <CancelIcon style={{ color: "#ff8383", fontSize: 50 }} />
          </Button>
          <h3>Please check that all fields are complete.</h3>
          <Player src={brainAnimation}  className="player" loop autoplay style={{marginTop: 100}}/>
        </div>
      </Modal>
    </Box>
  );
};

export default AddStation;
