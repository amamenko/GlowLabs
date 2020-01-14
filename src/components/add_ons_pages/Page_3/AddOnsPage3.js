import React from "react";
import Microdermabrasion from "../../add_ons/Microdermabrasion/Microdermabrasion";
import Dermarolling from "../../add_ons/Dermarolling/Dermarolling";
import NanoNeedling from "../../add_ons/NanoNeedling/NanoNeedling";
import GuaSha from "../../add_ons/GuaSha/GuaSha";
import Beard from "../../add_ons/Beard/Beard";
import "./AddOnsPage3.css";

const AddOnsPage3 = props => (
  <div className="add_ons_page_3_container">
    {props.currentScreenSize === "" ? (
      props.initialScreenSize >= 600 && props.initialScreenSize <= 1200 ? (
        <Microdermabrasion
          initialScreenSize={props.initialScreenSize}
          currentScreenSize={props.currentScreenSize}
        />
      ) : null
    ) : props.currentScreenSize >= 600 && props.currentScreenSize <= 1200 ? (
      <Microdermabrasion
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
    ) : null}
    {props.currentScreenSize === "" ? (
      props.initialScreenSize >= 1200 ? null : (
        <Dermarolling
          initialScreenSize={props.initialScreenSize}
          currentScreenSize={props.currentScreenSize}
        />
      )
    ) : props.currentScreenSize >= 1200 ? null : (
      <Dermarolling
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
    )}
    {props.currentScreenSize === "" ? (
      props.initialScreenSize >= 600 &&
      props.initialScreenSize <= 1200 ? null : (
        <>
          <NanoNeedling
            initialScreenSize={props.initialScreenSize}
            currentScreenSize={props.currentScreenSize}
          />
          <GuaSha
            initialScreenSize={props.initialScreenSize}
            currentScreenSize={props.currentScreenSize}
          />
        </>
      )
    ) : props.currentScreenSize >= 600 &&
      props.initialScreenSize <= 1200 ? null : (
      <>
        <NanoNeedling
          initialScreenSize={props.initialScreenSize}
          currentScreenSize={props.currentScreenSize}
        />
        <GuaSha
          initialScreenSize={props.initialScreenSize}
          currentScreenSize={props.currentScreenSize}
        />
      </>
    )}
    {props.currentScreenSize === "" ? (
      props.initialScreenSize >= 1200 ? (
        <Beard
          initialScreenSize={props.initialScreenSize}
          currentScreenSize={props.currentScreenSize}
        />
      ) : null
    ) : props.currentScreenSize >= 1200 ? (
      <Beard
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
    ) : null}
  </div>
);

export default AddOnsPage3;
