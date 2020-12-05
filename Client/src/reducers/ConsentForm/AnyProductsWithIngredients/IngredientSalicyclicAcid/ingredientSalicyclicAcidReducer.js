const SALICYCLIC_ACID_RESET = "SALICYCLIC_ACID_RESET";
const SALICYCLIC_ACID = "SALICYCLIC_ACID";

const ingredientSalicyclicAcidReducer = (
  state = { salicyclic_acid_active: false },
  action
) => {
  switch (action.type) {
    case SALICYCLIC_ACID:
      return { ...state, salicyclic_acid_active: true };
    case SALICYCLIC_ACID_RESET:
      return { ...state, salicyclic_acid_active: false };
    default:
      return { ...state };
  }
};

export default ingredientSalicyclicAcidReducer;
