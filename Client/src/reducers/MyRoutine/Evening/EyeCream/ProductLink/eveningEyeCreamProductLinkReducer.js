const EVENING_EYE_CREAM_PRODUCT_LINK = "EVENING_EYE_CREAM_PRODUCT_LINK";
const RESET_ALL_EVENING_EYE_CREAM_FIELDS = "RESET_ALL_EVENING_EYE_CREAM_FIELDS";

const eveningEyeCreamProductLinkReducer = (
  state = { evening_eye_cream_product_link: "" },
  action
) => {
  switch (action.type) {
    case EVENING_EYE_CREAM_PRODUCT_LINK:
      return {
        ...state,
        evening_eye_cream_product_link: action.evening_eye_cream_product_link,
      };
    case RESET_ALL_EVENING_EYE_CREAM_FIELDS:
      return { ...state, evening_eye_cream_product_link: "" };
    default:
      return { ...state };
  }
};

export default eveningEyeCreamProductLinkReducer;
