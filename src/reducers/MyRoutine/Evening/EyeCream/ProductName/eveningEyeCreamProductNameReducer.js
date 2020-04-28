const EVENING_EYE_CREAM_PRODUCT_NAME = "EVENING_EYE_CREAM_PRODUCT_NAME";
const RESET_ALL_EVENING_EYE_CREAM_FIELDS = "RESET_ALL_EVENING_EYE_CREAM_FIELDS";

const eveningEyeCreamProductNameReducer = (
  state = { evening_eye_cream_product_name: "" },
  action
) => {
  switch (action.type) {
    case EVENING_EYE_CREAM_PRODUCT_NAME:
      return {
        ...state,
        evening_eye_cream_product_name: action.evening_eye_cream_product_name,
      };
    case RESET_ALL_EVENING_EYE_CREAM_FIELDS:
      return { ...state, evening_eye_cream_product_name: "" };
    default:
      return { ...state };
  }
};

export default eveningEyeCreamProductNameReducer;
