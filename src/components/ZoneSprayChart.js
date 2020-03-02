import React from "react";
import { scaleLinear } from "d3-scale";
import stadiumSVG from "../static/generic-stadium.svg";
import Triangle from "./Triangle";

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

  const zoneCoords = {
    x0Point: xRadian(zoneRadius, 180 / 39.5),
    y0Point: yRadian(zoneRadius, 180 / 39.5),
    x1Point: xRadian(zoneRadius, 180 / 60.5),
    y1Point: yRadian(zoneRadius, 180 / 60.5),
    x2Point: xRadian(zoneRadius, 180 / 80.5),
    y2Point: yRadian(zoneRadius, 180 / 80.5),
    x3Point: xRadian(zoneRadius, 180 / 100.5),
    y3Point: yRadian(zoneRadius, 180 / 100.5),
    x4Point: xRadian(zoneRadius, 180 / 120.5),
    y4Point: yRadian(zoneRadius, 180 / 120.5),
    x5Point: xRadian(zoneRadius, 180 / 140.5),
    y5Point: yRadian(zoneRadius, 180 / 140.5)
  };

  const dataFiltered = data.filter(d => d.hc_x > 0);

  const xScale = scaleLinear()
    .domain([-150, 150])
    .range([0, width]);

  const yScale = scaleLinear()
    .domain([-50, 200])
    .range([height, 0]);

  const circles = dataFiltered.map((d, i) => (
    <circle
      key={i}
      r={5}
      cx={xScale(d.hc_x - 125.42)}
      cy={yScale(198.27 - d.hc_y)}
      style={{ fill: "#003da5" }}
    />
  ));

  console.log(zoneCoords);

  return (
    <div className="zone-location-chart-container">
      <h2>Hit Location</h2>
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <image href={stadiumSVG} width={width} height={height}></image>
          {circles}
          <path
            d={`M${xScale(0)}, ${yScale(-4)} L ${xScale(
              zoneCoords.x0Point
            )}, ${yScale(zoneCoords.y0Point)} L ${xScale(
              zoneCoords.x1Point
            )}, ${yScale(zoneCoords.y1Point)} L ${xScale(0)}, ${yScale(-4)}z
            M${xScale(0)}, ${yScale(-4)} L ${xScale(
              zoneCoords.x1Point
            )}, ${yScale(zoneCoords.y1Point)} L ${xScale(
              zoneCoords.x2Point
            )}, ${yScale(zoneCoords.y2Point)} L ${xScale(0)}, ${yScale(-4)}z
            M${xScale(0)}, ${yScale(-4)} L ${xScale(
              zoneCoords.x2Point
            )}, ${yScale(zoneCoords.y2Point)} L ${xScale(
              zoneCoords.x3Point
            )}, ${yScale(zoneCoords.y3Point)} L ${xScale(0)}, ${yScale(-4)}z
            M${xScale(0)}, ${yScale(-4)} L ${xScale(
              zoneCoords.x3Point
            )}, ${yScale(zoneCoords.y3Point)} L ${xScale(
              zoneCoords.x4Point
            )}, ${yScale(zoneCoords.y4Point)} L ${xScale(0)}, ${yScale(-4)}z
              M${xScale(0)}, ${yScale(-4)} L ${xScale(
              zoneCoords.x4Point
            )}, ${yScale(zoneCoords.y4Point)} L ${xScale(
              zoneCoords.x5Point
            )}, ${yScale(zoneCoords.y5Point)} L ${xScale(0)}, ${yScale(-4)}z`}
            style={{ fill: "#003da5", opacity: 0.7, stroke: "black" }}
          />
        </g>
      </svg>
    </div>
  );
}

export default ZoneSprayChart;
