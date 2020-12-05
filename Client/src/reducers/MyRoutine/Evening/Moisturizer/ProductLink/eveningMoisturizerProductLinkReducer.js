const EVENING_MOISTURIZER_PRODUCT_LINK = "EVENING_MOISTURIZER_PRODUCT_LINK";
const RESET_ALL_EVENING_MOISTURIZER_FIELDS =
  "RESET_ALL_EVENING_MOISTURIZER_FIELDS";

const eveningMoisturizerProductLinkReducer = (
  state = { evening_moisturizer_product_link: "" },
  action
) => {
  switch (action.type) {
    case EVENING_MOISTURIZER_PRODUCT_LINK:
      return {
        ...state,
        evening_moisturizer_product_link:
          action.evening_moisturizer_product_link,
      };
    case RESET_ALL_EVENING_MOISTURIZER_FIELDS:
      return { ...state, evening_moisturizer_product_link: "" };
    default:
      return { ...state };
  }
};

export default eveningMoisturizerProductLinkReducer;
