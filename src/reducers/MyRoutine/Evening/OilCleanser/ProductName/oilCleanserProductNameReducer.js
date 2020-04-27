const OIL_CLEANSER_PRODUCT_NAME = "OIL_CLEANSER_PRODUCT_NAME";
const RESET_ALL_OIL_CLEANSER_FIELDS = "RESET_ALL_OIL_CLEANSER_FIELDS";

const oilCleanserProductNameReducer = (
  state = { oil_cleanser_product_name: "" },
  action
) => {
  switch (action.type) {
    case OIL_CLEANSER_PRODUCT_NAME:
      return {
        ...state,
        oil_cleanser_product_name: action.oil_cleanser_product_name,
      };
    case RESET_ALL_OIL_CLEANSER_FIELDS:
      return { ...state, oil_cleanser_product_name: "" };
    default:
      return { ...state };
  }
};

export default oilCleanserProductNameReducer;
