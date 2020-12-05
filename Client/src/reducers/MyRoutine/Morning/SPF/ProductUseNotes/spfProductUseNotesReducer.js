const SPF_PRODUCT_USE_NOTES = "SPF_PRODUCT_USE_NOTES";
const RESET_ALL_SPF_FIELDS = "RESET_ALL_SPF_FIELDS";

const spfProductUseNotesReducer = (
  state = { spf_product_use_notes: "" },
  action
) => {
  switch (action.type) {
    case SPF_PRODUCT_USE_NOTES:
      return {
        ...state,
        spf_product_use_notes: action.spf_product_use_notes,
      };
    case RESET_ALL_SPF_FIELDS:
      return { ...state, spf_product_use_notes: "" };
    default:
      return { ...state };
  }
};

export default spfProductUseNotesReducer;
