import * as React from "react";
import { Link } from "react-router-dom";
import Main from "./Main";

import "./App.css";

function App() {
  return (
    <div className="App">
      <div>
        <ul>
          <li>
            <Link to="/">Home Page</Link>
          </li>
          <li>
            <Link to="/stations">Stations</Link>
          </li>
          <li>
            <Link to="/may">May</Link>
          </li>
        </ul>
        <hr />
        <Main />
      </div>
    </div>
  );
}

export default App;
