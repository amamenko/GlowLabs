const OIL_PRODUCT_USE_NOTES = "OIL_PRODUCT_USE_NOTES";
const RESET_ALL_OIL_FIELDS = "RESET_ALL_OIL_FIELDS";

const oilProductUseNotesReducer = (
  state = { oil_product_use_notes: "" },
  action
) => {
  switch (action.type) {
    case OIL_PRODUCT_USE_NOTES:
      return {
        ...state,
        oil_product_use_notes: action.oil_product_use_notes,
      };
    case RESET_ALL_OIL_FIELDS:
      return { ...state, oil_product_use_notes: "" };
    default:
      return { ...state };
  }
};

export default oilProductUseNotesReducer;
