import React, { useState, useEffect, useCallback } from "react";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
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
import ACTION_SPLASH_SCREEN_HALFWAY from "../../actions/SplashScreenHalfway/ACTION_SPLASH_SCREEN_HALFWAY";
import ACTION_TOUCH_SCALING_ACTIVE from "../../actions/FingerTouchScaling/ACTION_TOUCH_SCALING_ACTIVE";
import ACTION_TOUCH_SCALING_RESET from "../../actions/FingerTouchScaling/ACTION_TOUCH_SCALING_RESET";
import ACTION_LOGIN_IS_NOT_ACTIVE from "../../actions/Login/ACTION_LOGIN_IS_NOT_ACTIVE";
import { useLocation } from "react-router-dom";

const LandingPage = React.forwardRef((props, ref) => {
  const { Treatments1Ref, LandingPageRef } = ref;
  const [lineRenderScroll, setLineRenderScroll] = useState(false);
  const [twoFingerTouch, changeTwoFingerTouch] = useState(false);

  const location = useLocation();

  const navbarToggle = useSelector((state) => state.navbarToggle.toggle);
  const bodyScrollToggle = useSelector(
    (state) => state.bodyScrollToggle.overflow
  );
  const scroll = useSelector((state) => state.scrollToggle.scroll);
  const cartIsActive = useSelector((state) => state.cartIsActive.cartIsActive);
  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );
  const splashScreenHalfway = useSelector(
    (state) => state.splashScreenHalfway.splashScreenHalfway
  );
  const touchScaling = useSelector(
    (state) => state.fingerTouchScaling.touch_scaling
  );
  const finalBookingModal = useSelector(
    (state) => state.finalBookingModal.final_booking_modal
  );

  // For comparison after splash screen halfway point
  const [
    currentOrientationSnapshot,
    changeCurrentOrientationSnapshot,
  ] = useState(null);

  const dispatch = useDispatch();

  const [isSafari, changeIsSafari] = useState(false);

  const handleSplashScreenHalfway = useCallback(
    (el) => {
      if (
        Number(el.top.substr(0, 3)) === 100 ||
        Number(el.right.substr(0, 3)) === 100
      ) {
        changeCurrentOrientationSnapshot(props.currentScreenSize);
      } else {
        if (!splashScreenHalfway) {
          dispatch(ACTION_SPLASH_SCREEN_HALFWAY());
        } else {
          if (currentOrientationSnapshot !== props.currentScreenSize) {
            dispatch(ACTION_SPLASH_SCREEN_COMPLETE());
            dispatch(ACTION_BODY_SCROLL_ALLOW());
          }
        }
      }
    },
    [
      dispatch,
      props.currentScreenSize,
      splashScreenHalfway,
      currentOrientationSnapshot,
    ]
  );

  useEffect(() => {
    dispatch(ACTION_LOGIN_IS_NOT_ACTIVE());
  }, [dispatch]);

  useEffect(() => {
    if (splashScreenHalfway) {
      if (props.initialScreenSize >= 600) {
        if (currentOrientationSnapshot !== props.currentScreenSize) {
          dispatch(ACTION_SPLASH_SCREEN_COMPLETE());
          dispatch(ACTION_BODY_SCROLL_ALLOW());
        }
      }
    }
  }, [
    currentOrientationSnapshot,
    props.currentScreenSize,
    props.initialScreenSize,
    splashScreenHalfway,
    dispatch,
  ]);

  useEffect(() => {
    if (navigator.vendor === "Apple Computer, Inc.") {
      changeIsSafari(true);
    } else {
      changeIsSafari(false);
    }
  }, [changeIsSafari]);

  const changeScroll = useCallback(() => {
    const userScroll = !props.currentScreenSize
      ? props.initialScreenSize >= 600
        ? window.scrollY < 50
        : window.scrollY < 345
      : props.currentScreenSize >= 600
      ? window.scrollY < 50
      : window.scrollY < 345;
    const userLineRenderScroll = window.scrollY < 80;

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
    props.initialScreenSize,
  ]);

  useEffect(() => {
    const preventScroll = (e) => e.preventDefault();

    if (bodyScrollToggle === "visible") {
      document.body.classList.remove("no_scroll");
      if (!navbarToggle) {
        document.body.classList.remove("no_scroll_no_fixed");
      }
      document.body.classList.add("scroll_reset");
    } else if (bodyScrollToggle === "hidden") {
      document.body.classList.remove("scroll_reset");
      if (navbarToggle) {
        document.body.classList.add("no_scroll_no_fixed");
      } else {
        document.body.classList.add("no_scroll");
      }

      // Required for iOS Landscape Scroll Disabling During Splash Screen
      if (!splashScreenComplete) {
        if (LandingPageRef) {
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
    splashScreenComplete,
    props.initialScreenSize,
    props.currentScreenSize,
    navbarToggle,
    cartIsActive,
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
      const handleDisableScroll = (el) => {
        disableBodyScroll({ targetElement: el });
      };

      handleDisableScroll(LandingPageRefTargetElement);
    } else {
      if (!cartIsActive) {
        const handleEnableScroll = (el) => {
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
        !props.currentScreenSize
          ? props.initialScreenSize >= 600
            ? 5300
            : 4400
          : props.initialScreenSize >= 600
          ? props.currentScreenSize >= 600
            ? 5300
            : 4400
          : props.currentScreenSize >= 600
          ? 3000
          : 4400
      );

      return () => {
        clearAllBodyScrollLocks();
        clearTimeout(bodyScrollTimer);
      };
    } else {
      clearAllBodyScrollLocks();
    }
  }, [
    dispatch,
    props.initialScreenSize,
    props.currentScreenSize,
    LandingPageRef,
    splashScreenComplete,
    cartIsActive,
  ]);

  // For iOS Rubberbanding Effect on Navbar / Footer
  const portraitOverscroll = () => {
    if (!cartIsActive) {
      if (
        location.pathname.includes("account") ||
        location.pathname.includes("admin")
      ) {
        document.body.style.setProperty("background", "rgb(255, 255, 255)");
      } else {
        if (window.scrollY <= 50) {
          document.body.style.setProperty("background", "rgb(44, 44, 52)");
        } else if (window.scrollY >= 8250) {
          document.body.style.setProperty("background", "rgb(0, 129, 177)");
        } else {
          document.body.style.setProperty("background", "rgb(255, 255, 255)");
        }
      }
    } else {
      document.body.style.setProperty("background", "rgb(255, 255, 255)");
    }
  };

  props.currentScreenSize === ""
    ? props.initialScreenSize <= 600
      ? portraitOverscroll()
      : document.body.style.setProperty("background", "rgb(255, 255, 255)")
    : props.currentScreenSize <= 600
    ? portraitOverscroll()
    : document.body.style.setProperty("background", "rgb(255, 255, 255)");

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      if (!twoFingerTouch) {
        changeTwoFingerTouch(true);
      }
    }
  };

  const handleTouchMove = () => {
    if (twoFingerTouch) {
      if (!touchScaling) {
        dispatch(ACTION_TOUCH_SCALING_ACTIVE());
      }
    }
  };

  const handleTouchEnd = () => {
    if (twoFingerTouch) {
      changeTwoFingerTouch(false);
      if (touchScaling) {
        dispatch(ACTION_TOUCH_SCALING_RESET());
      }
    }
  };

  return (
    <div
      className="landing_page_container"
      ref={LandingPageRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        background: splashScreenHalfway
          ? "rgb(224, 224, 232)"
          : "rgb(44, 44, 52)",
        transition: "background 2s ease-out",
        zIndex: finalBookingModal ? -1 : "auto",
      }}
    >
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
                : "1",
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
            top: !props.currentScreenSize
              ? "100%"
              : // Detect portrait mode or landscape
              props.initialScreenSize >= 550 &&
                props.initialScreenSize > props.initialScreenHeight
              ? props.currentScreenSize >= 550 &&
                props.currentScreenSize > props.currentScreenHeight
                ? "0%"
                : "100%"
              : props.currentScreenSize >= 550 &&
                props.currentScreenSize > props.currentScreenHeight
              ? "0%"
              : "0%",
            right: !props.currentScreenSize
              ? "100%"
              : props.initialScreenSize >= 550 &&
                props.initialScreenSize > props.initialScreenHeight
              ? props.currentScreenSize >= 550 &&
                props.currentScreenSize > props.currentScreenHeight
                ? "100%"
                : "0%"
              : props.currentScreenSize >= 550 &&
                props.currentScreenSize > props.currentScreenHeight
              ? "100%"
              : "0%",
          }}
          to={{
            top: !props.currentScreenSize
              ? props.initialScreenSize >= 550 &&
                props.initialScreenSize > props.initialScreenHeight
                ? "0%"
                : "50%"
              : props.initialScreenSize >= 550 &&
                props.initialScreenSize > props.initialScreenHeight
              ? props.currentScreenSize >= 550 &&
                props.currentScreenSize > props.currentScreenHeight
                ? "0%"
                : "50%"
              : props.currentScreenSize >= 550 &&
                props.currentScreenSize > props.currentScreenHeight
              ? "0%"
              : "50%",
            right: !props.currentScreenSize
              ? props.initialScreenSize >= 550 &&
                props.initialScreenSize > props.initialScreenHeight
                ? "50%"
                : "0%"
              : props.initialScreenSize >= 550 &&
                props.initialScreenSize > props.initialScreenHeight
              ? props.currentScreenSize >= 550 &&
                props.currentScreenSize > props.currentScreenHeight
                ? "50%"
                : "0%"
              : props.currentScreenSize >= 550 &&
                props.currentScreenSize > props.currentScreenHeight
              ? "50%"
              : "0%",
          }}
          onFrame={(el) => handleSplashScreenHalfway(el)}
          config={{
            delay: !props.currentScreenSize
              ? props.initialScreenSize >= 550
                ? 3000
                : 2000
              : props.currentScreenSize >= 550
              ? 500
              : 2000,
            duration: 2000,
          }}
        >
          {(styles) => (
            <div
              className="bottom_content"
              style={{
                top: splashScreenComplete
                  ? !props.currentScreenSize
                    ? props.initialScreenSize >= 550 &&
                      props.initialScreenSize > props.initialScreenHeight
                      ? "0%"
                      : "50%"
                    : props.currentScreenSize >= 550 &&
                      props.currentScreenSize > props.currentScreenHeight
                    ? "0%"
                    : "50%"
                  : !props.currentScreenSize
                  ? props.initialScreenSize >= 550 &&
                    props.initialScreenSize > props.initialScreenHeight
                    ? "0%"
                    : `${styles.top}`
                  : props.initialScreenSize >= 550 &&
                    props.initialScreenSize > props.initialScreenHeight
                  ? props.currentScreenSize >= 550 &&
                    props.currentScreenSize > props.currentScreenHeight
                    ? "0%"
                    : `${styles.top}`
                  : props.currentScreenSize >= 550 &&
                    props.currentScreenSize > props.currentScreenHeight
                  ? "0%"
                  : `${styles.top}`,
                right: splashScreenComplete
                  ? !props.currentScreenSize
                    ? props.initialScreenSize >= 550 &&
                      props.initialScreenSize > props.initialScreenHeight
                      ? "50%"
                      : "0%"
                    : props.currentScreenSize >= 550 &&
                      props.currentScreenSize > props.currentScreenHeight
                    ? "50%"
                    : "0%"
                  : !props.currentScreenSize
                  ? props.initialScreenSize >= 550 &&
                    props.initialScreenSize > props.initialScreenHeight
                    ? `${styles.right}`
                    : "0%"
                  : props.initialScreenSize >= 550 &&
                    props.initialScreenSize > props.initialScreenHeight
                  ? props.currentScreenSize >= 550 &&
                    props.currentScreenSize > props.currentScreenHeight
                    ? `${styles.right}`
                    : "0%"
                  : props.currentScreenSize >= 550 &&
                    props.currentScreenSize > props.currentScreenHeight
                  ? `${styles.right}`
                  : "0%",
              }}
            >
              <Spring
                from={{ opacity: 0 }}
                to={{ opacity: 1 }}
                config={{
                  delay: !props.currentScreenSize
                    ? props.initialScreenSize >= 550
                      ? 5000
                      : 4000
                    : props.initialScreenSize >= 550
                    ? props.currentScreenSize >= 550
                      ? 5000
                      : 4000
                    : 4000,
                  duration: 500,
                }}
              >
                {(styleprops) => (
                  <div
                    className="landing_page_text_block"
                    style={{
                      zIndex:
                        props.currentScreenSize === ""
                          ? props.initialScreenSize <= 1000 &&
                            props.initialScreenSize >= 550
                            ? window.scrollY <= 2
                              ? navbarToggle
                                ? "1"
                                : "500"
                              : "1"
                            : "1"
                          : props.currentScreenSize <= 1000 &&
                            props.currentScreenSize >= 550
                          ? window.scrollY <= 2
                            ? navbarToggle
                              ? "1"
                              : "500"
                            : "1"
                          : "1",
                    }}
                  >
                    <h1
                      style={{
                        opacity: splashScreenComplete
                          ? "1"
                          : `${styleprops.opacity}`,
                      }}
                    >
                      Customized skin care,
                      <br /> down to a science.
                    </h1>
                    <p
                      className="landing_page_description"
                      style={{
                        opacity: splashScreenComplete
                          ? "1"
                          : `${styleprops.opacity}`,
                      }}
                    >
                      We've reimagined the traditional idea of a facial so that
                      we can do the thinking for you. Lay back, relax, and
                      listen to that Peruvian pan flute music. We'll figure out
                      the rest.
                    </p>
                    <div className="call_to_action_buttons_container">
                      <div
                        className="call_to_action_button"
                        style={{
                          opacity: splashScreenComplete
                            ? "1"
                            : `${styleprops.opacity}`,
                        }}
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
                        opacity: splashScreenComplete
                          ? "1"
                          : `${styleprops.opacity}`,
                        marginTop: lineRenderScroll
                          ? !props.currentScreenSize
                            ? props.initialScreenSize >= 414
                              ? "8rem"
                              : props.initialScreenSize >= 360
                              ? "5.5rem"
                              : "4.5rem"
                            : props.currentScreenSize >= 414
                            ? "8rem"
                            : props.currentScreenSize >= 360
                            ? "5.5rem"
                            : "4.5rem"
                          : CSS.supports(`(-webkit-overflow-scrolling: touch)`)
                          ? !props.currentScreenSize
                            ? props.initialScreenSize >= 414
                              ? "8rem"
                              : props.initialScreenSize >= 360
                              ? "5.5rem"
                              : "4.5rem"
                            : props.currentScreenSize >= 414
                            ? "8rem"
                            : props.currentScreenSize >= 360
                            ? "5.5rem"
                            : "4.5rem"
                          : !props.currentScreenSize
                          ? props.initialScreenSize >= 414
                            ? "1.5rem"
                            : props.initialScreenSize >= 360
                            ? "1.2rem"
                            : "1rem"
                          : props.currentScreenSize >= 414
                          ? "1.5rem"
                          : props.currentScreenSize >= 360
                          ? "1.2rem"
                          : "1rem",
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
                          tiny_portrait_height: "0vh",
                          small_portrait_height: "0vh",
                          portrait_height: "0vh",
                          large_portrait_height: "0vh",
                          config: { duration: 100 },
                        }}
                        enter={{
                          opacity: 1,
                          tiny_portrait_height: "14vh",
                          small_portrait_height: "13vh",
                          portrait_height: "16vh",
                          large_portrait_height: "13vh",
                          config: { duration: 100 },
                        }}
                        leave={{
                          opacity: 0,
                          tiny_portrait_height: "0vh",
                          small_portrait_height: "0vh",
                          portrait_height: "0vh",
                          config: { duration: 100 },
                        }}
                      >
                        {(lineRenderScroll) =>
                          lineRenderScroll &&
                          ((rendered) => (
                            <span
                              style={{
                                opacity: `${rendered.opacity}`,
                                height: !props.currentScreenSize
                                  ? props.initialScreenSize >= 479
                                    ? `${rendered.large_portrait_height}`
                                    : props.initialScreenSize >= 410
                                    ? `${rendered.portrait_height}`
                                    : props.initialScreenSize >= 360
                                    ? `${rendered.small_portrait_height}`
                                    : `${rendered.tiny_portrait_height}`
                                  : props.currentScreenSize >= 479
                                  ? `${rendered.large_portrait_height}`
                                  : props.currentScreenSize >= 410
                                  ? `${rendered.portrait_height}`
                                  : props.currentScreenSize >= 360
                                  ? `${rendered.small_portrait_height}`
                                  : `${rendered.tiny_portrait_height}`,
                              }}
                              className="cta_line"
                            />
                          ))
                        }
                      </Transition>
                      <FontAwesomeIcon
                        className="landing_page_bottom_icon"
                        icon={faChevronDown}
                        style={{
                          marginTop: !props.currentScreenSize
                            ? props.initialScreenSize >= 414
                              ? lineRenderScroll
                                ? isSafari
                                  ? props.initialScreenHeight > 800
                                    ? "1.5rem"
                                    : "-1rem"
                                  : "-0.5rem"
                                : isSafari
                                ? props.initialScreenHeight > 800
                                  ? "-5rem"
                                  : "-6rem"
                                : "0rem"
                              : props.initialScreenSize >= 400
                              ? lineRenderScroll
                                ? "2rem"
                                : "1.5rem"
                              : props.initialScreenSize >= 375
                              ? lineRenderScroll
                                ? CSS.supports(
                                    `(-webkit-overflow-scrolling: touch)`
                                  )
                                  ? "0rem"
                                  : "0.2rem"
                                : CSS.supports(
                                    `(-webkit-overflow-scrolling: touch)`
                                  )
                                ? "-3rem"
                                : "1.5rem"
                              : props.initialScreenSize >= 360
                              ? lineRenderScroll
                                ? "-1rem"
                                : "1.5rem"
                              : props.initialScreenSize >= 300
                              ? lineRenderScroll
                                ? CSS.supports(
                                    `(-webkit-overflow-scrolling: touch)`
                                  )
                                  ? "0rem"
                                  : "0rem"
                                : CSS.supports(
                                    `(-webkit-overflow-scrolling: touch)`
                                  )
                                ? "-3rem"
                                : "1.5rem"
                              : "1rem"
                            : props.currentScreenSize >= 414
                            ? lineRenderScroll
                              ? isSafari
                                ? props.currentScreenHeight > 800
                                  ? "1.5rem"
                                  : "-1rem"
                                : "-0.5rem"
                              : isSafari
                              ? props.currentScreenHeight > 800
                                ? "-5rem"
                                : "-6rem"
                              : "0rem"
                            : props.currentScreenSize >= 400
                            ? lineRenderScroll
                              ? "2rem"
                              : "1.5rem"
                            : props.currentScreenSize >= 375
                            ? lineRenderScroll
                              ? CSS.supports(
                                  `(-webkit-overflow-scrolling: touch)`
                                )
                                ? "0rem"
                                : "0.2rem"
                              : CSS.supports(
                                  `(-webkit-overflow-scrolling: touch)`
                                )
                              ? "-3rem"
                              : "1.5rem"
                            : props.currentScreenSize >= 360
                            ? lineRenderScroll
                              ? "-1rem"
                              : "1.5rem"
                            : props.currentScreenSize >= 300
                            ? lineRenderScroll
                              ? CSS.supports(
                                  `(-webkit-overflow-scrolling: touch)`
                                )
                                ? "0rem"
                                : "0rem"
                              : CSS.supports(
                                  `(-webkit-overflow-scrolling: touch)`
                                )
                              ? "-3rem"
                              : "1.5rem"
                            : "1rem",
                          opacity: splashScreenComplete ? 1 : 0,
                        }}
                      />
                    </div>
                  </div>
                )}
              </Spring>
            </div>
          )}
        </Spring>
        <div className="splash_screen">
          <SplashScreen currentScreenSize={props.currentScreenSize} />
        </div>
      </section>
    </div>
  );
});

export default LandingPage;
