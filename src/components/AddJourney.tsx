import React, { useState } from "react";
import { TableCell, TableRow, TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import CancelIcon from "@mui/icons-material/Cancel";
import { handleAddNewJourney } from "../services/bikeService";
import Modal from "./Modal";
import { Station } from "../types";
import { Player } from "@lottiefiles/react-lottie-player";
import heartAnimation from "../lotties/heart.json";
import brainAnimation from "../lotties/thinking.json";
import DateTimePicker from "./DateTimePicker";

interface Props {
  stations: Station[];
}

const AddJourney = ({ stations }: Props) => {
  const [departureStation, setDepartureStation] = useState("");
  const [returnStation, setReturnStation] = useState("");
  const [coveredDistance, setCoveredDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [showMissingField, setShowMissingField] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddJourney = () => {
    if (
      !departureStation ||
      !returnStation ||
      !coveredDistance ||
      !duration ||
      !startTime ||
      !endTime
    ) {
      setShowMissingField(true);
    } else {
      handleAddNewJourney({
        Departure_station_name: departureStation,
        Return_station_name: returnStation,
        Covered_distance: coveredDistance,
        Departure: startTime,
        Return: endTime,
        Duration: duration,
      }).then((response) => {
        if (response.success === true) {
          setShowSuccess(true);
          setDepartureStation("");
          setReturnStation("");
          setCoveredDistance("");
          setDuration("");
          setStartTime("");
          setEndTime("");
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
            select
            label="Departure Station"
            value={departureStation}
            onChange={(e) => setDepartureStation(e.target.value)}
            style={{ width: 200 }}
          >
            {stations.map((station) => (
              <MenuItem key={station.Nimi} value={station.Nimi}>
                {station.Nimi}
              </MenuItem>
            ))}
          </TextField>
        </TableCell>
        <TableCell>
          <TextField
            select
            label="Return Station"
            value={returnStation}
            onChange={(e) => setReturnStation(e.target.value)}
            style={{ width: 200 }}
          >
            {stations.map((station) => (
              <MenuItem key={station.Nimi} value={station.Nimi}>
                {station.Nimi}
              </MenuItem>
            ))}
          </TextField>
        </TableCell>
        <TableCell>
          <TextField
            label="Covered Distance"
            value={coveredDistance}
            onChange={(e) => setCoveredDistance(e.target.value)}
          />
        </TableCell>
        <TableCell>
          <TextField
            label="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </TableCell>
        <TableCell>
          <DateTimePicker
            time={startTime}
            label={"Start"}
            setTime={setStartTime}
          />
        </TableCell>
        <TableCell>
          <DateTimePicker time={endTime} label={"End"} setTime={setEndTime} />
        </TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddJourney}
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
          <h3>Good job! Successfully added a great journey!</h3>
          <Player src={heartAnimation} loop autoplay />
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
          <Player
            src={brainAnimation}
            className="player"
            loop
            autoplay
            style={{ marginTop: 100 }}
          />
        </div>
      </Modal>
    </Box>
  );
};

export default AddJourney;
