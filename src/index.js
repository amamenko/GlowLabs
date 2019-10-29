import React from "react";
import ReactDOM from "react-dom";
import LandingPage from "./components/LandingPage";
import Treatments from "./components/Treatments";
import "./styles.css";

const App = () => (
  <>
    <LandingPage />
    <Treatments />
  </>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
