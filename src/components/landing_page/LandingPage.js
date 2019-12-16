import React, { useState, useEffect, useCallback, useRef } from "react";
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

const LandingPage = props => {
  const [scroll, setScroll] = useState(false);
  const [lineRenderScroll, setLineRenderScroll] = useState(false);
  const ScrollLockRef = useRef(null);
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
    const userScroll = window.scrollY < 345;
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
  }, [setScroll, setLineRenderScroll]);

  useEffect(() => {
    document.body.style.overflow = "visible";
    return () => {
      document.body.style.overflow = bodyScrollToggle;
    };
  }, [bodyScrollToggle]);

  useEffect(() => {
    document.addEventListener("scroll", changeScroll);
    return () => {
      document.removeEventListener("scroll", changeScroll);
    };
  }, [scroll, changeScroll]);

  useEffect(() => {
    disableBodyScroll(ScrollLockRef.current);

    let timerEnableScroll = setTimeout(() => {
      enableBodyScroll(ScrollLockRef.current);
    }, 4000);

    let bodyScrollTimer = setTimeout(() => {
      dispatch(ACTION_BODY_SCROLL_ALLOW());
    }, 4000);

    return () => {
      clearTimeout(timerEnableScroll, bodyScrollTimer);
    };
  }, [dispatch]);

  const handleClickToScroll = async ref => {
    if (CSS.supports(`(-webkit-overflow-scrolling: touch)`)) {
      await import("scroll-behavior-polyfill");
    }
    window.scrollTo({
      top: props.Treatments1Ref.current.offsetTop - 80,
      behavior: "smooth"
    });
  };

  return (
    <div className="landing_page_container" ref={ScrollLockRef}>
      <Spring
        from={{ marginTop: "-100px" }}
        to={{ marginTop: "0px" }}
        config={{ delay: 2500, duration: 1500 }}
      >
        {props => (
          <header
            className="header"
            style={{ marginTop: `${props.marginTop}` }}
          >
            <NavigationBar
              scroll={scroll}
              onClick={handleNavbarToggle}
              navbarToggle={navbarToggle}
            />
          </header>
        )}
      </Spring>
      <section className="main_content">
        <PottedPlant />
        <SmallPlant />
        <Cream />
        <HandCream />
        <TopAnimationTopShelf />
        <Mirror />
        <Bottle />
        <Qtips />
        <Sunscreen />
        <TopAnimationBottomShelf />
        <Spring
          from={{ top: "100%" }}
          to={{ top: "50%" }}
          config={{ delay: 2000, duration: 2000 }}
        >
          {props => (
            <div className="bottom_content" style={{ top: `${props.top}` }}>
              <Spring
                from={{ opacity: 0 }}
                to={{ opacity: 1 }}
                config={{ delay: 4000, duration: 500 }}
              >
                {props => (
                  <div className="landing_page_text_block">
                    <h1 style={{ opacity: `${props.opacity}` }}>
                      Customized skin care,
                      <br /> down to a science.
                    </h1>
                    <p
                      className="landing_page_description"
                      style={{ opacity: `${props.opacity}` }}
                    >
                      We've reimagined the traditional idea of a facial so that
                      we can do the thinking for you. Lay back, relax, and
                      listen to that Peruvian pan flute music. We'll figure out
                      the rest.
                    </p>
                    <div
                      style={{
                        opacity: `${props.opacity}`,
                        marginTop: lineRenderScroll
                          ? CSS.supports(`(-webkit-overflow-scrolling: touch)`)
                            ? "8rem"
                            : "8rem"
                          : CSS.supports(`(-webkit-overflow-scrolling: touch)`)
                          ? "8rem"
                          : "1.5rem"
                      }}
                      className="landing_page_cta"
                      onClick={() => handleClickToScroll(props.Treatments1Ref)}
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
                            ></span>
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
};

export default LandingPage;
