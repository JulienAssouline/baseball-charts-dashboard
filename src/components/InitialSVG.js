import React from "react";

export default function InitialSVG({ borderColor }) {
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
      <svg style={{ border: `1px solid ${borderColor}` }} width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}></g>
      </svg>
    </div>
  );
}
