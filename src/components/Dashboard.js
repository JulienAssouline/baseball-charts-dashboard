import React from "react";
import Scatter from "./Satter";
import SprayChart from "./SprayChart";
import StrikeZoneScatter from "./StrikeZoneScatter";
import StrikeZoneHexbin from "./StrikeZoneHexbin";
import ZoneSprayChart from "./ZoneSprayChart";

function Dashboard({ data }) {
  return (
    <div>
      <div className="charts-container">
        <Scatter data={data} />
        <SprayChart data={data} />
        <ZoneSprayChart data={data} />
      </div>
      <div className="charts-container">
        <StrikeZoneScatter data={data} />
        <StrikeZoneHexbin data={data} />
      </div>
    </div>
  );
}

export default Dashboard;
