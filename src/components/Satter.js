import React from "react";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import AxisLeft from "./AxisLeft";
import AxisBottom from "./AxisBottom";
import Points from "./Points";

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

  return (
    <div className="pitch-and-exit-velocity-chart-container">
      <h2>Pitch and Exit Velocity</h2>
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisLeft yScale={yScale} width={width} />
          <AxisBottom xScale={xScale} height={height} />
          <Points
            data={data}
            cx="release_speed"
            cy="launch_speed"
            xScale={xScale}
            yScale={yScale}
          />
        </g>
      </svg>
    </div>
  );
}

export default Scatter;
