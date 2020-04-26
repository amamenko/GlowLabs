const MORNING_SERUM_PRODUCT_LINK = "MORNING_SERUM_PRODUCT_LINK";
const RESET_ALL_MORNING_SERUM_FIELDS = "RESET_ALL_MORNING_SERUM_FIELDS";

const morningSerumProductLinkReducer = (
  state = { morning_serum_product_link: "" },
  action
) => {
  switch (action.type) {
    case MORNING_SERUM_PRODUCT_LINK:
      return {
        ...state,
        morning_serum_product_link: action.morning_serum_product_link,
      };
    case RESET_ALL_MORNING_SERUM_FIELDS:
      return { ...state, morning_serum_product_link: "" };
    default:
      return { ...state };
  }
};

export default morningSerumProductLinkReducer;
