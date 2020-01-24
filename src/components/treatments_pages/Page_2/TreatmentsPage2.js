import React, { useState, useEffect } from "react";
import Bacial from "../../treatments/Bacial/Bacial";
import Glow from "../../treatments/Glow/Glow";
import Rejuvenate from "../../treatments/Rejuvenate/Rejuvenate";
import Quench from "../../treatments/Quench/Quench";
import "./TreatmentsPage2.css";

const TreatmentsPage2 = props => {
  const [bacialRendered, changeBacialRendered] = useState("none");
  const [rejuvenateRendered, changeRejuvenateRendered] = useState("none");
  const [quenchRendered, changeQuenchRendered] = useState("grid");

  useEffect(() => {
    if (props.currentScreenSize === "") {
      if (props.initialScreenSize >= 1200) {
        changeBacialRendered("none");
      } else {
        changeBacialRendered("grid");
      }
    } else {
      if (props.currentScreenSize >= 1200) {
        changeBacialRendered("none");
      } else {
        changeBacialRendered("grid");
      }
    }
  }, [changeBacialRendered, props.currentScreenSize, props.initialScreenSize]);

  useEffect(() => {
    if (props.currentScreenSize === "") {
      if (props.initialScreenSize >= 600 && props.initialScreenSize <= 1200) {
        changeRejuvenateRendered("none");
      } else {
        changeRejuvenateRendered("grid");
      }
    } else {
      if (props.currentScreenSize >= 600 && props.currentScreenSize <= 1200) {
        changeRejuvenateRendered("none");
      } else {
        changeRejuvenateRendered("grid");
      }
    }
  }, [
    changeRejuvenateRendered,
    props.currentScreenSize,
    props.initialScreenSize
  ]);

  useEffect(() => {
    if (props.currentScreenSize === "") {
      if (props.initialScreenSize >= 1200) {
        changeQuenchRendered("grid");
      } else {
        changeQuenchRendered("none");
      }
    } else {
      if (props.currentScreenSize >= 1200) {
        changeQuenchRendered("grid");
      } else {
        changeQuenchRendered("none");
      }
    }
  }, [changeQuenchRendered, props.currentScreenSize, props.initialScreenSize]);

  return (
    <div className="treatments_page_2_container">
      <Bacial
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        bacialRendered={bacialRendered}
      />
      <Glow
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
      <Rejuvenate
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        rejuvenateRendered={rejuvenateRendered}
      />
      <Quench
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        quenchRendered={quenchRendered}
      />
    </div>
  );
};

export default TreatmentsPage2;
