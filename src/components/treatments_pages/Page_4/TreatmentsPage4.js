import React from "react";
import Dermaplaning from "../../treatments/Dermaplaning/Dermaplaning";
import CBD from "../../treatments/CBD/CBD";
import Microneedle from "../../treatments/Microneedle/Microneedle";
import Quickie from "../../treatments/Quickie/Quickie";
import ChemicalPeel from "../../treatments/ChemicalPeel/ChemicalPeel";
import "./TreatmentsPage4.css";

const TreatmentsPage4 = props => (
  <div className="treatments_page_4_container">
    {props.currentScreenSize === "" ? (
      props.initialScreenSize >= 600 && props.initialScreenSize <= 1200 ? (
        <>
          <Quickie
            initialScreenSize={props.initialScreenSize}
            currentScreenSize={props.currentScreenSize}
          />
          <ChemicalPeel
            initialScreenSize={props.initialScreenSize}
            currentScreenSize={props.currentScreenSize}
          />
        </>
      ) : null
    ) : props.currentScreenSize >= 600 && props.currentScreenSize <= 1200 ? (
      <>
        <Quickie
          initialScreenSize={props.initialScreenSize}
          currentScreenSize={props.currentScreenSize}
        />
        <ChemicalPeel
          initialScreenSize={props.initialScreenSize}
          currentScreenSize={props.currentScreenSize}
        />
      </>
    ) : null}
    {props.currentScreenSize === "" ? (
      props.initialScreenSize >= 600 ? null : (
        <Dermaplaning
          initialScreenSize={props.initialScreenSize}
          currentScreenSize={props.currentScreenSize}
        />
      )
    ) : props.currentScreenSize >= 600 ? null : (
      <Dermaplaning
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
    )}
    {props.currentScreenSize === "" ? (
      props.initialScreenSize >= 600 &&
      props.initialScreenSize <= 1200 ? null : (
        <>
          <CBD
            initialScreenSize={props.initialScreenSize}
            currentScreenSize={props.currentScreenSize}
          />
          <Microneedle
            initialScreenSize={props.initialScreenSize}
            currentScreenSize={props.currentScreenSize}
          />
        </>
      )
    ) : props.currentScreenSize >= 600 &&
      props.currentScreenSize <= 1200 ? null : (
      <>
        <CBD
          initialScreenSize={props.initialScreenSize}
          currentScreenSize={props.currentScreenSize}
        />
        <Microneedle
          initialScreenSize={props.initialScreenSize}
          currentScreenSize={props.currentScreenSize}
        />
      </>
    )}
  </div>
);

export default TreatmentsPage4;
