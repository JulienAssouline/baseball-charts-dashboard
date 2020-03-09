import React from "react";
import Status from "./Status";

const defaultStyle = {
  height: "101vh",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#2d1176",
  color: "#fff"
};

const sharedStyle = {
  display: "flex",
  minHeight: "25vh",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  background: "#148bb4",
  color: "azure"
};

/**
 * ScrollWrapper directs the user to scroll the page to reveal it's children.
 * Use this on Modules that have scroll and/or observer triggers.
 */
const ScrollWrapper = ({ children, style, inView, data, ...props }) => {
  return (
    <div {...props}>
      <Status data={data} inView={inView} />
      <section style={{ ...defaultStyle, ...style }}>
        <h1>⬇ Scroll Down ⬇</h1>
      </section>
      {children}
      <section style={{ ...defaultStyle, ...style }}>
        <h1>NO</h1>
      </section>
      {children}
      <section style={{ ...defaultStyle, ...style }}>
        <h1>⬆︎ Scroll up ⬆︎</h1>
      </section>
    </div>
  );
};

export default ScrollWrapper;
