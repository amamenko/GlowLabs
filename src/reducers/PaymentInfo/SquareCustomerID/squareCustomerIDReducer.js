const SQUARE_CUSTOMER_ID = "SQUARE_CUSTOMER_ID";
const SQUARE_CUSTOMER_ID_RESET = "SQUARE_CUSTOMER_ID_RESET";

const squareCustomerIDReducer = (
  state = { square_customer_id: "" },
  action
) => {
  switch (action.type) {
    case SQUARE_CUSTOMER_ID:
      return {
        ...state,
        square_customer_id: action.square_customer_id,
      };
    case SQUARE_CUSTOMER_ID_RESET:
      return { ...state, square_customer_id: "" };
    default:
      return { ...state };
  }
};

export default squareCustomerIDReducer;
