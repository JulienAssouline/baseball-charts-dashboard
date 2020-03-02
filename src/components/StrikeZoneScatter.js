import React from "react";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import StrikZone from "./StrikeZone";

function StrikeZoneScatter({ data }) {
  const w = 500,
    h = 500,
    margin = {
      right: 40,
      left: 40,
      top: 40,
      bottom: 40
    },
    width = w - margin.right - margin.left,
    height = h - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain(extent(data, d => d.plate_x))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain(extent(data, d => d.plate_z))
    .range([height, 0]);

  const circles = data.map((d, i) => (
    <circle
      key={i}
      r={5}
      cx={xScale(d.plate_x)}
      cy={yScale(d.plate_z)}
      style={{
        fill: "#003da5"
      }}
    />
  ));

  return (
    <div className="strike-zone-chart-container">
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {circles}
          <StrikZone xScale={xScale} yScale={yScale} />
        </g>
      </svg>
    </div>
  );
}

export default StrikeZoneScatter;
