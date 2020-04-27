const SPOT_TREATMENT_PRODUCT_FREQUENCY = "SPOT_TREATMENT_PRODUCT_FREQUENCY";
const RESET_ALL_SPOT_TREATMENT_FIELDS = "RESET_ALL_SPOT_TREATMENT_FIELDS";

const spotTreatmentProductFrequencyReducer = (
  state = { spot_treatment_product_frequency: "" },
  action
) => {
  switch (action.type) {
    case SPOT_TREATMENT_PRODUCT_FREQUENCY:
      return {
        ...state,
        spot_treatment_product_frequency:
          action.spot_treatment_product_frequency,
      };
    case RESET_ALL_SPOT_TREATMENT_FIELDS:
      return { ...state, spot_treatment_product_frequency: "" };
    default:
      return { ...state };
  }
};

export default spotTreatmentProductFrequencyReducer;
