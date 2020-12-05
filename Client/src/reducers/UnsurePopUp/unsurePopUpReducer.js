const UNSURE_POP_UP_TRIGGERED = "UNSURE_POP_UP_TRIGGERED";

const unsurePopUpTriggeredReducer = (
  state = { unsure_pop_up_triggered: 0 },
  action
) => {
  switch (action.type) {
    case UNSURE_POP_UP_TRIGGERED:
      return {
        ...state,
        unsure_pop_up_triggered: state.unsure_pop_up_triggered + 1,
      };
    default:
      return { ...state };
  }
};

export default unsurePopUpTriggeredReducer;
