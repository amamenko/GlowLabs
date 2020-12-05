const BOOKED_WITH_CARD_ID = "BOOKED_WITH_CARD_ID";
const BOOKED_WITH_CARD_ID_RESET = "BOOKED_WITH_CARD_ID_RESET";

const bookedWithCardIDReducer = (
  state = { booked_with_card_id: "" },
  action
) => {
  switch (action.type) {
    case BOOKED_WITH_CARD_ID:
      return {
        ...state,
        booked_with_card_id: action.booked_with_card_id,
      };
    case BOOKED_WITH_CARD_ID_RESET:
      return { ...state, booked_with_card_id: "" };
    default:
      return { ...state };
  }
};

export default bookedWithCardIDReducer;
