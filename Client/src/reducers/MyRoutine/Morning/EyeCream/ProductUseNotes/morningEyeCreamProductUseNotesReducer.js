const MORNING_EYE_CREAM_PRODUCT_USE_NOTES =
  "MORNING_EYE_CREAM_PRODUCT_USE_NOTES";
const RESET_ALL_MORNING_EYE_CREAM_FIELDS = "RESET_ALL_MORNING_EYE_CREAM_FIELDS";

const morningEyeCreamProductUseNotesReducer = (
  state = { morning_eye_cream_product_use_notes: "" },
  action
) => {
  switch (action.type) {
    case MORNING_EYE_CREAM_PRODUCT_USE_NOTES:
      return {
        ...state,
        morning_eye_cream_product_use_notes:
          action.morning_eye_cream_product_use_notes,
      };
    case RESET_ALL_MORNING_EYE_CREAM_FIELDS:
      return { ...state, morning_eye_cream_product_use_notes: "" };
    default:
      return { ...state };
  }
};

export default morningEyeCreamProductUseNotesReducer;
