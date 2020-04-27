const OIL_PRODUCT_FREQUENCY = "OIL_PRODUCT_FREQUENCY";
const RESET_ALL_OIL_FIELDS = "RESET_ALL_OIL_FIELDS";

const oilProductFrequencyReducer = (
  state = { oil_product_frequency: "" },
  action
) => {
  switch (action.type) {
    case OIL_PRODUCT_FREQUENCY:
      return {
        ...state,
        oil_product_frequency: action.oil_product_frequency,
      };
    case RESET_ALL_OIL_FIELDS:
      return { ...state, oil_product_frequency: "" };
    default:
      return { ...state };
  }
};

export default oilProductFrequencyReducer;
