import React from "react";
import { bubble as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

const Sidebar = (props: any) => {
  return (
    <Menu {...props}>
      <Link to="/">
        <p className="menu-item">🏠 HOMEPAGE</p>
      </Link>

      <Link to="/stations">
        <p className="menu-item"> 📍 STATIONS</p>
      </Link>

      <Link to="/journeys">
        <p className="menu-item">🚵‍♂️ JOURNEYS</p>
      </Link>
    </Menu>
  );
};
export default Sidebar;
