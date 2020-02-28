const CHANGE_BIG_TO_SMALL = "CHANGE_BIG_TO_SMALL";
const CHANGE_SMALL_TO_BIG = "CHANGE_SMALL_TO_BIG";
const BIG_TO_SMALL_RESET = "BIG_TO_SMALL_RESET";
const SMALL_TO_BIG_RESET = "SMALL_TO_BIG_RESET";

const splashOrientationReducer = (
  state = { splashBigToSmall: false, splashSmallToBig: false },
  action
) => {
  switch (action.type) {
    case CHANGE_BIG_TO_SMALL:
      return {
        ...state,
        splashBigToSmall: true
      };
    case CHANGE_SMALL_TO_BIG:
      return {
        ...state,
        splashSmallToBig: true
      };
    case BIG_TO_SMALL_RESET:
      return {
        ...state,
        splashBigToSmall: false
      };
    case SMALL_TO_BIG_RESET:
      return {
        ...state,
        splashSmallToBig: false
      };
    default:
      return { ...state };
  }
};

export default splashOrientationReducer;
