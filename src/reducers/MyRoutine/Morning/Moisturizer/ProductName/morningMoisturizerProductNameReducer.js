const MORNING_MOISTURIZER_PRODUCT_NAME = "MORNING_MOISTURIZER_PRODUCT_NAME";
const RESET_ALL_MORNING_MOISTURIZER_FIELDS =
  "RESET_ALL_MORNING_MOISTURIZER_FIELDS";

const morningMoisturizerProductNameReducer = (
  state = { morning_moisturizer_product_name: "" },
  action
) => {
  switch (action.type) {
    case MORNING_MOISTURIZER_PRODUCT_NAME:
      return {
        ...state,
        morning_moisturizer_product_name:
          action.morning_moisturizer_product_name,
      };
    case RESET_ALL_MORNING_MOISTURIZER_FIELDS:
      return { ...state, morning_moisturizer_product_name: "" };
    default:
      return { ...state };
  }
};

export default morningMoisturizerProductNameReducer;
