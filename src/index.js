import * as smoothscroll from "smoothscroll-polyfill";
import React, {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider, useMutation, useQuery } from "@apollo/react-hooks";
import ReactDOM from "react-dom";
import { Spring, Transition } from "react-spring/renderprops";
import Modal from "react-modal";
import { createStore, applyMiddleware } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";
import ACTION_NAVBAR_NOT_VISIBLE from "./actions/NavbarIsVisible/ACTION_NAVBAR_NOT_VISIBLE";
import ACTION_NAVBAR_IS_VISIBLE from "./actions/NavbarIsVisible/ACTION_NAVBAR_IS_VISIBLE";
import ACTION_NAVBAR_TOGGLE_RESET from "./actions/Nav/ACTION_NAVBAR_TOGGLE_RESET";
import ACTION_NAVBAR_TOGGLE from "./actions/Nav/ACTION_NAVBAR_TOGGLE";
import ACTION_BODY_SCROLL_ALLOW from "./actions/Body_Scroll/ACTION_BODY_SCROLL_ALLOW";
import ACTION_BODY_SCROLL_RESET from "./actions/Body_Scroll/ACTION_BODY_SCROLL_RESET";
import ACTION_USER_AUTHENTICATED from "./actions/Authenticated/ACTION_USER_AUTHENTICATED";
import ACTION_USER_NOT_AUTHENTICATED from "./actions/Authenticated/ACTION_USER_NOT_AUTHENTICATED";
import ACTION_LOG_OUT_CLICKED_RESET from "./actions/LogOut/ACTION_LOG_OUT_CLICKED_RESET";
import ACTION_FACEBOOK_COMPLETE_REGISTRATION from "./actions/Login/FacebookCompleteRegistration/ACTION_FACEBOOK_COMPLETE_REGISTRATION";
import ACTION_FACEBOOK_COMPLETE_REGISTRATION_RESET from "./actions/Login/FacebookCompleteRegistration/ACTION_FACEBOOK_COMPLETE_REGISTRATION_RESET";
import ACTION_DUMMY_TOKEN from "./actions/Login/DummyToken/ACTION_DUMMY_TOKEN";
import ACTION_DUMMY_TOKEN_RESET from "./actions/Login/DummyToken/ACTION_DUMMY_TOKEN_RESET";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import RootReducer from "./RootReducer";
import NavigationBar from "./components/nav_bar/NavigationBar";
import LandingPage from "./components/landing_page/LandingPage";
import TreatmentsPage1 from "./components/treatments_pages/Page_1/TreatmentsPage1";
import Contact from "./components/contact/Contact";
import ShoppingCart from "./components/shopping_cart/ShoppingCart";
import AvailabilityRouter from "./components/availability/AvailabilityRouter";
import PaymentInfo from "./components/payment_info/PaymentInfo";
import CheckoutRouter from "./components/checkout/CheckoutRouter";
import AccountRouter from "./components/account/AccountRouter";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Redirect,
} from "react-router-dom";
import KeepAlive, { AliveScope } from "react-activation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./styles.css";
import {
  updateClientInvalidateTokensMutation,
  getClientQuery,
  getEmployeeQuery,
  getEmployeesQuery,
  updateEmployeeInvalidateTokensMutation,
} from "./graphql/queries/queries";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { css } from "emotion";
import { BounceLoader } from "react-spinners";
import { Font } from "@react-pdf/renderer";
import AdminRouter from "./components/admin/AdminRouter";
import ACTION_ADMIN_DUMMY_TOKEN from "./actions/Admin/AdminLogin/AdminDummyToken/ACTION_ADMIN_DUMMY_TOKEN";
import ACTION_ADMIN_DUMMY_TOKEN_RESET from "./actions/Admin/AdminLogin/AdminDummyToken/ACTION_ADMIN_DUMMY_TOKEN_RESET";
import ACTION_ADMIN_TEMPORARY_DUMMY_TOKEN from "./actions/Admin/AdminLogin/AdminTemporaryDummyToken/ACTION_ADMIN_TEMPORARY_DUMMY_TOKEN";
import ACTION_ADMIN_TEMPORARY_DUMMY_TOKEN_RESET from "./actions/Admin/AdminLogin/AdminTemporaryDummyToken/ACTION_ADMIN_TEMPORARY_DUMMY_TOKEN_RESET";
import ACTION_ADMIN_AUTHENTICATED from "./actions/Admin/AdminLogin/AdminAuthenticated/ACTION_ADMIN_AUTHENTICATED";
import ACTION_ADMIN_NOT_AUTHENTICATED from "./actions/Admin/AdminLogin/AdminAuthenticated/ACTION_NOT_AUTHENTICATED";
import Availability from "./components/availability/Date/Availability";
import TimePreference from "./components/availability/Time/TimePreference";
import ACTION_CART_IS_NOT_ACTIVE from "./actions/CartIsActive/ACTION_CART_IS_NOT_ACTIVE";
import GuestCheckout from "./components/checkout/GuestCheckout";
import ConfirmationPage from "./components/checkout/ConfirmationPage";
import ACTION_APPOINTMENT_NOTES_RESET from "./actions/GuestCheckoutForm/AppointmentNotes/ACTION_APPOINTMENT_NOTES_RESET";
import ACTION_PHONE_NOT_INVALID from "./actions/PhoneNumberValidation/Invalid/ACTION_PHONE_NOT_INVALID";
import ACTION_PHONE_NOT_VALID from "./actions/PhoneNumberValidation/Valid/ACTION_PHONE_NOT_VALID";
import ACTION_REFORMATTED_DAY_CLONE_RESET from "./actions/SelectedDay/ReformattedDayClone/ACTION_REFORMATTED_DAY_CLONE_RESET";
import ACTION_REFORMATTED_DAY_RESET from "./actions/SelectedDay/ReformattedDay/ACTION_REFORMATTED_DAY_RESET";
import ACTION_TREATMENTS_CART_RESET from "./actions/InCart/Treatments/ACTION_TREATMENTS_CART_RESET";
import ACTION_ALL_COLLAPSE_RESET from "./actions/SelectedTime/CollapseIsOpen/ACTION_ALL_COLLAPSE_RESET";
import ACTION_FINAL_BOOKING_MODAL_RESET from "./actions/InCart/FinalBookingModal/ACTION_FINAL_BOOKING_MODAL_RESET";
import ACTION_SELECTED_SALT_CAVE_DURATION_RESET from "./actions/Treatments/SaltCave/SaltCaveDuration/ACTION_SELECTED_SALT_CAVE_DURATION_RESET";
import ACTION_SELECTED_ESTHETICIAN_RESET from "./actions/SelectedEsthetician/ACTION_SELECTED_ESTHETICIAN_RESET";
import ACTION_SELECTED_DAY_RESET from "./actions/SelectedDay/ACTION_SELECTED_DAY_RESET";
import ACTION_SELECTED_TIME_RESET from "./actions/SelectedTime/ACTION_SELECTED_TIME_RESET";
import ACTION_SELECT_TIME_NOT_ACTIVE from "./actions/SelectTimeActive/ACTION_SELECT_TIME_NOT_ACTIVE";
import ACTION_TOTAL_DURATION_RESET from "./actions/TotalDuration/ACTION_TOTAL_DURATION_RESET";
import ACTION_CART_PAGE_OPENED from "./actions/InCart/CartPageOpened/ACTION_CART_PAGE_OPENED";
import ACTION_AVAILABILITY_RESET from "./actions/AvailabilityClicked/ACTION_AVAILABILITY_RESET";
import ACTION_BOOKING_SUMMARY_NOT_ACTIVE from "./actions/ContinueToBookingSummaryButtonActive/ACTION_BOOKING_SUMMARY_NOT_ACTIVE";
import ACTION_CONTINUE_BUTTON_RESET from "./actions/ContinueToCheckoutButtonActive/ACTION_CONTINUE_BUTTON_RESET";
import ACTION_EMAIL_NOT_VALID from "./actions/EmailValidation/Valid/ACTION_EMAIL_NOT_VALID";
import ACTION_EMAIL_NOT_INVALID from "./actions/EmailValidation/Invalid/ACTION_EMAIL_NOT_INVALID";
import ACTION_FINAL_BOOK_BUTTON_RESET from "./actions/FinalBookButton/ACTION_FINAL_BOOK_BUTTON_RESET";
import ACTION_PHONE_NUMBER_RESET from "./actions/GuestCheckoutForm/PhoneNumber/ACTION_PHONE_NUMBER_RESET";
import ACTION_LAST_NAME_RESET from "./actions/GuestCheckoutForm/LastName/ACTION_LAST_NAME_RESET";
import ACTION_FIRST_NAME_RESET from "./actions/GuestCheckoutForm/FirstName/ACTION_FIRST_NAME_RESET";
import ACTION_EMAIL_RESET from "./actions/GuestCheckoutForm/Email/ACTION_EMAIL_RESET";
import ACTION_APPOINTMENT_END_TIME_RESET from "./actions/AppointmentEndTime/ACTION_APPOINTMENT_END_TIME_RESET";
import ACTION_TOTAL_PRICE_RESET from "./actions/TotalPrice/ACTION_TOTAL_PRICE_RESET";
import ACTION_BACIAL_TOGGLE_RESET from "./actions/Treatments/Bacial/ACTION_BACIAL_TOGGLE_RESET";
import ACTION_CALM_TOGGLE_RESET from "./actions/Treatments/Calm/ACTION_CALM_TOGGLE_RESET";
import ACTION_CBD_TOGGLE_RESET from "./actions/Treatments/CBD/ACTION_CBD_TOGGLE_RESET";
import ACTION_CHEMICAL_PEEL_TOGGLE_RESET from "./actions/Treatments/ChemicalPeel/ACTION_CHEMICAL_PEEL_TOGGLE_RESET";
import ACTION_CLARIFY_TOGGLE_RESET from "./actions/Treatments/Clarify/ACTION_CLARIFY_TOGGLE_RESET";
import ACTION_DERMAPLANING_TOGGLE_RESET from "./actions/Treatments/Dermaplaning/ACTION_DERMAPLANING_TOGGLE_RESET";
import ACTION_GLOW_TOGGLE_RESET from "./actions/Treatments/Glow/ACTION_GLOW_TOGGLE_RESET";
import ACTION_MICRONEEDLE_TOGGLE_RESET from "./actions/Treatments/Microneedle/ACTION_MICRONEEDLE_TOGGLE_RESET";
import ACTION_QUENCH_TOGGLE_RESET from "./actions/Treatments/Quench/ACTION_QUENCH_TOGGLE_RESET";
import ACTION_QUICKIE_TOGGLE_RESET from "./actions/Treatments/Quickie/ACTION_QUICKIE_TOGGLE_RESET";
import ACTION_REJUVENATE_TOGGLE_RESET from "./actions/Treatments/Rejuvenate/ACTION_REJUVENATE_TOGGLE_RESET";
import ACTION_SALT_CAVE_TOGGLE_RESET from "./actions/Treatments/SaltCave/ACTION_SALT_CAVE_TOGGLE_RESET";
import ACTION_BEARD_TOGGLE_RESET from "./actions/AddOns/Beard/ACTION_BEARD_TOGGLE_RESET";
import ACTION_DERMAROLLING_TOGGLE_RESET from "./actions/AddOns/Dermarolling/ACTION_DERMAROLLING_TOGGLE_RESET";
import ACTION_EXTRA_EXTRACTIONS_TOGGLE_RESET from "./actions/AddOns/ExtraExtractions/ACTION_EXTRA_EXTRACTIONS_TOGGLE_RESET";
import ACTION_GUASHA_TOGGLE_RESET from "./actions/AddOns/GuaSha/ACTION_GUASHA_TOGGLE_RESET";
import ACTION_HYDRO_JELLY_TOGGLE_RESET from "./actions/AddOns/HydroJellyMask/ACTION_HYDRO_JELLY_TOGGLE_RESET";
import ACTION_LED_THERAPY_TOGGLE_RESET from "./actions/AddOns/LEDTherapy/ACTION_LED_THERAPY_TOGGLE_RESET";
import ACTION_MICROCURRENT_TOGGLE_RESET from "./actions/AddOns/Microcurrent/ACTION_MICROCURRENT_TOGGLE_RESET";
import ACTION_MICRODERMABRASION_TOGGLE_RESET from "./actions/AddOns/Microdermabrasion/ACTION_MICRODERMABRASION_TOGGLE_RESET";
import ACTION_NANONEEDLING_TOGGLE_RESET from "./actions/AddOns/Nanoneedling/ACTION_NANONEEDLING_TOGGLE_RESET";
import ACTION_GUEST_CONSENT_FORM_ACCESS_TOKEN from "./actions/ConsentForm/GuestConsentFormAccessToken/ACTION_GUEST_CONSENT_FORM_ACCESS_TOKEN";
import ACTION_DAY_OF_THE_WEEK_RESET from "./actions/SelectedDay/DayOfTheWeek/ACTION_DAY_OF_THE_WEEK_RESET";
import ACTION_CART_IS_ACTIVE from "./actions/CartIsActive/ACTION_CART_IS_ACTIVE";
import PreventOrientation from "prevent-orientation";
import { isAndroid } from "react-device-detect";
import ResponsiveNavigationBar from "./components/responsive_nav_bar/ResponsiveNavigationBar";
import AllTreatments from "./components/all_treatments/AllTreatments";
import AllAddOns from "./components/all_add_ons/AllAddOns";
import { scroller } from "react-scroll";
import FollowUs from "./components/follow_us/FollowUs";
import ContactUs from "./components/contact_us/ContactUs";
import iNoBounce from "./inobounce";

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
  credentials: "include",
  onError: ({ graphQLErrors }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message }) => console.log(message));
    }
  },
});

const App = () => {
  const location = useLocation();

  const LandingPageRef = useRef(null);
  const Treatments1Ref = useRef(null);
  const AddOnsRef = useRef(null);
  const InstagramRef = useRef(null);
  const ContactRef = useRef(null);
  const shoppingCartRef = useRef(null);
  const MainContainerRef = useRef(null);
  // Browser width on initial opening of app
  const [initialScreenSize] = useState(window.innerWidth);
  // Current browser width if different from initial browser width
  const [currentScreenSize, changeCurrentScreenSize] = useState("");
  // Browser height on initial opening of app
  const [initialScreenHeight] = useState(window.innerHeight);
  // Current browser height if different from initial browser height
  const [currentScreenHeight, changeCurrentScreenHeight] = useState("");
  const [previousScrollPosition, setPreviousScrollPosition] = useState(
    window.pageYOffset
  );
  const [scrollValue, changeScrollValue] = useState(0);
  const [scrollDirection, changeScrollDirection] = useState("");
  const [navMenuScrollClicked, changeNavMenuScrollClicked] = useState(false);

  // Needed for large screen frozen position when cart is toggled due to Square form causing re-rendering
  const [
    largeScreenFrozenScrollPosition,
    changeLargeScreenFrozenScrollPosition,
  ] = useState("");

  const navbarVisible = useSelector(
    (state) => state.navbarIsVisibleReducer.visible
  );
  const navbarToggle = useSelector((state) => state.navbarToggle.toggle);
  const scroll = useSelector((state) => state.scrollToggle.scroll);
  const cartIsActive = useSelector((state) => state.cartIsActive.cartIsActive);
  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );
  const touchScaling = useSelector(
    (state) => state.fingerTouchScaling.touch_scaling
  );
  const finalBookButtonActive = useSelector(
    (state) => state.finalBookButton.final_book_button_active
  );
  const loginIsActive = useSelector(
    (state) => state.loginIsActive.login_is_active
  );
  const logoutClicked = useSelector(
    (state) => state.logoutClicked.log_out_clicked
  );

  const dummyToken = useSelector((state) => state.dummyToken.dummy_token);
  const adminDummyToken = useSelector(
    (state) => state.adminDummyToken.admin_dummy_token
  );
  const adminTemporaryDummyToken = useSelector(
    (state) => state.adminTemporaryDummyToken.admin_temporary_dummy_token
  );
  const cartPageOpened = useSelector(
    (state) => state.cartPageOpened.cart_page_opened
  );
  const finalBookingModal = useSelector(
    (state) => state.finalBookingModal.final_booking_modal
  );
  const guestConsentFormAccessToken = useSelector(
    (state) => state.guestConsentFormAccessToken.access_token
  );

  const [loadingSpinnerActive, changeLoadingSpinnerActive] = useState(false);
  const [treatmentsPageInView, changeTreatmentsPageInView] = useState(false);

  const [redirectActive, changeRedirectActive] = useState(false);

  // For large screen shopping cart slide-in
  const [cartSlideDelay, changeCartSlideDelay] = useState(false);

  const [updateClientInvalidateTokens, { loading: appLoading }] = useMutation(
    updateClientInvalidateTokensMutation
  );

  const [
    updateEmployeeInvalidateTokens,
    { loading: adminLogoutAppLoading },
  ] = useMutation(updateEmployeeInvalidateTokensMutation);

  const dispatch = useDispatch();

  const { data: getClientData, refetch: clientDataRefetch } = useQuery(
    getClientQuery,
    {
      fetchPolicy: "no-cache",
      variables: {
        _id: dummyToken
          ? dummyToken.id
          : guestConsentFormAccessToken
          ? guestConsentFormAccessToken.id
          : null,
      },
    }
  );

  const {
    data: getEmployeesData,
    loading: getEmployeesLoading,
    refetch: getEmployeesRefetch,
  } = useQuery(getEmployeesQuery, {
    fetchPolicy: "no-cache",
  });

  const { data: getEmployeeData, refetch: employeeDataRefetch } = useQuery(
    getEmployeeQuery,
    {
      fetchPolicy: "no-cache",
      variables: {
        _id: adminTemporaryDummyToken
          ? adminTemporaryDummyToken.id
          : adminDummyToken
          ? adminDummyToken.id
          : null,
      },
    }
  );

  // // Temporary Portrait Mode Lock for Mobile Phones
  // useEffect(() => {
  //   const preventScroll = (e) => e.preventDefault();

  //   if (!currentScreenSize) {
  //     if (initialScreenSize < 1024) {
  //       if (window.matchMedia("(orientation: landscape)").matches) {
  //         dispatch(ACTION_BODY_SCROLL_RESET());

  //         document.body.addEventListener("touchmove", preventScroll, {
  //           passive: false,
  //         });

  //         // force to portrait orientation
  //         new PreventOrientation({
  //           text: "Mobile landscape mode coming soon!",
  //           color: "rgb(90, 90, 90)",
  //           background:
  //             "linear-gradient(to right, rgb(235, 212, 196), rgb(227, 188, 164))",
  //           fontSize: "1.2rem",
  //         }).forceOrientationToAngle(0);
  //       }
  //     }
  //   } else {
  //     if (currentScreenSize < 1024) {
  //       if (window.matchMedia("(orientation: landscape)").matches) {
  //         dispatch(ACTION_BODY_SCROLL_RESET());

  //         document.body.addEventListener("touchmove", preventScroll, {
  //           passive: false,
  //         });

  //         // force to portrait orientation
  //         new PreventOrientation({
  //           text: "Mobile landscape mode coming soon!",
  //           color: "rgb(90, 90, 90)",
  //           background:
  //             "linear-gradient(to right, rgb(235, 212, 196), rgb(227, 188, 164))",
  //           fontSize: "1.2rem",
  //           height: "100vh",
  //         }).forceOrientationToAngle(0);
  //       } else {
  //         if (splashScreenComplete) {
  //           dispatch(ACTION_BODY_SCROLL_ALLOW());

  //           document.body.removeEventListener(
  //             "touchmove",
  //             preventScroll,
  //             false
  //           );
  //         }
  //       }
  //     }
  //   }
  // }, [
  //   currentScreenSize,
  //   currentScreenHeight,
  //   initialScreenHeight,
  //   initialScreenSize,
  //   splashScreenComplete,
  //   dispatch,
  // ]);

  if (isAndroid) {
    // Resets height to prevent Android keyboard input focus zoom
    document.documentElement.style.setProperty("overflow", "auto");
    const metaViewport = document.querySelector("meta[name=viewport]");
    metaViewport.setAttribute(
      "content",
      "height=" +
        initialScreenHeight +
        ", width=device-width, initial-scale=1.0, shrink-to-fit=no, viewport-fit=cover"
    );
  }

  useMemo(() => {
    if (getClientData) {
      return false;
    }
  }, [getClientData]);

  useMemo(() => {
    if (getEmployeeData) {
      return false;
    }
  }, [getEmployeeData]);

  useEffect(() => {
    if (cartIsActive) {
      if (!navbarVisible) {
        dispatch(ACTION_NAVBAR_IS_VISIBLE());
      }
    }
  }, [cartIsActive, navbarVisible, dispatch]);

  const redirectToHome = () => {
    if (!splashScreenComplete) {
      if (
        !location.pathname.includes("account") &&
        !location.pathname.includes("admin")
      )
        return <Redirect to="/" />;
    }
  };

  const redirectToRoot = () => {
    if (redirectActive) {
      return <Redirect to="/" />;
    }
  };

  useEffect(() => {
    if (cartIsActive) {
      if (document.body.style.background !== "rgb(255, 255, 255") {
        document.body.style.setProperty("background", "rgb(255, 255, 255)");
      }
    }
  }, [cartIsActive]);

  useEffect(() => {
    let currentDummyToken;
    let temporaryFacebookDummyToken;
    let currentAdminDummyToken;
    let temporaryAdminDummyToken;
    let currentGuestConsentFormAccessToken;

    const checkCookies = () => {
      if (
        currentDummyToken !== Cookies.get("dummy-token") ||
        temporaryFacebookDummyToken !==
          Cookies.get("temporary-facebook-dummy-token") ||
        currentAdminDummyToken !== Cookies.get("admin-dummy-token") ||
        temporaryAdminDummyToken !==
          Cookies.get("temporary-admin-dummy-token") ||
        currentGuestConsentFormAccessToken !==
          Cookies.get("guest-consent-form-access-token")
      ) {
        currentDummyToken = Cookies.get("dummy-token");
        temporaryFacebookDummyToken = Cookies.get(
          "temporary-facebook-dummy-token"
        );
        currentAdminDummyToken = Cookies.get("admin-dummy-token");
        temporaryAdminDummyToken = Cookies.get("temporary-admin-dummy-token");
        currentGuestConsentFormAccessToken = Cookies.get(
          "guest-consent-form-access-token"
        );

        if (currentDummyToken) {
          dispatch(ACTION_DUMMY_TOKEN(jwt.decode(currentDummyToken)));
          dispatch(ACTION_USER_AUTHENTICATED());
        } else {
          dispatch(ACTION_DUMMY_TOKEN_RESET());
          dispatch(ACTION_USER_NOT_AUTHENTICATED());
          if (currentAdminDummyToken) {
            dispatch(
              ACTION_ADMIN_DUMMY_TOKEN(jwt.decode(currentAdminDummyToken))
            );
            dispatch(ACTION_ADMIN_AUTHENTICATED());
          } else if (temporaryAdminDummyToken) {
            dispatch(
              ACTION_ADMIN_TEMPORARY_DUMMY_TOKEN(
                jwt.decode(temporaryAdminDummyToken)
              )
            );
            dispatch(ACTION_ADMIN_NOT_AUTHENTICATED());
          } else {
            dispatch(ACTION_ADMIN_TEMPORARY_DUMMY_TOKEN_RESET());
            dispatch(ACTION_ADMIN_NOT_AUTHENTICATED());
            if (temporaryFacebookDummyToken) {
              dispatch(ACTION_FACEBOOK_COMPLETE_REGISTRATION());
            } else {
              dispatch(ACTION_FACEBOOK_COMPLETE_REGISTRATION_RESET());
              if (currentGuestConsentFormAccessToken) {
                dispatch(
                  ACTION_GUEST_CONSENT_FORM_ACCESS_TOKEN(
                    jwt.decode(currentGuestConsentFormAccessToken)
                  )
                );
              }
            }
          }
        }
      }
    };

    setInterval(checkCookies, 100);
  }, [dispatch, employeeDataRefetch]);

  useEffect(() => {
    if (location.pathname.includes("account")) {
      if (cartIsActive) {
        dispatch(ACTION_CART_IS_NOT_ACTIVE());
      }
    }
  }, [dispatch, location.pathname, cartIsActive]);

  const handleNavbarToggle = () => {
    if (!currentScreenSize) {
      if (
        initialScreenHeight > initialScreenSize ||
        (initialScreenSize < 900 && initialScreenSize > initialScreenHeight)
      ) {
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
      }
    } else {
      if (
        currentScreenHeight > currentScreenSize ||
        (currentScreenSize < 900 && currentScreenSize > currentScreenHeight)
      ) {
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
      }
    }
  };

  useLayoutEffect(() => {
    const updateSize = () => {
      if (!touchScaling) {
        changeCurrentScreenSize(window.innerWidth);
        changeCurrentScreenHeight(window.innerHeight);
      }
    };

    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [currentScreenSize, initialScreenSize, touchScaling]);

  const scrollFunction = (element) => {
    scroller.scrollTo(element, {
      duration: 500,
      smooth: true,
      isDynamic: true,
      offset: -(!currentScreenHeight
        ? initialScreenHeight * 0.07
        : currentScreenHeight * 0.07),
      containerId: "main_container_element",
    });
  };

  const handleNavMenuScrollClick = () => {
    changeNavMenuScrollClicked(true);

    setTimeout(() => {
      changeNavMenuScrollClicked(false);
    }, 1000);
  };

  const handleClickToScrollToHome = () => {
    if (location.pathname !== "/") {
      changeRedirectActive(true);

      setTimeout(() => {
        changeRedirectActive(false);
        scrollFunction("landing_page");
      }, 1000);
    }

    handleNavbarToggle();
    handleNavMenuScrollClick();

    scrollFunction("landing_page");
  };

  const handleClickToScrollToTreatments = (source) => {
    if (location.pathname !== "/") {
      changeRedirectActive(true);

      setTimeout(() => {
        changeRedirectActive(false);
        scrollFunction("treatments");
      }, 500);
    }

    if (!source) {
      handleNavbarToggle();
    }

    handleNavMenuScrollClick();

    scrollFunction("treatments");
  };

  const handleClickToScrollToAddOns = () => {
    if (location.pathname !== "/") {
      changeRedirectActive(true);

      setTimeout(() => {
        changeRedirectActive(false);
        scrollFunction("add_ons");
      }, 500);
    }

    handleNavbarToggle();
    handleNavMenuScrollClick();

    scrollFunction("add_ons");
  };

  const handleClickToScrollToInstagram = () => {
    if (location.pathname !== "/") {
      changeRedirectActive(true);

      setTimeout(() => {
        changeRedirectActive(false);
        scrollFunction("instagram");
      }, 500);
    }

    handleNavbarToggle();
    handleNavMenuScrollClick();

    scrollFunction("instagram");
  };

  const handleClickToScrollToContact = () => {
    if (location.pathname !== "/") {
      changeRedirectActive(true);

      setTimeout(() => {
        changeRedirectActive(false);
        scrollFunction("contact");
      }, 500);
    }

    handleNavbarToggle();
    handleNavMenuScrollClick();

    scrollFunction("contact");
  };

  const ref = {
    LandingPageRef: LandingPageRef,
    Treatments1Ref: Treatments1Ref,
    AddOnsRef: AddOnsRef,
    InstagramRef: InstagramRef,
    ContactRef: ContactRef,
  };

  useEffect(() => {
    if (!cartIsActive) {
      if (
        !location.pathname.includes("account") &&
        !location.pathname.includes("admin")
      ) {
        const handleScroll = () => {
          const currentScrollPosition = scrollValue;

          if (
            previousScrollPosition < currentScrollPosition &&
            previousScrollPosition > 0 &&
            currentScrollPosition > 0
          ) {
            if (navbarVisible) {
              if (navbarToggle) {
                dispatch(ACTION_NAVBAR_IS_VISIBLE());
              } else {
                if (!navMenuScrollClicked) {
                  dispatch(ACTION_NAVBAR_NOT_VISIBLE());
                }
              }
            }
          } else {
            dispatch(ACTION_NAVBAR_IS_VISIBLE());
          }
          setPreviousScrollPosition(currentScrollPosition);
        };

        const refVar = MainContainerRef.current;

        if (refVar) {
          refVar.addEventListener("scroll", handleScroll);
          return () => refVar.removeEventListener("scroll", handleScroll);
        }
      }
    }
  }, [
    scrollValue,
    navMenuScrollClicked,
    previousScrollPosition,
    navbarVisible,
    navbarToggle,
    cartIsActive,
    dispatch,
    location.pathname,
  ]);

  useEffect(() => {
    if (
      location.pathname.includes("cart") ||
      location.pathname.includes("availability")
    ) {
      if (cartPageOpened !== "") {
        dispatch(ACTION_CART_IS_ACTIVE());
      }
    }
  }, [dispatch, location.pathname, cartPageOpened]);

  useEffect(() => {
    if (cartPageOpened === "") {
      dispatch(ACTION_CART_IS_NOT_ACTIVE());
    }
  }, [cartPageOpened, dispatch]);

  const handleLogout = () => {
    if (adminDummyToken) {
      updateEmployeeInvalidateTokens();
      dispatch(ACTION_ADMIN_NOT_AUTHENTICATED());
      dispatch(ACTION_USER_NOT_AUTHENTICATED());
      dispatch(ACTION_ADMIN_DUMMY_TOKEN_RESET());
    } else {
      updateClientInvalidateTokens();
      dispatch(ACTION_USER_NOT_AUTHENTICATED());
      dispatch(ACTION_DUMMY_TOKEN_RESET());
    }
  };

  useEffect(() => {
    if (appLoading || adminLogoutAppLoading) {
      changeLoadingSpinnerActive(true);
      const successfulLogout = setTimeout(() => {
        changeLoadingSpinnerActive(false);
        dispatch(ACTION_LOG_OUT_CLICKED_RESET());
        dispatch(ACTION_USER_NOT_AUTHENTICATED());
      }, 1000);
      return () => {
        clearTimeout(successfulLogout);
      };
    } else {
      if (loadingSpinnerActive) {
        const successfulLogout = setTimeout(() => {
          changeLoadingSpinnerActive(false);
          dispatch(ACTION_LOG_OUT_CLICKED_RESET());
          dispatch(ACTION_USER_NOT_AUTHENTICATED());
        }, 1000);
        return () => {
          clearTimeout(successfulLogout);
        };
      }
    }
  }, [appLoading, adminLogoutAppLoading, loadingSpinnerActive, dispatch]);

  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;

  const registerFont = () => {
    Font.register({
      family: "Montserrat",
      src:
        "http://fonts.gstatic.com/s/montserrat/v10/zhcz-_WihjSQC0oHJ9TCYC3USBnSvpkopQaUR-2r7iU.ttf",
    });
  };

  useMemo(() => {
    registerFont();
  }, []);

  useMemo(() => {
    if (!cartIsActive) {
      if (largeScreenFrozenScrollPosition !== "") {
        changeLargeScreenFrozenScrollPosition("");
      }
    }
  }, [
    cartIsActive,
    largeScreenFrozenScrollPosition,
    changeLargeScreenFrozenScrollPosition,
  ]);

  const redirectToCartRoutes = () => {
    setTimeout(() => {
      if (cartIsActive) {
        if (cartPageOpened === "") {
          return <Redirect to="/" />;
        } else if (cartPageOpened === "Cart") {
          if (!currentScreenSize) {
            if (initialScreenSize >= 1200) {
              return <Redirect to="/" />;
            } else {
              return <Redirect to="/cart" />;
            }
          } else if (currentScreenSize >= 1200) {
            return <Redirect to="/" />;
          } else {
            return <Redirect to="/cart" />;
          }
        } else if (cartPageOpened === "Availability") {
          if (!currentScreenSize) {
            if (initialScreenSize >= 1200) {
              return <Redirect to="/" />;
            } else {
              return <Redirect to="/availability" />;
            }
          } else if (currentScreenSize >= 1200) {
            return <Redirect to="/" />;
          } else {
            return <Redirect to="/availability" />;
          }
        } else if (cartPageOpened === "TimePreference") {
          if (!currentScreenSize) {
            if (initialScreenSize >= 1200) {
              return <Redirect to="/" />;
            } else {
              return <Redirect to="/availability/timepreference" />;
            }
          } else if (currentScreenSize >= 1200) {
            return <Redirect to="/" />;
          } else {
            return <Redirect to="/availability/timepreference" />;
          }
        } else if (cartPageOpened === "PaymentInfo") {
          if (!currentScreenSize) {
            if (initialScreenSize >= 1200) {
              return <Redirect to="/" />;
            } else {
              return <Redirect to="/paymentinfo" />;
            }
          } else if (currentScreenSize >= 1200) {
            return <Redirect to="/" />;
          } else {
            return <Redirect to="/paymentinfo" />;
          }
        } else if (cartPageOpened === "GuestCheckout") {
          if (!currentScreenSize) {
            if (initialScreenSize >= 1200) {
              return <Redirect to="/" />;
            } else {
              return <Redirect to="/checkout" />;
            }
          } else if (currentScreenSize >= 1200) {
            return <Redirect to="/" />;
          } else {
            return <Redirect to="/checkout" />;
          }
        } else if (cartPageOpened === "ConfirmationPage") {
          if (!currentScreenSize) {
            if (initialScreenSize >= 1200) {
              return <Redirect to="/" />;
            } else {
              return <Redirect to="/checkout/confirmation" />;
            }
          } else if (currentScreenSize >= 1200) {
            return <Redirect to="/" />;
          } else {
            return <Redirect to="/checkout/confirmation" />;
          }
        } else {
          return null;
        }
      } else {
        return <Redirect to="/" />;
      }
    }, 100);
  };

  useMemo(() => {
    if (currentScreenSize) {
      dispatch(ACTION_BACIAL_TOGGLE_RESET());
      dispatch(ACTION_CALM_TOGGLE_RESET());
      dispatch(ACTION_CBD_TOGGLE_RESET());
      dispatch(ACTION_CHEMICAL_PEEL_TOGGLE_RESET());
      dispatch(ACTION_CLARIFY_TOGGLE_RESET());
      dispatch(ACTION_DERMAPLANING_TOGGLE_RESET());
      dispatch(ACTION_GLOW_TOGGLE_RESET());
      dispatch(ACTION_MICRONEEDLE_TOGGLE_RESET());
      dispatch(ACTION_QUENCH_TOGGLE_RESET());
      dispatch(ACTION_QUICKIE_TOGGLE_RESET());
      dispatch(ACTION_REJUVENATE_TOGGLE_RESET());
      dispatch(ACTION_SALT_CAVE_TOGGLE_RESET());
      dispatch(ACTION_BEARD_TOGGLE_RESET());
      dispatch(ACTION_DERMAROLLING_TOGGLE_RESET());
      dispatch(ACTION_EXTRA_EXTRACTIONS_TOGGLE_RESET());
      dispatch(ACTION_GUASHA_TOGGLE_RESET());
      dispatch(ACTION_HYDRO_JELLY_TOGGLE_RESET());
      dispatch(ACTION_LED_THERAPY_TOGGLE_RESET());
      dispatch(ACTION_MICROCURRENT_TOGGLE_RESET());
      dispatch(ACTION_MICRODERMABRASION_TOGGLE_RESET());
      dispatch(ACTION_NANONEEDLING_TOGGLE_RESET());
    }
  }, [currentScreenSize, dispatch]);

  const resetAllCartStates = () => {
    dispatch(ACTION_BODY_SCROLL_ALLOW());
    dispatch(ACTION_TOTAL_PRICE_RESET());
    dispatch(ACTION_TOTAL_DURATION_RESET());
    dispatch(ACTION_SELECT_TIME_NOT_ACTIVE());
    dispatch(ACTION_SELECTED_TIME_RESET());
    dispatch(ACTION_SELECTED_DAY_RESET());
    dispatch(ACTION_SELECTED_ESTHETICIAN_RESET());
    dispatch(ACTION_SELECTED_SALT_CAVE_DURATION_RESET());
    dispatch(ACTION_FINAL_BOOKING_MODAL_RESET());
    dispatch(ACTION_ALL_COLLAPSE_RESET());
    dispatch(ACTION_TREATMENTS_CART_RESET());
    dispatch(ACTION_REFORMATTED_DAY_RESET());
    dispatch(ACTION_REFORMATTED_DAY_CLONE_RESET());
    dispatch(ACTION_DAY_OF_THE_WEEK_RESET());
    dispatch(ACTION_PHONE_NOT_VALID());
    dispatch(ACTION_PHONE_NOT_INVALID());
    dispatch(ACTION_APPOINTMENT_NOTES_RESET());
    dispatch(ACTION_EMAIL_RESET());
    dispatch(ACTION_FIRST_NAME_RESET());
    dispatch(ACTION_LAST_NAME_RESET());
    dispatch(ACTION_PHONE_NUMBER_RESET());
    dispatch(ACTION_FINAL_BOOK_BUTTON_RESET());
    dispatch(ACTION_EMAIL_NOT_INVALID());
    dispatch(ACTION_EMAIL_NOT_VALID());
    dispatch(ACTION_CONTINUE_BUTTON_RESET());
    dispatch(ACTION_BOOKING_SUMMARY_NOT_ACTIVE());
    dispatch(ACTION_AVAILABILITY_RESET());
    dispatch(ACTION_APPOINTMENT_END_TIME_RESET());
    dispatch(ACTION_CART_PAGE_OPENED());
  };

  const resetAllCartStatesExceptTreatments = () => {
    dispatch(ACTION_BODY_SCROLL_ALLOW());
    dispatch(ACTION_SELECT_TIME_NOT_ACTIVE());
    dispatch(ACTION_SELECTED_TIME_RESET());
    dispatch(ACTION_SELECTED_DAY_RESET());
    dispatch(ACTION_SELECTED_ESTHETICIAN_RESET());
    dispatch(ACTION_FINAL_BOOKING_MODAL_RESET());
    dispatch(ACTION_ALL_COLLAPSE_RESET());
    dispatch(ACTION_REFORMATTED_DAY_RESET());
    dispatch(ACTION_REFORMATTED_DAY_CLONE_RESET());
    dispatch(ACTION_DAY_OF_THE_WEEK_RESET());
    dispatch(ACTION_PHONE_NOT_VALID());
    dispatch(ACTION_PHONE_NOT_INVALID());
    dispatch(ACTION_APPOINTMENT_NOTES_RESET());
    dispatch(ACTION_EMAIL_RESET());
    dispatch(ACTION_FIRST_NAME_RESET());
    dispatch(ACTION_LAST_NAME_RESET());
    dispatch(ACTION_PHONE_NUMBER_RESET());
    dispatch(ACTION_FINAL_BOOK_BUTTON_RESET());
    dispatch(ACTION_EMAIL_NOT_INVALID());
    dispatch(ACTION_EMAIL_NOT_VALID());
    dispatch(ACTION_CONTINUE_BUTTON_RESET());
    dispatch(ACTION_BOOKING_SUMMARY_NOT_ACTIVE());
    dispatch(ACTION_AVAILABILITY_RESET());
    dispatch(ACTION_APPOINTMENT_END_TIME_RESET());
    dispatch(ACTION_CART_PAGE_OPENED());
  };

  const shoppingCartConditionalActiveRendering = () => {
    if (
      !largeScreenFrozenScrollPosition &&
      largeScreenFrozenScrollPosition !== 0
    ) {
      changeLargeScreenFrozenScrollPosition(window.scrollY);
    }

    if (!cartPageOpened || cartPageOpened === "Cart") {
      return (
        <ShoppingCart
          currentScreenSize={currentScreenSize}
          initialScreenSize={initialScreenSize}
          getEmployeesData={getEmployeesData}
          resetAllCartStates={resetAllCartStates}
          resetAllCartStatesExceptTreatments={
            resetAllCartStatesExceptTreatments
          }
        />
      );
    } else if (cartPageOpened === "Availability") {
      return (
        <Availability
          currentScreenSize={currentScreenSize}
          initialScreenSize={initialScreenSize}
          getEmployeesData={getEmployeesData}
        />
      );
    } else if (cartPageOpened === "TimePreference") {
      return (
        <TimePreference
          currentScreenSize={currentScreenSize}
          initialScreenSize={initialScreenSize}
        />
      );
    } else if (cartPageOpened === "GuestCheckout") {
      return (
        <GuestCheckout
          currentScreenSize={currentScreenSize}
          initialScreenSize={initialScreenSize}
        />
      );
    } else if (cartPageOpened === "PaymentInfo") {
      return (
        <PaymentInfo
          currentScreenSize={currentScreenSize}
          initialScreenSize={initialScreenSize}
          getClientData={getClientData ? getClientData : null}
          clientDataRefetch={clientDataRefetch}
          largeScreenFrozenScrollPosition={largeScreenFrozenScrollPosition}
          changeLargeScreenFrozenScrollPosition={
            changeLargeScreenFrozenScrollPosition
          }
        />
      );
    } else if (cartPageOpened === "ConfirmationPage") {
      return (
        <ConfirmationPage
          currentScreenSize={currentScreenSize}
          initialScreenSize={initialScreenSize}
        />
      );
    }
  };

  const largeScreenShoppingCartRender = () => {
    if (!currentScreenSize) {
      if (initialScreenSize >= 1200) {
        return (
          <Transition
            items={cartIsActive}
            from={{ transform: "translate3d(100%, 0, 0)" }}
            enter={{ transform: "translate3d(0, 0, 0)" }}
            leave={{
              transform: "translate3d(100%, 0, 0)",
            }}
          >
            {(cartIsActive) =>
              cartIsActive &&
              ((styleprops) => (
                <div
                  className="large_screen_shopping_cart_container"
                  style={styleprops}
                  ref={shoppingCartRef}
                >
                  {shoppingCartConditionalActiveRendering()}
                </div>
              ))
            }
          </Transition>
        );
      }
    } else if (currentScreenSize >= 1200) {
      return (
        <Transition
          items={cartIsActive}
          from={{ transform: "translate3d(100%, 0, 0)" }}
          enter={{ transform: "translate3d(0, 0, 0)" }}
          leave={{ transform: "translate3d(100%, 0, 0)" }}
        >
          {(cartIsActive) =>
            cartIsActive &&
            ((props) => (
              <div
                className="large_screen_shopping_cart_container"
                style={props}
                ref={shoppingCartRef}
              >
                {shoppingCartConditionalActiveRendering()}
              </div>
            ))
          }
        </Transition>
      );
    }
  };

  useEffect(() => {
    if (cartIsActive) {
      changeCartSlideDelay(true);
    } else {
      const slideDelay = setTimeout(() => {
        changeCartSlideDelay(false);
      }, 500);

      return () => {
        clearTimeout(slideDelay);
      };
    }
  }, [cartIsActive]);

  // Distort background while shopping cart slider is visible

  const renderSlideInShoppingCartContainer = useCallback(
    (item) => {
      if (cartIsActive) {
        return (
          <div
            className="large_screen_shopping_cart_full_container"
            style={{
              display: cartSlideDelay ? "block" : "none",
              backdropFilter: cartIsActive
                ? "blur(30px) brightness(50%)"
                : "none",
              WebkitBackdropFilter: cartIsActive
                ? "blur(30px) brightness(50%)"
                : "none",
              transition: "backdropFilter 0.5s ease",
              zIndex: finalBookingModal ? -1 : 50,
            }}
            onClick={(e) => {
              if (
                e.target.className ===
                "large_screen_shopping_cart_full_container"
              ) {
                dispatch(ACTION_CART_IS_NOT_ACTIVE());
              }
            }}
          >
            {item}
          </div>
        );
      }
    },
    [cartIsActive, cartSlideDelay, dispatch, finalBookingModal]
  );

  useEffect(() => {
    if (
      location.pathname === "/admin" ||
      location.pathname === "/account/login" ||
      location.pathname === "/account/completeregistration" ||
      location.pathname === "/account/signup"
    ) {
      document.body.classList.remove("height_hundred_percent");
      document.body.classList.add("height_remove_hundred_percent");
    } else {
      document.body.classList.remove("height_remove_hundred_percent");
      document.body.classList.add("height_hundred_percent");
    }
  }, [location.pathname]);

  useEffect(() => {
    const root = document.getElementsByTagName("html")[0];

    if (!currentScreenSize) {
      if (initialScreenSize >= 1200) {
        if (cartIsActive) {
          document.body.classList.add("no_scroll_no_fixed");
          root.classList.add("no_scroll_no_fixed");
        } else {
          document.body.classList.remove("no_scroll_no_fixed");
          root.classList.remove("no_scroll_no_fixed");
        }
      } else {
        document.body.classList.remove("no_scroll_no_fixed");
        root.classList.remove("no_scroll_no_fixed");
      }
    } else {
      if (currentScreenSize >= 1200) {
        if (cartIsActive) {
          document.body.classList.add("no_scroll_no_fixed");
          root.classList.add("no_scroll_no_fixed");
        } else {
          document.body.classList.remove("no_scroll_no_fixed");
          root.classList.remove("no_scroll_no_fixed");
        }
      } else {
        document.body.classList.remove("no_scroll_no_fixed");
        root.classList.remove("no_scroll_no_fixed");
      }
    }
  }, [cartIsActive, dispatch, currentScreenSize, initialScreenSize]);

  const treatmentsPageIsVisibleFunction = () => {
    return changeTreatmentsPageInView(true);
  };

  const treatmentsPageIsNotVisibleFunction = () => {
    return changeTreatmentsPageInView(false);
  };

  const handleScrollDirection = useCallback(
    (e) => {
      if (scrollValue > e.target.scrollTop) {
        if (scrollDirection !== "Up") {
          changeScrollDirection("Up");
        }
        changeScrollValue(e.target.scrollTop);
      } else if (scrollValue < e.target.scrollTop) {
        if (scrollDirection !== "Down") {
          changeScrollDirection("Down");
        }
        changeScrollValue(e.target.scrollTop);
      } else {
        return null;
      }
    },
    [scrollValue, scrollDirection]
  );

  useEffect(() => {
    const refVar = MainContainerRef.current;
    if (refVar) {
      changeScrollValue(refVar.scrollTop);

      refVar.addEventListener("scroll", handleScrollDirection);

      return () => {
        refVar.removeEventListener("scroll", handleScrollDirection);
      };
    }
  }, [handleScrollDirection]);

  // Used to prevent rubber banding effect on mobile phones while allowing scroll on other pages
  useEffect(() => {
    if (location.pathname !== "/") {
      iNoBounce.disable();
    } else {
      iNoBounce.enable();
    }
  }, [location.pathname]);

  return (
    <>
      {redirectToHome()}
      {redirectToRoot()}
      <Modal
        isOpen={logoutClicked}
        style={{
          content: {
            position: "fixed",
            zIndex: 10000,
            opacity: 0.99,
            height: "100%",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            paddingBottom: "10%",
            borderRadius: "none",
            width: "100vw",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            border: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <BounceLoader
          size={100}
          css={override}
          color={"rgb(44, 44, 52)"}
          loading={loadingSpinnerActive}
        />
        <Transition
          items={logoutClicked && !loadingSpinnerActive}
          from={{ transform: "translate3d(0, -65%, 0)" }}
          enter={{ transform: "translate3d(0, 0, 0)" }}
          leave={{ display: "none" }}
        >
          {(logoutClicked) =>
            logoutClicked &&
            ((props) => (
              <div className="log_out_modal" style={props}>
                <div className="log_out_modal_contents">
                  <FontAwesomeIcon
                    className="modal_x"
                    icon={faTimes}
                    onClick={() => dispatch(ACTION_LOG_OUT_CLICKED_RESET())}
                  />
                  <h2>Are you sure you want to log out?</h2>
                  <span className="logout_buttons_container">
                    <div className="logout_button" onClick={handleLogout}>
                      <p>LOG OUT</p>
                    </div>
                    <div
                      className="cancel_logout_button"
                      onClick={() => dispatch(ACTION_LOG_OUT_CLICKED_RESET())}
                    >
                      <p>CANCEL</p>
                    </div>
                  </span>
                </div>
              </div>
            ))
          }
        </Transition>
      </Modal>
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
            : "-100px",
        }}
        to={{ marginTop: "0px" }}
        config={{
          delay: 1800,
          duration: 1500,
        }}
        immediate={
          location.pathname.includes("account") ||
          location.pathname.includes("admin")
        }
      >
        {(styles) => (
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
                ? initialScreenSize < 1000
                  ? initialScreenSize > initialScreenHeight
                    ? "15vh"
                    : "8vh"
                  : "8vh"
                : currentScreenSize < 1000
                ? currentScreenSize > currentScreenHeight
                  ? "15vh"
                  : "8vh"
                : "8vh",
              paddingTop: "0vh",
              paddingBottom: "0vh",
              zIndex: finalBookButtonActive
                ? "auto"
                : location.pathname === "/"
                ? 999
                : location.pathname.includes("account") ||
                  location.pathname.includes("admin")
                ? 500
                : 999,
              display: loginIsActive ? "none" : "flex",
            }}
          >
            <ResponsiveNavigationBar
              scroll={scroll}
              handleNavbarToggle={handleNavbarToggle}
              currentScreenSize={currentScreenSize}
              initialScreenSize={initialScreenSize}
              currentScreenHeight={currentScreenHeight}
              initialScreenHeight={initialScreenHeight}
              handleClickToScrollToHome={handleClickToScrollToHome}
              handleClickToScrollToTreatments={handleClickToScrollToTreatments}
              handleClickToScrollToAddOns={handleClickToScrollToAddOns}
              handleClickToScrollToInstagram={handleClickToScrollToInstagram}
              handleClickToScrollToContact={handleClickToScrollToContact}
              adminDummyToken={adminDummyToken}
              getEmployeeData={getEmployeeData}
              scrollValue={scrollValue}
              ref={ref}
            />
          </header>
        )}
      </Spring>

      <ToastContainer
        toastClassName="toast_container"
        position={
          !currentScreenSize
            ? initialScreenSize >= 768
              ? !window.matchMedia("(orientation: landscape)").matches
                ? "bottom-center"
                : "bottom-right"
              : "bottom-right"
            : currentScreenSize >= 768
            ? !window.matchMedia("(orientation: landscape)").matches
              ? "bottom-center"
              : "bottom-right"
            : "bottom-right"
        }
        autoClose={3000}
        newestOnTop={false}
        hideProgressBar
        closeOnClick
        pauseOnVisibilityChange
        draggable={true}
        draggablePercent={20}
      />

      {renderSlideInShoppingCartContainer(largeScreenShoppingCartRender())}

      <Switch>
        <Route exact path="/">
          <KeepAlive saveScrollPosition="screen">
            <div
              className="main_container"
              onScroll={(e) => handleScrollDirection(e)}
              ref={MainContainerRef}
              style={{ overflow: splashScreenComplete ? "auto" : "hidden" }}
              id="main_container_element"
            >
              {redirectToCartRoutes()}
              <LandingPage
                currentScreenSize={currentScreenSize}
                initialScreenSize={initialScreenSize}
                currentScreenHeight={currentScreenHeight}
                initialScreenHeight={initialScreenHeight}
                handleClickToScrollToHome={handleClickToScrollToHome}
                handleClickToScrollToTreatments={
                  handleClickToScrollToTreatments
                }
                handleClickToScrollToAddOns={handleClickToScrollToAddOns}
                handleClickToScrollToInstagram={handleClickToScrollToInstagram}
                handleClickToScrollToContact={handleClickToScrollToContact}
                navbarVisible={navbarVisible}
                treatmentsPageInView={treatmentsPageInView}
                scrollDirection={scrollDirection}
                scrollValue={scrollValue}
                ref={ref}
                name="landing_page"
              />
              <AllTreatments
                name="treatments"
                currentScreenSize={currentScreenSize}
                initialScreenSize={initialScreenSize}
                Treatments1Ref={Treatments1Ref}
                resetAllCartStates={resetAllCartStates}
                treatmentsPageIsVisibleFunction={
                  treatmentsPageIsVisibleFunction
                }
                treatmentsPageIsNotVisibleFunction={
                  treatmentsPageIsNotVisibleFunction
                }
                treatmentsPageInView={treatmentsPageInView}
                scrollValue={scrollValue}
              />
              <AllAddOns
                name="add_ons"
                currentScreenSize={currentScreenSize}
                initialScreenSize={initialScreenSize}
                AddOnsRef={AddOnsRef}
                resetAllCartStatesExceptTreatments={
                  resetAllCartStatesExceptTreatments
                }
              />
              <FollowUs
                name="instagram"
                initialScreenSize={initialScreenSize}
                currentScreenSize={currentScreenSize}
                InstagramRef={InstagramRef}
              />
              <ContactUs
                name="contact"
                initialScreenSize={initialScreenSize}
                currentScreenSize={currentScreenSize}
                ContactRef={ContactRef}
              />
            </div>
          </KeepAlive>
        </Route>

        {cartIsActive ? (
          cartPageOpened === "Cart" ? (
            <Route
              render={() => (
                <ShoppingCart
                  path="/cart"
                  getEmployeesData={getEmployeesData}
                  initialScreenSize={initialScreenSize}
                  currentScreenSize={currentScreenSize}
                  resetAllCartStates={resetAllCartStates}
                  resetAllCartStatesExceptTreatments={
                    resetAllCartStatesExceptTreatments
                  }
                />
              )}
            />
          ) : cartPageOpened === "Availability" ||
            cartPageOpened === "TimePreference" ? (
            <Route
              render={() => (
                <AvailabilityRouter
                  path="/availability"
                  getEmployeesData={getEmployeesData}
                  initialScreenSize={initialScreenSize}
                  currentScreenSize={currentScreenSize}
                />
              )}
            />
          ) : null
        ) : null}

        <Route path="/checkout" component={CheckoutRouter} />

        <Route
          render={() =>
            location.pathname.includes("account") ? (
              <AccountRouter
                path="/account"
                initialScreenSize={initialScreenSize}
                currentScreenSize={currentScreenSize}
                getClientData={getClientData ? getClientData : null}
                clientDataRefetch={clientDataRefetch}
              />
            ) : location.pathname.includes("admin") ? (
              <AdminRouter
                path="/admin"
                initialScreenSize={initialScreenSize}
                currentScreenSize={currentScreenSize}
                getEmployeeData={getEmployeeData ? getEmployeeData : null}
                getEmployeesData={getEmployeesData ? getEmployeesData : null}
                getEmployeesRefetch={getEmployeesRefetch}
                getEmployeesLoading={getEmployeesLoading}
              />
            ) : cartPageOpened === "PaymentInfo" ? (
              <PaymentInfo
                exact
                path="/paymentinfo"
                getClientData={getClientData ? getClientData : null}
                clientDataRefetch={clientDataRefetch}
                initialScreenSize={initialScreenSize}
                currentScreenSize={currentScreenSize}
              />
            ) : null
          }
        />
        {/* If no path matches, redirect to home */}
        <Route render={() => <Redirect to="/" />} />
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
