import React from "react";
import "./Treatments.css";

const Treatments = () => (
  <div className="treatments_container">
    <header className="treatments_header">
      <h2>OUR TREATMENTS</h2>
      <br />
      <h3>
        <center>
          Each facial is
          <br />
          customized
          <br />
          to fit your specific
          <br />
          skincare needs.
        </center>
      </h3>
    </header>
    <section className="treatment_image">
      <div className="svg_icon">
        <svg viewBox="0 0 50 50" height="15rem">
          <defs>
            <linearGradient id="svg_gradient" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#ffc6cf", stopOpacity: "1" }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#ffc6cf", stopOpacity: "0" }}
              />
            </linearGradient>
          </defs>
          <circle cx="25" cy="25" r="25" fill="url(#svg_gradient)" />
        </svg>
      </div>
    </section>
    <section className="treatment_description">
      <h2 style={{ fontWeight: 400 }}>CALM</h2>
      <p style={{ opacity: 0.5 }}>Soothing</p>
      <br />
      <p style={{ fontSize: "0.9rem" }}>
        Most beneficial for sensitive skin caused by environmental damage,
        rosacea, acne, laser treatments or natural disposition. Calm can improve
        complexion, reduce inflammation
        <br />
        and boost skin's immunity.
      </p>
    </section>
  </div>
);

export default Treatments;
