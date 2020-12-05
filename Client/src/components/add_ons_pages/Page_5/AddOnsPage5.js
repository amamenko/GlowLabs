import React from "react";
import Beard from "../../add_ons/Beard/Beard";
import "./AddOnsPage5.css";

const AddOnsPage5 = (props) => (
  <div className="add_ons_page_5_container">
    <Beard
      initialScreenSize={props.initialScreenSize}
      currentScreenSize={props.currentScreenSize}
      resetAllCartStatesExceptTreatments={
        props.resetAllCartStatesExceptTreatments
      }
    />
  </div>
);

export default AddOnsPage5;
