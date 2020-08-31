const ADMIN_STAFF_MEMBER_PHONE_NUMBER = "ADMIN_STAFF_MEMBER_PHONE_NUMBER";
const ADMIN_STAFF_MEMBER_PHONE_NUMBER_RESET =
  "ADMIN_STAFF_MEMBER_PHONE_NUMBER_RESET";

const adminStaffMemberPhoneNumberReducer = (
  state = { admin_staff_member_phone_number: "" },
  action
) => {
  switch (action.type) {
    case ADMIN_STAFF_MEMBER_PHONE_NUMBER:
      return {
        ...state,
        admin_staff_member_phone_number: action.admin_staff_member_phone_number,
      };
    case ADMIN_STAFF_MEMBER_PHONE_NUMBER_RESET:
      return { ...state, admin_staff_member_phone_number: "" };
    default:
      return { ...state };
  }
};

export default adminStaffMemberPhoneNumberReducer;
