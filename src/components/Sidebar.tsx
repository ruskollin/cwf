import { useState } from "react";
import { bubble as MyMenu } from "react-burger-menu";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import "../App.css";

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
      <div><h3 className="title">{title}</h3></div>
      
    <MyMenu
      {...props}
      isOpen={isOpen}
      onOpen={handleIsOpen}
      onClose={handleIsOpen}
    >
      <Link to="/" onClick={() => closeSideBar("HOME")}>
        <p className="menu-item">🏠 HOMEPAGE</p>
      </Link>

      <Link to="/stations" onClick={() => closeSideBar("STATIONS")}>
        <p className="menu-item"> 📍 STATIONS</p>
      </Link>

      <Link to="/journeys" onClick={() => closeSideBar("JOURNEYS")}>
        <p className="menu-item">🚵‍♂️ JOURNEYS</p>
      </Link>

      <Link to="/addJourney" onClick={() => closeSideBar("ADD JOURNEY")}>
        <p className="menu-item">🐶 ADD A JOURNEY</p>
      </Link>

      <Link to="/addStation" onClick={() => closeSideBar("ADD STATION")}>
        <p className="menu-item">🐾 ADD A STATION</p>
      </Link>
      
    </MyMenu>
    </Box>
  );
};
export default Sidebar;
