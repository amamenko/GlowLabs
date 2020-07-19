const ADMIN_APPOINTMENT_STAFF_MEMBER = "ADMIN_APPOINTMENT_STAFF_MEMBER";

const ACTION_ADMIN_APPOINTMENT_STAFF_MEMBER = (
  admin_appointment_staff_member
) => {
  return {
    type: ADMIN_APPOINTMENT_STAFF_MEMBER,
    admin_appointment_staff_member,
  };
};

export default ACTION_ADMIN_APPOINTMENT_STAFF_MEMBER;
