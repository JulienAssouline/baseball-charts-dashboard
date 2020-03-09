import React from "react";
import { scaleLinear, scaleOrdinal } from "d3-scale";
import stadiumSVG from "../static/generic-stadium.svg";
import { schemeCategory10 } from "d3-scale-chromatic";
import Points from "./Points";

function SprayChart({ data }) {
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

  const dataFiltered = data.filter(d => d.hc_x > 0);

  const events = [...new Set(dataFiltered.map(d => d.events))];

  const xScale = scaleLinear()
    .domain([-150, 150])
    .range([0, width]);

  const yScale = scaleLinear()
    .domain([-50, 200])
    .range([height, 0]);

  const color = scaleOrdinal()
    .domain(events)
    .range(schemeCategory10);

  dataFiltered.forEach(d => {
    d.x_location = d.hc_x - 125.42;
    d.y_location = 198.27 - d.hc_y;
  });

  return (
    <div className="hit-location-chart-container">
      <h2>Hit Location</h2>
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <image href={stadiumSVG} width={width} height={height}></image>
          <Points
            data={dataFiltered}
            cx="x_location"
            cy="y_location"
            xScale={xScale}
            yScale={yScale}
          />
        </g>
      </svg>
    </div>
  );
}

export default SprayChart;
