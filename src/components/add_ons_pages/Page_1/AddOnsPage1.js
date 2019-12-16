import React from "react";
import { Spring } from "react-spring/renderprops";
import { useInView } from "react-intersection-observer";
import ExtraExtractions from "../../add_ons/ExtraExtractions/ExraExtractions";
import HydroJellyMask from "../../add_ons/HydroJellyMask/HydroJellyMask";
import "./AddOnsPage1.css";

const AddOnsPage1 = props => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });
  return (
    <div className="add_ons_page_1_container">
      <header className="add_ons_page_1_header" ref={ref}>
        {inView ? (
          <Spring
            from={{ position: "relative", opacity: 0 }}
            to={{ position: "relative", opacity: 1 }}
            config={{ duration: 1000 }}
          >
            {props => (
              <>
                <h2 style={props}>OUR ADD-ONS</h2>
                <span style={props} className="title_underline"></span>
                <br />
                <h3 style={props}>
                  <center>
                    Complement your
                    <br />
                    facial with any
                    <br />
                    of these extra
                    <br />
                    special treatments.
                  </center>
                </h3>
              </>
            )}
          </Spring>
        ) : null}
      </header>
      <ExtraExtractions />
      <HydroJellyMask />
    </div>
  );
};

export default AddOnsPage1;
