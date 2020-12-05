const ADMIN_STAFF_MEMBER_ROLES = "ADMIN_STAFF_MEMBER_ROLES";
const ADMIN_STAFF_MEMBER_ROLES_RESET = "ADMIN_STAFF_MEMBER_ROLES_RESET";

const adminStaffMemberRolesReducer = (
  state = { admin_staff_member_roles: [] },
  action
) => {
  switch (action.type) {
    case ADMIN_STAFF_MEMBER_ROLES:
      return {
        ...state,
        admin_staff_member_roles: [
          ...state.admin_staff_member_roles,
          action.admin_staff_member_roles,
        ],
      };
    case ADMIN_STAFF_MEMBER_ROLES_RESET:
      return { ...state, admin_staff_member_roles: [] };
    default:
      return { ...state };
  }
};

export default adminStaffMemberRolesReducer;
