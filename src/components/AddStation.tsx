import { useState } from "react";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
  const [openErrorMessage, setOpenErrorMessage] = useState(false);

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
      if (capacity < 0) {
        setOpenErrorMessage(true);
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
            setOpenErrorMessage(false);
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
          }
        });
      }
    }
  };

  return (
    <Box
      className="addStationsBox"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: 600,
        marginLeft: "20px",
      }}
    >
      {openErrorMessage && (
        <div className="errorBox">
          <p style={{ color: "red" }}>
            Please check that the capacity is a positive number.
          </p>
        </div>
      )}
      <TextField
        data-testid="nameStation"
        label="Station Name"
        value={nameStation}
        onChange={(e) => setNameStation(e.target.value)}
        style={{ width: 223 }}
      />

      <TextField
        data-testid="address"
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ width: 223 }}
      />

      <TextField
        data-testid="city"
        label="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ width: 223 }}
      />

      <TextField
        data-testid="operator"
        label="Operator"
        value={operator}
        onChange={(e) => setOperator(e.target.value)}
        style={{ width: 223 }}
      />

      <TextField
        data-testid="capacity"
        label="Capacity"
        type="number"
        value={capacity}
        onChange={(e) => setCapacity(Number(e.target.value))}
        InputProps={{ inputProps: { min: 0 } }}
        style={{ width: 223 }}
      />

      <TextField
        data-testid="xMap"
        label="X"
        type="number"
        value={xMap}
        onChange={(e) => setXMap(Number(e.target.value))}
        style={{ width: 223 }}
      />

      <TextField
        data-testid="yMap"
        label="Y"
        type="number"
        value={yMap}
        onChange={(e) => setYMap(Number(e.target.value))}
        style={{ width: 223 }}
      />

      <Button
        className="addButton"
        variant="contained"
        color="primary"
        onClick={handleAddStation}
        style={{ width: 20 }}
      >
        Add
      </Button>

      <Modal show={showSuccess}>
        <div className="successDiv">
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
          <h3 style={{ textAlign: "center" }}>
            Good job! Successfully added the station!
          </h3>
          <div style={{ height: 350 }}>
            <Player src={heartAnimation} loop autoplay />
          </div>
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
        <div className="missingFieldDiv">
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

export default AddStation;
