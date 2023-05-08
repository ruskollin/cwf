import { useState } from "react";
import { TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import CancelIcon from "@mui/icons-material/Cancel";
import { handleAddNewJourney } from "../services/journeyService";
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
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showMissingField, setShowMissingField] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [openErrorMessage, setOpenErrorMessage] = useState(false);

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
      if (checkValidDistance() && checkValidDuration() && checkStartEndTime()) {
        handleAddNewJourney({
          Departure_station_name: departureStation,
          Return_station_name: returnStation,
          Covered_distance: coveredDistance,
          Departure: startTime.toISOString(),
          Return: endTime.toISOString(),
          Duration: duration,
        }).then((response) => {
          if (response.success === true) {
            setShowSuccess(true);
            setDepartureStation("");
            setReturnStation("");
            setCoveredDistance("");
            setDuration("");
            setStartTime(new Date());
            setEndTime(new Date());
            setShowMissingField(false);
            setOpenErrorMessage(false);
          } else {
            setShowError(true);
          }
        });
      } else {
        setOpenErrorMessage(true);
      }
    }
  };

  function checkValidDistance() {
    //distance should be 10 meters or more (0.01 kms)
    if (
      /^\d*\.?\d*$/.test(coveredDistance) &&
      parseFloat(coveredDistance) >= 0.01
    ) {
      return true;
    } else {
      return false;
    }
  }

  function checkValidDuration() {
    //duration should be 10 seconds or more (0.16 secs)
    if (/^\d*\.?\d*$/.test(duration) && parseFloat(duration) >= 0.16) {
      return true;
    } else {
      return false;
    }
  }

  function checkStartEndTime() {
    if (endTime.getTime() > startTime.getTime()) {
      return true;
    } else {
      return false;
    }
  }

  function handleCloseSuccessDiv() {
    setShowSuccess(false);
    window.location.reload();
  }

  return (
    <Box style={{ padding: 10 }}>
      {openErrorMessage && (
        <div className="errorBox">
          <p style={{ color: "red" }}>
            Please check that the duration(more than 0.16) and distance(more
            than 0.01) are correct.
          </p>
          <p style={{ color: "red" }}>
            Please check that the end time is not before the start time.
          </p>
        </div>
      )}

      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          height: 500,
        }}
      >
        <TextField
          select
          className="departureStation"
          label="Departure Station"
          value={departureStation}
          onChange={(e) => setDepartureStation(e.target.value)}
          style={{ width: 223 }}
        >
          {stations.map((station) => (
            <MenuItem key={station.Nimi} value={station.Nimi}>
              {station.Nimi}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          className="returnStation"
          label="Return Station"
          value={returnStation}
          onChange={(e) => setReturnStation(e.target.value)}
          style={{ width: 223 }}
        >
          {stations.map((station) => (
            <MenuItem key={station.Nimi} value={station.Nimi}>
              {station.Nimi}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          data-testid="coveredDistance"
          label="Covered Distance"
          value={coveredDistance}
          onChange={(e) => setCoveredDistance(e.target.value)}
          style={{ width: 223 }}
        />

        <TextField
          data-testid="duration"
          label="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={{ width: 223 }}
        />

        <div className="datepicker1" style={{ width: 222 }}>
          <DateTimePicker
            data-testid="startTime"
            label={"Start"}
            setTime={setStartTime}
          />
        </div>

        <div className="datepicker2" style={{ width: 222 }}>
          <DateTimePicker
            data-testid="endTime"
            label={"End"}
            setTime={setEndTime}
          />
        </div>

        <Button
          className="addButton"
          variant="contained"
          color="primary"
          onClick={handleAddJourney}
          style={{ width: 20 }}
        >
          Add
        </Button>
      </Box>

      <Modal show={showSuccess}>
        <div className="successDiv">
          <Button
            type="button"
            onClick={handleCloseSuccessDiv}
            style={{
              position: "absolute",
              marginTop: "-47px",
              marginLeft: "-33px",
            }}
          >
            <CancelIcon style={{ color: "#ff8383", fontSize: 50 }} />
          </Button>
          <h3 style={{ textAlign: "center" }}>
            Good job! Successfully added a great journey!
          </h3>
          <Player src={heartAnimation} loop autoplay />
        </div>
      </Modal>

      <Modal show={showError}>
        <div>
          <Button
            type="button"
            onClick={() => setShowError(false)}
            style={{
              position: "absolute",
              marginTop: "-47px",
              marginLeft: "-33px",
            }}
          >
            <CancelIcon style={{ color: "#ff8383", fontSize: 50 }} />
          </Button>
          <h3 style={{ textAlign: "center" }}>
            Sorry! We are experiencing technical problems now. We are fixing
            this now.
          </h3>
          <Player src={brainAnimation} loop autoplay />
        </div>
      </Modal>

      <Modal show={showMissingField}>
        <div className="missingFieldsDiv">
          <Button
            type="button"
            onClick={() => setShowMissingField(false)}
            style={{
              position: "absolute",
              marginTop: "-47px",
              marginLeft: "-33px",
            }}
          >
            <CancelIcon style={{ color: "#ff8383", fontSize: 50 }} />
          </Button>
          <h3 style={{ textAlign: "center" }}>
            Please check that all fields are complete.
          </h3>
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
