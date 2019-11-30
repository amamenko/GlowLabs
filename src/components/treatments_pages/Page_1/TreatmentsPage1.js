import React from "react";
import Calm from "../../treatments/Calm/Calm";
import Clarify from "../../treatments/Clarify/Clarify";
import { Spring } from "react-spring/renderprops";
import { useInView } from "react-intersection-observer";
import "./TreatmentsPage1.css";

const TreatmentsPage1 = props => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });
  return (
    <div className="treatments_page_1_container" ref={props.Treatments1Ref}>
      <header className="treatments_page_1_header" ref={ref}>
        {inView ? (
          <Spring
            from={{ position: "relative", opacity: 0 }}
            to={{ position: "relative", opacity: 1 }}
            config={{ duration: 1000 }}
          >
            {props => (
              <>
                <h2 style={props}>OUR TREATMENTS</h2>
                <span style={props} className="title_underline"></span>
                <br />
                <h3 style={props}>
                  <center>
                    Each facial is
                    <br />
                    customized
                    <br />
                    to fit your specific
                    <br />
                    skincare needs.
                  </center>
                </h3>
              </>
            )}
          </Spring>
        ) : null}
      </header>
      <Calm />
      <Clarify />
    </div>
  );
};

export default TreatmentsPage1;
