const MORNING_SERUM_PRODUCT_NAME = "MORNING_SERUM_PRODUCT_NAME";
const RESET_ALL_MORNING_SERUM_FIELDS = "RESET_ALL_MORNING_SERUM_FIELDS";

const morningSerumProductNameReducer = (
  state = { morning_serum_product_name: "" },
  action
) => {
  switch (action.type) {
    case MORNING_SERUM_PRODUCT_NAME:
      return {
        ...state,
        morning_serum_product_name: action.morning_serum_product_name,
      };
    case RESET_ALL_MORNING_SERUM_FIELDS:
      return { ...state, morning_serum_product_name: "" };
    default:
      return { ...state };
  }
};

export default morningSerumProductNameReducer;
