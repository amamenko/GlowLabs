const ADMIN_APPOINTMENT_STAFF_MEMBER = "ADMIN_APPOINTMENT_STAFF_MEMBER";
const ADMIN_APPOINTMENT_STAFF_MEMBER_RESET =
  "ADMIN_APPOINTMENT_STAFF_MEMBER_RESET";

const adminAppointmentStaffMemberReducer = (
  state = { admin_appointment_staff_member: "" },
  action
) => {
  switch (action.type) {
    case ADMIN_APPOINTMENT_STAFF_MEMBER:
      return {
        ...state,
        admin_appointment_staff_member: action.admin_appointment_staff_member,
      };
    case ADMIN_APPOINTMENT_STAFF_MEMBER_RESET:
      return { ...state, admin_appointment_staff_member: "" };
    default:
      return { ...state };
  }
};

export default adminAppointmentStaffMemberReducer;
