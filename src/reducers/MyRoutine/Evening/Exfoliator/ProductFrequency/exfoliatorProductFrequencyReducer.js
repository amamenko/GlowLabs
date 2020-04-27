const EXFOLIATOR_PRODUCT_FREQUENCY = "EXFOLIATOR_PRODUCT_FREQUENCY";
const RESET_ALL_EXFOLIATOR_FIELDS = "RESET_ALL_EXFOLIATOR_FIELDS";

const exfoliatorProductFrequencyReducer = (
  state = { exfoliator_product_frequency: "" },
  action
) => {
  switch (action.type) {
    case EXFOLIATOR_PRODUCT_FREQUENCY:
      return {
        ...state,
        exfoliator_product_frequency: action.exfoliator_product_frequency,
      };
    case RESET_ALL_EXFOLIATOR_FIELDS:
      return { ...state, exfoliator_product_frequency: "" };
    default:
      return { ...state };
  }
};

export default exfoliatorProductFrequencyReducer;
