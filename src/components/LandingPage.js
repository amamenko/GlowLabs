import React from "react";
import NavigationBar from "./NavigationBar";
import "./LandingPage.css";

const LandingPage = () => (
  <div className="landing_page_container">
    <header className="header">
      <NavigationBar />
    </header>
    <section className="main_content">
      <div className="main_heading">
        <h1>
          <center>
            Customized
            <br />
            skincare,
            <br />
            down to a<br />
            science.
          </center>
        </h1>

        <button className="call_to_action">
          <a href="/">Book Now</a>
        </button>
      </div>
      <span className="bg_image" />
    </section>
  </div>
);

export default LandingPage;
