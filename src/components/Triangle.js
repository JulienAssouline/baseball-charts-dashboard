import React from "react";

export default function Triangle({ zoneCoords, xScale, yScale }) {
  return (
    <path
      d={`M${xScale(0)}, ${yScale(-4)} L ${xScale(
        zoneCoords.x0Point
      )}, ${yScale(zoneCoords.y0Point)} L ${xScale(
        zoneCoords.x1Point
      )}, ${yScale(zoneCoords.y1Point)}`}
      style={{ fill: "#003da5", opacity: 0.7 }}
    />
  );
}
