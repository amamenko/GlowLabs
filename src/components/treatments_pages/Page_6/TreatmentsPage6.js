import React from "react";
import Microneedle from "../../treatments/Microneedle/Microneedle";
import "./TreatmentsPage6.css";

const TreatmentsPage6 = props => (
  <div className="treatments_page_6_container">
    <Microneedle
      initialScreenSize={props.initialScreenSize}
      currentScreenSize={props.currentScreenSize}
    />
  </div>
);

export default TreatmentsPage6;
