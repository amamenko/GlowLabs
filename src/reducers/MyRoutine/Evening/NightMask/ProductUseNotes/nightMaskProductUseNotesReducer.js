const NIGHT_MASK_PRODUCT_USE_NOTES = "NIGHT_MASK_PRODUCT_USE_NOTES";
const RESET_ALL_NIGHT_MASK_FIELDS = "RESET_ALL_NIGHT_MASK_FIELDS";

const nightMaskProductUseNotesReducer = (
  state = { night_mask_product_use_notes: "" },
  action
) => {
  switch (action.type) {
    case NIGHT_MASK_PRODUCT_USE_NOTES:
      return {
        ...state,
        night_mask_product_use_notes: action.night_mask_product_use_notes,
      };
    case RESET_ALL_NIGHT_MASK_FIELDS:
      return { ...state, night_mask_product_use_notes: "" };
    default:
      return { ...state };
  }
};

export default nightMaskProductUseNotesReducer;
