import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import RootReducer from "./RootReducer";
import LandingPage from "./components/landing_page/LandingPage";
import TreatmentsPage1 from "./components/treatments_pages/Page_1/TreatmentsPage1";
import TreatmentsPage2 from "./components/treatments_pages/Page_2/TreatmentsPage2";
import TreatmentsPage3 from "./components/treatments_pages/Page_3/TreatmentsPage3";
import TreatmentsPage4 from "./components/treatments_pages/Page_4/TreatmentsPage4";
import "./styles.css";

const middleware = [thunk];

const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

const App = () => {
  return (
    <>
      <LandingPage />
      <TreatmentsPage1 />
      <TreatmentsPage2 />
      <TreatmentsPage3 />
      <TreatmentsPage4 />
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
