const SPLASH_SCREEN_HALFWAY = "SPLASH_SCREEN_HALFWAY";

const splashScreenHalfwayReducer = (
  state = { splashScreenHalfway: false },
  action
) => {
  switch (action.type) {
    case SPLASH_SCREEN_HALFWAY:
      return {
        ...state,
        splashScreenHalfway: true
      };
    default:
      return { ...state };
  }
};

export default splashScreenHalfwayReducer;
