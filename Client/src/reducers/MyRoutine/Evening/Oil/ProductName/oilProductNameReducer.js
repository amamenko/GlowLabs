const OIL_PRODUCT_NAME = "OIL_PRODUCT_NAME";
const RESET_ALL_OIL_FIELDS = "RESET_ALL_OIL_FIELDS";

const oilProductNameReducer = (state = { oil_product_name: "" }, action) => {
  switch (action.type) {
    case OIL_PRODUCT_NAME:
      return {
        ...state,
        oil_product_name: action.oil_product_name,
      };
    case RESET_ALL_OIL_FIELDS:
      return { ...state, oil_product_name: "" };
    default:
      return { ...state };
  }
};

export default oilProductNameReducer;
