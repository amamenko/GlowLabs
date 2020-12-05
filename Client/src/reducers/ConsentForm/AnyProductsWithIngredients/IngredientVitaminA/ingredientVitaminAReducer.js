const VITAMIN_A_RESET = "VITAMIN_A_RESET";
const VITAMIN_A = "VITAMIN_A";

const ingredientVitaminAReducer = (
  state = { vitamin_a_active: false },
  action
) => {
  switch (action.type) {
    case VITAMIN_A:
      return { ...state, vitamin_a_active: true };
    case VITAMIN_A_RESET:
      return { ...state, vitamin_a_active: false };
    default:
      return { ...state };
  }
};

export default ingredientVitaminAReducer;
