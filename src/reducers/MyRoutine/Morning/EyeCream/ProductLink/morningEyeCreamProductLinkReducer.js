const MORNING_EYE_CREAM_PRODUCT_LINK = "MORNING_EYE_CREAM_PRODUCT_LINK";
const RESET_ALL_MORNING_EYE_CREAM_FIELDS = "RESET_ALL_MORNING_EYE_CREAM_FIELDS";

const morningEyeCreamProductLinkReducer = (
  state = { morning_eye_cream_product_link: "" },
  action
) => {
  switch (action.type) {
    case MORNING_EYE_CREAM_PRODUCT_LINK:
      return {
        ...state,
        morning_eye_cream_product_link: action.morning_eye_cream_product_link,
      };
    case RESET_ALL_MORNING_EYE_CREAM_FIELDS:
      return { ...state, morning_eye_cream_product_link: "" };
    default:
      return { ...state };
  }
};

export default morningEyeCreamProductLinkReducer;
