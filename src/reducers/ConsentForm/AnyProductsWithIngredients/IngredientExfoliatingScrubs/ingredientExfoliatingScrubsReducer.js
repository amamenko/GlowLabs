const EXFOLIATING_SCRUBS_RESET = "EXFOLIATING_SCRUBS_RESET";
const EXFOLIATING_SCRUBS = "EXFOLIATING_SCRUBS";

const ingredientExfoliatingScrubsReducer = (
  state = { exfoliating_scrubs_active: false },
  action
) => {
  switch (action.type) {
    case EXFOLIATING_SCRUBS:
      return { ...state, exfoliating_scrubs_active: true };
    case EXFOLIATING_SCRUBS_RESET:
      return { ...state, exfoliating_scrubs_active: false };
    default:
      return { ...state };
  }
};

export default ingredientExfoliatingScrubsReducer;
