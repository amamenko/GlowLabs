import React from "react";
import Dermarolling from "../../add_ons/Dermarolling/Dermarolling";
import NanoNeedling from "../../add_ons/NanoNeedling/NanoNeedling";
import GuaSha from "../../add_ons/GuaSha/GuaSha";
import Beard from "../../add_ons/Beard/Beard";
import "./AddOnsPage3.css";

const AddOnsPage3 = props => (
  <div className="add_ons_page_3_container">
    {props.initialScreenSize >= 1200 ? null : (
      <Dermarolling
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
    )}
    <NanoNeedling
      initialScreenSize={props.initialScreenSize}
      currentScreenSize={props.currentScreenSize}
    />
    <GuaSha
      initialScreenSize={props.initialScreenSize}
      currentScreenSize={props.currentScreenSize}
    />
    {props.initialScreenSize >= 1200 ? (
      <Beard
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
    ) : null}
  </div>
);

export default AddOnsPage3;
