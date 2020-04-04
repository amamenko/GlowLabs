const SKIN_FLAKY_OR_ITCH_NO = "SKIN_FLAKY_OR_ITCH_NO";
const SKIN_FLAKY_OR_ITCH_NO_RESET = "SKIN_FLAKY_OR_ITCH_NO_RESET";

const skinFlakyOrItchNoReducer = (
  state = { skin_flaky_or_itch_no_active: false },
  action
) => {
  switch (action.type) {
    case SKIN_FLAKY_OR_ITCH_NO:
      return { ...state, skin_flaky_or_itch_no_active: true };
    case SKIN_FLAKY_OR_ITCH_NO_RESET:
      return { ...state, skin_flaky_or_itch_no_active: false };
    default:
      return { ...state };
  }
};

export default skinFlakyOrItchNoReducer;
