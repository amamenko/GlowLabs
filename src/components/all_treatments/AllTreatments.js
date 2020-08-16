import React, { useRef, useState } from "react";
import Calm from "../treatments/Calm/Calm";
import Clarify from "../treatments/Clarify/Clarify";
import Bacial from "../treatments/Bacial/Bacial";
import Glow from "../treatments/Glow/Glow";
import Rejuvenate from "../treatments/Rejuvenate/Rejuvenate";
import Quench from "../treatments/Quench/Quench";
import SaltCave from "../treatments/SaltCave/SaltCave";
import ChemicalPeel from "../treatments/ChemicalPeel/ChemicalPeel";
import Dermaplaning from "../treatments/Dermaplaning/Dermaplaning";
import CBD from "../treatments/CBD/CBD";
import Microneedle from "../treatments/Microneedle/Microneedle";
import JetHydroPeel from "../treatments/JetHydroPeel/JetHydroPeel";
import { Spring } from "react-spring/renderprops";
import { useInView } from "react-intersection-observer";
import composeRefs from "@seznam/compose-react-refs";
import "./AllTreatments.css";

const AllTreatments = React.forwardRef((props, ref) => {
  const {
    currentScreenSize,
    initialScreenSize,
    Treatments1Ref,
    resetAllCartStates,
  } = props;

  const headlineRef = useRef(null);

  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: initialScreenSize >= 1200 ? 0.7 : 0.2,
  });

  const [pageRendered, changePageRendered] = useState(false);

  return (
    <>
      <div
        className="all_treatments_container"
        id={props.name}
        ref={Treatments1Ref}
      >
        <header className="all_treatments_header" ref={inViewRef}>
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
                    YOUR FACIAL
                  </h2>
                  <span
                    style={{
                      position: `${styles.position}`,
                      opacity: `${styles.opacity}`,
                      width: `${styles.width}`,
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
          initialScreenSize={initialScreenSize}
          currentScreenSize={currentScreenSize}
          resetAllCartStates={resetAllCartStates}
          scrollValue={props.scrollValue}
        />
        <Clarify
          initialScreenSize={initialScreenSize}
          currentScreenSize={currentScreenSize}
          resetAllCartStates={resetAllCartStates}
        />
        <Bacial
          initialScreenSize={initialScreenSize}
          currentScreenSize={currentScreenSize}
          resetAllCartStates={resetAllCartStates}
        />
        <Glow
          initialScreenSize={initialScreenSize}
          currentScreenSize={currentScreenSize}
          resetAllCartStates={resetAllCartStates}
        />
        <Rejuvenate
          initialScreenSize={initialScreenSize}
          currentScreenSize={currentScreenSize}
          resetAllCartStates={resetAllCartStates}
        />
        <Quench
          initialScreenSize={initialScreenSize}
          currentScreenSize={currentScreenSize}
          resetAllCartStates={resetAllCartStates}
        />
        <SaltCave
          initialScreenSize={initialScreenSize}
          currentScreenSize={currentScreenSize}
          resetAllCartStates={resetAllCartStates}
        />
        <ChemicalPeel
          initialScreenSize={initialScreenSize}
          currentScreenSize={currentScreenSize}
          resetAllCartStates={resetAllCartStates}
        />
        <Dermaplaning
          initialScreenSize={initialScreenSize}
          currentScreenSize={currentScreenSize}
          resetAllCartStates={resetAllCartStates}
        />
        <CBD
          initialScreenSize={initialScreenSize}
          currentScreenSize={currentScreenSize}
          resetAllCartStates={resetAllCartStates}
        />
        <Microneedle
          initialScreenSize={initialScreenSize}
          currentScreenSize={currentScreenSize}
          resetAllCartStates={resetAllCartStates}
        />
        <JetHydroPeel
          initialScreenSize={initialScreenSize}
          currentScreenSize={currentScreenSize}
        />
      </div>
    </>
  );
});

export default AllTreatments;
