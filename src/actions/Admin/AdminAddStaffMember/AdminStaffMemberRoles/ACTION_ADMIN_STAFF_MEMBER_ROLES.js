const ADMIN_STAFF_MEMBER_ROLES = "ADMIN_STAFF_MEMBER_ROLES";

const ACTION_ADMIN_STAFF_MEMBER_ROLES = (admin_staff_member_roles) => {
  return {
    type: ADMIN_STAFF_MEMBER_ROLES,
    admin_staff_member_roles,
  };
};

export default ACTION_ADMIN_STAFF_MEMBER_ROLES;
