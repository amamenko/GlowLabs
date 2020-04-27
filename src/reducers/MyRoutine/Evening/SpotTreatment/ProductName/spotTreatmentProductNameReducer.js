const SPOT_TREATMENT_PRODUCT_NAME = "SPOT_TREATMENT_PRODUCT_NAME";
const RESET_ALL_SPOT_TREATMENT_FIELDS = "RESET_ALL_SPOT_TREATMENT_FIELDS";

const spotTreatmentProductNameReducer = (
  state = { spot_treatment_product_name: "" },
  action
) => {
  switch (action.type) {
    case SPOT_TREATMENT_PRODUCT_NAME:
      return {
        ...state,
        spot_treatment_product_name: action.spot_treatment_product_name,
      };
    case RESET_ALL_SPOT_TREATMENT_FIELDS:
      return { ...state, spot_treatment_product_name: "" };
    default:
      return { ...state };
  }
};

export default spotTreatmentProductNameReducer;
