const EXFOLIATOR_PRODUCT_USE_NOTES = "EXFOLIATOR_PRODUCT_USE_NOTES";
const RESET_ALL_EXFOLIATOR_FIELDS = "RESET_ALL_EXFOLIATOR_FIELDS";

const exfoliatorProductUseNotesReducer = (
  state = { exfoliator_product_use_notes: "" },
  action
) => {
  switch (action.type) {
    case EXFOLIATOR_PRODUCT_USE_NOTES:
      return {
        ...state,
        exfoliator_product_use_notes: action.exfoliator_product_use_notes,
      };
    case RESET_ALL_EXFOLIATOR_FIELDS:
      return { ...state, exfoliator_product_use_notes: "" };
    default:
      return { ...state };
  }
};

export default exfoliatorProductUseNotesReducer;
