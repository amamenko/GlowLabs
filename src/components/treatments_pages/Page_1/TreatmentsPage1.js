import React, { useState, useEffect } from "react";
import Calm from "../../treatments/Calm/Calm";
import Clarify from "../../treatments/Clarify/Clarify";
import Bacial from "../../treatments/Bacial/Bacial";
import { Spring } from "react-spring/renderprops";
import { useInView } from "react-intersection-observer";
import "./TreatmentsPage1.css";

const TreatmentsPage1 = React.forwardRef((props, ref) => {
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: props.initialScreenSize >= 1200 ? 0.7 : 0.2,
  });
  const [bacialRendered, changeBacialRendered] = useState("grid");

  useEffect(() => {
    if (props.currentScreenSize === "") {
      if (props.initialScreenSize >= 1200) {
        changeBacialRendered("grid");
      } else {
        changeBacialRendered("none");
      }
    } else {
      if (props.currentScreenSize >= 1200) {
        changeBacialRendered("grid");
      } else {
        changeBacialRendered("none");
      }
    }
  }, [changeBacialRendered, props.currentScreenSize, props.initialScreenSize]);

  return (
    <div className="treatments_page_1_container" ref={props.Treatments1Ref}>
      <header className="treatments_page_1_header" ref={inViewRef}>
        {inView ? (
          <Spring
            from={{
              position: "relative",
              opacity: 0,
              width_desktop: "0%",
              width_landscape: "0%",
              width_mobile: "0%",
              width_mobile_small: "0%",
              width_mobile_tiny: "0%",
            }}
            to={{
              position: "relative",
              opacity: 1,
              width_desktop: "24%",
              width_landscape: "38%",
              width_mobile: "45%",
              width_mobile_small: "48%",
              width_mobile_tiny: "48%",
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
                  YOUR FACIAL
                </h2>
                <span
                  style={{
                    position: `${styles.position}`,
                    opacity: `${styles.opacity}`,
                    width:
                      props.currentScreenSize === ""
                        ? props.initialScreenSize >= 1200
                          ? `${styles.width_desktop}`
                          : props.initialScreenSize >= 600
                          ? `${styles.width_landscape}`
                          : props.initialScreenSize >= 410
                          ? `${styles.width_mobile}`
                          : props.initialScreenSize >= 360
                          ? `${styles.width_mobile_small}`
                          : `${styles.width_mobile_tiny}`
                        : props.currentScreenSize >= 1200
                        ? `${styles.width_desktop}`
                        : props.currentScreenSize >= 600
                        ? `${styles.width_landscape}`
                        : props.currentScreenSize >= 410
                        ? `${styles.width_mobile}`
                        : props.currentScreenSize >= 360
                        ? `${styles.width_mobile_small}`
                        : `${styles.width_mobile_tiny}`,
                  }}
                  className="treatments_title_underline"
                />
                <br />
                <h3
                  style={{
                    position: `${styles.position}`,
                    opacity: `${styles.opacity}`,
                  }}
                >
                  <p>
                    Each facial is <br />
                    customized <br />
                    to fit your specific <br />
                    skincare needs
                  </p>
                </h3>
              </>
            )}
          </Spring>
        ) : null}
      </header>
      <Calm
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
      <Clarify
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
      <Bacial
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        bacialRendered={bacialRendered}
      />
    </div>
  );
});

export default TreatmentsPage1;
