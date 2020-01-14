import React from "react";
import Beard from "../../add_ons/Beard/Beard";
import NanoNeedling from "../../add_ons/NanoNeedling/NanoNeedling";
import GuaSha from "../../add_ons/GuaSha/GuaSha";
import "./AddOnsPage4.css";

const AddOnsPage4 = props => (
  <div className="add_ons_page_4_container">
    {props.currentScreenSize === "" ? (
      props.initialScreenSize >= 600 ? null : (
        <Beard
          initialScreenSize={props.initialScreenSize}
          currentScreenSize={props.currentScreenSize}
        />
      )
    ) : props.currentScreenSize >= 600 ? null : (
      <Beard
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
    )}
    {props.currentScreenSize === "" ? (
      props.initialScreenSize >= 600 && props.initialScreenSize <= 1200 ? (
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
      ) : null
    ) : props.currentScreenSize >= 600 && props.initialScreenSize <= 1200 ? (
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
    ) : null}
  </div>
);

export default AddOnsPage4;
