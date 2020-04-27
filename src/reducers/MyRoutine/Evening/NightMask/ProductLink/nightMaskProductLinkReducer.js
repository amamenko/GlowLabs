const NIGHT_MASK_PRODUCT_LINK = "NIGHT_MASK_PRODUCT_LINK";
const RESET_ALL_NIGHT_MASK_FIELDS = "RESET_ALL_NIGHT_MASK_FIELDS";

const nightMaskProductLinkReducer = (
  state = { night_mask_product_link: "" },
  action
) => {
  switch (action.type) {
    case NIGHT_MASK_PRODUCT_LINK:
      return {
        ...state,
        night_mask_product_link: action.night_mask_product_link,
      };
    case RESET_ALL_NIGHT_MASK_FIELDS:
      return { ...state, night_mask_product_link: "" };
    default:
      return { ...state };
  }
};

export default nightMaskProductLinkReducer;
