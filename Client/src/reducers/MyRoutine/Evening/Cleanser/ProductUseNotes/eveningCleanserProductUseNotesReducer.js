const EVENING_CLEANSER_PRODUCT_USE_NOTES = "EVENING_CLEANSER_PRODUCT_USE_NOTES";
const RESET_ALL_EVENING_CLEANSER_FIELDS = "RESET_ALL_EVENING_CLEANSER_FIELDS";

const eveningCleanserProductUseNotesReducer = (
  state = { evening_cleanser_product_use_notes: "" },
  action
) => {
  switch (action.type) {
    case EVENING_CLEANSER_PRODUCT_USE_NOTES:
      return {
        ...state,
        evening_cleanser_product_use_notes:
          action.evening_cleanser_product_use_notes,
      };
    case RESET_ALL_EVENING_CLEANSER_FIELDS:
      return { ...state, evening_cleanser_product_use_notes: "" };
    default:
      return { ...state };
  }
};

export default eveningCleanserProductUseNotesReducer;
