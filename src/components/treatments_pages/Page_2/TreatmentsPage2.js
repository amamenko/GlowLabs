import React from "react";
import Bacial from "../../treatments/Bacial/Bacial";
import Glow from "../../treatments/Glow/Glow";
import Rejuvenate from "../../treatments/Rejuvenate/Rejuvenate";
import Quench from "../../treatments/Quench/Quench";
import "./TreatmentsPage2.css";

const TreatmentsPage2 = props => (
  <div className="treatments_page_2_container">
    {props.initialScreenSize >= 768 ? null : <Bacial />}
    <Glow initialScreenSize={props.initialScreenSize} />
    <Rejuvenate />
    {props.initialScreenSize >= 768 ? <Quench /> : null}
  </div>
);

export default TreatmentsPage2;
