const MORNING_EYE_CREAM_PRODUCT_NAME = "MORNING_EYE_CREAM_PRODUCT_NAME";
const RESET_ALL_MORNING_EYE_CREAM_FIELDS = "RESET_ALL_MORNING_EYE_CREAM_FIELDS";

const morningEyeCreamProductNameReducer = (
  state = { morning_eye_cream_product_name: "" },
  action
) => {
  switch (action.type) {
    case MORNING_EYE_CREAM_PRODUCT_NAME:
      return {
        ...state,
        morning_eye_cream_product_name: action.morning_eye_cream_product_name,
      };
    case RESET_ALL_MORNING_EYE_CREAM_FIELDS:
      return { ...state, morning_eye_cream_product_name: "" };
    default:
      return { ...state };
  }
};

export default morningEyeCreamProductNameReducer;
