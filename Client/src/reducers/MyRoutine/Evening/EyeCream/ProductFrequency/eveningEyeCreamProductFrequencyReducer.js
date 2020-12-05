const EVENING_EYE_CREAM_PRODUCT_FREQUENCY =
  "EVENING_EYE_CREAM_PRODUCT_FREQUENCY";
const RESET_ALL_EVENING_EYE_CREAM_FIELDS = "RESET_ALL_EVENING_EYE_CREAM_FIELDS";

const eveningEyeCreamProductFrequencyReducer = (
  state = { evening_eye_cream_product_frequency: "" },
  action
) => {
  switch (action.type) {
    case EVENING_EYE_CREAM_PRODUCT_FREQUENCY:
      return {
        ...state,
        evening_eye_cream_product_frequency:
          action.evening_eye_cream_product_frequency,
      };
    case RESET_ALL_EVENING_EYE_CREAM_FIELDS:
      return { ...state, evening_eye_cream_product_frequency: "" };
    default:
      return { ...state };
  }
};

export default eveningEyeCreamProductFrequencyReducer;
