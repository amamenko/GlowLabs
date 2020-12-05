const ADMIN_STAFF_MEMBER_FIRST_NAME = "ADMIN_STAFF_MEMBER_FIRST_NAME";
const ADMIN_STAFF_MEMBER_FIRST_NAME_RESET =
  "ADMIN_STAFF_MEMBER_FIRST_NAME_RESET";

const adminStaffMemberFirstNameReducer = (
  state = { admin_staff_member_first_name: "" },
  action
) => {
  switch (action.type) {
    case ADMIN_STAFF_MEMBER_FIRST_NAME:
      return {
        ...state,
        admin_staff_member_first_name: action.admin_staff_member_first_name,
      };
    case ADMIN_STAFF_MEMBER_FIRST_NAME_RESET:
      return { ...state, admin_staff_member_first_name: "" };
    default:
      return { ...state };
  }
};

export default adminStaffMemberFirstNameReducer;
