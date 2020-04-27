const EVENING_SERUM_PRODUCT_FREQUENCY = "EVENING_SERUM_PRODUCT_FREQUENCY";
const RESET_ALL_EVENING_SERUM_FIELDS = "RESET_ALL_EVENING_SERUM_FIELDS";

const eveningSerumProductFrequencyReducer = (
  state = { evening_serum_product_frequency: "" },
  action
) => {
  switch (action.type) {
    case EVENING_SERUM_PRODUCT_FREQUENCY:
      return {
        ...state,
        evening_serum_product_frequency: action.evening_serum_product_frequency,
      };
    case RESET_ALL_EVENING_SERUM_FIELDS:
      return { ...state, evening_serum_product_frequency: "" };
    default:
      return { ...state };
  }
};

export default eveningSerumProductFrequencyReducer;
