const EVENING_CLEANSER_PRODUCT_FREQUENCY = "EVENING_CLEANSER_PRODUCT_FREQUENCY";
const RESET_ALL_EVENING_CLEANSER_FIELDS = "RESET_ALL_EVENING_CLEANSER_FIELDS";

const eveningCleanserProductFrequencyReducer = (
  state = { evening_cleanser_product_frequency: "" },
  action
) => {
  switch (action.type) {
    case EVENING_CLEANSER_PRODUCT_FREQUENCY:
      return {
        ...state,
        evening_cleanser_product_frequency:
          action.evening_cleanser_product_frequency,
      };
    case RESET_ALL_EVENING_CLEANSER_FIELDS:
      return { ...state, evening_cleanser_product_frequency: "" };
    default:
      return { ...state };
  }
};

export default eveningCleanserProductFrequencyReducer;
