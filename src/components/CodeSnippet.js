import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function CodeSnippet({ data }) {
  return (
    <div className="code-snippet-container">
      <SyntaxHighlighter
        showLineNumbers={true}
        wrapLines={true}
        language="jsx"
        style={atomDark}
      >
        {data}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeSnippet;
