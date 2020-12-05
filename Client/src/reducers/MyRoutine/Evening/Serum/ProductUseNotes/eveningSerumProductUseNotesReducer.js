const EVENING_SERUM_PRODUCT_USE_NOTES = "EVENING_SERUM_PRODUCT_USE_NOTES";
const RESET_ALL_EVENING_SERUM_FIELDS = "RESET_ALL_EVENING_SERUM_FIELDS";

const eveningSerumProductUseNotesReducer = (
  state = { evening_serum_product_use_notes: "" },
  action
) => {
  switch (action.type) {
    case EVENING_SERUM_PRODUCT_USE_NOTES:
      return {
        ...state,
        evening_serum_product_use_notes: action.evening_serum_product_use_notes,
      };
    case RESET_ALL_EVENING_SERUM_FIELDS:
      return { ...state, evening_serum_product_use_notes: "" };
    default:
      return { ...state };
  }
};

export default eveningSerumProductUseNotesReducer;
