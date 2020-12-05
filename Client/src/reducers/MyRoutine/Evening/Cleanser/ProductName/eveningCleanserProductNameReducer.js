const EVENING_CLEANSER_PRODUCT_NAME = "EVENING_CLEANSER_PRODUCT_NAME";
const RESET_ALL_EVENING_CLEANSER_FIELDS = "RESET_ALL_EVENING_CLEANSER_FIELDS";

const eveningCleanserProductNameReducer = (
  state = { evening_cleanser_product_name: "" },
  action
) => {
  switch (action.type) {
    case EVENING_CLEANSER_PRODUCT_NAME:
      return {
        ...state,
        evening_cleanser_product_name: action.evening_cleanser_product_name,
      };
    case RESET_ALL_EVENING_CLEANSER_FIELDS:
      return { ...state, evening_cleanser_product_name: "" };
    default:
      return { ...state };
  }
};

export default eveningCleanserProductNameReducer;
