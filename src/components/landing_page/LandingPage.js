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

const LandingPage = React.forwardRef((props, ref) => {
  const { Treatments1Ref, LandingPageRef } = ref;
  const [scroll, setScroll] = useState(false);
  const [lineRenderScroll, setLineRenderScroll] = useState(false);
  const navbarToggle = useSelector(state => state.navbarToggle.toggle);
  const bodyScrollToggle = useSelector(
    state => state.bodyScrollToggle.overflow
  );

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
        ? props.initialScreenSize >= 1200
          ? window.scrollY < 10
          : window.scrollY < 345
        : props.currentScreenSize >= 1200
        ? window.scrollY < 10
        : window.scrollY < 345;
    const userLineRenderScroll = window.scrollY < 40;

    if (!userScroll) {
      setScroll(true);
    } else {
      setScroll(false);
    }

    if (!userLineRenderScroll) {
      setLineRenderScroll(true);
    } else {
      setLineRenderScroll(false);
    }
  }, [
    setScroll,
    setLineRenderScroll,
    props.currentScreenSize,
    props.initialScreenSize
  ]);

  useEffect(() => {
    if (bodyScrollToggle === "visible") {
      document.body.style.overflow = "visible";
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
      props.initialScreenSize >= 1200 ? 5300 : 4000
    );

    let bodyScrollTimer = setTimeout(
      () => {
        dispatch(ACTION_BODY_SCROLL_ALLOW());
      },
      props.initialScreenSize >= 1200 ? 5300 : 4000
    );

    return () => {
      clearTimeout(timerEnableScroll, bodyScrollTimer);
    };
  }, [dispatch, props.initialScreenSize, LandingPageRef]);

  return (
    <div className="landing_page_container" ref={LandingPageRef}>
      <Spring
        from={{
          marginTop: props.initialScreenSize >= 1200 ? "-200px" : "-100px"
        }}
        to={{ marginTop: "0px" }}
        config={{
          delay: props.initialScreenSize >= 1200 ? 4600 : 2500,
          duration: props.initialScreenSize >= 1200 ? 1000 : 1500
        }}
      >
        {styles => (
          <header
            className="header"
            style={{ marginTop: `${styles.marginTop}` }}
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
              ref={ref}
            />
          </header>
        )}
      </Spring>
      <section className="main_content">
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
        <Spring
          from={{
            top: props.initialScreenSize >= 1200 ? "0%" : "100%",
            right: props.initialScreenSize >= 1200 ? "100%" : "0%"
          }}
          to={{
            top: props.initialScreenSize >= 1200 ? "0%" : "50%",
            right: props.initialScreenSize >= 1200 ? "50%" : "0%"
          }}
          config={{
            delay: props.initialScreenSize >= 1200 ? 3000 : 2000,
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
                    : props.currentScreenSize >= 1200
                    ? "0%"
                    : "50%",
                right:
                  props.currentScreenSize === ""
                    ? `${styles.right}`
                    : props.currentScreenSize >= 1200
                    ? "50%"
                    : "0%"
              }}
            >
              <Spring
                from={{ opacity: 0 }}
                to={{ opacity: 1 }}
                config={{
                  delay: props.initialScreenSize >= 1200 ? 5000 : 4000,
                  duration: 500
                }}
              >
                {style => (
                  <div className="landing_page_text_block">
                    <h1 style={{ opacity: `${style.opacity}` }}>
                      Customized skin care,
                      <br /> down to a science.
                    </h1>
                    <p
                      className="landing_page_description"
                      style={{ opacity: `${style.opacity}` }}
                    >
                      We've reimagined the traditional idea of a facial so that
                      we can do the thinking for you. Lay back, relax, and
                      listen to that Peruvian pan flute music. We'll figure out
                      the rest.
                    </p>
                    <div className="call_to_action_buttons_container">
                      <div
                        className="call_to_action_button"
                        style={{ opacity: `${style.opacity}` }}
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
                        style={{ opacity: `${style.opacity}` }}
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
                        opacity: `${style.opacity}`,
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
        <div className="main_heading">
          <SplashScreen />
        </div>
      </section>
    </div>
  );
});

export default LandingPage;
