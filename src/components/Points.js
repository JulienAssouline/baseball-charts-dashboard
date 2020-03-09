import React from "react";
import { animated } from "react-spring";

export default function Points({ data, cx, cy, xScale, yScale, r, style }) {
  return data.map((d, i) => {
    if (d[cx] && d[cy]) {
      return (
        <animated.circle
          key={i}
          r={5}
          cx={xScale(d[cx])}
          cy={yScale(d[cy])}
          style={{
            fill: "#003da5"
          }}
        />
      );
    }
  });
}
