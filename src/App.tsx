import * as React from "react";
import "./styles.css";
import VictoryStackedBar from "./VictoryStackedBar";
import ardata from "./data/ardata";

const keys = ["MV", "MD"];

export default function App() {
  return (
    <div className="App">
      {/* <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2> */}
      <VictoryStackedBar data={ardata} keys={keys} />
    </div>
  );
}
