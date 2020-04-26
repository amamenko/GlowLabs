const MORNING_CLEANSER_PRODUCT_FREQUENCY = "MORNING_CLEANSER_PRODUCT_FREQUENCY";
const RESET_ALL_MORNING_CLEANSER_FIELDS = "RESET_ALL_MORNING_CLEANSER_FIELDS";

const morningCleanserProductFrequencyReducer = (
  state = { morning_cleanser_product_frequency: "" },
  action
) => {
  switch (action.type) {
    case MORNING_CLEANSER_PRODUCT_FREQUENCY:
      return {
        ...state,
        morning_cleanser_product_frequency:
          action.morning_cleanser_product_frequency,
      };
    case RESET_ALL_MORNING_CLEANSER_FIELDS:
      return { ...state, morning_cleanser_product_frequency: "" };
    default:
      return { ...state };
  }
};

export default morningCleanserProductFrequencyReducer;
