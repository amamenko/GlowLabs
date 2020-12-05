const LACTIC_ACID_RESET = "LACTIC_ACID_RESET";
const LACTIC_ACID = "LACTIC_ACID";

const ingredientLacticAcidReducer = (
  state = { lactic_acid_active: false },
  action
) => {
  switch (action.type) {
    case LACTIC_ACID:
      return { ...state, lactic_acid_active: true };
    case LACTIC_ACID_RESET:
      return { ...state, lactic_acid_active: false };
    default:
      return { ...state };
  }
};

export default ingredientLacticAcidReducer;
