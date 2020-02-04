const AVAILABILITY_CLICKED = "AVAILABILITY_CLICKED";

const availabilityClickedReducer = (
  state = { availabilityClicked: false },
  action
) => {
  switch (action.type) {
    case AVAILABILITY_CLICKED:
      return { ...state, availabilityClicked: true };
    default:
      return { ...state };
  }
};

export default availabilityClickedReducer;
