import React, { forwardRef } from "react";

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

const Wrapper = forwardRef(({ style, ...props }, ref) => {
  return <div ref={ref} style={{ ...sharedStyle, ...style }} {...props} />;
});

export default Wrapper;
