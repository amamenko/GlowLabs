import React from "react";
import Calm from "../../treatments/Calm/Calm";
import Clarify from "../../treatments/Clarify/Clarify";
import Bacial from "../../treatments/Bacial/Bacial";
import { Spring } from "react-spring/renderprops";
import { useInView } from "react-intersection-observer";
import "./TreatmentsPage1.css";

const TreatmentsPage1 = props => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: props.initialScreenSize >= 768 ? 0.7 : 0.2
  });
  return (
    <div className="treatments_page_1_container" ref={props.Treatments1Ref}>
      <header className="treatments_page_1_header" ref={ref}>
        {inView ? (
          <Spring
            from={{
              position: "relative",
              opacity: 0,
              animation:
                props.currentScreenSize === ""
                  ? props.initialScreenSize >= 768
                    ? "line_768 1s forwards"
                    : "line 1s forwards"
                  : props.currentScreenSize >= 768
                  ? "line_768 1s forwards"
                  : "line 1s forwards"
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
                  OUR TREATMENTS
                </h2>
                <span
                  style={{
                    position: `${styles.position}`,
                    opacity: `${styles.opacity}`,
                    animation: `${styles.animation}`
                  }}
                  className="title_underline"
                ></span>
                <br />
                <h3
                  style={{
                    position: `${styles.position}`,
                    opacity: `${styles.opacity}`
                  }}
                >
                  <p>
                    Each facial is <br />
                    customized <br />
                    to fit your specific <br />
                    skincare needs.
                  </p>
                </h3>
              </>
            )}
          </Spring>
        ) : null}
      </header>
      <Calm initialScreenSize={props.initialScreenSize} />
      <Clarify initialScreenSize={props.initialScreenSize} />
      {props.initialScreenSize >= 768 ? (
        <Bacial initialScreenSize={props.initialScreenSize} />
      ) : null}
    </div>
  );
};

export default TreatmentsPage1;
