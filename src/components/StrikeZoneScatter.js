import React, { useState } from "react";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import StrikZone from "./StrikeZone";
import Points from "./Points";
import { useSpring, animated } from "react-spring";

function StrikeZoneScatter({ data, isStikreZone }) {
  const props = useSpring({
    from: { r: 0, fill: "lightblue" },
    to: { r: 5, fill: "lightblue" }
  });

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

  const poins = data.map((d, i) => {
    if (d.plate_x && d.plate_z) {
      return (
        <animated.circle
          key={i}
          r={props.r}
          cx={xScale(d.plate_x)}
          cy={yScale(d.plate_z)}
          style={{
            fill: "#003da5"
          }}
        />
      );
    }
  });

  console.log(props);

  return (
    <div className="strike-zone-chart-container">
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {poins}
          {/* <Points
            data={data}
            r={props.r}
            cx="plate_x"
            cy="plate_z"
            xScale={xScale}
            yScale={yScale}
          /> */}
          {isStikreZone ? <StrikZone xScale={xScale} yScale={yScale} /> : null}
        </g>
      </svg>
    </div>
  );
}

export default StrikeZoneScatter;
