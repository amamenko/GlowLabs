const EVENING_TONER_PRODUCT_USE_NOTES = "EVENING_TONER_PRODUCT_USE_NOTES";
const RESET_ALL_EVENING_TONER_FIELDS = "RESET_ALL_EVENING_TONER_FIELDS";

const eveningTonerProductUseNotesReducer = (
  state = { evening_toner_product_use_notes: "" },
  action
) => {
  switch (action.type) {
    case EVENING_TONER_PRODUCT_USE_NOTES:
      return {
        ...state,
        evening_toner_product_use_notes: action.evening_toner_product_use_notes,
      };
    case RESET_ALL_EVENING_TONER_FIELDS:
      return { ...state, evening_toner_product_use_notes: "" };
    default:
      return { ...state };
  }
};

export default eveningTonerProductUseNotesReducer;
