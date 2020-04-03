const GLYCOLIC_ACID_RESET = "GLYCOLIC_ACID_RESET";
const GLYCOLIC_ACID = "GLYCOLIC_ACID";

const ingredientGlycolicAcidReducer = (
  state = { glycolic_acid_active: false },
  action
) => {
  switch (action.type) {
    case GLYCOLIC_ACID:
      return { ...state, glycolic_acid_active: true };
    case GLYCOLIC_ACID_RESET:
      return { ...state, glycolic_acid_active: false };
    default:
      return { ...state };
  }
};

export default ingredientGlycolicAcidReducer;
