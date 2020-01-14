import React, { useState, useEffect, useCallback } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useSelector, useDispatch } from "react-redux";
import NavigationBar from "../nav_bar/NavigationBar";
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
import ACTION_NAVBAR_TOGGLE_RESET from "../../actions/Nav/ACTION_NAVBAR_TOGGLE_RESET";
import ACTION_NAVBAR_TOGGLE from "../../actions/Nav/ACTION_NAVBAR_TOGGLE";
import ACTION_BODY_SCROLL_ALLOW from "../../actions/Body_Scroll/ACTION_BODY_SCROLL_ALLOW";
import ACTION_BODY_SCROLL_RESET from "../../actions/Body_Scroll/ACTION_BODY_SCROLL_RESET";
import ACTION_USER_SCROLLED from "../../actions/Scroll/ACTION_USER_SCROLLED";
import ACTION_USER_SCROLLED_RESET from "../../actions/Scroll/ACTION_USER_SCROLLED_RESET";

const LandingPage = React.forwardRef((props, ref) => {
  const { Treatments1Ref, LandingPageRef } = ref;
  const [lineRenderScroll, setLineRenderScroll] = useState(false);
  const navbarToggle = useSelector(state => state.navbarToggle.toggle);
  const bodyScrollToggle = useSelector(
    state => state.bodyScrollToggle.overflow
  );
  const scroll = useSelector(state => state.scrollToggle.scroll);

  const dispatch = useDispatch();

  const handleNavbarToggle = () => {
    if (navbarToggle) {
      dispatch(ACTION_NAVBAR_TOGGLE_RESET());
      dispatch(ACTION_BODY_SCROLL_ALLOW());
    } else {
      dispatch(ACTION_NAVBAR_TOGGLE());
      dispatch(ACTION_BODY_SCROLL_RESET());
    }
  };

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
    if (bodyScrollToggle === "visible") {
      document.body.style.overflow = "visible";
      document.body.style.overflowX = "hidden";
    } else if (bodyScrollToggle === "hidden") {
      document.body.style.overflow = "hidden";
    }
  }, [bodyScrollToggle]);

  useEffect(() => {
    document.addEventListener("scroll", changeScroll);
    return () => {
      document.removeEventListener("scroll", changeScroll);
    };
  }, [scroll, changeScroll]);

  useEffect(() => {
    disableBodyScroll(LandingPageRef.current);

    let timerEnableScroll = setTimeout(
      () => {
        enableBodyScroll(LandingPageRef.current);
      },
      props.initialScreenSize >= 600 ? 5300 : 4000
    );

    let bodyScrollTimer = setTimeout(
      () => {
        dispatch(ACTION_BODY_SCROLL_ALLOW());
      },
      props.initialScreenSize >= 600 ? 5300 : 4000
    );

    return () => {
      clearTimeout(timerEnableScroll, bodyScrollTimer);
    };
  }, [dispatch, props.initialScreenSize, LandingPageRef]);

  const portraitOverscroll = () => {
    if (window.scrollY <= 50) {
      document.body.style.setProperty("background", "rgb(255, 198, 207)");
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

  return (
    <div className="landing_page_container" ref={LandingPageRef}>
      <Spring
        from={{
          marginTop: props.initialScreenSize >= 600 ? "-200px" : "-100px"
        }}
        to={{ marginTop: "0px" }}
        config={{
          delay: props.initialScreenSize >= 600 ? 4600 : 2500,
          duration: props.initialScreenSize >= 600 ? 1000 : 1500
        }}
      >
        {styles => (
          <header
            className="header"
            style={{
              marginTop:
                props.currentScreenSize === ""
                  ? props.initialScreenSize >= 1200
                    ? `${styles.marginTop}`
                    : props.navbarVisible
                    ? `${styles.marginTop}`
                    : "-200px"
                  : props.currentScreenSize >= 1200
                  ? `${styles.marginTop}`
                  : props.navbarVisible
                  ? `${styles.marginTop}`
                  : "-200px",
              transition: "margin-top 0.5s ease",
              height:
                props.currentScreenSize === ""
                  ? props.initialScreenSize <= 1000 &&
                    props.initialScreenSize >= 600
                    ? window.scrollY <= 1
                      ? "30vh"
                      : "15vh"
                    : "8vh"
                  : props.currentScreenSize <= 1000 &&
                    props.currentScreenSize >= 600
                  ? window.scrollY <= 1
                    ? "30vh"
                    : "15vh"
                  : "8vh",
              paddingTop:
                props.currentScreenSize === ""
                  ? props.initialScreenSize <= 1000 &&
                    props.initialScreenSize >= 600
                    ? window.scrollY <= 1
                      ? "15vh"
                      : "0vh"
                    : "0vh"
                  : props.currentScreenSize <= 1000 &&
                    props.currentScreenSize >= 600
                  ? window.scrollY <= 1
                    ? "15vh"
                    : "0vh"
                  : "0vh",
              paddingBottom:
                props.currentScreenSize === ""
                  ? props.initialScreenSize <= 1000 &&
                    props.initialScreenSize >= 600
                    ? window.scrollY <= 1
                      ? "15vh"
                      : "0vh"
                    : "0vh"
                  : props.currentScreenSize <= 1000 &&
                    props.currentScreenSize >= 600
                  ? window.scrollY <= 1
                    ? "15vh"
                    : "0vh"
                  : "0vh"
            }}
          >
            <NavigationBar
              scroll={scroll}
              handleNavbarToggle={handleNavbarToggle}
              navbarToggle={navbarToggle}
              currentScreenSize={props.currentScreenSize}
              initialScreenSize={props.initialScreenSize}
              handleClickToScrollToHome={props.handleClickToScrollToHome}
              handleClickToScrollToTreatments={
                props.handleClickToScrollToTreatments
              }
              handleClickToScrollToAddOns={props.handleClickToScrollToAddOns}
              handleClickToScrollToInstagram={
                props.handleClickToScrollToInstagram
              }
              ref={ref}
            />
          </header>
        )}
      </Spring>
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
          />
          <Mirror initialScreenSize={props.initialScreenSize} />
          <Bottle initialScreenSize={props.initialScreenSize} />
          <Qtips initialScreenSize={props.initialScreenSize} />
          <Sunscreen initialScreenSize={props.initialScreenSize} />
          <TopAnimationBottomShelf
            currentScreenSize={props.currentScreenSize}
            initialScreenSize={props.initialScreenSize}
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
                          GET STARTED
                        </p>
                      </div>
                      <div
                        className="call_to_action_button book_now"
                        style={{ opacity: `${styleprops.opacity}` }}
                      >
                        <p
                          onClick={() =>
                            props.handleClickToScrollToTreatments(
                              Treatments1Ref
                            )
                          }
                        >
                          BOOK NOW
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
