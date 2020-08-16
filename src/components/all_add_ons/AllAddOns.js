import React, { useRef, useEffect, useState } from "react";
import { Spring } from "react-spring/renderprops";
import { useInView } from "react-intersection-observer";
import ExtraExtractions from "../add_ons/ExtraExtractions/ExraExtractions";
import HydroJellyMask from "../add_ons/HydroJellyMask/HydroJellyMask";
import LEDTherapy from "../add_ons/LEDTherapy/LEDTherapy";
import Microcurrent from "../add_ons/Microcurrent/Microcurrent";
import Microdermabrasion from "../add_ons/Microdermabrasion/Microdermabrasion";
import Dermarolling from "../add_ons/Dermarolling/Dermarolling";
import NanoNeedling from "../add_ons/NanoNeedling/NanoNeedling";
import GuaSha from "../add_ons/GuaSha/GuaSha";
import Beard from "../add_ons/Beard/Beard";
import "./AllAddOns.css";

const AllAddOns = React.forwardRef((props, ref) => {
  const headlineRef = useRef(null);

  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: props.initialScreenSize >= 1200 ? 0.7 : 0.2,
  });

  const [pageRendered, changePageRendered] = useState(false);

  return (
    <div
      className="all_add_ons_container"
      ref={props.AddOnsRef}
      id={props.name}
    >
      <header className="all_add_ons_header" ref={inViewRef}>
        {inView ? (
          <Spring
            from={{
              position: "relative",
              opacity: 0,
              width: "0px",
            }}
            to={{
              position: "relative",
              opacity: 1,
              width: headlineRef.current
                ? headlineRef.current.clientWidth + "px"
                : "0px",
            }}
            immediate={pageRendered}
            onRest={() => changePageRendered(true)}
            config={{ duration: 1000 }}
          >
            {(styles) => (
              <>
                <h2
                  style={{
                    position: `${styles.position}`,
                    opacity: `${styles.opacity}`,
                  }}
                  ref={headlineRef}
                >
                  YOUR ADD-ONS
                </h2>
                <span
                  style={{
                    position: `${styles.position}`,
                    opacity: `${styles.opacity}`,
                    width: `${styles.width}`,
                  }}
                  className="add_ons_title_underline"
                />
                <br />
                <h3
                  style={{
                    position: `${styles.position}`,
                    opacity: `${styles.opacity}`,
                  }}
                >
                  <p>
                    Complement your <br />
                    facial with any <br />
                    of these extra <br />
                    special treatments.
                  </p>
                </h3>
              </>
            )}
          </Spring>
        ) : null}
      </header>
      <ExtraExtractions
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        resetAllCartStatesExceptTreatments={
          props.resetAllCartStatesExceptTreatments
        }
      />
      <HydroJellyMask
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        resetAllCartStatesExceptTreatments={
          props.resetAllCartStatesExceptTreatments
        }
      />
      <LEDTherapy
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        resetAllCartStatesExceptTreatments={
          props.resetAllCartStatesExceptTreatments
        }
      />
      <Microcurrent
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        resetAllCartStatesExceptTreatments={
          props.resetAllCartStatesExceptTreatments
        }
      />
      <Microdermabrasion
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        resetAllCartStatesExceptTreatments={
          props.resetAllCartStatesExceptTreatments
        }
      />
      <Dermarolling
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        resetAllCartStatesExceptTreatments={
          props.resetAllCartStatesExceptTreatments
        }
      />
      <NanoNeedling
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        resetAllCartStatesExceptTreatments={
          props.resetAllCartStatesExceptTreatments
        }
      />
      <GuaSha
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        resetAllCartStatesExceptTreatments={
          props.resetAllCartStatesExceptTreatments
        }
      />
      <Beard
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        resetAllCartStatesExceptTreatments={
          props.resetAllCartStatesExceptTreatments
        }
      />
    </div>
  );
});

export default AllAddOns;
