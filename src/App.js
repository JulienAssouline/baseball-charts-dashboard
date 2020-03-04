import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import csvData from "./static/savant_data (3).csv";
import "./App.css";
import Dashboard from "./components/Dashboard";
import FirstSlide from "./components/FirstSlide";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    csv(csvData).then(result => {
      result.forEach(d => {
        d.launch_speed = +d.launch_speed;
        d.release_speed = +d.release_speed;
        d.hc_x = +d.hc_x;
        d.hc_y = +d.hc_y;
        d.plate_x = +d.plate_x;
        d.plate_z = +d.plate_z;
      });

      setData(result);
    });
  }, []);

  if (!data) return <div>...loading</div>;

  const MikeTrout = data.filter(d => d.player_name === "Mike Trout");

  return (
    <div className="App">
      <Router>
        <div>
          <Route
            path="/"
            exact
            component={() => <Dashboard data={MikeTrout} />}
          />
          <Route
            path="/slide1"
            component={() => <FirstSlide data={MikeTrout} />}
          />
        </div>
      </Router>
    </div>
  );
}

export default App;
