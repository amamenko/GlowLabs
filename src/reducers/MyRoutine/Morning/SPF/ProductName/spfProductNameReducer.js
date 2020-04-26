const SPF_PRODUCT_NAME = "SPF_PRODUCT_NAME";
const RESET_ALL_SPF_FIELDS = "RESET_ALL_SPF_FIELDS";

const spfProductNameReducer = (state = { spf_product_name: "" }, action) => {
  switch (action.type) {
    case SPF_PRODUCT_NAME:
      return {
        ...state,
        spf_product_name: action.spf_product_name,
      };
    case RESET_ALL_SPF_FIELDS:
      return { ...state, spf_product_name: "" };
    default:
      return { ...state };
  }
};

export default spfProductNameReducer;
