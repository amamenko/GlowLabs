const ADMIN_STAFF_MEMBER_EMAIL = "ADMIN_STAFF_MEMBER_EMAIL";

const ACTION_ADMIN_STAFF_MEMBER_EMAIL = (admin_staff_member_email) => {
  return {
    type: ADMIN_STAFF_MEMBER_EMAIL,
    admin_staff_member_email,
  };
};

export default ACTION_ADMIN_STAFF_MEMBER_EMAIL;
