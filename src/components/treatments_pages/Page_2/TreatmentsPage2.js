import React, { useState, useEffect } from "react";
import Bacial from "../../treatments/Bacial/Bacial";
import Glow from "../../treatments/Glow/Glow";
import Rejuvenate from "../../treatments/Rejuvenate/Rejuvenate";
import Quench from "../../treatments/Quench/Quench";
import { useSelector, useDispatch } from "react-redux";
import "./TreatmentsPage2.css";
import { toast } from "react-toastify";
import NotSurePopUp from "./NotSurePopUp/NotSurePopUp";
import InView from "react-intersection-observer";
import ACTION_UNSURE_POP_UP_TRIGGERED from "../../../actions/UnsurePopUp/ACTION_UNSURE_POP_UP_TRIGGERED";
import { useLocation } from "react-router-dom";

const TreatmentsPage2 = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();

  // In Cart states
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
  const unsurePopUpTriggered = useSelector(
    (state) => state.unsurePopUpTriggered.unsure_pop_up_triggered
  );

  const cartIsActive = useSelector((state) => state.cartIsActive.cartIsActive);

  const [bacialRendered, changeBacialRendered] = useState("none");
  const [rejuvenateRendered, changeRejuvenateRendered] = useState("none");
  const [quenchRendered, changeQuenchRendered] = useState("grid");

  useEffect(() => {
    if (props.currentScreenSize === "") {
      if (props.initialScreenSize >= 1200) {
        changeBacialRendered("none");
      } else {
        changeBacialRendered("grid");
      }
    } else {
      if (props.currentScreenSize >= 1200) {
        changeBacialRendered("none");
      } else {
        changeBacialRendered("grid");
      }
    }
  }, [changeBacialRendered, props.currentScreenSize, props.initialScreenSize]);

  useEffect(() => {
    if (props.currentScreenSize === "") {
      if (props.initialScreenSize >= 600 && props.initialScreenSize <= 1200) {
        changeRejuvenateRendered("none");
      } else {
        changeRejuvenateRendered("grid");
      }
    } else {
      if (props.currentScreenSize >= 600 && props.currentScreenSize <= 1200) {
        changeRejuvenateRendered("none");
      } else {
        changeRejuvenateRendered("grid");
      }
    }
  }, [
    changeRejuvenateRendered,
    props.currentScreenSize,
    props.initialScreenSize,
  ]);

  useEffect(() => {
    if (props.currentScreenSize === "") {
      if (props.initialScreenSize >= 1200) {
        changeQuenchRendered("grid");
      } else {
        changeQuenchRendered("none");
      }
    } else {
      if (props.currentScreenSize >= 1200) {
        changeQuenchRendered("grid");
      } else {
        changeQuenchRendered("none");
      }
    }
  }, [changeQuenchRendered, props.currentScreenSize, props.initialScreenSize]);

  useEffect(() => {
    if (unsurePopUpTriggered === 1) {
      if (
        !calmInCart &&
        !bacialInCart &&
        !cbdInCart &&
        !chemicalPeelInCart &&
        !clarifyInCart &&
        !dermaplaningInCart &&
        !glowInCart &&
        !microneedleInCart &&
        !quenchInCart &&
        !quickieInCart &&
        !rejuvenateInCart &&
        !unsureInCart &&
        !saltCaveInCart &&
        !cartIsActive &&
        location.pathname === "/"
      ) {
        toast.dismiss();
        const unsureToastDeployDelay = setTimeout(() => {
          toast(
            <NotSurePopUp
              currentScreenSize={props.currentScreenSize}
              initialScreenSize={props.initialScreenSize}
            />,
            {
              className: "toast_container",
              autoClose: false,
              closeButton: false,
            }
          );
        }, 3000);

        return () => {
          clearTimeout(unsureToastDeployDelay);
        };
      } else {
        dispatch(ACTION_UNSURE_POP_UP_TRIGGERED());
      }
    }
  }, [
    bacialInCart,
    calmInCart,
    cbdInCart,
    chemicalPeelInCart,
    clarifyInCart,
    dermaplaningInCart,
    glowInCart,
    microneedleInCart,
    unsureInCart,
    props.currentScreenSize,
    props.initialScreenSize,
    quenchInCart,
    quickieInCart,
    rejuvenateInCart,
    unsurePopUpTriggered,
    cartIsActive,
    saltCaveInCart,
    dispatch,
    location.pathname,
  ]);

  return (
    <InView
      as="div"
      className="treatments_page_2_container"
      onChange={(inView) => {
        if (inView) {
          if (unsurePopUpTriggered < 2) {
            dispatch(ACTION_UNSURE_POP_UP_TRIGGERED());
          }
        }
      }}
    >
      <Bacial
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        bacialRendered={bacialRendered}
        resetAllCartStates={props.resetAllCartStates}
      />
      <Glow
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        resetAllCartStates={props.resetAllCartStates}
      />
      <Rejuvenate
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        rejuvenateRendered={rejuvenateRendered}
        resetAllCartStates={props.resetAllCartStates}
      />
      <Quench
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        quenchRendered={quenchRendered}
        resetAllCartStates={props.resetAllCartStates}
      />
    </InView>
  );
};

export default TreatmentsPage2;
