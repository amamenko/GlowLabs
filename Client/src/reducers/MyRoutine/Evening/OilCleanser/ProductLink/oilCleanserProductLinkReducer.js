const OIL_CLEANSER_PRODUCT_LINK = "OIL_CLEANSER_PRODUCT_LINK";
const RESET_ALL_OIL_CLEANSER_FIELDS = "RESET_ALL_OIL_CLEANSER_FIELDS";

const oilCleanserProductLinkReducer = (
  state = { oil_cleanser_product_link: "" },
  action
) => {
  switch (action.type) {
    case OIL_CLEANSER_PRODUCT_LINK:
      return {
        ...state,
        oil_cleanser_product_link: action.oil_cleanser_product_link,
      };
    case RESET_ALL_OIL_CLEANSER_FIELDS:
      return { ...state, oil_cleanser_product_link: "" };
    default:
      return { ...state };
  }
};

export default oilCleanserProductLinkReducer;
