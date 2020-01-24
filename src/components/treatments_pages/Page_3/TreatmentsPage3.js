import React, { useState, useEffect } from "react";
import Rejuvenate from "../../treatments/Rejuvenate/Rejuvenate";
import Quench from "../../treatments/Quench/Quench";
import Quickie from "../../treatments/Quickie/Quickie";
import ChemicalPeel from "../../treatments/ChemicalPeel/ChemicalPeel";
import Dermaplaning from "../../treatments/Dermaplaning/Dermaplaning";
import "./TreatmentsPage3.css";

const TreatmentsPage3 = props => {
  const [rejuvenateRendered, changeRejuvenateRendered] = useState("grid");
  const [quenchRendered, changeQuenchRendered] = useState("none");
  const [quickieChemPeelRendered, changeQuickieChemPeelRendered] = useState(
    "none"
  );
  const [dermaplaningRendered, changeDermaplaningRendered] = useState("grid");

  useEffect(() => {
    if (props.currentScreenSize === "") {
      if (props.initialScreenSize >= 600 && props.initialScreenSize <= 1200) {
        changeRejuvenateRendered("grid");
      } else {
        changeRejuvenateRendered("none");
      }
    } else {
      if (props.currentScreenSize >= 600 && props.currentScreenSize <= 1200) {
        changeRejuvenateRendered("grid");
      } else {
        changeRejuvenateRendered("none");
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
        changeQuenchRendered("none");
      } else {
        changeQuenchRendered("grid");
      }
    } else {
      if (props.currentScreenSize >= 1200) {
        changeQuenchRendered("none");
      } else {
        changeQuenchRendered("grid");
      }
    }
  }, [changeQuenchRendered, props.currentScreenSize, props.initialScreenSize]);

  useEffect(() => {
    if (props.currentScreenSize === "") {
      if (props.initialScreenSize >= 600 && props.initialScreenSize <= 1200) {
        changeQuickieChemPeelRendered("none");
      } else {
        changeQuickieChemPeelRendered("grid");
      }
    } else {
      if (props.currentScreenSize >= 600 && props.currentScreenSize <= 1200) {
        changeQuickieChemPeelRendered("none");
      } else {
        changeQuickieChemPeelRendered("grid");
      }
    }
  }, [
    changeQuickieChemPeelRendered,
    props.currentScreenSize,
    props.initialScreenSize
  ]);

  useEffect(() => {
    if (props.currentScreenSize === "") {
      if (props.initialScreenSize >= 1200) {
        changeDermaplaningRendered("grid");
      } else {
        changeDermaplaningRendered("none");
      }
    } else {
      if (props.currentScreenSize >= 1200) {
        changeDermaplaningRendered("grid");
      } else {
        changeDermaplaningRendered("none");
      }
    }
  }, [
    changeDermaplaningRendered,
    props.currentScreenSize,
    props.initialScreenSize
  ]);

  return (
    <div className="treatments_page_3_container">
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
    </div>
  );
};

export default TreatmentsPage3;
