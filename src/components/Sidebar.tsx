import { useState } from "react";
import { bubble as Menu } from "react-burger-menu";
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
    <Box style={{width: 300}}>
      <h3 style={{marginTop: "22px"}}>{title}</h3>
    <Menu
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

      {/* <Link to="/maps" onClick={event => closeSideBar("MAP")}>
        <p className="menu-item">🗺️ MAP</p>
      </Link> */}
    </Menu>
    </Box>
  );
};
export default Sidebar;
