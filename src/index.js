import React from "react";
import ReactDOM from "react-dom";
import NavigationBar from "./components/NavigationBar";
import "./styles.css";

function App() {
  return (
    <div className="app-container">
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
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
