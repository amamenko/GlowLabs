import React, { useState, useEffect } from "react";
import Dermaplaning from "../../treatments/Dermaplaning/Dermaplaning";
import CBD from "../../treatments/CBD/CBD";
import "./TreatmentsPage5.css";
import JetHydroPeel from "../../treatments/JetHydroPeel/JetHydroPeel";

const TreatmentsPage5 = (props) => {
  const [jetHydroPeelRendered, changeJetHydroPeelRendered] = useState("none");
  const [dermaplaningCBDRendered, changeDermaplaningCBDRendered] = useState(
    "none"
  );

  useEffect(() => {
    if (props.currentScreenSize === "") {
      if (props.initialScreenSize < 600) {
        changeJetHydroPeelRendered("grid");
        changeDermaplaningCBDRendered("none");
      } else {
        changeJetHydroPeelRendered("none");
        changeDermaplaningCBDRendered("grid");
      }
    } else {
      if (props.currentScreenSize < 600) {
        changeJetHydroPeelRendered("grid");
        changeDermaplaningCBDRendered("none");
      } else {
        changeJetHydroPeelRendered("none");
        changeDermaplaningCBDRendered("grid");
      }
    }
  }, [
    props.currentScreenSize,
    props.initialScreenSize,
    changeJetHydroPeelRendered,
    changeDermaplaningCBDRendered,
  ]);

  return (
    <div className="treatments_page_5_container">
      <JetHydroPeel
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        jetHydroPeelRendered={jetHydroPeelRendered}
      />
      <Dermaplaning
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        resetAllCartStates={props.resetAllCartStates}
        dermaplaningCBDRendered={dermaplaningCBDRendered}
      />
      <CBD
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        resetAllCartStates={props.resetAllCartStates}
        dermaplaningCBDRendered={dermaplaningCBDRendered}
      />
    </div>
  );
};

export default TreatmentsPage5;
