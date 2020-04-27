const EVENING_SERUM_PRODUCT_NAME = "EVENING_SERUM_PRODUCT_NAME";
const RESET_ALL_EVENING_SERUM_FIELDS = "RESET_ALL_EVENING_SERUM_FIELDS";

const eveningSerumProductNameReducer = (
  state = { evening_serum_product_name: "" },
  action
) => {
  switch (action.type) {
    case EVENING_SERUM_PRODUCT_NAME:
      return {
        ...state,
        evening_serum_product_name: action.evening_serum_product_name,
      };
    case RESET_ALL_EVENING_SERUM_FIELDS:
      return { ...state, evening_serum_product_name: "" };
    default:
      return { ...state };
  }
};

export default eveningSerumProductNameReducer;
