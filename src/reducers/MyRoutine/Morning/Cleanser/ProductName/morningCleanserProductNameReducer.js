const MORNING_CLEANSER_PRODUCT_NAME = "MORNING_CLEANSER_PRODUCT_NAME";
const RESET_ALL_MORNING_CLEANSER_FIELDS = "RESET_ALL_MORNING_CLEANSER_FIELDS";

const morningCleanserProductNameReducer = (
  state = { morning_cleanser_product_name: "" },
  action
) => {
  switch (action.type) {
    case MORNING_CLEANSER_PRODUCT_NAME:
      return {
        ...state,
        morning_cleanser_product_name: action.morning_cleanser_product_name,
      };
    case RESET_ALL_MORNING_CLEANSER_FIELDS:
      return { ...state, morning_cleanser_product_name: "" };
    default:
      return { ...state };
  }
};

export default morningCleanserProductNameReducer;
