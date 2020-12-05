const BOOKING_SUMMARY_ACTIVE = "BOOKING_SUMMARY_ACTIVE";
const BOOKING_SUMMARY_NOT_ACTIVE = "BOOKING_SUMMARY_NOT_ACTIVE";

const continueToBookingSummaryReducer = (
  state = { bookingSummaryActive: false },
  action
) => {
  switch (action.type) {
    case BOOKING_SUMMARY_ACTIVE:
      return { ...state, bookingSummaryActive: true };
    case BOOKING_SUMMARY_NOT_ACTIVE:
      return { ...state, bookingSummaryActive: false };
    default:
      return { ...state };
  }
};

export default continueToBookingSummaryReducer;
