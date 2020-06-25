import React from "react";
import Microneedle from "../../treatments/Microneedle/Microneedle";
import JetHydroPeel from "../../treatments/JetHydroPeel/JetHydroPeel";
import "./TreatmentsPage6.css";

const TreatmentsPage6 = (props) => (
  <div className="treatments_page_6_container">
    <Microneedle
      initialScreenSize={props.initialScreenSize}
      currentScreenSize={props.currentScreenSize}
      resetAllCartStates={props.resetAllCartStates}
    />
    <JetHydroPeel
      initialScreenSize={props.initialScreenSize}
      currentScreenSize={props.currentScreenSize}
    />
  </div>
);

export default TreatmentsPage6;
