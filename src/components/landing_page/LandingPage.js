import React, { useState, useEffect, useCallback } from "react";
import NavigationBar from "../nav_bar/NavigationBar";
import { Spring } from "react-spring/renderprops";
import SplashScreen from "./SplashScreen";
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
        <div className="main_heading">
          <SplashScreen />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
