import React, { useState, useEffect } from "react";
import Dermaplaning from "../../treatments/Dermaplaning/Dermaplaning";
import CBD from "../../treatments/CBD/CBD";
import Microneedle from "../../treatments/Microneedle/Microneedle";
import SaltCave from "../../treatments/SaltCave/SaltCave";
import ChemicalPeel from "../../treatments/ChemicalPeel/ChemicalPeel";
import "./TreatmentsPage4.css";
import JetHydroPeel from "../../treatments/JetHydroPeel/JetHydroPeel";

const TreatmentsPage4 = (props) => {
  const [saltCaveChemPeelRendered, changeSaltCaveChemPeelRendered] = useState(
    "grid"
  );
  const [dermaplaningRendered, changeDermaplaningRendered] = useState("none");
  const [cbdMicroneedlingRendered, changeCBDMicroneedlingRendered] = useState(
    "none"
  );
  const [jetHydroPeelRendered, changeJetHydroPeelRendered] = useState("none");

  useEffect(() => {
    if (props.currentScreenSize === "") {
      if (props.initialScreenSize >= 1200) {
        changeJetHydroPeelRendered("grid");
      } else {
        changeJetHydroPeelRendered("none");
      }
    } else {
      if (props.currentScreenSize >= 1200) {
        changeJetHydroPeelRendered("grid");
      } else {
        changeJetHydroPeelRendered("none");
      }
    }
  }, [
    props.currentScreenSize,
    props.initialScreenSize,
    changeJetHydroPeelRendered,
  ]);

  useEffect(() => {
    if (props.currentScreenSize === "") {
      if (props.initialScreenSize >= 600 && props.initialScreenSize <= 1200) {
        changeSaltCaveChemPeelRendered("grid");
      } else {
        changeSaltCaveChemPeelRendered("none");
      }
    } else {
      if (props.currentScreenSize >= 600 && props.currentScreenSize <= 1200) {
        changeSaltCaveChemPeelRendered("grid");
      } else {
        changeSaltCaveChemPeelRendered("none");
      }
    }
  }, [
    changeSaltCaveChemPeelRendered,
    props.currentScreenSize,
    props.initialScreenSize,
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
    props.initialScreenSize,
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
    props.initialScreenSize,
  ]);

  return (
    <div className="treatments_page_4_container">
      <SaltCave
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        saltCaveChemPeelRendered={saltCaveChemPeelRendered}
        resetAllCartStates={props.resetAllCartStates}
      />
      <ChemicalPeel
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        saltCaveChemPeelRendered={saltCaveChemPeelRendered}
        resetAllCartStates={props.resetAllCartStates}
      />
      <Dermaplaning
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        dermaplaningRendered={dermaplaningRendered}
        resetAllCartStates={props.resetAllCartStates}
      />
      <CBD
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        cbdMicroneedlingRendered={cbdMicroneedlingRendered}
        resetAllCartStates={props.resetAllCartStates}
      />
      <Microneedle
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        cbdMicroneedlingRendered={cbdMicroneedlingRendered}
        resetAllCartStates={props.resetAllCartStates}
      />
      <JetHydroPeel
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        jetHydroPeelRendered={jetHydroPeelRendered}
      />
    </div>
  );
};

export default TreatmentsPage4;
