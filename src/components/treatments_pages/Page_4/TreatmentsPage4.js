import React from "react";
import Dermaplaning from "../../treatments/Dermaplaning/Dermaplaning";
import CBD from "../../treatments/CBD/CBD";
import Microneedle from "../../treatments/Microneedle/Microneedle";
import "./TreatmentsPage4.css";

const TreatmentsPage4 = props => (
  <div className="treatments_page_4_container">
    {props.initialScreenSize >= 1200 ? null : (
      <Dermaplaning
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
    )}
    <CBD
      initialScreenSize={props.initialScreenSize}
      currentScreenSize={props.currentScreenSize}
    />
    <Microneedle
      initialScreenSize={props.initialScreenSize}
      currentScreenSize={props.currentScreenSize}
    />
  </div>
);

export default TreatmentsPage4;
