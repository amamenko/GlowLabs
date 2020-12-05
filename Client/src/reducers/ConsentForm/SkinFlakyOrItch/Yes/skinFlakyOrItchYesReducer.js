const SKIN_FLAKY_OR_ITCH_YES = "SKIN_FLAKY_OR_ITCH_YES";
const SKIN_FLAKY_OR_ITCH_YES_RESET = "SKIN_FLAKY_OR_ITCH_YES_RESET";

const skinFlakyOrItchYesReducer = (
  state = { skin_flaky_or_itch_yes_active: false },
  action
) => {
  switch (action.type) {
    case SKIN_FLAKY_OR_ITCH_YES:
      return { ...state, skin_flaky_or_itch_yes_active: true };
    case SKIN_FLAKY_OR_ITCH_YES_RESET:
      return { ...state, skin_flaky_or_itch_yes_active: false };
    default:
      return { ...state };
  }
};

export default skinFlakyOrItchYesReducer;
