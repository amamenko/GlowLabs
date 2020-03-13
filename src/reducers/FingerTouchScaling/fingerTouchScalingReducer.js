const TOUCH_SCALING_ACTIVE = "TOUCH_SCALING_ACTIVE";
const TOUCH_SCALING_RESET = "TOUCH_SCALING_RESET";

const fingerTouchScalingReducer = (
  state = { touch_scaling: false },
  action
) => {
  switch (action.type) {
    case TOUCH_SCALING_ACTIVE:
      return { ...state, touch_scaling: true };
    case TOUCH_SCALING_RESET:
      return { ...state, touch_scaling: false };
    default:
      return { ...state };
  }
};

export default fingerTouchScalingReducer;
