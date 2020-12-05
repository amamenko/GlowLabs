const ADMIN_STAFF_MEMBER_EMAIL = "ADMIN_STAFF_MEMBER_EMAIL";
const ADMIN_STAFF_MEMBER_EMAIL_RESET = "ADMIN_STAFF_MEMBER_EMAIL_RESET";

const adminStaffMemberEmailReducer = (
  state = { admin_staff_member_email: "" },
  action
) => {
  switch (action.type) {
    case ADMIN_STAFF_MEMBER_EMAIL:
      return {
        ...state,
        admin_staff_member_email: action.admin_staff_member_email,
      };
    case ADMIN_STAFF_MEMBER_EMAIL_RESET:
      return { ...state, admin_staff_member_email: "" };
    default:
      return { ...state };
  }
};

export default adminStaffMemberEmailReducer;
