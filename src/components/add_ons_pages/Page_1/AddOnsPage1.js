import React from "react";
import { Spring } from "react-spring/renderprops";
import { useInView } from "react-intersection-observer";
import ExtraExtractions from "../../add_ons/ExtraExtractions/ExraExtractions";
import HydroJellyMask from "../../add_ons/HydroJellyMask/HydroJellyMask";
import "./AddOnsPage1.css";
import LEDTherapy from "../../add_ons/LEDTherapy/LEDTherapy";

const AddOnsPage1 = React.forwardRef((props, ref) => {
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: props.initialScreenSize >= 1200 ? 0.7 : 0.2
  });
  return (
    <div className="add_ons_page_1_container" ref={props.AddOnsRef}>
      <header className="add_ons_page_1_header" ref={inViewRef}>
        {inView ? (
          <Spring
            from={{
              position: "relative",
              opacity: 0,
              animation:
                props.currentScreenSize === ""
                  ? props.initialScreenSize >= 1200
                    ? "big_screen_add_ons_line 1s forwards"
                    : "add_ons_line 1s forwards"
                  : props.currentScreenSize >= 1200
                  ? "big_screen_add_ons_line 1s forwards"
                  : "add_ons_line 1s forwards"
            }}
            to={{ position: "relative", opacity: 1 }}
            config={{ duration: 1000 }}
          >
            {styles => (
              <>
                <h2
                  style={{
                    position: `${styles.position}`,
                    opacity: `${styles.opacity}`
                  }}
                >
                  OUR ADD-ONS
                </h2>
                <span
                  style={{
                    position: `${styles.position}`,
                    opacity: `${styles.opacity}`,
                    animation: `${styles.animation}`
                  }}
                  className="add_ons_title_underline"
                />
                <br />
                <h3
                  style={{
                    position: `${styles.position}`,
                    opacity: `${styles.opacity}`
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
      />
      <HydroJellyMask
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
      {props.initialScreenSize >= 1200 ? (
        <LEDTherapy
          initialScreenSize={props.initialScreenSize}
          currentScreenSize={props.currentScreenSize}
        />
      ) : null}
    </div>
  );
});

export default AddOnsPage1;
