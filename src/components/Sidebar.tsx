import { useState } from "react";
import { bubble as MyMenu } from "react-burger-menu";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

const Sidebar = (props: any) => {
  const [isOpen, setOpen] = useState(false);
  const [title, setTitle] = useState("Hi!");

  const handleIsOpen = () => {
    setOpen(!isOpen);
  };

  const closeSideBar = (title: string) => {
    setOpen(false);
    setTitle(title)
  };

  return (
    <Box className="menuBar">
      <div style={{backgroundColor: "red", width: "100%"}}><h3 style={{marginTop: "22px", position: "fixed", top: 0, left: 100}}>{title}</h3></div>
      
    <MyMenu
      {...props}
      isOpen={isOpen}
      onOpen={handleIsOpen}
      onClose={handleIsOpen}
    >
      <Link to="/" onClick={event => closeSideBar("HOME")}>
        <p className="menu-item">🏠 HOMEPAGE</p>
      </Link>

      <Link to="/stations" onClick={event => closeSideBar("STATIONS")}>
        <p className="menu-item"> 📍 STATIONS</p>
      </Link>

      <Link to="/journeys" onClick={event => closeSideBar("JOURNEYS")}>
        <p className="menu-item">🚵‍♂️ JOURNEYS</p>
      </Link>

      <Link to="/addJourney" onClick={event => closeSideBar("ADD JOURNEY")}>
        <p className="menu-item">🚵‍♂️ ADD A JOURNEY</p>
      </Link>

      <Link to="/addStation" onClick={event => closeSideBar("ADD STATION")}>
        <p className="menu-item">🚵‍♂️ ADD A STATION</p>
      </Link>

      {/* <Link to="/maps" onClick={event => closeSideBar("MAP")}>
        <p className="menu-item">🗺️ MAP</p>
      </Link> */}
    </MyMenu>
    </Box>
  );
};
export default Sidebar;
