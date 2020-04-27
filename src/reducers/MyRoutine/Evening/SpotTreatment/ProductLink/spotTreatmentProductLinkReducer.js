const SPOT_TREATMENT_PRODUCT_LINK = "SPOT_TREATMENT_PRODUCT_LINK";
const RESET_ALL_SPOT_TREATMENT_FIELDS = "RESET_ALL_SPOT_TREATMENT_FIELDS";

const spotTreatmentProductLinkReducer = (
  state = { spot_treatment_product_link: "" },
  action
) => {
  switch (action.type) {
    case SPOT_TREATMENT_PRODUCT_LINK:
      return {
        ...state,
        spot_treatment_product_link: action.spot_treatment_product_link,
      };
    case RESET_ALL_SPOT_TREATMENT_FIELDS:
      return { ...state, spot_treatment_product_link: "" };
    default:
      return { ...state };
  }
};

export default spotTreatmentProductLinkReducer;
