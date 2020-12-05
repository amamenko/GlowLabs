const BOOKED_WITH_CARD_ID = "BOOKED_WITH_CARD_ID";

const ACTION_BOOKED_WITH_CARD_ID = (booked_with_card_id) => {
  return {
    type: BOOKED_WITH_CARD_ID,
    booked_with_card_id,
  };
};

export default ACTION_BOOKED_WITH_CARD_ID;
