import React from "react";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import AxisLeft from "./AxisLeft";
import AxisBottom from "./AxisBottom";

function Scatter({ data }) {
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
    .domain(extent(data, d => d.release_speed))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain(extent(data, d => d.launch_speed))
    .range([height, 0]);

  const circles = data.map((d, i) => (
    <circle
      key={i}
      r={5}
      cx={xScale(d.release_speed)}
      cy={yScale(d.launch_speed)}
      style={{
        fill: "#003da5",
        display: !d.launch_speed ? "none" : !d.release_speed ? "none" : "block"
      }}
    />
  ));

  return (
    <div className="pitch-and-exit-velocity-chart-container">
      <h2>Pitch and Exit Velocity</h2>
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisLeft yScale={yScale} width={width} />
          <AxisBottom xScale={xScale} height={height} />
          {circles}
        </g>
      </svg>
    </div>
  );
}

export default Scatter;
