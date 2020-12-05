const AVAILABILITY_CLICKED = "AVAILABILITY_CLICKED";
const AVAILABILITY_RESET = "AVAILABILITY_RESET";

const availabilityClickedReducer = (
  state = { availabilityClicked: false },
  action
) => {
  switch (action.type) {
    case AVAILABILITY_CLICKED:
      return { ...state, availabilityClicked: true };
    case AVAILABILITY_RESET:
      return { ...state, availabilityClicked: false };
    default:
      return { ...state };
  }
};

export default availabilityClickedReducer;
