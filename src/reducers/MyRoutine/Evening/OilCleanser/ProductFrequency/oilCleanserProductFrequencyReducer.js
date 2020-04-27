const OIL_CLEANSER_PRODUCT_FREQUENCY = "OIL_CLEANSER_PRODUCT_FREQUENCY";
const RESET_ALL_OIL_CLEANSER_FIELDS = "RESET_ALL_OIL_CLEANSER_FIELDS";

const oilCleanserProductFrequencyReducer = (
  state = { oil_cleanser_product_frequency: "" },
  action
) => {
  switch (action.type) {
    case OIL_CLEANSER_PRODUCT_FREQUENCY:
      return {
        ...state,
        oil_cleanser_product_frequency: action.oil_cleanser_product_frequency,
      };
    case RESET_ALL_OIL_CLEANSER_FIELDS:
      return { ...state, oil_cleanser_product_frequency: "" };
    default:
      return { ...state };
  }
};

export default oilCleanserProductFrequencyReducer;
