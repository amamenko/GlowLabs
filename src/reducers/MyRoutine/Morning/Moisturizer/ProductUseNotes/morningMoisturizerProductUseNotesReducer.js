const MORNING_MOISTURIZER_PRODUCT_USE_NOTES =
  "MORNING_MOISTURIZER_PRODUCT_USE_NOTES";
const RESET_ALL_MORNING_MOISTURIZER_FIELDS =
  "RESET_ALL_MORNING_MOISTURIZER_FIELDS";

const morningMoisturizerProductUseNotesReducer = (
  state = { morning_moisturizer_product_use_notes: "" },
  action
) => {
  switch (action.type) {
    case MORNING_MOISTURIZER_PRODUCT_USE_NOTES:
      return {
        ...state,
        morning_moisturizer_product_use_notes:
          action.morning_moisturizer_product_use_notes,
      };
    case RESET_ALL_MORNING_MOISTURIZER_FIELDS:
      return { ...state, morning_moisturizer_product_use_notes: "" };
    default:
      return { ...state };
  }
};

export default morningMoisturizerProductUseNotesReducer;
