const MORNING_TONER_PRODUCT_USE_NOTES = "MORNING_TONER_PRODUCT_USE_NOTES";
const RESET_ALL_MORNING_TONER_FIELDS = "RESET_ALL_MORNING_TONER_FIELDS";

const morningTonerProductUseNotesReducer = (
  state = { morning_toner_product_use_notes: "" },
  action
) => {
  switch (action.type) {
    case MORNING_TONER_PRODUCT_USE_NOTES:
      return {
        ...state,
        morning_toner_product_use_notes: action.morning_toner_product_use_notes,
      };
    case RESET_ALL_MORNING_TONER_FIELDS:
      return { ...state, morning_toner_product_use_notes: "" };
    default:
      return { ...state };
  }
};

export default morningTonerProductUseNotesReducer;
