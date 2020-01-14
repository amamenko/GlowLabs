import React from "react";
import LEDTherapy from "../../add_ons/LEDTherapy/LEDTherapy";
import Microcurrent from "../../add_ons/Microcurrent/Microcurrent";
import Microdermabrasion from "../../add_ons/Microdermabrasion/Microdermabrasion";
import Dermarolling from "../../add_ons/Dermarolling/Dermarolling";
import "./AddOnsPage2.css";

const AddOnsPage2 = props => (
  <div className="add_ons_page_2_container">
    {props.initialScreenSize >= 1200 ? null : (
      <LEDTherapy
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
    )}
    <Microcurrent
      initialScreenSize={props.initialScreenSize}
      currentScreenSize={props.currentScreenSize}
    />
    {props.currentScreenSize === "" ? (
      props.initialScreenSize >= 600 &&
      props.initialScreenSize <= 1200 ? null : (
        <Microdermabrasion
          initialScreenSize={props.initialScreenSize}
          currentScreenSize={props.currentScreenSize}
        />
      )
    ) : props.currentScreenSize >= 600 &&
      props.currentScreenSize <= 1200 ? null : (
      <Microdermabrasion
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
    )}
    {props.initialScreenSize >= 1200 ? (
      <Dermarolling
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
    ) : null}
  </div>
);

export default AddOnsPage2;
