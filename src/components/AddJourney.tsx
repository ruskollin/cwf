import { useState } from "react";
import { TableCell, TableRow, TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AddCircleIcon from "@mui/icons-material/AddCircle";
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
  const [openAddTab, setOpenAddTab] = useState(false);

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
    <Box style={{ display: "flex", flexDirection: "row", height: 100 }}>
      <Button
        type="button"
        title="Add a journey here"
        onClick={() => setOpenAddTab(true)}
      >
        {!openAddTab && (
          <AddCircleIcon
            style={{
              height: 55,
              borderRadius: "5px",
              color: "white",
              background: "#64d984",
              fontSize: 50,
              marginTop: -15,
            }}
          />
        )}
      </Button>
      {openAddTab ? (
        <Box
          style={{ display: "flex", flexDirection: "row", marginLeft: "-80px" }}
        >
          <Button
            type="button"
            title="Close tab"
            onClick={() => setOpenAddTab(false)}
          >
            <ArrowRightIcon
              style={{ color: "#ff8383", fontSize: 50, marginTop: -15 }}
            />
          </Button>
          <TableRow>
            <TableCell>
              <TextField
                select
                label="Departure Station"
                value={departureStation}
                onChange={(e) => setDepartureStation(e.target.value)}
                style={{ width: 170 }}
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
                style={{ width: 170 }}
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
                style={{ width: 160 }}
              />
            </TableCell>
            <TableCell>
              <TextField
                label="Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                style={{ width: 90 }}
              />
            </TableCell>
            <TableCell style={{ width: 185 }}>
              <DateTimePicker
                time={startTime}
                label={"Start"}
                setTime={setStartTime}
              />
            </TableCell>
            <TableCell style={{ width: 185 }}>
              <DateTimePicker
                time={endTime}
                label={"End"}
                setTime={setEndTime}
              />
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
        </Box>
      ) : null}

      <Modal show={showSuccess}>
        <div>
          <Button
            type="button"
            onClick={() => setShowSuccess(false)}
            style={{
              position: "absolute",
              marginTop: "-47px",
              marginLeft: "-33px",
            }}
          >
            <CancelIcon style={{ color: "#ff8383", fontSize: 50 }} />
          </Button>
          <h3 style={{textAlign: "center"}}>Good job! Successfully added a great journey!</h3>
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
          <h3 style={{textAlign: "center"}}>
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
            onClick={() => setShowMissingField(false)}
            style={{
              position: "absolute",
              marginTop: "-47px",
              marginLeft: "-33px",
            }}
          >
            <CancelIcon style={{ color: "#ff8383", fontSize: 50 }} />
          </Button>
          <h3 style={{textAlign: "center"}}>Please check that all fields are complete.</h3>
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
