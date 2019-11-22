import { combineReducers } from "redux";
import calmToggleReducer from "./reducers/Treatments/Calm/calmToggleReducer";
import clarifyToggleReducer from "./reducers/Treatments/Clarify/clarifyToggleReducer";

const RootReducer = combineReducers({
  calmToggle: calmToggleReducer,
  clarifyToggle: clarifyToggleReducer
});

export default RootReducer;
