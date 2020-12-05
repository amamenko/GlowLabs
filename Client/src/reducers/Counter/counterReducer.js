const INCREMENT_COUNTER = "INCREMENT_COUNTER";
const DECREMENT_COUNTER = "DECREMENT_COUNTER";
const RESET_COUNTER = "RESET_COUNTER";

const counterReducer = (state = { counter: 0 }, action) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return { ...state, counter: state.counter + 1 };
    case DECREMENT_COUNTER:
      return { ...state, counter: state.counter - 1 };
    case RESET_COUNTER:
      return { ...state, counter: 0 };
    default:
      return { ...state };
  }
};

export default counterReducer;
