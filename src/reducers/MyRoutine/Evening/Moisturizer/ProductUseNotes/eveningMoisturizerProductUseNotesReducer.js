const EVENING_MOISTURIZER_PRODUCT_USE_NOTES =
  "EVENING_MOISTURIZER_PRODUCT_USE_NOTES";
const RESET_ALL_EVENING_MOISTURIZER_FIELDS =
  "RESET_ALL_EVENING_MOISTURIZER_FIELDS";

const eveningMoisturizerProductUseNotesReducer = (
  state = { evening_moisturizer_product_use_notes: "" },
  action
) => {
  switch (action.type) {
    case EVENING_MOISTURIZER_PRODUCT_USE_NOTES:
      return {
        ...state,
        evening_moisturizer_product_use_notes:
          action.evening_moisturizer_product_use_notes,
      };
    case RESET_ALL_EVENING_MOISTURIZER_FIELDS:
      return { ...state, evening_moisturizer_product_use_notes: "" };
    default:
      return { ...state };
  }
};

export default eveningMoisturizerProductUseNotesReducer;
