const MORNING_SERUM_PRODUCT_FREQUENCY = "MORNING_SERUM_PRODUCT_FREQUENCY";
const RESET_ALL_MORNING_SERUM_FIELDS = "RESET_ALL_MORNING_SERUM_FIELDS";

const morningSerumProductFrequencyReducer = (
  state = { morning_serum_product_frequency: "" },
  action
) => {
  switch (action.type) {
    case MORNING_SERUM_PRODUCT_FREQUENCY:
      return {
        ...state,
        morning_serum_product_frequency: action.morning_serum_product_frequency,
      };
    case RESET_ALL_MORNING_SERUM_FIELDS:
      return { ...state, morning_serum_product_frequency: "" };
    default:
      return { ...state };
  }
};

export default morningSerumProductFrequencyReducer;
