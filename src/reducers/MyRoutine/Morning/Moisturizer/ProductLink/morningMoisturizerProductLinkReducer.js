const MORNING_MOISTURIZER_PRODUCT_LINK = "MORNING_MOISTURIZER_PRODUCT_LINK";
const RESET_ALL_MORNING_MOISTURIZER_FIELDS =
  "RESET_ALL_MORNING_MOISTURIZER_FIELDS";

const morningMoisturizerProductLinkReducer = (
  state = { morning_moisturizer_product_link: "" },
  action
) => {
  switch (action.type) {
    case MORNING_MOISTURIZER_PRODUCT_LINK:
      return {
        ...state,
        morning_moisturizer_product_link:
          action.morning_moisturizer_product_link,
      };
    case RESET_ALL_MORNING_MOISTURIZER_FIELDS:
      return { ...state, morning_moisturizer_product_link: "" };
    default:
      return { ...state };
  }
};

export default morningMoisturizerProductLinkReducer;
