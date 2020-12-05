const LOG_OUT_CLICKED = "LOG_OUT_CLICKED";
const LOG_OUT_CLICKED_RESET = "LOG_OUT_CLICKED_RESET";

const logoutClickedReducer = (state = { log_out_clicked: false }, action) => {
  switch (action.type) {
    case LOG_OUT_CLICKED:
      return { ...state, log_out_clicked: true };
    case LOG_OUT_CLICKED_RESET:
      return { ...state, log_out_clicked: false };
    default:
      return { ...state };
  }
};

export default logoutClickedReducer;
