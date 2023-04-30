import { useState } from "react";
import { TableCell, TableRow, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AddCircleIcon from "@mui/icons-material/AddCircle";
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
  const [openAddTab, setOpenAddTab] = useState(false);

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
    <Box className="addStationsBox">
      <Button
        type="button"
        title="Add a station here"
        className="addStationButton"
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
                data-testid="nameStation"
                label="Station Name"
                value={nameStation}
                onChange={(e) => setNameStation(e.target.value)}
                style={{ width: 130, zIndex: 600 }}
              />
            </TableCell>
            <TableCell>
              <TextField
                data-testid="address"
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ width: 90, zIndex: 600 }}
              />
            </TableCell>
            <TableCell>
              <TextField
                data-testid="city"
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{ width: 90, zIndex: 600 }}
              />
            </TableCell>
            <TableCell>
              <TextField
                data-testid="operator"
                label="Operator"
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                style={{ width: 90, zIndex: 600 }}
              />
            </TableCell>
            <TableCell>
              <TextField
                data-testid="capacity"
                label="Capacity"
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                style={{ width: 90, zIndex: 600 }}
              />
            </TableCell>
            <TableCell>
              <TextField
                data-testid="xMap"
                label="X"
                type="number"
                value={xMap}
                onChange={(e) => setXMap(Number(e.target.value))}
                style={{ width: 90, zIndex: 600 }}
              />
            </TableCell>
            <TableCell>
              <TextField
                data-testid="yMap"
                label="Y"
                type="number"
                value={yMap}
                onChange={(e) => setYMap(Number(e.target.value))}
                style={{ width: 90, zIndex: 600 }}
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
          <h3 style={{ textAlign: "center" }}>Good job! Successfully added the station!</h3>
          <div style={{height:350}}><Player src={heartAnimation} loop autoplay /></div>
        
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
