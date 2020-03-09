export const code1 = `import React from "react";

export default function InitialSVG() {
  const w = 500,
    h = 500,
    margin = {
      right: 40,
      left: 40,
      top: 40,
      bottom: 40
    };

  return (
    <div>
      <svg style={{ border: "1px solid yellow" }} width={w} height={h}>
        <g transform=${"{`"}translate(${"${"}margin.left},${"${"}margin.top})${"`"}}></g>
      </svg>
    </div>
  );
}`;

export const code2 = `import React from "react";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";

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

  return (
    <div className="strike-zone-chart-container">
      <svg width={w} height={h}>
      <g transform=${"{`"}translate(${"${"}margin.left},${"${"}margin.top})${"`"}}></g>
        </g>
      </svg>
    </div>
  );
}

export default StrikeZoneScatter;
`;

export const code3 = `import React from "react";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import StrikZone from "./StrikeZone";
import Points from "./Points";
import { useSpring } from "react-spring";

function StrikeZoneScatter({ data }) {
  const props = useSpring({ r: 5, from: { r: 0 } });

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

  return (
    <div className="strike-zone-chart-container">
      <svg width={w} height={h}>
      <g transform=${"{`"}translate(${"${"}margin.left},${"${"}margin.top})${"`"}}></g>
          <Points
            data={data}
            r={props.r}
            cx="plate_x"
            cy="plate_z"
            xScale={xScale}
            yScale={yScale}
          />
          <StrikZone xScale={xScale} yScale={yScale} />
        </g>
      </svg>
    </div>
  );
}

export default StrikeZoneScatter;
`;

export const code4 = `import React from "react";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import StrikZone from "./StrikeZone";
import Points from "./Points";
import { useSpring } from "react-spring";

function StrikeZoneScatter({ data }) {
  const props = useSpring({ r: 5, from: { r: 0 } });

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

  return (
    <div className="strike-zone-chart-container">
      <svg width={w} height={h}>
      <g transform=${"{`"}translate(${"${"}margin.left},${"${"}margin.top})${"`"}}></g>
          <Points
            data={data}
            r={props.r}
            cx="plate_x"
            cy="plate_z"
            xScale={xScale}
            yScale={yScale}
          />
          <StrikZone xScale={xScale} yScale={yScale} />
        </g>
      </svg>
    </div>
  );
}

export default StrikeZoneScatter;

`;
