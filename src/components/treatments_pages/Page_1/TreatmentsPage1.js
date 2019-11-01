import React from "react";
import Calm from "../../treatments/Calm/Calm";
import Clarify from "../../treatments/Clarify/Clarify";
import "./TreatmentsPage1.css";

const TreatmentsPage1 = () => (
  <div className="treatments_page_1_container">
    <header className="treatments_page_1_header">
      <h2>OUR TREATMENTS</h2>
      <br />
      <h3>
        <center>
          Each facial is
          <br />
          customized
          <br />
          to fit your specific
          <br />
          skincare needs.
        </center>
      </h3>
    </header>
    <Calm />
    <Clarify />
  </div>
);

export default TreatmentsPage1;
