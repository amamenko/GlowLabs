const ADMIN_CLIENT_PAST_APPOINTMENTS_SELECTED =
  "ADMIN_CLIENT_PAST_APPOINTMENTS_SELECTED";
const ADMIN_CLIENT_UPCOMING_APPOINTMENTS_SELECTED =
  "ADMIN_CLIENT_UPCOMING_APPOINTMENTS_SELECTED";
const ADMIN_CLIENT_PROFILE_SELECTED = "ADMIN_CLIENT_PROFILE_SELECTED";
const ADMIN_CLIENT_RECOMMENDED_ROUTINE_SELECTED =
  "ADMIN_CLIENT_RECOMMENDED_ROUTINE_SELECTED";
const ADMIN_CLIENT_SKIN_CARE_ROUTINE_SELECTED =
  "ADMIN_CLIENT_SKIN_CARE_ROUTINE_SELECTED";

const adminClientSectionSelectedReducer = (
  state = { admin_client_section_selected: "" },
  action
) => {
  switch (action.type) {
    case ADMIN_CLIENT_PROFILE_SELECTED:
      return {
        ...state,
        admin_client_section_selected: "",
      };
    case ADMIN_CLIENT_UPCOMING_APPOINTMENTS_SELECTED:
      return {
        ...state,
        admin_client_section_selected: "UpcomingAppointments",
      };
    case ADMIN_CLIENT_PAST_APPOINTMENTS_SELECTED:
      return {
        ...state,
        admin_client_section_selected: "PastAppointments",
      };
    case ADMIN_CLIENT_RECOMMENDED_ROUTINE_SELECTED:
      return {
        ...state,
        admin_client_section_selected: "RecommendedRoutine",
      };
    case ADMIN_CLIENT_SKIN_CARE_ROUTINE_SELECTED:
      return {
        ...state,
        admin_client_section_selected: "SkinCareRoutine",
      };
    default:
      return { ...state };
  }
};

export default adminClientSectionSelectedReducer;
