const MORNING_CLEANSER_PRODUCT_USE_NOTES = "MORNING_CLEANSER_PRODUCT_USE_NOTES";
const RESET_ALL_MORNING_CLEANSER_FIELDS = "RESET_ALL_MORNING_CLEANSER_FIELDS";

const morningCleanserProductUseNotesReducer = (
  state = { morning_cleanser_product_use_notes: "" },
  action
) => {
  switch (action.type) {
    case MORNING_CLEANSER_PRODUCT_USE_NOTES:
      return {
        ...state,
        morning_cleanser_product_use_notes:
          action.morning_cleanser_product_use_notes,
      };
    case RESET_ALL_MORNING_CLEANSER_FIELDS:
      return { ...state, morning_cleanser_product_use_notes: "" };
    default:
      return { ...state };
  }
};

export default morningCleanserProductUseNotesReducer;
