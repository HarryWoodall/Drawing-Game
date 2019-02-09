import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ReadyTable from "./components/partial/readyTable/readyTable";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ReadyTable test={true} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
