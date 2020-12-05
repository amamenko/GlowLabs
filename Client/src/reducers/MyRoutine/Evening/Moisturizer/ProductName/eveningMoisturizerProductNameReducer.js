const EVENING_MOISTURIZER_PRODUCT_NAME = "EVENING_MOISTURIZER_PRODUCT_NAME";
const RESET_ALL_EVENING_MOISTURIZER_FIELDS =
  "RESET_ALL_EVENING_MOISTURIZER_FIELDS";

const eveningMoisturizerProductNameReducer = (
  state = { evening_moisturizer_product_name: "" },
  action
) => {
  switch (action.type) {
    case EVENING_MOISTURIZER_PRODUCT_NAME:
      return {
        ...state,
        evening_moisturizer_product_name:
          action.evening_moisturizer_product_name,
      };
    case RESET_ALL_EVENING_MOISTURIZER_FIELDS:
      return { ...state, evening_moisturizer_product_name: "" };
    default:
      return { ...state };
  }
};

export default eveningMoisturizerProductNameReducer;
