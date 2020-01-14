import React from "react";
import Bacial from "../../treatments/Bacial/Bacial";
import Glow from "../../treatments/Glow/Glow";
import Rejuvenate from "../../treatments/Rejuvenate/Rejuvenate";
import Quench from "../../treatments/Quench/Quench";
import "./TreatmentsPage2.css";

const TreatmentsPage2 = props => (
  <div className="treatments_page_2_container">
    {props.currentScreenSize === "" ? (
      props.initialScreenSize >= 1200 ? null : (
        <Bacial
          initialScreenSize={props.initialScreenSize}
          currentScreenSize={props.currentScreenSize}
        />
      )
    ) : props.currentScreenSize >= 1200 ? null : (
      <Bacial
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
    )}
    <Glow
      initialScreenSize={props.initialScreenSize}
      currentScreenSize={props.currentScreenSize}
    />
    {props.currentScreenSize === "" ? (
      props.initialScreenSize >= 600 &&
      props.initialScreenSize <= 1200 ? null : (
        <Rejuvenate
          initialScreenSize={props.initialScreenSize}
          currentScreenSize={props.currentScreenSize}
        />
      )
    ) : props.currentScreenSize >= 600 &&
      props.currentScreenSize <= 1200 ? null : (
      <Rejuvenate
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
    )}
    {props.currentScreenSize === "" ? (
      props.initialScreenSize >= 1200 ? (
        <Quench
          initialScreenSize={props.initialScreenSize}
          currentScreenSize={props.currentScreenSize}
        />
      ) : null
    ) : props.currentScreenSize >= 1200 ? (
      <Quench
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
    ) : null}
  </div>
);

export default TreatmentsPage2;
