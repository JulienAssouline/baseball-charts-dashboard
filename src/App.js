import React, { useState, useEffect } from "react";
import { csv } from "d3-fetch";
import csvData from "./static/savant_data (3).csv";
import "./App.css";
import Scatter from "./components/Satter";
import SprayChart from "./components/SprayChart";
import StrikeZoneScatter from "./components/StrikeZoneScatter";
import StrikeZoneHexbin from "./components/StrikeZoneHexbin";
import ZoneSprayChart from "./components/ZoneSprayChart";

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
      <div className="charts-container">
        <Scatter data={MikeTrout} />
        <SprayChart data={MikeTrout} />
        <ZoneSprayChart data={MikeTrout} />
      </div>
      <div className="charts-container">
        <StrikeZoneScatter data={MikeTrout} />
        <StrikeZoneHexbin data={MikeTrout} />
      </div>
    </div>
  );
}

export default App;
