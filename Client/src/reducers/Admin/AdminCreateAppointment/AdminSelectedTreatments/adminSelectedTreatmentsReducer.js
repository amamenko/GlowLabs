const ADMIN_SELECTED_TREATMENTS = "ADMIN_SELECTED_TREATMENTS";
const ADMIN_SELECTED_TREATMENTS_RESET = "ADMIN_SELECTED_TREATMENTS_RESET";

const adminSelectedTreatmentsReducer = (
  state = { admin_selected_treatments: "" },
  action
) => {
  switch (action.type) {
    case ADMIN_SELECTED_TREATMENTS:
      return {
        ...state,
        admin_selected_treatments: action.admin_selected_treatments,
      };
    case ADMIN_SELECTED_TREATMENTS_RESET:
      return { ...state, admin_selected_treatments: "" };
    default:
      return { ...state };
  }
};

export default adminSelectedTreatmentsReducer;
