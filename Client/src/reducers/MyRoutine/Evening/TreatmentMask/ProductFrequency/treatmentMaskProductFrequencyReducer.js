const TREATMENT_MASK_PRODUCT_FREQUENCY = "TREATMENT_MASK_PRODUCT_FREQUENCY";
const RESET_ALL_TREATMENT_MASK_FIELDS = "RESET_ALL_TREATMENT_MASK_FIELDS";

const treatmentMaskProductFrequencyReducer = (
  state = { treatment_mask_product_frequency: "" },
  action
) => {
  switch (action.type) {
    case TREATMENT_MASK_PRODUCT_FREQUENCY:
      return {
        ...state,
        treatment_mask_product_frequency:
          action.treatment_mask_product_frequency,
      };
    case RESET_ALL_TREATMENT_MASK_FIELDS:
      return { ...state, treatment_mask_product_frequency: "" };
    default:
      return { ...state };
  }
};

export default treatmentMaskProductFrequencyReducer;
