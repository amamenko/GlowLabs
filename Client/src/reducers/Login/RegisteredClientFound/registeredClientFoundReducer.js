const REGISTERED_CLIENT_FOUND = "REGISTERED_CLIENT_FOUND";
const REGISTERED_CLIENT_FOUND_RESET = "REGISTERED_CLIENT_FOUND_RESET";

const registeredClientFoundReducer = (
  state = { registered_client_found: false },
  action
) => {
  switch (action.type) {
    case REGISTERED_CLIENT_FOUND:
      return { ...state, registered_client_found: true };
    case REGISTERED_CLIENT_FOUND_RESET:
      return { ...state, registered_client_found: false };
    default:
      return { ...state };
  }
};

export default registeredClientFoundReducer;
