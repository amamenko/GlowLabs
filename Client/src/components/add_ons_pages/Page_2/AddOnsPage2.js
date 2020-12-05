import React, { useState, useEffect } from "react";
import LEDTherapy from "../../add_ons/LEDTherapy/LEDTherapy";
import Microcurrent from "../../add_ons/Microcurrent/Microcurrent";
import Microdermabrasion from "../../add_ons/Microdermabrasion/Microdermabrasion";
import Dermarolling from "../../add_ons/Dermarolling/Dermarolling";
import "./AddOnsPage2.css";

const AddOnsPage2 = (props) => {
  const [ledRendered, changeLEDRendered] = useState("none");
  const [microdermabrasionRendered, changeMicrodermabrasionRendered] = useState(
    "none"
  );
  const [dermarollingRendered, changeDermarollingRendered] = useState("grid");

  useEffect(() => {
    if (props.currentScreenSize === "") {
      if (props.initialScreenSize >= 1200) {
        changeLEDRendered("none");
      } else {
        changeLEDRendered("grid");
      }
    } else {
      if (props.currentScreenSize >= 1200) {
        changeLEDRendered("none");
      } else {
        changeLEDRendered("grid");
      }
    }
  }, [changeLEDRendered, props.currentScreenSize, props.initialScreenSize]);

  useEffect(() => {
    if (props.currentScreenSize === "") {
      if (props.initialScreenSize >= 600 && props.initialScreenSize <= 1200) {
        changeMicrodermabrasionRendered("none");
      } else {
        changeMicrodermabrasionRendered("grid");
      }
    } else {
      if (props.currentScreenSize >= 600 && props.currentScreenSize <= 1200) {
        changeMicrodermabrasionRendered("none");
      } else {
        changeMicrodermabrasionRendered("grid");
      }
    }
  }, [
    changeMicrodermabrasionRendered,
    props.currentScreenSize,
    props.initialScreenSize,
  ]);

  useEffect(() => {
    if (props.currentScreenSize === "") {
      if (props.initialScreenSize >= 1200) {
        changeDermarollingRendered("grid");
      } else {
        changeDermarollingRendered("none");
      }
    } else {
      if (props.currentScreenSize >= 1200) {
        changeDermarollingRendered("grid");
      } else {
        changeDermarollingRendered("none");
      }
    }
  }, [
    changeDermarollingRendered,
    props.currentScreenSize,
    props.initialScreenSize,
  ]);

  return (
    <div className="add_ons_page_2_container">
      <LEDTherapy
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        ledRendered={ledRendered}
        resetAllCartStatesExceptTreatments={
          props.resetAllCartStatesExceptTreatments
        }
      />
      <Microcurrent
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        resetAllCartStatesExceptTreatments={
          props.resetAllCartStatesExceptTreatments
        }
      />
      <Microdermabrasion
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        microdermabrasionRendered={microdermabrasionRendered}
        resetAllCartStatesExceptTreatments={
          props.resetAllCartStatesExceptTreatments
        }
      />
      <Dermarolling
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        dermarollingRendered={dermarollingRendered}
        resetAllCartStatesExceptTreatments={
          props.resetAllCartStatesExceptTreatments
        }
      />
    </div>
  );
};

export default AddOnsPage2;
