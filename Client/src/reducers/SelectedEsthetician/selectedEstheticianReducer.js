const SELECTED_ESTHETICIAN = "SELECTED_ESTHETICIAN";
const SELECTED_ESTHETICIAN_RESET = "SELECTED_ESTHETICIAN_RESET";

const selectedEstheticianReducer = (
  state = { selectedEsthetician: "" },
  action
) => {
  switch (action.type) {
    case SELECTED_ESTHETICIAN:
      return { ...state, selectedEsthetician: action.selectedEsthetician };
    case SELECTED_ESTHETICIAN_RESET:
      return { ...state, selectedEsthetician: "" };
    default:
      return { ...state };
  }
};

export default selectedEstheticianReducer;
