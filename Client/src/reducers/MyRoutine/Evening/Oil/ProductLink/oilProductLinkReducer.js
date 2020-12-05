const OIL_PRODUCT_LINK = "OIL_PRODUCT_LINK";
const RESET_ALL_OIL_FIELDS = "RESET_ALL_OIL_FIELDS";

const oilProductLinkReducer = (state = { oil_product_link: "" }, action) => {
  switch (action.type) {
    case OIL_PRODUCT_LINK:
      return {
        ...state,
        oil_product_link: action.oil_product_link,
      };
    case RESET_ALL_OIL_FIELDS:
      return { ...state, oil_product_link: "" };
    default:
      return { ...state };
  }
};

export default oilProductLinkReducer;
