const EVENING_EYE_CREAM_PRODUCT_USE_NOTES =
  "EVENING_EYE_CREAM_PRODUCT_USE_NOTES";
const RESET_ALL_EVENING_EYE_CREAM_FIELDS = "RESET_ALL_EVENING_EYE_CREAM_FIELDS";

const eveningEyeCreamProductUseNotesReducer = (
  state = { evening_eye_cream_product_use_notes: "" },
  action
) => {
  switch (action.type) {
    case EVENING_EYE_CREAM_PRODUCT_USE_NOTES:
      return {
        ...state,
        evening_eye_cream_product_use_notes:
          action.evening_eye_cream_product_use_notes,
      };
    case RESET_ALL_EVENING_EYE_CREAM_FIELDS:
      return { ...state, evening_eye_cream_product_use_notes: "" };
    default:
      return { ...state };
  }
};

export default eveningEyeCreamProductUseNotesReducer;
