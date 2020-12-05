const SAVE_CARD_CHECKED = "SAVE_CARD_CHECKED";
const SAVE_CARD_UNCHECKED = "SAVE_CARD_UNCHECKED";

const saveCardCheckedReducer = (
  state = { save_card_checked: false },
  action
) => {
  switch (action.type) {
    case SAVE_CARD_CHECKED:
      return { ...state, save_card_checked: true };
    case SAVE_CARD_UNCHECKED:
      return { ...state, save_card_checked: false };
    default:
      return { ...state };
  }
};

export default saveCardCheckedReducer;
