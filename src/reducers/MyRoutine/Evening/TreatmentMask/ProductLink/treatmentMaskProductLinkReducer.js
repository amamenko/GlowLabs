const TREATMENT_MASK_PRODUCT_LINK = "TREATMENT_MASK_PRODUCT_LINK";
const RESET_ALL_TREATMENT_MASK_FIELDS = "RESET_ALL_TREATMENT_MASK_FIELDS";

const treatmentMaskProductLinkReducer = (
  state = { treatment_mask_product_link: "" },
  action
) => {
  switch (action.type) {
    case TREATMENT_MASK_PRODUCT_LINK:
      return {
        ...state,
        treatment_mask_product_link: action.treatment_mask_product_link,
      };
    case RESET_ALL_TREATMENT_MASK_FIELDS:
      return { ...state, treatment_mask_product_link: "" };
    default:
      return { ...state };
  }
};

export default treatmentMaskProductLinkReducer;
