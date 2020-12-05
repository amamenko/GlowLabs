const ADMIN_REGISTERED_EMPLOYEE_FOUND = "ADMIN_REGISTERED_EMPLOYEE_FOUND";
const ADMIN_REGISTERED_EMPLOYEE_FOUND_RESET =
  "ADMIN_REGISTERED_EMPLOYEE_FOUND_RESET";

const adminRegisteredEmployeeFoundReducer = (
  state = { admin_registered_employee_found: false },
  action
) => {
  switch (action.type) {
    case ADMIN_REGISTERED_EMPLOYEE_FOUND:
      return { ...state, admin_registered_employee_found: true };
    case ADMIN_REGISTERED_EMPLOYEE_FOUND_RESET:
      return { ...state, admin_registered_employee_found: false };
    default:
      return { ...state };
  }
};

export default adminRegisteredEmployeeFoundReducer;
