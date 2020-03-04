import React from "react";
import { scaleLinear, scaleSequential } from "d3-scale";
import { extent, mean, max } from "d3-array";
import StrikeZone from "./StrikeZone";
import { hexbin } from "d3-hexbin";

function StrikeZoneHexbin({ data }) {
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

  const hexbinData = hexbin()
    .x(d => xScale(d.plate_x))
    .y(d => yScale(d.plate_z))
    .radius(8)
    .extent([
      [margin.left, margin.top],
      [width - margin.right, height - margin.bottom]
    ]);

  const bins = Object.assign(
    hexbinData(data).map(d => {
      return {
        exit_velo: mean(d, v => v.launch_speed),
        x: d.x,
        y: d.y,
        count: d.length
      };
    })
  );

  const color = scaleSequential()
    .domain([0, max(bins, d => d.count)])
    .range(["white", "#003da5"]);

  const paths = bins.map((d, i) => (
    <g key={i} style={{ stroke: "#000", strokeOpacity: 0.1 }}>
      <path
        d={hexbinData.hexagon()}
        transform={`translate(${d.x},${d.y})`}
        style={{
          fill: color(d.count),
          stroke: "black",
          strikeWidth: 1.5,
          padding: 5
        }}
      />
    </g>
  ));

  return (
    <div className="strike-zone-chart-container">
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {paths}
          <StrikeZone xScale={xScale} yScale={yScale} />
        </g>
      </svg>
    </div>
  );
}

export default StrikeZoneHexbin;
