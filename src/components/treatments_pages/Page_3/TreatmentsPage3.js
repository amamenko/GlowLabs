import React from "react";
import Quench from "../../treatments/Quench/Quench";
import Quickie from "../../treatments/Quickie/Quickie";
import ChemicalPeel from "../../treatments/ChemicalPeel/ChemicalPeel";
import Dermaplaning from "../../treatments/Dermaplaning/Dermaplaning";
import "./TreatmentsPage3.css";

const TreatmentsPage3 = props => (
  <div className="treatments_page_3_container">
    {props.initialScreenSize >= 1200 ? null : (
      <Quench
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
    )}
    <Quickie
      initialScreenSize={props.initialScreenSize}
      currentScreenSize={props.currentScreenSize}
    />
    <ChemicalPeel
      initialScreenSize={props.initialScreenSize}
      currentScreenSize={props.currentScreenSize}
    />
    {props.initialScreenSize >= 1200 ? (
      <Dermaplaning
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
    ) : null}
  </div>
);

export default TreatmentsPage3;
