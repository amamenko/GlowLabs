const NIGHT_MASK_PRODUCT_NAME = "NIGHT_MASK_PRODUCT_NAME";
const RESET_ALL_NIGHT_MASK_FIELDS = "RESET_ALL_NIGHT_MASK_FIELDS";

const nightMaskProductNameReducer = (
  state = { night_mask_product_name: "" },
  action
) => {
  switch (action.type) {
    case NIGHT_MASK_PRODUCT_NAME:
      return {
        ...state,
        night_mask_product_name: action.night_mask_product_name,
      };
    case RESET_ALL_NIGHT_MASK_FIELDS:
      return { ...state, night_mask_product_name: "" };
    default:
      return { ...state };
  }
};

export default nightMaskProductNameReducer;
