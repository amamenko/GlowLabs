const MORNING_EYE_CREAM_PRODUCT_FREQUENCY =
  "MORNING_EYE_CREAM_PRODUCT_FREQUENCY";
const RESET_ALL_MORNING_EYE_CREAM_FIELDS = "RESET_ALL_MORNING_EYE_CREAM_FIELDS";

const morningEyeCreamProductFrequencyReducer = (
  state = { morning_eye_cream_product_frequency: "" },
  action
) => {
  switch (action.type) {
    case MORNING_EYE_CREAM_PRODUCT_FREQUENCY:
      return {
        ...state,
        morning_eye_cream_product_frequency:
          action.morning_eye_cream_product_frequency,
      };
    case RESET_ALL_MORNING_EYE_CREAM_FIELDS:
      return { ...state, morning_eye_cream_product_frequency: "" };
    default:
      return { ...state };
  }
};

export default morningEyeCreamProductFrequencyReducer;
