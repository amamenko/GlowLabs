import React, { useRef } from "react";
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
  const {
    AddOnsRef,
    name,
    initialScreenSize,
    currentScreenSize,
    resetAllCartStatesExceptTreatments,
  } = props;

  const addOnsHeaderRef = useRef(null);

  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: initialScreenSize >= 1200 ? 0.7 : 0.2,
  });

  return (
    <div className="all_add_ons_container" ref={AddOnsRef} id={name}>
      <header className="all_add_ons_header" ref={inViewRef}>
        {inView ? (
          <Spring
            from={{
              position: "relative",
              opacity: 0,
            }}
            to={{
              position: "relative",
              opacity: 1,
            }}
            config={{ duration: 1000 }}
          >
            {(styles) => (
              <>
                <h2
                  style={{
                    position: `${styles.position}`,
                    opacity: `${styles.opacity}`,
                  }}
                  ref={addOnsHeaderRef}
                >
                  YOUR ADD-ONS
                </h2>
                <span
                  style={{
                    position: `${styles.position}`,
                    opacity: `${styles.opacity}`,
                    width: addOnsHeaderRef.current
                      ? addOnsHeaderRef.current.clientWidth + "px"
                      : "0px",
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
        initialScreenSize={initialScreenSize}
        currentScreenSize={currentScreenSize}
        resetAllCartStatesExceptTreatments={resetAllCartStatesExceptTreatments}
      />
      <HydroJellyMask
        initialScreenSize={initialScreenSize}
        currentScreenSize={currentScreenSize}
        resetAllCartStatesExceptTreatments={resetAllCartStatesExceptTreatments}
      />
      <LEDTherapy
        initialScreenSize={initialScreenSize}
        currentScreenSize={currentScreenSize}
        resetAllCartStatesExceptTreatments={resetAllCartStatesExceptTreatments}
      />
      <Microcurrent
        initialScreenSize={initialScreenSize}
        currentScreenSize={currentScreenSize}
        resetAllCartStatesExceptTreatments={resetAllCartStatesExceptTreatments}
      />
      <Microdermabrasion
        initialScreenSize={initialScreenSize}
        currentScreenSize={currentScreenSize}
        resetAllCartStatesExceptTreatments={resetAllCartStatesExceptTreatments}
      />
      <Dermarolling
        initialScreenSize={initialScreenSize}
        currentScreenSize={currentScreenSize}
        resetAllCartStatesExceptTreatments={resetAllCartStatesExceptTreatments}
      />
      <NanoNeedling
        initialScreenSize={initialScreenSize}
        currentScreenSize={currentScreenSize}
        resetAllCartStatesExceptTreatments={resetAllCartStatesExceptTreatments}
      />
      <GuaSha
        initialScreenSize={initialScreenSize}
        currentScreenSize={currentScreenSize}
        resetAllCartStatesExceptTreatments={resetAllCartStatesExceptTreatments}
      />
      <Beard
        initialScreenSize={initialScreenSize}
        currentScreenSize={currentScreenSize}
        resetAllCartStatesExceptTreatments={resetAllCartStatesExceptTreatments}
      />
    </div>
  );
});

export default AllAddOns;
