import React from "react";
import { Keyframes } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcase, faSquare } from "@fortawesome/free-solid-svg-icons";

const SuitcaseBounce = Keyframes.Spring({
  suitcaseBounce: [
    {
      marginTop: "0px",
      color: "rgb(155, 98, 107)",
      config: { duration: 100 }
    },
    {
      marginTop: "-9px",
      color: "rgb(155, 98, 107)",
      config: { duration: 300 }
    },
    {
      marginTop: "0px",
      color: "rgb(155, 98, 107)",
      config: { duration: 200 }
    },
    {
      marginTop: "-6",
      color: "rgb(155, 98, 107)",
      config: { duration: 200 }
    },
    {
      marginTop: "0px",
      color: "rgb(155, 98, 107)",
      config: { duration: 200 }
    },
    {
      marginTop: "-4px",
      color: "rgb(155, 98, 107)",
      config: { duration: 200 }
    },
    {
      marginTop: "0px",
      color: "rgb(155, 98, 107)",
      config: { duration: 200 }
    }
  ]
});

const CalmSuitcase = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <SuitcaseBounce state="suitcaseBounce">
      {styles => (
        <span
          className="fa-layers fa-fw"
          style={
            props.calmToggle
              ? props.calmInCart |
                props.bacialInCart |
                props.cbdInCart |
                props.chemicalPeelInCart |
                props.clarifyInCart |
                props.dermaplaningInCart |
                props.glowInCart |
                props.microneedleInCart |
                props.quenchInCart |
                props.quickieInCart |
                props.rejuvenateInCart
                ? { position: "relative" }
                : styles
              : { position: "relative" }
          }
          onClick={() => props.addToCart()}
        >
          <FontAwesomeIcon
            color={
              props.calmToggle
                ? props.calmInCart
                  ? "rgba(119, 221, 119, 0.6)"
                  : props.bacialInCart |
                    props.cbdInCart |
                    props.chemicalPeelInCart |
                    props.clarifyInCart |
                    props.dermaplaningInCart |
                    props.glowInCart |
                    props.microneedleInCart |
                    props.quenchInCart |
                    props.quickieInCart |
                    props.rejuvenateInCart
                  ? "rgba(211, 211, 211, 0.8)"
                  : "rgba(255, 198, 207, 0.8)"
                : props.calmInCart
                ? "rgb(119, 221, 119, 0.6)"
                : props.bacialInCart |
                  props.cbdInCart |
                  props.chemicalPeelInCart |
                  props.clarifyInCart |
                  props.dermaplaningInCart |
                  props.glowInCart |
                  props.microneedleInCart |
                  props.quenchInCart |
                  props.quickieInCart |
                  props.rejuvenateInCart
                ? "rgba(211, 211, 211, 0.8)"
                : "rgba(255, 198, 207, 0.6)"
            }
            transform="grow-20"
            icon={faSquare}
          />
          {props.checkMark()}
          <FontAwesomeIcon
            style={{ display: props.calmInCart ? "none" : "block" }}
            color={
              props.bacialInCart |
              props.cbdInCart |
              props.chemicalPeelInCart |
              props.clarifyInCart |
              props.dermaplaningInCart |
              props.glowInCart |
              props.microneedleInCart |
              props.quenchInCart |
              props.quickieInCart |
              props.rejuvenateInCart
                ? "rgb(151, 151, 151)"
                : "rgb(175, 118, 127)"
            }
            icon={faSuitcase}
          />
        </span>
      )}
    </SuitcaseBounce>
  </div>
));

export default CalmSuitcase;
