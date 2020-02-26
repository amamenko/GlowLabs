import React, { useState, useEffect, useCallback } from "react";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from "body-scroll-lock";
import { useSelector, useDispatch } from "react-redux";
import { Spring, Transition } from "react-spring/renderprops";
import SplashScreen from "./SplashScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./LandingPage.css";
import TopAnimationTopShelf from "./TopAnimationTopShelf";
import TopAnimationBottomShelf from "./TopAnimationBottomShelf";
import PottedPlant from "./TopShelf/PottedPlant";
import HandCream from "./TopShelf/HandCream";
import Cream from "./TopShelf/Cream";
import SmallPlant from "./TopShelf/SmallPlant";
import Mirror from "./BottomShelf/Mirror";
import Bottle from "./BottomShelf/Bottle";
import Qtips from "./BottomShelf/Qtips";
import Sunscreen from "./BottomShelf/Sunscreen";
import ACTION_BODY_SCROLL_ALLOW from "../../actions/Body_Scroll/ACTION_BODY_SCROLL_ALLOW";
import ACTION_USER_SCROLLED from "../../actions/Scroll/ACTION_USER_SCROLLED";
import ACTION_USER_SCROLLED_RESET from "../../actions/Scroll/ACTION_USER_SCROLLED_RESET";
import ACTION_SPLASH_SCREEN_COMPLETE from "../../actions/SplashScreenComplete/ACTION_SPLASH_SCREEN_COMPLETE";

const LandingPage = React.forwardRef((props, ref) => {
  const { Treatments1Ref, LandingPageRef } = ref;
  const [lineRenderScroll, setLineRenderScroll] = useState(false);
  const navbarToggle = useSelector(state => state.navbarToggle.toggle);
  const bodyScrollToggle = useSelector(
    state => state.bodyScrollToggle.overflow
  );
  const scroll = useSelector(state => state.scrollToggle.scroll);
  const cartIsActive = useSelector(state => state.cartIsActive.cartIsActive);
  const splashScreenComplete = useSelector(
    state => state.splashScreenComplete.splashScreenComplete
  );

  const dispatch = useDispatch();

  const [isSafari, changeIsSafari] = useState(false);

  useEffect(() => {
    if (navigator.vendor === "Apple Computer, Inc.") {
      changeIsSafari(true);
    } else {
      changeIsSafari(false);
    }
  }, [changeIsSafari]);

  const changeScroll = useCallback(() => {
    const userScroll =
      props.currentScreenSize === ""
        ? props.initialScreenSize >= 600
          ? window.scrollY < 50
          : window.scrollY < 345
        : props.currentScreenSize >= 600
        ? window.scrollY < 50
        : window.scrollY < 345;
    const userLineRenderScroll = window.scrollY < 40;

    if (!userScroll) {
      dispatch(ACTION_USER_SCROLLED());
    } else {
      dispatch(ACTION_USER_SCROLLED_RESET());
    }

    if (!userLineRenderScroll) {
      setLineRenderScroll(true);
    } else {
      setLineRenderScroll(false);
    }
  }, [
    dispatch,
    setLineRenderScroll,
    props.currentScreenSize,
    props.initialScreenSize
  ]);

  useEffect(() => {
    const preventScroll = e => e.preventDefault();

    if (bodyScrollToggle === "visible") {
      document.body.classList.remove("no_scroll");
      document.body.classList.add("scroll_reset");
    } else if (bodyScrollToggle === "hidden") {
      document.body.classList.remove("scroll_reset");
      document.body.classList.add("no_scroll");

      // Required for iOS Landscape Scroll Disabling During Splash Screen
      if (!splashScreenComplete) {
        if (LandingPageRef) {
          console.log("wow holy wow");
          LandingPageRef.current.addEventListener(
            "touchmove",
            preventScroll,
            false
          );
          setTimeout(
            () =>
              LandingPageRef.current.removeEventListener(
                "touchmove",
                preventScroll,
                false
              ),
            props.initialScreenSize >= 600 ? 5300 : 4000
          );
        }
      }
    }
  }, [
    bodyScrollToggle,
    LandingPageRef,
    props.initialScreenSize,
    splashScreenComplete
  ]);

  useEffect(() => {
    document.addEventListener("scroll", changeScroll);
    return () => {
      document.removeEventListener("scroll", changeScroll);
    };
  }, [scroll, changeScroll]);

  useEffect(() => {
    const LandingPageRefTargetElement = LandingPageRef.current;

    if (!splashScreenComplete) {
      const handleDisableScroll = el => {
        disableBodyScroll({ targetElement: el });
      };

      handleDisableScroll(LandingPageRefTargetElement);
    } else {
      if (!cartIsActive) {
        const handleEnableScroll = el => {
          if (splashScreenComplete && !cartIsActive) {
            enableBodyScroll({ targetElement: el });
          }
        };

        handleEnableScroll(LandingPageRefTargetElement);
      }
    }

    if (!splashScreenComplete) {
      let bodyScrollTimer = setTimeout(
        () => {
          dispatch(ACTION_BODY_SCROLL_ALLOW());
          dispatch(ACTION_SPLASH_SCREEN_COMPLETE());
        },
        props.initialScreenSize >= 600 ? 5300 : 4000
      );

      return () => {
        clearAllBodyScrollLocks();
        clearTimeout(bodyScrollTimer);
      };
    }
  }, [
    dispatch,
    props.initialScreenSize,
    LandingPageRef,
    splashScreenComplete,
    cartIsActive
  ]);

  // For iOS Rubberbanding Effect on Navbar / Footer
  const portraitOverscroll = () => {
    if (!cartIsActive) {
      if (window.scrollY <= 50) {
        document.body.style.setProperty("background", "rgb(255, 198, 207)");
      } else if (window.scrollY >= 7100) {
        document.body.style.setProperty("background", "rgb(215, 156, 165)");
      } else {
        document.body.style.setProperty("background", "rgb(255, 255, 255)");
      }
    }
  };

  props.currentScreenSize === ""
    ? props.initialScreenSize <= 600
      ? portraitOverscroll()
      : document.body.style.setProperty("background", "rgb(255, 255, 255)")
    : props.currentScreenSize <= 600
    ? portraitOverscroll()
    : document.body.style.setProperty("background", "rgb(255, 255, 255)");

  return (
    <div className="landing_page_container" ref={LandingPageRef}>
      <section className="main_content">
        <div
          className="landing_page_drawing"
          style={{
            zIndex:
              props.currentScreenSize === ""
                ? props.initialScreenSize <= 1000 &&
                  props.initialScreenSize >= 600
                  ? window.scrollY <= 1
                    ? navbarToggle
                      ? "1"
                      : "500"
                    : "1"
                  : "1"
                : props.currentScreenSize <= 1000 &&
                  props.currentScreenSize >= 600
                ? window.scrollY <= 1
                  ? navbarToggle
                    ? "1"
                    : "500"
                  : "1"
                : "1"
          }}
        >
          <PottedPlant initialScreenSize={props.initialScreenSize} />
          <SmallPlant initialScreenSize={props.initialScreenSize} />
          <Cream initialScreenSize={props.initialScreenSize} />
          <HandCream initialScreenSize={props.initialScreenSize} />
          <TopAnimationTopShelf
            currentScreenSize={props.currentScreenSize}
            initialScreenSize={props.initialScreenSize}
            isSafari={isSafari}
          />
          <Mirror initialScreenSize={props.initialScreenSize} />
          <Bottle initialScreenSize={props.initialScreenSize} />
          <Qtips initialScreenSize={props.initialScreenSize} />
          <Sunscreen initialScreenSize={props.initialScreenSize} />
          <TopAnimationBottomShelf
            currentScreenSize={props.currentScreenSize}
            initialScreenSize={props.initialScreenSize}
            isSafari={isSafari}
          />
        </div>
        <Spring
          from={{
            top: props.initialScreenSize >= 600 ? "0%" : "100%",
            right: props.initialScreenSize >= 600 ? "100%" : "0%"
          }}
          to={{
            top: props.initialScreenSize >= 600 ? "0%" : "50%",
            right: props.initialScreenSize >= 600 ? "50%" : "0%"
          }}
          config={{
            delay: props.initialScreenSize >= 600 ? 3000 : 2000,
            duration: 2000
          }}
        >
          {styles => (
            <div
              className="bottom_content"
              style={{
                top:
                  props.currentScreenSize === ""
                    ? `${styles.top}`
                    : props.currentScreenSize >= 600
                    ? "0%"
                    : "50%",
                right:
                  props.currentScreenSize === ""
                    ? `${styles.right}`
                    : props.currentScreenSize >= 600
                    ? "50%"
                    : "0%"
              }}
            >
              <Spring
                from={{ opacity: 0 }}
                to={{ opacity: 1 }}
                config={{
                  delay: props.initialScreenSize >= 600 ? 5000 : 4000,
                  duration: 500
                }}
              >
                {styleprops => (
                  <div
                    className="landing_page_text_block"
                    style={{
                      zIndex:
                        props.currentScreenSize === ""
                          ? props.initialScreenSize <= 1000 &&
                            props.initialScreenSize >= 600
                            ? window.scrollY <= 2
                              ? navbarToggle
                                ? "1"
                                : "500"
                              : "1"
                            : "1"
                          : props.currentScreenSize <= 1000 &&
                            props.currentScreenSize >= 600
                          ? window.scrollY <= 2
                            ? navbarToggle
                              ? "1"
                              : "500"
                            : "1"
                          : "1"
                    }}
                  >
                    <h1 style={{ opacity: `${styleprops.opacity}` }}>
                      Customized skin care,
                      <br /> down to a science.
                    </h1>
                    <p
                      className="landing_page_description"
                      style={{ opacity: `${styleprops.opacity}` }}
                    >
                      We've reimagined the traditional idea of a facial so that
                      we can do the thinking for you. Lay back, relax, and
                      listen to that Peruvian pan flute music. We'll figure out
                      the rest.
                    </p>
                    <div className="call_to_action_buttons_container">
                      <div
                        className="call_to_action_button"
                        style={{ opacity: `${styleprops.opacity}` }}
                      >
                        <p
                          onClick={() =>
                            props.handleClickToScrollToTreatments(
                              Treatments1Ref
                            )
                          }
                        >
                          GET STARTED NOW
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        opacity: `${styleprops.opacity}`,
                        marginTop: lineRenderScroll
                          ? CSS.supports(`(-webkit-overflow-scrolling: touch)`)
                            ? "8rem"
                            : "8rem"
                          : CSS.supports(`(-webkit-overflow-scrolling: touch)`)
                          ? "8rem"
                          : "1.5rem"
                      }}
                      className="landing_page_cta"
                      onClick={() =>
                        props.handleClickToScrollToTreatments(Treatments1Ref)
                      }
                    >
                      <Transition
                        items={lineRenderScroll}
                        from={{
                          opacity: 0,
                          height: "0vh",
                          config: { duration: 100 }
                        }}
                        enter={{
                          opacity: 1,
                          height: "16vh",
                          config: { duration: 100 }
                        }}
                        leave={{
                          opacity: 0,
                          height: "0vh",
                          config: { duration: 100 }
                        }}
                      >
                        {lineRenderScroll =>
                          lineRenderScroll &&
                          (rendered => (
                            <span
                              style={{
                                opacity: `${rendered.opacity}`,
                                height: `${rendered.height}`
                              }}
                              className="cta_line"
                            />
                          ))
                        }
                      </Transition>
                      <FontAwesomeIcon
                        className="landing_page_bottom_icon"
                        icon={faChevronDown}
                      />
                    </div>
                  </div>
                )}
              </Spring>
            </div>
          )}
        </Spring>
        <div className="splash_screen">
          <SplashScreen />
        </div>
      </section>
    </div>
  );
});

export default LandingPage;
