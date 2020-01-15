import { combineReducers } from "redux";
import calmToggleReducer from "./reducers/Treatments/Calm/calmToggleReducer";
import clarifyToggleReducer from "./reducers/Treatments/Clarify/clarifyToggleReducer";
import bacialToggleReducer from "./reducers/Treatments/Bacial/bacialToggleReducer";
import glowToggleReducer from "./reducers/Treatments/Glow/glowToggleReducer";
import rejuvenateToggleReducer from "./reducers/Treatments/Rejuvenate/rejuvenateToggleReducer";
import quenchToggleReducer from "./reducers/Treatments/Quench/quenchToggleReducer";
import quickieToggleReducer from "./reducers/Treatments/Quickie/quickieToggleReducer";
import chemicalpeelToggleReducer from "./reducers/Treatments/ChemicalPeel/chemicalpeelToggleReducer";
import dermaplaningToggleReducer from "./reducers/Treatments/Dermaplaning/dermaplaningToggleReducer";
import cbdToggleReducer from "./reducers/Treatments/CBD/cbdToggleReducer";
import microneedleToggleReducer from "./reducers/Treatments/Microneedle/microneedleToggleReducer";
import navbarToggleReducer from "./reducers/Nav/navbarToggleReducer";
import bodyScrollReducer from "./reducers/Body_Scroll/bodyScrollReducer";
import beardToggleReducer from "./reducers/AddOns/Beard/beardToggleReducer";
import dermarollingToggleReducer from "./reducers/AddOns/Dermarolling/dermarollingToggleReducer";
import extraExtractionsToggleReducer from "./reducers/AddOns/ExtraExtractions/extraExtractionsToggleReducer";
import guashaToggleReducer from "./reducers/AddOns/GuaSha/guashaToggleReducer";
import hydroJellyToggleReducer from "./reducers/AddOns/HydroJellyMask/hydroJellyToggleReducer";
import ledTherapyToggle from "./reducers/AddOns/LEDTherapy/ledTherapyToggleReducer";
import microcurrentToggleReducer from "./reducers/AddOns/Microcurrent/microcurrentToggleReducer";
import microdermabrasionToggleReducer from "./reducers/AddOns/Microdermabrasion/microdermabrasionToggleReducer";
import nanoneedlingToggleReducer from "./reducers/AddOns/Nanoneedling/nanoneedlingToggleReducer";
import scrollReducer from "./reducers/Scroll/scrollReducer";
import navbarIsVisibleReducer from "./reducers/NavbarIsVisible/navbarIsVisibleReducer";

const RootReducer = combineReducers({
  calmToggle: calmToggleReducer,
  clarifyToggle: clarifyToggleReducer,
  bacialToggle: bacialToggleReducer,
  glowToggle: glowToggleReducer,
  rejuvenateToggle: rejuvenateToggleReducer,
  quenchToggle: quenchToggleReducer,
  quickieToggle: quickieToggleReducer,
  chemicalpeelToggle: chemicalpeelToggleReducer,
  dermaplaningToggle: dermaplaningToggleReducer,
  cbdToggle: cbdToggleReducer,
  microneedleToggle: microneedleToggleReducer,
  navbarToggle: navbarToggleReducer,
  bodyScrollToggle: bodyScrollReducer,
  beardToggle: beardToggleReducer,
  dermarollingToggle: dermarollingToggleReducer,
  extraExtractionsToggle: extraExtractionsToggleReducer,
  guashaToggle: guashaToggleReducer,
  hydroJellyToggle: hydroJellyToggleReducer,
  ledTherapyToggle: ledTherapyToggle,
  microcurrentToggle: microcurrentToggleReducer,
  microdermabrasionToggle: microdermabrasionToggleReducer,
  nanoneedlingToggle: nanoneedlingToggleReducer,
  scrollToggle: scrollReducer,
  navbarIsVisibleReducer: navbarIsVisibleReducer
});

export default RootReducer;
