const NIGHT_MASK_PRODUCT_FREQUENCY = "NIGHT_MASK_PRODUCT_FREQUENCY";
const RESET_ALL_NIGHT_MASK_FIELDS = "RESET_ALL_NIGHT_MASK_FIELDS";

const nightMaskProductFrequencyReducer = (
  state = { night_mask_product_frequency: "" },
  action
) => {
  switch (action.type) {
    case NIGHT_MASK_PRODUCT_FREQUENCY:
      return {
        ...state,
        night_mask_product_frequency: action.night_mask_product_frequency,
      };
    case RESET_ALL_NIGHT_MASK_FIELDS:
      return { ...state, night_mask_product_frequency: "" };
    default:
      return { ...state };
  }
};

export default nightMaskProductFrequencyReducer;
