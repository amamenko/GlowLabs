import React from "react";
import LEDTherapy from "../../add_ons/LEDTherapy/LEDTherapy";
import Microcurrent from "../../add_ons/Microcurrent/Microcurrent";
import Microdermabrasion from "../../add_ons/Microdermabrasion/Microdermabrasion";
import "./AddOnsPage2.css";

const AddOnsPage2 = () => (
  <div className="add_ons_page_2_container">
    <LEDTherapy />
    <Microcurrent />
    <Microdermabrasion />
  </div>
);

export default AddOnsPage2;
