const MORNING_TONER_PRODUCT_NAME = "MORNING_TONER_PRODUCT_NAME";
const RESET_ALL_MORNING_TONER_FIELDS = "RESET_ALL_MORNING_TONER_FIELDS";

const morningTonerProductNameReducer = (
  state = { morning_toner_product_name: "" },
  action
) => {
  switch (action.type) {
    case MORNING_TONER_PRODUCT_NAME:
      return {
        ...state,
        morning_toner_product_name: action.morning_toner_product_name,
      };
    case RESET_ALL_MORNING_TONER_FIELDS:
      return { ...state, morning_toner_product_name: "" };
    default:
      return { ...state };
  }
};

export default morningTonerProductNameReducer;
