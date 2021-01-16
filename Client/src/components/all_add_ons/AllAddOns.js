import React, { useMemo, useRef } from "react";
import { Spring } from "react-spring/renderprops";
import { useInView } from "react-intersection-observer";
import "./AllAddOns.css";
import { Suspense } from "react";

const AllAddOns = React.forwardRef((props, ref) => {
  const {
    AddOnsRef,
    name,
    initialScreenSize,
    currentScreenSize,
    resetAllCartStatesExceptTreatments,
  } = props;

  const addOnsHeaderRef = useRef(null);

  // Lazy-loaded Add-Ons
  const ExtraExtractions = useMemo(
    () =>
      React.lazy(() => import("../add_ons/ExtraExtractions/ExraExtractions")),
    []
  );
  const HydroJellyMask = useMemo(
    () => React.lazy(() => import("../add_ons/HydroJellyMask/HydroJellyMask")),
    []
  );
  const LEDTherapy = useMemo(
    () => React.lazy(() => import("../add_ons/LEDTherapy/LEDTherapy")),
    []
  );
  const Microcurrent = useMemo(
    () => React.lazy(() => import("../add_ons/Microcurrent/Microcurrent")),
    []
  );
  const Microdermabrasion = useMemo(
    () =>
      React.lazy(() =>
        import("../add_ons/Microdermabrasion/Microdermabrasion")
      ),
    []
  );
  const Dermarolling = useMemo(
    () => React.lazy(() => import("../add_ons/Dermarolling/Dermarolling")),
    []
  );
  const NanoNeedling = useMemo(
    () => React.lazy(() => import("../add_ons/NanoNeedling/NanoNeedling")),
    []
  );
  const GuaSha = useMemo(
    () => React.lazy(() => import("../add_ons/GuaSha/GuaSha")),
    []
  );
  const Beard = useMemo(
    () => React.lazy(() => import("../add_ons/Beard/Beard")),
    []
  );

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
      <Suspense fallback={<></>}>
        <ExtraExtractions
          initialScreenSize={initialScreenSize}
          currentScreenSize={currentScreenSize}
          resetAllCartStatesExceptTreatments={
            resetAllCartStatesExceptTreatments
          }
        />
      </Suspense>
      <Suspense fallback={<></>}>
        <HydroJellyMask
          initialScreenSize={initialScreenSize}
          currentScreenSize={currentScreenSize}
          resetAllCartStatesExceptTreatments={
            resetAllCartStatesExceptTreatments
          }
        />
      </Suspense>
      <Suspense fallback={<></>}>
        <LEDTherapy
          initialScreenSize={initialScreenSize}
          currentScreenSize={currentScreenSize}
          resetAllCartStatesExceptTreatments={
            resetAllCartStatesExceptTreatments
          }
        />
      </Suspense>
      <Suspense fallback={<></>}>
        <Microcurrent
          initialScreenSize={initialScreenSize}
          currentScreenSize={currentScreenSize}
          resetAllCartStatesExceptTreatments={
            resetAllCartStatesExceptTreatments
          }
        />
      </Suspense>
      <Suspense fallback={<></>}>
        <Microdermabrasion
          initialScreenSize={initialScreenSize}
          currentScreenSize={currentScreenSize}
          resetAllCartStatesExceptTreatments={
            resetAllCartStatesExceptTreatments
          }
        />
      </Suspense>
      <Suspense fallback={<></>}>
        <Dermarolling
          initialScreenSize={initialScreenSize}
          currentScreenSize={currentScreenSize}
          resetAllCartStatesExceptTreatments={
            resetAllCartStatesExceptTreatments
          }
        />
      </Suspense>
      <Suspense fallback={<></>}>
        <NanoNeedling
          initialScreenSize={initialScreenSize}
          currentScreenSize={currentScreenSize}
          resetAllCartStatesExceptTreatments={
            resetAllCartStatesExceptTreatments
          }
        />
      </Suspense>
      <Suspense fallback={<></>}>
        <GuaSha
          initialScreenSize={initialScreenSize}
          currentScreenSize={currentScreenSize}
          resetAllCartStatesExceptTreatments={
            resetAllCartStatesExceptTreatments
          }
        />
      </Suspense>
      <Suspense fallback={<></>}>
        <Beard
          initialScreenSize={initialScreenSize}
          currentScreenSize={currentScreenSize}
          resetAllCartStatesExceptTreatments={
            resetAllCartStatesExceptTreatments
          }
        />
      </Suspense>
    </div>
  );
});

export default AllAddOns;
