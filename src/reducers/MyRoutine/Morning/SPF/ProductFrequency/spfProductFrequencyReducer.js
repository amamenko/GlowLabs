const SPF_PRODUCT_FREQUENCY = "SPF_PRODUCT_FREQUENCY";
const RESET_ALL_SPF_FIELDS = "RESET_ALL_SPF_FIELDS";

const spfProductFrequencyReducer = (
  state = { spf_product_frequency: "" },
  action
) => {
  switch (action.type) {
    case SPF_PRODUCT_FREQUENCY:
      return {
        ...state,
        spf_product_frequency: action.spf_product_frequency,
      };
    case RESET_ALL_SPF_FIELDS:
      return { ...state, spf_product_frequency: "" };
    default:
      return { ...state };
  }
};

export default spfProductFrequencyReducer;
