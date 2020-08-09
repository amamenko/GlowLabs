import React from "react";
import Calm from "./treatments/Calm/Calm";
import Clarify from "./treatments/Clarify/Clarify";
import Bacial from "./treatments/Bacial/Bacial";
import Glow from "./treatments/Glow/Glow";
import Rejuvenate from "./treatments/Rejuvenate/Rejuvenate";
import Quench from "./treatments/Quench/Quench";
import SaltCave from "./treatments/SaltCave/SaltCave";
import ChemicalPeel from "./treatments/ChemicalPeel/ChemicalPeel";
import Dermaplaning from "./treatments/Dermaplaning/Dermaplaning";
import CBD from "./treatments/CBD/CBD";
import Microneedle from "./treatments/Microneedle/Microneedle";
import JetHydroPeel from "./treatments/JetHydroPeel/JetHydroPeel";
import "./AllTreatments.css";

const AllTreatments = (props) => {
  return (
    <div className="all_treatments_container">
      <Calm
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        resetAllCartStates={props.resetAllCartStates}
      />
      <Clarify
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        resetAllCartStates={props.resetAllCartStates}
      />
      <Bacial
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        resetAllCartStates={props.resetAllCartStates}
      />
      <Glow
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        resetAllCartStates={props.resetAllCartStates}
      />
      <Rejuvenate
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        resetAllCartStates={props.resetAllCartStates}
      />
      <Quench
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        resetAllCartStates={props.resetAllCartStates}
      />
      <SaltCave
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        resetAllCartStates={props.resetAllCartStates}
      />
      <ChemicalPeel
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        resetAllCartStates={props.resetAllCartStates}
      />
      <Dermaplaning
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        resetAllCartStates={props.resetAllCartStates}
      />
      <CBD
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        resetAllCartStates={props.resetAllCartStates}
      />
      <Microneedle
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        resetAllCartStates={props.resetAllCartStates}
      />
      <JetHydroPeel
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
    </div>
  );
};

export default AllTreatments;
