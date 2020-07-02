import React, { useEffect, useCallback } from "react";
import "./ShoppingCart.css";
import { Link, useLocation, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faChevronLeft,
  faChevronRight,
  faChevronCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import ACTION_CART_IS_NOT_ACTIVE from "../../actions/CartIsActive/ACTION_CART_IS_NOT_ACTIVE";
import ACTION_AVAILABILITY_CLICKED from "../../actions/AvailabilityClicked/ACTION_AVAILABILITY_CLICKED";
import { useDispatch, useSelector } from "react-redux";
import CalmCard from "./Treatment_Cards/Calm/CalmCard";
import ClarifyCard from "./Treatment_Cards/Clarify/ClarifyCard";
import CBDCard from "./Treatment_Cards/CBD/CBDCard";
import GlowCard from "./Treatment_Cards/Glow/GlowCard";
import DermaplaningCard from "./Treatment_Cards/Dermaplaning/DermaplaningCard";
import ChemicalPeelCard from "./Treatment_Cards/ChemicalPeel/ChemicalPeelCard";
import BacialCard from "./Treatment_Cards/Bacial/BacialCard";
import MicroneedleCard from "./Treatment_Cards/Microneedle/MicroneedleCard";
import RejuvenateCard from "./Treatment_Cards/Rejuvenate/RejuvenateCard";
import QuickieCard from "./Treatment_Cards/Quickie/QuickieCard";
import QuenchCard from "./Treatment_Cards/Quench/QuenchCard";
import ExtraExtractionsCard from "./Add_On_Cards/ExtraExtractions/ExtraExtractionsCard";
import HydroJellyMaskCard from "./Add_On_Cards/HydroJellyMask/HydroJellyMaskCard";
import LEDTherapyCard from "./Add_On_Cards/LEDTherapy/LEDTherapyCard";
import MicrocurrentCard from "./Add_On_Cards/Microcurrent/MicrocurrentCard";
import MicrodermabrasionCard from "./Add_On_Cards/Microdermabrasion/MicrodermabrasionCard";
import DermarollingCard from "./Add_On_Cards/Dermarolling/DermarollingCard";
import NanoNeedlingCard from "./Add_On_Cards/NanoNeedling/NanoNeedlingCard";
import GuaShaCard from "./Add_On_Cards/GuaSha/GuaShaCard";
import BeardCard from "./Add_On_Cards/Beard/BeardCard";
import UnsureCard from "./Treatment_Cards/Unsure/UnsureCard";
import SaltCaveCard from "./Treatment_Cards/SaltCave/SaltCaveCard";
import NoFacialSelected from "./Treatment_Cards/NoFacialSelected";
import ACTION_TOTAL_PRICE from "../../actions/TotalPrice/ACTION_TOTAL_PRICE";
import { FormGroup, Input } from "reactstrap";
import ACTION_AVAILABILITY_PAGE_OPENED from "../../actions/InCart/CartPageOpened/ACTION_AVAILABILITY_PAGE_OPENED";
import ACTION_SELECTED_ESTHETICIAN from "../../actions/SelectedEsthetician/ACTION_SELECTED_ESTHETICIAN";
import ACTION_SELECTED_ESTHETICIAN_RESET from "../../actions/SelectedEsthetician/ACTION_SELECTED_ESTHETICIAN_RESET";
import { useMemo } from "react";
import ACTION_CART_IS_ACTIVE from "../../actions/CartIsActive/ACTION_CART_IS_ACTIVE";
import ACTION_CART_PAGE_RESET from "../../actions/InCart/CartPageOpened/ACTION_CART_PAGE_RESET";

const ShoppingCart = (props) => {
  const dispatch = useDispatch();
  let location = useLocation();

  // In Cart states
  // Treatments
  const calmInCart = useSelector((state) => state.calmInCart.in_cart);
  const clarifyInCart = useSelector((state) => state.clarifyInCart.in_cart);
  const bacialInCart = useSelector((state) => state.bacialInCart.in_cart);
  const glowInCart = useSelector((state) => state.glowInCart.in_cart);
  const cbdInCart = useSelector((state) => state.cbdInCart.in_cart);
  const chemicalPeelInCart = useSelector(
    (state) => state.chemicalPeelInCart.in_cart
  );
  const dermaplaningInCart = useSelector(
    (state) => state.dermaplaningInCart.in_cart
  );
  const microneedleInCart = useSelector(
    (state) => state.microneedleInCart.in_cart
  );
  const quenchInCart = useSelector((state) => state.quenchInCart.in_cart);
  const quickieInCart = useSelector((state) => state.quickieInCart.in_cart);
  const rejuvenateInCart = useSelector(
    (state) => state.rejuvenateInCart.in_cart
  );
  const unsureInCart = useSelector((state) => state.unsureInCart.in_cart);
  const saltCaveInCart = useSelector((state) => state.saltCaveInCart.in_cart);

  const addOnsArr = useSelector((state) => state.addOnsArr.add_ons_arr);
  const treatmentsArr = useSelector(
    (state) => state.treatmentsArr.treatments_arr
  );
  const counter = useSelector((state) => state.counterReducer.counter);
  const availabilityClicked = useSelector(
    (state) => state.availabilityClicked.availabilityClicked
  );
  const totalPrice = useSelector((state) => state.totalPrice.totalPrice);
  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );
  const selectedEsthetician = useSelector(
    (state) => state.selectedEsthetician.selectedEsthetician
  );

  const redirectToHome = () => {
    if (!splashScreenComplete) {
      return <Redirect to="/" />;
    } else if (!props.currentScreenSize) {
      if (props.initialScreenSize >= 1200) {
        if (location.pathname !== "/") {
          return <Redirect to="/" />;
        }
      }
    } else if (props.currentScreenSize >= 1200) {
      if (location.pathname !== "/") {
        return <Redirect to="/" />;
      }
    }
  };

  const backToHome = () => {
    dispatch(ACTION_CART_IS_NOT_ACTIVE());
    dispatch(ACTION_CART_PAGE_RESET());
  };

  const availabilityHasBeenClicked = () => {
    dispatch(ACTION_AVAILABILITY_PAGE_OPENED());
    if (!availabilityClicked) {
      dispatch(ACTION_AVAILABILITY_CLICKED());
      document.body.style.setProperty("background", "rgb(255, 255, 255)");
    }
  };

  const renderCartFacials = () => {
    if (counter === 0) {
      return (
        <>
          <div className="empty_cart_container">
            <FontAwesomeIcon
              className="empty_shopping_cart"
              color="rgba(211, 211, 211, 0.6)"
              icon={faShoppingCart}
            />
            <h3>No items in your cart</h3>
          </div>
          <p className="cart_statement">
            You do not have any facial treatments or add-ons in your cart right
            now
          </p>
        </>
      );
    } else {
      if (calmInCart) {
        return <CalmCard resetAllCartStates={props.resetAllCartStates} />;
      } else if (clarifyInCart) {
        return <ClarifyCard resetAllCartStates={props.resetAllCartStates} />;
      } else if (cbdInCart) {
        return <CBDCard resetAllCartStates={props.resetAllCartStates} />;
      } else if (glowInCart) {
        return <GlowCard resetAllCartStates={props.resetAllCartStates} />;
      } else if (dermaplaningInCart) {
        return (
          <DermaplaningCard resetAllCartStates={props.resetAllCartStates} />
        );
      } else if (chemicalPeelInCart) {
        return (
          <ChemicalPeelCard resetAllCartStates={props.resetAllCartStates} />
        );
      } else if (bacialInCart) {
        return <BacialCard resetAllCartStates={props.resetAllCartStates} />;
      } else if (microneedleInCart) {
        return (
          <MicroneedleCard resetAllCartStates={props.resetAllCartStates} />
        );
      } else if (rejuvenateInCart) {
        return <RejuvenateCard resetAllCartStates={props.resetAllCartStates} />;
      } else if (quickieInCart) {
        return <QuickieCard resetAllCartStates={props.resetAllCartStates} />;
      } else if (quenchInCart) {
        return <QuenchCard resetAllCartStates={props.resetAllCartStates} />;
      } else if (unsureInCart) {
        return <UnsureCard resetAllCartStates={props.resetAllCartStates} />;
      } else if (saltCaveInCart) {
        return <SaltCaveCard resetAllCartStates={props.resetAllCartStates} />;
      } else {
        if (addOnsArr.length > 0) {
          return (
            <NoFacialSelected
              addOnsArr={addOnsArr}
              resetAllCartStates={props.resetAllCartStates}
            />
          );
        }
      }
    }
  };

  const addOnsCardComponentsArr = [
    {
      name: "ExtraExtractions",
      component: (
        <ExtraExtractionsCard
          resetAllCartStatesExceptTreatments={
            props.resetAllCartStatesExceptTreatments
          }
        />
      ),
    },
    {
      name: "HydroJelly",
      component: (
        <HydroJellyMaskCard
          resetAllCartStatesExceptTreatments={
            props.resetAllCartStatesExceptTreatments
          }
        />
      ),
    },
    {
      name: "LED",
      component: (
        <LEDTherapyCard
          resetAllCartStatesExceptTreatments={
            props.resetAllCartStatesExceptTreatments
          }
        />
      ),
    },
    {
      name: "Microcurrent",
      component: (
        <MicrocurrentCard
          resetAllCartStatesExceptTreatments={
            props.resetAllCartStatesExceptTreatments
          }
        />
      ),
    },
    {
      name: "Microdermabrasion",
      component: (
        <MicrodermabrasionCard
          resetAllCartStatesExceptTreatments={
            props.resetAllCartStatesExceptTreatments
          }
        />
      ),
    },
    {
      name: "Dermarolling",
      component: (
        <DermarollingCard
          resetAllCartStatesExceptTreatments={
            props.resetAllCartStatesExceptTreatments
          }
        />
      ),
    },
    {
      name: "NanoNeedling",
      component: (
        <NanoNeedlingCard
          resetAllCartStatesExceptTreatments={
            props.resetAllCartStatesExceptTreatments
          }
        />
      ),
    },
    {
      name: "GuaSha",
      component: (
        <GuaShaCard
          resetAllCartStatesExceptTreatments={
            props.resetAllCartStatesExceptTreatments
          }
        />
      ),
    },
    {
      name: "Beard",
      component: (
        <BeardCard
          resetAllCartStatesExceptTreatments={
            props.resetAllCartStatesExceptTreatments
          }
        />
      ),
    },
  ];

  const componentNames = addOnsArr.map((item) => item.name);

  const renderCartAddOns = () => {
    let componentsArr = [];
    for (let i = 0; i < addOnsCardComponentsArr.length; i++) {
      if (componentNames.indexOf(addOnsCardComponentsArr[i].name) > -1) {
        componentsArr.push(addOnsCardComponentsArr[i].component);
      }
    }
    return componentsArr.map((item, index) => <div key={index}>{item}</div>);
  };

  const calculateSubtotal = useCallback(() => {
    let treatmentsPriceArr = [];
    let addOnsPriceArr = [];
    let cartSubtotal = null;

    if (treatmentsArr.length > 0) {
      treatmentsPriceArr = [treatmentsArr[0].price];
    }

    if (addOnsArr.length > 0) {
      addOnsPriceArr = addOnsArr.map((item) => item.price);
    }
    let totalPricesArr = addOnsPriceArr.concat(treatmentsPriceArr);

    if (totalPricesArr.length > 0) {
      cartSubtotal = totalPricesArr.reduce((a, b) => a + b);

      dispatch(ACTION_TOTAL_PRICE(cartSubtotal));
    }
  }, [addOnsArr, treatmentsArr, dispatch]);

  useEffect(() => {
    calculateSubtotal();
  }, [calculateSubtotal]);

  useEffect(() => {
    if (location.pathname.includes("cart")) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  useMemo(() => {
    if (saltCaveInCart) {
      dispatch(ACTION_SELECTED_ESTHETICIAN("Salt Cave"));
    }
  }, [dispatch, saltCaveInCart]);

  const renderEstheticianNames = () => {
    if (props.getEmployeesData) {
      if (props.getEmployeesData.employees) {
        const filteredEmployeesArr = props.getEmployeesData.employees.filter(
          (x) => {
            return x.employeeRole.includes("Esthetician");
          }
        );

        return filteredEmployeesArr.map((x, i) => {
          return (
            <option key={i}>
              {x.firstName[0].toUpperCase() +
                x.firstName.slice(1).toLowerCase() +
                " " +
                x.lastName[0].toUpperCase() +
                "."}
            </option>
          );
        });
      }
    }
  };

  useEffect(() => {
    dispatch(ACTION_CART_IS_ACTIVE());
    return () => {
      if (!props.currentScreenSize) {
        if (props.initialScreenSize < 1200) {
          dispatch(ACTION_CART_IS_NOT_ACTIVE());
        }
      } else if (props.currentScreenSize < 1200) {
        dispatch(ACTION_CART_IS_NOT_ACTIVE());
      }
    };
  }, [dispatch, props.currentScreenSize, props.initialScreenSize]);

  useEffect(() => {
    window.addEventListener("popstate", () => {
      if (document.location.href.includes("availability")) {
        dispatch(ACTION_AVAILABILITY_PAGE_OPENED());
      }
    });
  }, [dispatch]);

  return (
    <div className="shopping_cart_container">
      {redirectToHome()}
      <div
        className="shopping_cart_header"
        style={{
          borderBottom: counter === 0 ? "1px solid rgb(44, 44, 52)" : "none",
        }}
      >
        <Link
          to={location.pathname.includes("account") ? location.pathname : "/"}
          onClick={backToHome}
        >
          <FontAwesomeIcon
            className="shopping_cart_back_arrow"
            icon={faChevronLeft}
          />
        </Link>
        <h1>MY CART</h1>
        <Link
          to={
            !props.currentScreenSize
              ? props.initialScreenSize >= 1200
                ? "/"
                : "/availability"
              : props.currentScreenSize >= 1200
              ? "/"
              : "/availability"
          }
          onClick={() => dispatch(ACTION_AVAILABILITY_PAGE_OPENED())}
        >
          <FontAwesomeIcon
            className="shopping_cart_forward_arrow"
            style={{ display: availabilityClicked ? "block" : "none" }}
            icon={faChevronRight}
          />
        </Link>
      </div>
      <div
        className="cart_header"
        style={{ display: counter === 0 ? "none" : "flex" }}
      >
        <h2>MY {saltCaveInCart ? "TREATMENT" : "FACIAL"}</h2>
      </div>
      {renderCartFacials()}
      <div
        className="cart_header"
        style={{ display: addOnsArr.length === 0 ? "none" : "flex" }}
      >
        <h2>MY ADD-ON{addOnsArr.length > 1 ? "S" : null}</h2>
      </div>
      {renderCartAddOns()}
      <div
        className="cart_subtotal"
        style={{ display: counter === 0 ? "none" : "flex" }}
      >
        <p>Cart Subtotal</p>
        <p>${totalPrice}</p>
      </div>
      {treatmentsArr.length === 0 || saltCaveInCart ? null : (
        <div className="esthetician_preference_dropdown">
          <FormGroup className="esthetician_preference_formgroup">
            <p>
              Would you like to book an appointment with a particular
              esthetician?
            </p>
            <div className="esthetician_preference_dropdown_input_field">
              <FontAwesomeIcon
                className="esthetician_preference_dropdown_icon"
                icon={faChevronCircleDown}
              />
              <Input
                className="esthetician_preference_input"
                type="select"
                name="select"
                defaultValue={selectedEsthetician}
                id="esthetician_preference"
                onChange={(e) => {
                  props.resetAllCartStatesExceptTreatments();
                  if (e.target.value === "No preference") {
                    dispatch(ACTION_SELECTED_ESTHETICIAN_RESET());
                  } else {
                    dispatch(ACTION_SELECTED_ESTHETICIAN(e.target.value));
                  }
                }}
              >
                <option>No preference</option>
                {renderEstheticianNames()}
              </Input>
            </div>
          </FormGroup>
        </div>
      )}
      <Link
        to={
          !props.currentScreenSize
            ? props.initialScreenSize >= 1200
              ? "/"
              : "/availability"
            : props.currentScreenSize >= 1200
            ? "/"
            : "/availability"
        }
        onClick={availabilityHasBeenClicked}
        className="search_availability_button_container"
      >
        <div
          className="search_availability_button"
          style={{
            display: treatmentsArr.length === 0 ? "none" : "flex",
            marginTop: counter === 0 ? "0vh" : "2vh",
          }}
        >
          <p>Search Availability</p>
        </div>
      </Link>
      <Link
        to="/"
        onClick={backToHome}
        className="continue_shopping_button_container"
      >
        <div
          className="continue_shopping_button"
          style={{ marginTop: counter === 0 ? "0vh" : "1.5rem" }}
        >
          <p>Continue Shopping</p>
        </div>
      </Link>
    </div>
  );
};

export default ShoppingCart;
