import React, { useState, useEffect } from "react";
import Microdermabrasion from "../../add_ons/Microdermabrasion/Microdermabrasion";
import Dermarolling from "../../add_ons/Dermarolling/Dermarolling";
import NanoNeedling from "../../add_ons/NanoNeedling/NanoNeedling";
import GuaSha from "../../add_ons/GuaSha/GuaSha";
import Beard from "../../add_ons/Beard/Beard";
import "./AddOnsPage3.css";

const AddOnsPage3 = (props) => {
  const [microdermabrasionRendered, changeMicrodermabrasionRendered] = useState(
    "grid"
  );
  const [dermarollingRendered, changeDermarollingRendered] = useState("none");
  const [
    nanoNeedlingGuashaRendered,
    changeNanoNeedlingGuashaRendered,
  ] = useState("none");
  const [beardRendered, changeBeardRendered] = useState("grid");

  useEffect(() => {
    if (props.currentScreenSize === "") {
      if (props.initialScreenSize >= 600 && props.initialScreenSize <= 1200) {
        changeMicrodermabrasionRendered("grid");
      } else {
        changeMicrodermabrasionRendered("none");
      }
    } else {
      if (props.currentScreenSize >= 600 && props.currentScreenSize <= 1200) {
        changeMicrodermabrasionRendered("grid");
      } else {
        changeMicrodermabrasionRendered("none");
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
        changeDermarollingRendered("none");
      } else {
        changeDermarollingRendered("grid");
      }
    } else {
      if (props.currentScreenSize >= 1200) {
        changeDermarollingRendered("none");
      } else {
        changeDermarollingRendered("grid");
      }
    }
  }, [
    changeDermarollingRendered,
    props.currentScreenSize,
    props.initialScreenSize,
  ]);

  useEffect(() => {
    if (props.currentScreenSize === "") {
      if (props.initialScreenSize >= 600 && props.initialScreenSize <= 1200) {
        changeNanoNeedlingGuashaRendered("none");
      } else {
        changeNanoNeedlingGuashaRendered("grid");
      }
    } else {
      if (props.currentScreenSize >= 600 && props.currentScreenSize <= 1200) {
        changeNanoNeedlingGuashaRendered("none");
      } else {
        changeNanoNeedlingGuashaRendered("grid");
      }
    }
  }, [
    changeNanoNeedlingGuashaRendered,
    props.currentScreenSize,
    props.initialScreenSize,
  ]);

  useEffect(() => {
    if (props.currentScreenSize === "") {
      if (props.initialScreenSize >= 1200) {
        changeBeardRendered("grid");
      } else {
        changeBeardRendered("none");
      }
    } else {
      if (props.currentScreenSize >= 1200) {
        changeBeardRendered("grid");
      } else {
        changeBeardRendered("none");
      }
    }
  }, [
    changeDermarollingRendered,
    props.currentScreenSize,
    props.initialScreenSize,
  ]);

  return (
    <div className="add_ons_page_3_container">
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
      <NanoNeedling
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        nanoNeedlingGuashaRendered={nanoNeedlingGuashaRendered}
        resetAllCartStatesExceptTreatments={
          props.resetAllCartStatesExceptTreatments
        }
      />
      <GuaSha
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        nanoNeedlingGuashaRendered={nanoNeedlingGuashaRendered}
        resetAllCartStatesExceptTreatments={
          props.resetAllCartStatesExceptTreatments
        }
      />
      <Beard
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        beardRendered={beardRendered}
        resetAllCartStatesExceptTreatments={
          props.resetAllCartStatesExceptTreatments
        }
      />
    </div>
  );
};

export default AddOnsPage3;
