const EVENING_TONER_PRODUCT_NAME = "EVENING_TONER_PRODUCT_NAME";
const RESET_ALL_EVENING_TONER_FIELDS = "RESET_ALL_EVENING_TONER_FIELDS";

const eveningTonerProductNameReducer = (
  state = { evening_toner_product_name: "" },
  action
) => {
  switch (action.type) {
    case EVENING_TONER_PRODUCT_NAME:
      return {
        ...state,
        evening_toner_product_name: action.evening_toner_product_name,
      };
    case RESET_ALL_EVENING_TONER_FIELDS:
      return { ...state, evening_toner_product_name: "" };
    default:
      return { ...state };
  }
};

export default eveningTonerProductNameReducer;
