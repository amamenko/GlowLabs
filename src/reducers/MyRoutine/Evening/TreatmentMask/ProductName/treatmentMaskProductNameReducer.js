const TREATMENT_MASK_PRODUCT_NAME = "TREATMENT_MASK_PRODUCT_NAME";
const RESET_ALL_TREATMENT_MASK_FIELDS = "RESET_ALL_TREATMENT_MASK_FIELDS";

const treatmentMaskProductNameReducer = (
  state = { treatment_mask_product_name: "" },
  action
) => {
  switch (action.type) {
    case TREATMENT_MASK_PRODUCT_NAME:
      return {
        ...state,
        treatment_mask_product_name: action.treatment_mask_product_name,
      };
    case RESET_ALL_TREATMENT_MASK_FIELDS:
      return { ...state, treatment_mask_product_name: "" };
    default:
      return { ...state };
  }
};

export default treatmentMaskProductNameReducer;
