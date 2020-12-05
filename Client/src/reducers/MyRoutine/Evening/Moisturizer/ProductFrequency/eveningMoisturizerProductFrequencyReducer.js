const EVENING_MOISTURIZER_PRODUCT_FREQUENCY =
  "EVENING_MOISTURIZER_PRODUCT_FREQUENCY";
const RESET_ALL_EVENING_MOISTURIZER_FIELDS =
  "RESET_ALL_EVENING_MOISTURIZER_FIELDS";

const eveningMoisturizerProductFrequencyReducer = (
  state = { evening_moisturizer_product_frequency: "" },
  action
) => {
  switch (action.type) {
    case EVENING_MOISTURIZER_PRODUCT_FREQUENCY:
      return {
        ...state,
        evening_moisturizer_product_frequency:
          action.evening_moisturizer_product_frequency,
      };
    case RESET_ALL_EVENING_MOISTURIZER_FIELDS:
      return { ...state, evening_moisturizer_product_frequency: "" };
    default:
      return { ...state };
  }
};

export default eveningMoisturizerProductFrequencyReducer;
