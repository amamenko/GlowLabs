import React from "react";
import ReactDOM from "react-dom";
import LandingPage from "./components/landing_page/LandingPage";
import TreatmentsPage1 from "./components/treatments_pages/Page_1/TreatmentsPage1";
import TreatmentsPage2 from "./components/treatments_pages/Page_2/TreatmentsPage2";
import TreatmentsPage3 from "./components/treatments_pages/Page_3/TreatmentsPage3";
import "./styles.css";

const App = () => (
  <>
    <LandingPage />
    <TreatmentsPage1 />
    <TreatmentsPage2 />
    <TreatmentsPage3 />
  </>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
