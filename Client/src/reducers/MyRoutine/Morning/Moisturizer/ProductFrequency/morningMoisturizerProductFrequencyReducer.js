const MORNING_MOISTURIZER_PRODUCT_FREQUENCY =
  "MORNING_MOISTURIZER_PRODUCT_FREQUENCY";
const RESET_ALL_MORNING_MOISTURIZER_FIELDS =
  "RESET_ALL_MORNING_MOISTURIZER_FIELDS";

const morningMoisturizerProductFrequencyReducer = (
  state = { morning_moisturizer_product_frequency: "" },
  action
) => {
  switch (action.type) {
    case MORNING_MOISTURIZER_PRODUCT_FREQUENCY:
      return {
        ...state,
        morning_moisturizer_product_frequency:
          action.morning_moisturizer_product_frequency,
      };
    case RESET_ALL_MORNING_MOISTURIZER_FIELDS:
      return { ...state, morning_moisturizer_product_frequency: "" };
    default:
      return { ...state };
  }
};

export default morningMoisturizerProductFrequencyReducer;
