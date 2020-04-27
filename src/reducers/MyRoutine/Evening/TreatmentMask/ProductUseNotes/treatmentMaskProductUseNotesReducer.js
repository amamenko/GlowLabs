const TREATMENT_MASK_PRODUCT_USE_NOTES = "TREATMENT_MASK_PRODUCT_USE_NOTES";
const RESET_ALL_TREATMENT_MASK_FIELDS = "RESET_ALL_TREATMENT_MASK_FIELDS";

const treatmentMaskProductUseNotesReducer = (
  state = { treatment_mask_product_use_notes: "" },
  action
) => {
  switch (action.type) {
    case TREATMENT_MASK_PRODUCT_USE_NOTES:
      return {
        ...state,
        treatment_mask_product_use_notes:
          action.treatment_mask_product_use_notes,
      };
    case RESET_ALL_TREATMENT_MASK_FIELDS:
      return { ...state, treatment_mask_product_use_notes: "" };
    default:
      return { ...state };
  }
};

export default treatmentMaskProductUseNotesReducer;
