import React from "react";
import { scaleLinear, scaleSequential } from "d3-scale";
import { extent } from "d3-array";
import stadiumSVG from "../static/generic-stadium.svg";

function ZoneSprayChart({ data }) {
  const w = 500,
    h = 500,
    margin = {
      right: 40,
      left: 40,
      top: 40,
      bottom: 40
    },
    width = w - margin.right - margin.left,
    height = h - margin.top - margin.bottom,
    zoneRadius = 200;

  function xRadian(radius, constant, mult) {
    const radian = !mult
      ? radius * Math.cos(Math.PI / constant)
      : (radius * Math.cos(mult * Math.PI)) / constant;

    return radian;
  }

  function yRadian(radius, constant, mult) {
    const radian = !mult
      ? radius * Math.sin(Math.PI / constant)
      : (radius * Math.sin(mult * Math.PI)) / constant;

    return radian;
  }

  function Angle(x1, y1, x2, y2) {
    const dy = y2 - y1,
      dx = x2 - x1;

    let theta = Math.atan2(dy, dx);

    theta *= 180 / Math.PI;
    return theta;
  }

  const zoneCoords = [];
  let initialDegree = 39.5;

  for (let i = 0; i < 6; i++) {
    const x = xRadian(zoneRadius, 180 / initialDegree),
      y = yRadian(zoneRadius, 180 / initialDegree);
    zoneCoords.push({
      x: x,
      y: y,
      angle: Angle(0, -4, x, y),
      zone: i,
      values: []
    });

    initialDegree += 20.2;
  }

  const dataFiltered = data.filter(d => d.hc_x > 0);

  dataFiltered.forEach(d => {
    d.angle = Angle(0, -4, d.hc_x - 125.42, 198.27 - d.hc_y);
  });

  zoneCoords.forEach((d, i, array) => {
    dataFiltered.forEach(j => {
      if (array[i + 1]) {
        if (j.angle < array[i + 1].angle && j.angle > array[i].angle) {
          d.values.push(j);
        }
      }
    });
  });

  const color = scaleSequential()
    .domain(extent(zoneCoords, d => d.values.length))
    .range(["white", "#003da5"]);

  const xScale = scaleLinear()
    .domain([-150, 150])
    .range([0, width]);

  const yScale = scaleLinear()
    .domain([-50, 200])
    .range([height, 0]);

  const paths = zoneCoords.map((d, i, array) => {
    if (array[i + 1] != undefined)
      return (
        <g key={i}>
          <path
            d={`M${xScale(0)}, ${yScale(-4)} L ${xScale(array[i].x)}, ${yScale(
              array[i].y
            )} L ${xScale(array[i + 1].x)}, ${yScale(
              array[i + 1].y
            )} L ${xScale(0)}, ${yScale(-4)}z`}
            style={{
              fill: color(d.values.length),
              opacity: 0.9,
              stroke: "black"
            }}
          />
          <path
            id={`invisible_path_${i}`}
            className={"invisible-path"}
            d={`M${xScale(array[i + 1].x)},${yScale(array[i + 1].y)} ${xScale(
              array[i].x
            )}, ${yScale(array[i].y)}`}
            style={{
              fill: "none",
              stroke: "none"
            }}
          />
          <text className="stats-labels" dy={-10}>
            <textPath
              xlinkHref={`#invisible_path_${i}`}
              startOffset={"50%"}
              style={{ textAnchor: "middle" }}
            >
              {Math.round(d.values.length)}
            </textPath>
          </text>
        </g>
      );
  });

  return (
    <div className="zone-location-chart-container">
      <h2>Hit Location</h2>
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <image href={stadiumSVG} width={width} height={height}></image>
          {paths}
        </g>
      </svg>
    </div>
  );
}

export default ZoneSprayChart;
