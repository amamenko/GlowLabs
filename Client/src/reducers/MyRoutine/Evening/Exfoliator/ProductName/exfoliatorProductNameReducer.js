const EXFOLIATOR_PRODUCT_NAME = "EXFOLIATOR_PRODUCT_NAME";
const RESET_ALL_EXFOLIATOR_FIELDS = "RESET_ALL_EXFOLIATOR_FIELDS";

const exfoliatorProductNameReducer = (
  state = { exfoliator_product_name: "" },
  action
) => {
  switch (action.type) {
    case EXFOLIATOR_PRODUCT_NAME:
      return {
        ...state,
        exfoliator_product_name: action.exfoliator_product_name,
      };
    case RESET_ALL_EXFOLIATOR_FIELDS:
      return { ...state, exfoliator_product_name: "" };
    default:
      return { ...state };
  }
};

export default exfoliatorProductNameReducer;
