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
          <h1><center>Customized<br/>skincare,<br/>down to a<br/>science.</center></h1>
        </div>
        <div className="main_img">
          <img className="hero" src="https://picsum.photos/200/300" alt="hero"></img>
          <span className="hero_mask"></span>
        </div>
      </section>
      <footer className="footer">This is the footer.</footer>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
