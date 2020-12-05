const SPOT_TREATMENT_PRODUCT_NAME = "SPOT_TREATMENT_PRODUCT_NAME";

const ACTION_SPOT_TREATMENT_PRODUCT_NAME = (spot_treatment_product_name) => {
  return {
    type: SPOT_TREATMENT_PRODUCT_NAME,
    spot_treatment_product_name,
  };
};

export default ACTION_SPOT_TREATMENT_PRODUCT_NAME;
