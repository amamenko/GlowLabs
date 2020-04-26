const MORNING_SERUM_PRODUCT_USE_NOTES = "MORNING_SERUM_PRODUCT_USE_NOTES";
const RESET_ALL_MORNING_SERUM_FIELDS = "RESET_ALL_MORNING_SERUM_FIELDS";

const morningSerumProductUseNotesReducer = (
  state = { morning_serum_product_use_notes: "" },
  action
) => {
  switch (action.type) {
    case MORNING_SERUM_PRODUCT_USE_NOTES:
      return {
        ...state,
        morning_serum_product_use_notes: action.morning_serum_product_use_notes,
      };
    case RESET_ALL_MORNING_SERUM_FIELDS:
      return { ...state, morning_serum_product_use_notes: "" };
    default:
      return { ...state };
  }
};

export default morningSerumProductUseNotesReducer;
