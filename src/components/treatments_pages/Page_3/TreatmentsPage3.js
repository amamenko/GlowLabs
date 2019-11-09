import React from "react";
import Quench from "../../treatments/Quench/Quench";
import Quickie from "../../treatments/Quickie/Quickie";
import ChemicalPeel from "../../treatments/ChemicalPeel/ChemicalPeel";
import "./TreatmentsPage3.css";

const TreatmentsPage3 = () => (
  <div className="treatments_page_3_container">
    <Quench />
    <Quickie />
    <ChemicalPeel />
  </div>
);

export default TreatmentsPage3;
