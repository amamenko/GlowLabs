import React from "react";
import Dermaplaning from "../../treatments/Dermaplaning/Dermaplaning";
import CBD from "../../treatments/CBD/CBD";
import Microneedle from "../../treatments/Microneedle/Microneedle";
import "./TreatmentsPage4.css";

const TreatmentsPage4 = () => (
  <div className="treatments_page_4_container">
    <Dermaplaning />
    <CBD />
    <Microneedle />
  </div>
);

export default TreatmentsPage4;
