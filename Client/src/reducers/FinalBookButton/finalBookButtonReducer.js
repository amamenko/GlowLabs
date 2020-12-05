const FINAL_BOOK_BUTTON_ACTIVE = "FINAL_BOOK_BUTTON_ACTIVE";
const FINAL_BOOK_BUTTON_RESET = "FINAL_BOOK_BUTTON_RESET";

const finalBookButtonReducer = (
  state = { final_book_button_active: false },
  action
) => {
  switch (action.type) {
    case FINAL_BOOK_BUTTON_ACTIVE:
      return { ...state, final_book_button_active: true };
    case FINAL_BOOK_BUTTON_RESET:
      return { ...state, final_book_button_active: false };
    default:
      return { ...state };
  }
};

export default finalBookButtonReducer;
