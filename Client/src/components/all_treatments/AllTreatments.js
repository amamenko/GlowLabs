import React, { useRef } from "react";
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
import { ToastContainer } from "react-toastify";
import "./AllTreatments.css";
import ToastifyCSSImport from "./ToastifyCSSImport";
import { Suspense } from "react";

const AllTreatments = React.forwardRef((props, ref) => {
  const {
    currentScreenSize,
    initialScreenSize,
    Treatments1Ref,
    resetAllCartStates,
    name,
  } = props;

  const treatmentsHeaderRef = useRef(null);

  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: initialScreenSize >= 1200 ? 0.7 : 0.2,
  });

  return (
    <div className="all_treatments_container" id={name} ref={Treatments1Ref}>
      <ToastContainer
        toastClassName="toast_container"
        position={
          !currentScreenSize
            ? initialScreenSize >= 768
              ? !window.matchMedia("(orientation: landscape)").matches
                ? "bottom-center"
                : "bottom-right"
              : "bottom-right"
            : currentScreenSize >= 768
            ? !window.matchMedia("(orientation: landscape)").matches
              ? "bottom-center"
              : "bottom-right"
            : "bottom-right"
        }
        autoClose={3000}
        newestOnTop={false}
        hideProgressBar
        closeOnClick
        pauseOnVisibilityChange
        draggable={true}
        draggablePercent={20}
      />
      <header className="all_treatments_header" ref={inViewRef}>
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
                <Suspense fallback={<></>}>
                  <ToastifyCSSImport />
                </Suspense>
                <h2
                  style={{
                    position: `${styles.position}`,
                    opacity: `${styles.opacity}`,
                  }}
                  ref={treatmentsHeaderRef}
                >
                  YOUR FACIAL
                </h2>
                <span
                  style={{
                    position: `${styles.position}`,
                    opacity: `${styles.opacity}`,
                    width: treatmentsHeaderRef.current
                      ? treatmentsHeaderRef.current.clientWidth + "px"
                      : "0px",
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
  );
});

export default AllTreatments;
