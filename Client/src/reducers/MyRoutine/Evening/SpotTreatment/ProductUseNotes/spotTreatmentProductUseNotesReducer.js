const SPOT_TREATMENT_PRODUCT_USE_NOTES = "SPOT_TREATMENT_PRODUCT_USE_NOTES";
const RESET_ALL_SPOT_TREATMENT_FIELDS = "RESET_ALL_SPOT_TREATMENT_FIELDS";

const spotTreatmentProductUseNotesReducer = (
  state = { spot_treatment_product_use_notes: "" },
  action
) => {
  switch (action.type) {
    case SPOT_TREATMENT_PRODUCT_USE_NOTES:
      return {
        ...state,
        spot_treatment_product_use_notes:
          action.spot_treatment_product_use_notes,
      };
    case RESET_ALL_SPOT_TREATMENT_FIELDS:
      return { ...state, spot_treatment_product_use_notes: "" };
    default:
      return { ...state };
  }
};

export default spotTreatmentProductUseNotesReducer;
