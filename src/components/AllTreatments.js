import React from "react";
import Calm from "./treatments/Calm/Calm";
import Clarify from "./treatments/Clarify/Clarify";
import Bacial from "./treatments/Bacial/Bacial";
import Glow from "./treatments/Glow/Glow";
import Rejuvenate from "./treatments/Rejuvenate/Rejuvenate";
import Quench from "./treatments/Quench/Quench";
import SaltCave from "./treatments/SaltCave/SaltCave";
import ChemicalPeel from "./treatments/ChemicalPeel/ChemicalPeel";
import Dermaplaning from "./treatments/Dermaplaning/Dermaplaning";
import CBD from "./treatments/CBD/CBD";
import Microneedle from "./treatments/Microneedle/Microneedle";
import JetHydroPeel from "./treatments/JetHydroPeel/JetHydroPeel";
import "./AllTreatments.css";
import { Spring } from "react-spring/renderprops";
import { useInView } from "react-intersection-observer";
import composeRefs from "@seznam/compose-react-refs";

const AllTreatments = React.forwardRef((props, ref) => {
  const {
    currentScreenSize,
    initialScreenSize,
    treatmentsPageIsVisibleFunction,
    treatmentsPageIsNotVisibleFunction,
    treatmentsPageInView,
    Treatments1Ref,
    resetAllCartStates,
  } = props;

  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: initialScreenSize >= 1200 ? 0.7 : 0.2,
  });

  const [multipleTriggerInViewRef, Treatments1InView] = useInView({
    triggerOnce: false,
    threshold: !currentScreenSize
      ? initialScreenSize >= 1200
        ? 0.7
        : 0.4
      : currentScreenSize >= 1200
      ? 0.7
      : 0.4,
  });

  return (
    <>
      <div
        className="all_treatments_container"
        ref={composeRefs(Treatments1Ref, multipleTriggerInViewRef)}
      >
        <header className="all_treatments_header" ref={inViewRef}>
          {inView ? (
            <Spring
              from={{
                position: "relative",
                opacity: 0,
                width_large_desktop: "0%",
                width_desktop: "0%",
                width_tablet: "0%",
                width_landscape: "0%",
                width_mobile: "0%",
                width_mobile_small: "0%",
                width_mobile_tiny: "0%",
              }}
              to={{
                position: "relative",
                opacity: 1,
                width_large_desktop: "25%",
                width_desktop: "24%",
                width_tablet: "40%",
                width_landscape: "28%",
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
                        currentScreenSize === ""
                          ? initialScreenSize >= 1800
                            ? `${styles.width_large_desktop}`
                            : initialScreenSize >= 1200
                            ? `${styles.width_desktop}`
                            : initialScreenSize >= 768
                            ? `${styles.width_tablet}`
                            : initialScreenSize >= 600
                            ? `${styles.width_landscape}`
                            : initialScreenSize >= 410
                            ? `${styles.width_mobile}`
                            : initialScreenSize >= 360
                            ? `${styles.width_mobile_small}`
                            : `${styles.width_mobile_tiny}`
                          : currentScreenSize >= 1800
                          ? `${styles.width_large_desktop}`
                          : currentScreenSize >= 1200
                          ? `${styles.width_desktop}`
                          : currentScreenSize >= 768
                          ? `${styles.width_tablet}`
                          : currentScreenSize >= 600
                          ? `${styles.width_landscape}`
                          : currentScreenSize >= 410
                          ? `${styles.width_mobile}`
                          : currentScreenSize >= 360
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
          initialScreenSize={initialScreenSize}
          currentScreenSize={currentScreenSize}
          resetAllCartStates={resetAllCartStates}
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
