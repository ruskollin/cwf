import Main from "./Main";
import SideBar from "./components/Sidebar";

import "./App.css";

function App() {
  return (
    <div className="App">
      <SideBar />
      <div style={{height: "90vh", marginTop: 60, overflow: "hidden"}}>
        <Main />
      </div>
    </div>
  );
}

export default App;
