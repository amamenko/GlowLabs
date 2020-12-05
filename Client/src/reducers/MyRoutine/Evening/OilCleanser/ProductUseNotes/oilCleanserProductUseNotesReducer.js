const OIL_CLEANSER_PRODUCT_USE_NOTES = "OIL_CLEANSER_PRODUCT_USE_NOTES";
const RESET_ALL_OIL_CLEANSER_FIELDS = "RESET_ALL_OIL_CLEANSER_FIELDS";

const oilCleanserProductUseNotesReducer = (
  state = { oil_cleanser_product_use_notes: "" },
  action
) => {
  switch (action.type) {
    case OIL_CLEANSER_PRODUCT_USE_NOTES:
      return {
        ...state,
        oil_cleanser_product_use_notes: action.oil_cleanser_product_use_notes,
      };
    case RESET_ALL_OIL_CLEANSER_FIELDS:
      return { ...state, oil_cleanser_product_use_notes: "" };
    default:
      return { ...state };
  }
};

export default oilCleanserProductUseNotesReducer;
