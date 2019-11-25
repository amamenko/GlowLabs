import React, { useState, useEffect, useCallback } from "react";
import NavigationBar from "../nav_bar/NavigationBar";
import { Spring } from "react-spring/renderprops";
import SplashScreen from "./SplashScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./LandingPage.css";

const LandingPage = props => {
  const [scroll, setScroll] = useState(false);

  const changeScroll = useCallback(() => {
    const userScroll = window.scrollY < 760;
    if (!userScroll) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  }, [setScroll]);

  useEffect(() => {
    document.addEventListener("scroll", changeScroll);

    return () => {
      document.removeEventListener("scroll", changeScroll);
    };
  }, [scroll, changeScroll]);

  return (
    <div className="landing_page_container">
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
            <NavigationBar scroll={scroll} />
          </header>
        )}
      </Spring>
      <section className="main_content">
        <Spring
          from={{ top: "150vh" }}
          to={{ top: "50vh" }}
          config={{ delay: 2500, duration: 2500 }}
        >
          {props => (
            <div className="bottom_content" style={{ top: `${props.top}` }}>
              <h1>
                Customized skin care,
                <br /> down to a science.
              </h1>
              <p>
                We've reimagined the traditional idea of a facial so that we can
                do the thinking for you. Lay back, relax, and listen to that
                Peruvian pan flute music. We'll figure out the rest.
              </p>
              <p className="landing_page_cta">View Treatments</p>
              <FontAwesomeIcon
                className="landing_page_down_arrow"
                icon={faChevronDown}
              />
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
