import * as smoothscroll from "smoothscroll-polyfill";
import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import ReactDOM from "react-dom";
import { Spring } from "react-spring/renderprops";
import Modal from "react-modal";
import { createStore, applyMiddleware } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";
import ACTION_NAVBAR_NOT_VISIBLE from "./actions/NavbarIsVisible/ACTION_NAVBAR_NOT_VISIBLE";
import ACTION_NAVBAR_IS_VISIBLE from "./actions/NavbarIsVisible/ACTION_NAVBAR_IS_VISIBLE";
import ACTION_NAVBAR_TOGGLE_RESET from "./actions/Nav/ACTION_NAVBAR_TOGGLE_RESET";
import ACTION_NAVBAR_TOGGLE from "./actions/Nav/ACTION_NAVBAR_TOGGLE";
import ACTION_BODY_SCROLL_ALLOW from "./actions/Body_Scroll/ACTION_BODY_SCROLL_ALLOW";
import ACTION_BODY_SCROLL_RESET from "./actions/Body_Scroll/ACTION_BODY_SCROLL_RESET";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import RootReducer from "./RootReducer";
import NavigationBar from "./components/nav_bar/NavigationBar";
import LandingPage from "./components/landing_page/LandingPage";
import TreatmentsPage1 from "./components/treatments_pages/Page_1/TreatmentsPage1";
import TreatmentsPage2 from "./components/treatments_pages/Page_2/TreatmentsPage2";
import TreatmentsPage3 from "./components/treatments_pages/Page_3/TreatmentsPage3";
import TreatmentsPage4 from "./components/treatments_pages/Page_4/TreatmentsPage4";
import TreatmentsPage5 from "./components/treatments_pages/Page_5/TreatmentsPage5";
import TreatmentsPage6 from "./components/treatments_pages/Page_6/TreatmentsPage6";
import NavigationMenu from "./components/nav_bar/NavigationMenu";
import AddOnsPage1 from "./components/add_ons_pages/Page_1/AddOnsPage1";
import AddOnsPage2 from "./components/add_ons_pages/Page_2/AddOnsPage2";
import AddOnsPage3 from "./components/add_ons_pages/Page_3/AddOnsPage3";
import AddOnsPage4 from "./components/add_ons_pages/Page_4/AddOnsPage4";
import AddOnsPage5 from "./components/add_ons_pages/Page_5/AddOnsPage5";
import Instagram from "./components/instagram/Instagram";
import Contact from "./components/contact/Contact";
import ShoppingCart from "./components/shopping_cart/ShoppingCart";
import AvailabilityRouter from "./components/availability/AvailabilityRouter";
import GuestCheckoutRouter from "./components/checkout/GuestCheckoutRouter";
import AccountRouter from "./components/account/AccountRouter";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import KeepAlive, { AliveScope } from "react-activation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./styles.css";

require("dotenv").config();
require("intersection-observer");

smoothscroll.polyfill();

const middleware = [thunk];

const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  onError: ({ graphQLErrors }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message }) => console.log(message));
    }
  }
});

const App = () => {
  const location = useLocation();
  const LandingPageRef = useRef(null);
  const Treatments1Ref = useRef(null);
  const AddOnsRef = useRef(null);
  const InstagramRef = useRef(null);
  const ContactRef = useRef(null);
  const [initialScreenSize] = useState(window.innerWidth);
  const [currentScreenSize, changeCurrentScreenSize] = useState("");
  const [previousScrollPosition, setPreviousScrollPosition] = useState(
    window.pageYOffset
  );

  const navbarVisible = useSelector(
    state => state.navbarIsVisibleReducer.visible
  );
  const navbarToggle = useSelector(state => state.navbarToggle.toggle);
  const scroll = useSelector(state => state.scrollToggle.scroll);
  const cartIsActive = useSelector(state => state.cartIsActive.cartIsActive);
  const splashScreenComplete = useSelector(
    state => state.splashScreenComplete.splashScreenComplete
  );
  const touchScaling = useSelector(
    state => state.fingerTouchScaling.touch_scaling
  );
  const finalBookButtonActive = useSelector(
    state => state.finalBookButton.final_book_button_active
  );
  const loginIsActive = useSelector(
    state => state.loginIsActive.login_is_active
  );

  const dispatch = useDispatch();

  const handleNavbarToggle = () => {
    if (navbarToggle) {
      dispatch(ACTION_NAVBAR_TOGGLE_RESET());
      dispatch(ACTION_NAVBAR_IS_VISIBLE());
      dispatch(ACTION_BODY_SCROLL_ALLOW());
    } else {
      dispatch(ACTION_NAVBAR_TOGGLE());
      dispatch(ACTION_BODY_SCROLL_RESET());
      dispatch(ACTION_NAVBAR_IS_VISIBLE());
      toast.dismiss();
    }
  };

  useLayoutEffect(() => {
    const updateSize = () => {
      if (!touchScaling) {
        changeCurrentScreenSize(window.innerWidth);
      }
    };

    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [currentScreenSize, initialScreenSize, touchScaling]);

  const handleClickToScrollToHome = async ref => {
    if (CSS.supports(`(-webkit-overflow-scrolling: touch)`)) {
      await import("scroll-behavior-polyfill");
    }
    window.scrollTo({
      top: LandingPageRef.current.offsetTop - 10,
      behavior: "smooth"
    });
  };

  const handleRedirectClickToHome = () => {
    if (location.pathname !== "/") {
      window.scrollTo({
        top: LandingPageRef.current.offsetTop - 10,
        behavior: "auto"
      });
    }
  };

  const handleClickToScrollToTreatments = async ref => {
    if (CSS.supports(`(-webkit-overflow-scrolling: touch)`)) {
      await import("scroll-behavior-polyfill");
    }
    window.scrollTo({
      top:
        currentScreenSize === ""
          ? initialScreenSize >= 1800
            ? Treatments1Ref.current.offsetTop - 105
            : initialScreenSize >= 1200
            ? Treatments1Ref.current.offsetTop - 50
            : initialScreenSize >= 600
            ? previousScrollPosition < 450
              ? Treatments1Ref.current.offsetTop
              : Treatments1Ref.current.offsetTop - 40
            : previousScrollPosition < 650
            ? Treatments1Ref.current.offsetTop - 10
            : Treatments1Ref.current.offsetTop - 80
          : currentScreenSize >= 1800
          ? Treatments1Ref.current.offsetTop - 105
          : currentScreenSize >= 1200
          ? Treatments1Ref.current.offsetTop - 50
          : currentScreenSize >= 600
          ? previousScrollPosition < 450
            ? Treatments1Ref.current.offsetTop
            : Treatments1Ref.current.offsetTop - 40
          : previousScrollPosition < 650
          ? Treatments1Ref.current.offsetTop - 10
          : Treatments1Ref.current.offsetTop - 80,
      behavior: "smooth"
    });
  };

  const handleClickToScrollToAddOns = async ref => {
    if (CSS.supports(`(-webkit-overflow-scrolling: touch)`)) {
      await import("scroll-behavior-polyfill");
    }
    window.scrollTo({
      top:
        currentScreenSize === ""
          ? initialScreenSize >= 1800
            ? AddOnsRef.current.offsetTop - 105
            : initialScreenSize >= 1200
            ? AddOnsRef.current.offsetTop - 50
            : initialScreenSize >= 600
            ? previousScrollPosition < 2000
              ? AddOnsRef.current.offsetTop
              : AddOnsRef.current.offsetTop - 60
            : previousScrollPosition < 3900
            ? AddOnsRef.current.offsetTop - 5
            : AddOnsRef.current.offsetTop - 70
          : currentScreenSize >= 1800
          ? AddOnsRef.current.offsetTop - 105
          : currentScreenSize >= 1200
          ? AddOnsRef.current.offsetTop - 50
          : currentScreenSize >= 600
          ? previousScrollPosition < 2000
            ? AddOnsRef.current.offsetTop
            : AddOnsRef.current.offsetTop - 60
          : previousScrollPosition < 3900
          ? AddOnsRef.current.offsetTop - 5
          : AddOnsRef.current.offsetTop - 70,
      behavior: "smooth"
    });
  };

  const handleClickToScrollToInstagram = async ref => {
    if (CSS.supports(`(-webkit-overflow-scrolling: touch)`)) {
      await import("scroll-behavior-polyfill");
    }
    window.scrollTo({
      top:
        currentScreenSize === ""
          ? initialScreenSize >= 1800
            ? InstagramRef.current.offsetTop - 280
            : initialScreenSize >= 1200
            ? InstagramRef.current.offsetTop - 250
            : initialScreenSize >= 600
            ? previousScrollPosition < 3700
              ? InstagramRef.current.offsetTop - 150
              : InstagramRef.current.offsetTop - 220
            : previousScrollPosition < 6400
            ? InstagramRef.current.offsetTop - 290
            : InstagramRef.current.offsetTop - 350
          : currentScreenSize >= 1800
          ? InstagramRef.current.offsetTop - 280
          : currentScreenSize >= 1200
          ? InstagramRef.current.offsetTop - 250
          : currentScreenSize >= 600
          ? previousScrollPosition < 3700
            ? InstagramRef.current.offsetTop - 150
            : InstagramRef.current.offsetTop - 220
          : previousScrollPosition < 6400
          ? InstagramRef.current.offsetTop - 290
          : InstagramRef.current.offsetTop - 350,
      behavior: "smooth"
    });
  };

  const handleClickToScrollToContact = async ref => {
    if (CSS.supports(`(-webkit-overflow-scrolling: touch)`)) {
      await import("scroll-behavior-polyfill");
    }
    window.scrollTo({
      top:
        currentScreenSize === ""
          ? initialScreenSize >= 1800
            ? ContactRef.current.offsetTop - 310
            : initialScreenSize >= 1200
            ? ContactRef.current.offsetTop - 210
            : previousScrollPosition < 7200
            ? ContactRef.current.offsetTop - 10
            : ContactRef.current.offsetTop - 80
          : currentScreenSize >= 1800
          ? ContactRef.current.offsetTop - 310
          : currentScreenSize >= 1200
          ? ContactRef.current.offsetTop - 210
          : previousScrollPosition < 7200
          ? ContactRef.current.offsetTop - 10
          : ContactRef.current.offsetTop - 80,
      behavior: "smooth"
    });
  };

  const ref = {
    LandingPageRef: LandingPageRef,
    Treatments1Ref: Treatments1Ref,
    AddOnsRef: AddOnsRef,
    InstagramRef: InstagramRef,
    ContactRef: ContactRef
  };

  useEffect(() => {
    if (!cartIsActive) {
      const handleScroll = () => {
        const currentScrollPosition = window.pageYOffset;

        if (
          previousScrollPosition < currentScrollPosition &&
          previousScrollPosition > 0 &&
          currentScrollPosition > 0
        ) {
          if (navbarVisible) {
            if (navbarToggle) {
              dispatch(ACTION_NAVBAR_IS_VISIBLE());
            } else {
              dispatch(ACTION_NAVBAR_NOT_VISIBLE());
            }
          }
        } else {
          dispatch(ACTION_NAVBAR_IS_VISIBLE());
        }
        setPreviousScrollPosition(currentScrollPosition);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [
    previousScrollPosition,
    navbarVisible,
    navbarToggle,
    cartIsActive,
    dispatch
  ]);

  return (
    <>
      <Spring
        from={{
          marginTop: !currentScreenSize
            ? "-200px"
            : initialScreenSize >= 600
            ? currentScreenSize >= 600
              ? "-200px"
              : "-100px"
            : currentScreenSize >= 600
            ? "-200px"
            : "-100px"
        }}
        to={{ marginTop: "0px" }}
        config={{
          delay: !currentScreenSize
            ? initialScreenSize >= 600
              ? 3000
              : 2500
            : initialScreenSize >= 600
            ? currentScreenSize >= 600
              ? 3000
              : 2500
            : 2500,
          duration: !currentScreenSize
            ? initialScreenSize >= 600
              ? 2000
              : 1500
            : initialScreenSize >= 600
            ? currentScreenSize >= 600
              ? 2000
              : 1500
            : 1500
        }}
      >
        {styles => (
          <header
            className="header"
            style={{
              marginTop: splashScreenComplete
                ? !currentScreenSize
                  ? initialScreenSize >= 1200
                    ? `${styles.marginTop}`
                    : navbarVisible
                    ? "0px"
                    : "-200px"
                  : currentScreenSize >= 1200
                  ? `${styles.marginTop}`
                  : navbarVisible
                  ? "0px"
                  : "-200px"
                : `${styles.marginTop}`,
              transition: "margin-top 0.5s ease",
              height: !currentScreenSize
                ? initialScreenSize <= 1000 && initialScreenSize >= 600
                  ? window.scrollY <= 1
                    ? "30vh"
                    : "15vh"
                  : "8vh"
                : currentScreenSize <= 1000 && currentScreenSize >= 600
                ? window.scrollY <= 1
                  ? "30vh"
                  : "15vh"
                : "8vh",
              paddingTop: !currentScreenSize
                ? initialScreenSize <= 1000 && initialScreenSize >= 600
                  ? window.scrollY <= 1
                    ? "15vh"
                    : "0vh"
                  : "0vh"
                : currentScreenSize <= 1000 && currentScreenSize >= 600
                ? window.scrollY <= 1
                  ? "15vh"
                  : "0vh"
                : "0vh",
              paddingBottom: !currentScreenSize
                ? initialScreenSize <= 1000 && initialScreenSize >= 600
                  ? window.scrollY <= 1
                    ? "15vh"
                    : "0vh"
                  : "0vh"
                : currentScreenSize <= 1000 && currentScreenSize >= 600
                ? window.scrollY <= 1
                  ? "15vh"
                  : "0vh"
                : "0vh",
              zIndex: finalBookButtonActive ? "auto" : 500,
              display: loginIsActive ? "none" : "flex"
            }}
          >
            <NavigationBar
              scroll={scroll}
              handleNavbarToggle={handleNavbarToggle}
              navbarToggle={navbarToggle}
              currentScreenSize={currentScreenSize}
              initialScreenSize={initialScreenSize}
              handleClickToScrollToHome={handleClickToScrollToHome}
              handleClickToScrollToTreatments={handleClickToScrollToTreatments}
              handleClickToScrollToAddOns={handleClickToScrollToAddOns}
              handleClickToScrollToInstagram={handleClickToScrollToInstagram}
              handleClickToScrollToContact={handleClickToScrollToContact}
              ref={ref}
            />
          </header>
        )}
      </Spring>

      <ToastContainer
        toastClassName="toast_container"
        position={"bottom-right"}
        autoClose={3000}
        newestOnTop={false}
        hideProgressBar
        closeOnClick
        pauseOnVisibilityChange
        draggable={true}
        draggablePercent={20}
      />

      <NavigationMenu
        currentScreenSize={currentScreenSize}
        initialScreenSize={initialScreenSize}
        handleClickToScrollToHome={handleClickToScrollToHome}
        handleRedirectClickToHome={handleRedirectClickToHome}
        handleClickToScrollToTreatments={handleClickToScrollToTreatments}
        handleClickToScrollToAddOns={handleClickToScrollToAddOns}
        handleClickToScrollToInstagram={handleClickToScrollToInstagram}
        handleClickToScrollToContact={handleClickToScrollToContact}
        ref={ref}
      />

      <Switch>
        <Route exact path="/">
          <KeepAlive saveScrollPosition="screen">
            <div className="main_container">
              <LandingPage
                currentScreenSize={currentScreenSize}
                initialScreenSize={initialScreenSize}
                handleClickToScrollToHome={handleClickToScrollToHome}
                handleClickToScrollToTreatments={
                  handleClickToScrollToTreatments
                }
                handleClickToScrollToAddOns={handleClickToScrollToAddOns}
                handleClickToScrollToInstagram={handleClickToScrollToInstagram}
                handleClickToScrollToContact={handleClickToScrollToContact}
                navbarVisible={navbarVisible}
                ref={ref}
              />
              <TreatmentsPage1
                currentScreenSize={currentScreenSize}
                initialScreenSize={initialScreenSize}
                Treatments1Ref={Treatments1Ref}
              />
              <TreatmentsPage2
                initialScreenSize={initialScreenSize}
                currentScreenSize={currentScreenSize}
              />
              <TreatmentsPage3
                initialScreenSize={initialScreenSize}
                currentScreenSize={currentScreenSize}
              />
              <TreatmentsPage4
                initialScreenSize={initialScreenSize}
                currentScreenSize={currentScreenSize}
              />
              <TreatmentsPage5
                initialScreenSize={initialScreenSize}
                currentScreenSize={currentScreenSize}
              />
              <TreatmentsPage6
                initialScreenSize={initialScreenSize}
                currentScreenSize={currentScreenSize}
              />
              <AddOnsPage1
                initialScreenSize={initialScreenSize}
                currentScreenSize={currentScreenSize}
                AddOnsRef={AddOnsRef}
              />
              <AddOnsPage2
                initialScreenSize={initialScreenSize}
                currentScreenSize={currentScreenSize}
              />
              <AddOnsPage3
                initialScreenSize={initialScreenSize}
                currentScreenSize={currentScreenSize}
              />
              <AddOnsPage4
                initialScreenSize={initialScreenSize}
                currentScreenSize={currentScreenSize}
              />
              <AddOnsPage5
                initialScreenSize={initialScreenSize}
                currentScreenSize={currentScreenSize}
              />
              <Instagram
                initialScreenSize={initialScreenSize}
                currentScreenSize={currentScreenSize}
                InstagramRef={InstagramRef}
              />
              <Contact
                initialScreenSize={initialScreenSize}
                currentScreenSize={currentScreenSize}
                ContactRef={ContactRef}
              />
            </div>
          </KeepAlive>
        </Route>
        <Route path="/cart" component={ShoppingCart} />
        <Route path="/availability" component={AvailabilityRouter} />
        <Route path="/checkout" component={GuestCheckoutRouter} />
        <Route path="/account" component={AccountRouter} />
      </Switch>
    </>
  );
};

const rootElement = document.getElementById("root");
Modal.setAppElement(rootElement);

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <AliveScope>
          <App />
        </AliveScope>
      </ApolloProvider>
    </Provider>
  </Router>,
  rootElement
);
