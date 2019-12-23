import React from "react";
import Quench from "../../treatments/Quench/Quench";
import Quickie from "../../treatments/Quickie/Quickie";
import ChemicalPeel from "../../treatments/ChemicalPeel/ChemicalPeel";
import Dermaplaning from "../../treatments/Dermaplaning/Dermaplaning";
import "./TreatmentsPage3.css";

const TreatmentsPage3 = props => (
  <div className="treatments_page_3_container">
    {props.initialScreenSize >= 768 ? null : <Quench />}
    <Quickie />
    <ChemicalPeel />
    {props.initialScreenSize >= 768 ? <Dermaplaning /> : null}
  </div>
);

export default TreatmentsPage3;
