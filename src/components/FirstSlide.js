import React, { useState } from "react";
import { useInView, InView } from "react-intersection-observer";
import Status from "./elements/Status";
import CodeSnippet from "./CodeSnippet";
import { code1, code2, code3, code4 } from "./codeData";

const defaultStyle = {
  textAlign: "left",
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  justifyContent: "left",
  backgroundColor: "#6a75ca",
  color: "#fff"
};

function FirstSlide({ data }) {
  const [view, setView] = useState({
    id: "initial"
  });
  // const [value, setValue] = useState();

  // const [ref, inView] = useInView({
  //   threshold: 0
  // });

  function onChange(newValue) {
    console.log("change", newValue);
  }

  return (
    <div>
      <Status data={data} view={view} />
      <section style={{ ...defaultStyle }}>
        <div className="code-text-container">
          <CodeSnippet data={code1} />
        </div>
      </section>
      <section style={{ ...defaultStyle }}>
        <div className="code-text-container">
          <CodeSnippet data={code2} />
        </div>
      </section>

      <section style={{ ...defaultStyle }}>
        <InView
          as="div"
          onChange={inView =>
            setView({ id: "strikezonescatter", inView: inView })
          }
        >
          <div className="code-text-container">
            <CodeSnippet data={code3} />
          </div>
        </InView>
      </section>

      <section style={{ height: "22vh", backgroundColor: "#2d1176" }}></section>

      <section style={{ ...defaultStyle }}>
        <InView
          as="code"
          onChange={(inView, entry) => {
            return setView({ id: "strikezonehexbin", inView: inView });
          }}
        >
          <div className="code-text-container">
            <CodeSnippet data={code4} />
          </div>
        </InView>
      </section>
    </div>
  );
}

export default FirstSlide;
