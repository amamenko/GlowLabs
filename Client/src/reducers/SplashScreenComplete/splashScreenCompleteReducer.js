const SPLASH_SCREEN_COMPLETE = "SPLASH_SCREEN_COMPLETE";

const splashScreenCompleteReducer = (
  state = { splashScreenComplete: false },
  action
) => {
  switch (action.type) {
    case SPLASH_SCREEN_COMPLETE:
      return { ...state, splashScreenComplete: true };
    default:
      return { ...state };
  }
};

export default splashScreenCompleteReducer;
