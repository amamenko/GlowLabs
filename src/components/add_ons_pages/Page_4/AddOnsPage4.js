import React from "react";
import Beard from "../../add_ons/Beard/Beard";
import "./AddOnsPage4.css";

const AddOnsPage4 = props => (
  <div className="add_ons_page_4_container">
    {props.initialScreenSize >= 1200 ? null : (
      <Beard
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
    )}
  </div>
);

export default AddOnsPage4;
