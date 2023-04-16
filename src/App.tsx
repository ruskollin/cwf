import Main from "./Main";
import SideBar from "./components/Sidebar";

import "./App.css";

function App() {
  return (
    <div className="App" id="outer-container">
      <SideBar pageWrapId={"page-wrap"} outerContainerId={"outer-container"}/>
      <div id="page-wrap">
        <Main />
      </div>
    </div>
  );
}

export default App;
