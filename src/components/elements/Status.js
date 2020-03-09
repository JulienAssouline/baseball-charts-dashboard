import React, { useState } from "react";
import StrikeZoneScatter from "../StrikeZoneScatter";
import StrikeZoneHexbin from "../StrikeZoneHexbin";
import InitialSVG from "../InitialSVG";
import SprayChart from "../SprayChart";

const statusElement = {
  position: "absolute",
  top: 0,
  right: window.innerWidth / 4,
  width: 32,
  height: 32,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "0 0 0 10px"
};

function Status({ view, data, borderColor }) {
  return (
    <div
      style={{
        position: "sticky",
        top: window.innerHeight / 2,
        right: window.innerWidth / 2
      }}
    >
      <div style={statusElement}>
        {view.id === "strikecatter" && view.inView ? (
          <StrikeZoneScatter data={data} isStikreZone={false} />
        ) : view.id === "strikezonescatter" && view.inView ? (
          <StrikeZoneScatter data={data} isStikreZone={true} />
        ) : view.id === "strikezonehexbin" && view.inView ? (
          <StrikeZoneHexbin data={data} />
        ) : view.id === "spraychart" && view.inView ? (
          <SprayChart data={data} />
        ) : (
          <InitialSVG borderColor={"black"} />
        )}
      </div>
    </div>
  );
}

export default Status;
