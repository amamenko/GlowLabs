const ADMIN_STAFF_MEMBER_LAST_NAME = "ADMIN_STAFF_MEMBER_LAST_NAME";
const ADMIN_STAFF_MEMBER_LAST_NAME_RESET =
  "ADMIN_STAFF_MEMBER_FIRST_NAME_RESET";

const adminStaffMemberLastNameReducer = (
  state = { admin_staff_member_last_name: "" },
  action
) => {
  switch (action.type) {
    case ADMIN_STAFF_MEMBER_LAST_NAME:
      return {
        ...state,
        admin_staff_member_last_name: action.admin_staff_member_last_name,
      };
    case ADMIN_STAFF_MEMBER_LAST_NAME_RESET:
      return { ...state, admin_staff_member_last_name: "" };
    default:
      return { ...state };
  }
};

export default adminStaffMemberLastNameReducer;
