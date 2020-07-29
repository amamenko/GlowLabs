import React, { useState, useEffect } from "react";
import { Spring } from "react-spring/renderprops";
import { useInView } from "react-intersection-observer";
import ExtraExtractions from "../../add_ons/ExtraExtractions/ExraExtractions";
import HydroJellyMask from "../../add_ons/HydroJellyMask/HydroJellyMask";
import LEDTherapy from "../../add_ons/LEDTherapy/LEDTherapy";
import "./AddOnsPage1.css";

const AddOnsPage1 = React.forwardRef((props, ref) => {
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: props.initialScreenSize >= 1200 ? 0.7 : 0.2,
  });
  const [ledRendered, changeLEDRendered] = useState("grid");

  useEffect(() => {
    if (props.currentScreenSize === "") {
      if (props.initialScreenSize >= 1200) {
        changeLEDRendered("grid");
      } else {
        changeLEDRendered("none");
      }
    } else {
      if (props.currentScreenSize >= 1200) {
        changeLEDRendered("grid");
      } else {
        changeLEDRendered("none");
      }
    }
  }, [changeLEDRendered, props.currentScreenSize, props.initialScreenSize]);

  return (
    <div className="add_ons_page_1_container" ref={props.AddOnsRef}>
      <header className="add_ons_page_1_header" ref={inViewRef}>
        {inView ? (
          <Spring
            from={{
              position: "relative",
              opacity: 0,
              width_desktop: "0%",
              width_larger_tablet: "0%",
              width_tablet: "0%",
              width_landscape: "0%",
              width_mobile: "0%",
            }}
            to={{
              position: "relative",
              opacity: 1,
              width_desktop: "28%",
              width_larger_tablet: "46%",
              width_tablet: "48%",
              width_landscape: "32%",
              width_mobile: "53%",
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
                >
                  YOUR ADD-ONS
                </h2>
                <span
                  style={{
                    position: `${styles.position}`,
                    opacity: `${styles.opacity}`,
                    width:
                      props.currentScreenSize === ""
                        ? props.initialScreenSize >= 1200
                          ? `${styles.width_desktop}`
                          : props.initialScreenSize >= 1024
                          ? `${styles.width_larger_tablet}`
                          : props.initialScreenSize >= 768
                          ? `${styles.width_tablet}`
                          : props.initialScreenSize >= 600
                          ? `${styles.width_landscape}`
                          : `${styles.width_mobile}`
                        : props.currentScreenSize >= 1200
                        ? `${styles.width_desktop}`
                        : props.currentScreenSize >= 1024
                        ? `${styles.width_larger_tablet}`
                        : props.currentScreenSize >= 768
                        ? `${styles.width_tablet}`
                        : props.currentScreenSize >= 600
                        ? `${styles.width_landscape}`
                        : `${styles.width_mobile}`,
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
        ledRendered={ledRendered}
        resetAllCartStatesExceptTreatments={
          props.resetAllCartStatesExceptTreatments
        }
      />
    </div>
  );
});

export default AddOnsPage1;
