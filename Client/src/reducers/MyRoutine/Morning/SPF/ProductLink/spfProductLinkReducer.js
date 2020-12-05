const SPF_PRODUCT_LINK = "SPF_PRODUCT_LINK";
const RESET_ALL_SPF_FIELDS = "RESET_ALL_SPF_FIELDS";

const spfProductLinkReducer = (state = { spf_product_link: "" }, action) => {
  switch (action.type) {
    case SPF_PRODUCT_LINK:
      return {
        ...state,
        spf_product_link: action.spf_product_link,
      };
    case RESET_ALL_SPF_FIELDS:
      return { ...state, spf_product_link: "" };
    default:
      return { ...state };
  }
};

export default spfProductLinkReducer;
