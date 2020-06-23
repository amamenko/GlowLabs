import React, { useState, useEffect } from "react";
import Beard from "../../add_ons/Beard/Beard";
import NanoNeedling from "../../add_ons/NanoNeedling/NanoNeedling";
import GuaSha from "../../add_ons/GuaSha/GuaSha";
import "./AddOnsPage4.css";

const AddOnsPage4 = (props) => {
  const [
    nanoNeedlingGuashaRendered,
    changeNanoNeedlingGuashaRendered,
  ] = useState("grid");
  const [beardRendered, changeBeardRendered] = useState("none");

  useEffect(() => {
    if (props.currentScreenSize === "") {
      if (props.initialScreenSize >= 600 && props.initialScreenSize <= 1200) {
        changeNanoNeedlingGuashaRendered("grid");
      } else {
        changeNanoNeedlingGuashaRendered("none");
      }
    } else {
      if (props.currentScreenSize >= 600 && props.currentScreenSize <= 1200) {
        changeNanoNeedlingGuashaRendered("grid");
      } else {
        changeNanoNeedlingGuashaRendered("none");
      }
    }
  }, [
    changeNanoNeedlingGuashaRendered,
    props.currentScreenSize,
    props.initialScreenSize,
  ]);

  useEffect(() => {
    if (props.currentScreenSize === "") {
      if (props.initialScreenSize >= 600) {
        changeBeardRendered("none");
      } else {
        changeBeardRendered("grid");
      }
    } else {
      if (props.currentScreenSize >= 600) {
        changeBeardRendered("none");
      } else {
        changeBeardRendered("grid");
      }
    }
  }, [changeBeardRendered, props.currentScreenSize, props.initialScreenSize]);

  return (
    <div className="add_ons_page_4_container">
      <Beard
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        beardRendered={beardRendered}
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
    </div>
  );
};

export default AddOnsPage4;
