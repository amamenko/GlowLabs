import React, { useState, useEffect } from "react";
import Dermaplaning from "../../treatments/Dermaplaning/Dermaplaning";
import CBD from "../../treatments/CBD/CBD";
import Microneedle from "../../treatments/Microneedle/Microneedle";
import Quickie from "../../treatments/Quickie/Quickie";
import ChemicalPeel from "../../treatments/ChemicalPeel/ChemicalPeel";
import "./TreatmentsPage4.css";

const TreatmentsPage4 = props => {
  const [quickieChemPeelRendered, changeQuickieChemPeelRendered] = useState(
    "grid"
  );
  const [dermaplaningRendered, changeDermaplaningRendered] = useState("none");
  const [cbdMicroneedlingRendered, changeCBDMicroneedlingRendered] = useState(
    "none"
  );

  useEffect(() => {
    if (props.currentScreenSize === "") {
      if (props.initialScreenSize >= 600 && props.initialScreenSize <= 1200) {
        changeQuickieChemPeelRendered("grid");
      } else {
        changeQuickieChemPeelRendered("none");
      }
    } else {
      if (props.currentScreenSize >= 600 && props.currentScreenSize <= 1200) {
        changeQuickieChemPeelRendered("grid");
      } else {
        changeQuickieChemPeelRendered("none");
      }
    }
  }, [
    changeQuickieChemPeelRendered,
    props.currentScreenSize,
    props.initialScreenSize
  ]);

  useEffect(() => {
    if (props.currentScreenSize === "") {
      if (
        props.initialScreenSize >= 600 &&
        (props.initialScreenSize <= 1200) | (props.initialScreenSize >= 1200)
      ) {
        changeDermaplaningRendered("none");
      } else {
        changeDermaplaningRendered("grid");
      }
    } else {
      if (
        props.currentScreenSize >= 600 &&
        (props.currentScreenSize <= 1200) | (props.currentScreenSize >= 1200)
      ) {
        changeDermaplaningRendered("none");
      } else {
        changeDermaplaningRendered("grid");
      }
    }
  }, [
    changeDermaplaningRendered,
    props.currentScreenSize,
    props.initialScreenSize
  ]);

  useEffect(() => {
    if (props.currentScreenSize === "") {
      if (props.initialScreenSize >= 600 && props.initialScreenSize <= 1200) {
        changeCBDMicroneedlingRendered("none");
      } else {
        changeCBDMicroneedlingRendered("grid");
      }
    } else {
      if (props.currentScreenSize >= 600 && props.currentScreenSize <= 1200) {
        changeCBDMicroneedlingRendered("none");
      } else {
        changeCBDMicroneedlingRendered("grid");
      }
    }
  }, [
    changeCBDMicroneedlingRendered,
    props.currentScreenSize,
    props.initialScreenSize
  ]);

  return (
    <div className="treatments_page_4_container">
      <Quickie
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        quickieChemPeelRendered={quickieChemPeelRendered}
      />
      <ChemicalPeel
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        quickieChemPeelRendered={quickieChemPeelRendered}
      />
      <Dermaplaning
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        dermaplaningRendered={dermaplaningRendered}
      />
      <CBD
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        cbdMicroneedlingRendered={cbdMicroneedlingRendered}
      />
      <Microneedle
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        cbdMicroneedlingRendered={cbdMicroneedlingRendered}
      />
    </div>
  );
};

export default TreatmentsPage4;
