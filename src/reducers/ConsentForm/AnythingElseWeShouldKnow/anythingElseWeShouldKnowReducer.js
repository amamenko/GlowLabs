const ANYTHING_ELSE_WE_SHOULD_KNOW_NOTES = "ANYTHING_ELSE_WE_SHOULD_KNOW_NOTES";
const ANYTHING_ELSE_WE_SHOULD_KNOW_NOTES_RESET =
  "ANYTHING_ELSE_WE_SHOULD_KNOW_NOTES_RESET";

const anythingElseWeShouldKnowNotesReducer = (
  state = { anything_else_we_should_know_notes: "" },
  action
) => {
  switch (action.type) {
    case ANYTHING_ELSE_WE_SHOULD_KNOW_NOTES:
      return {
        ...state,
        anything_else_we_should_know_notes:
          action.anything_else_we_should_know_notes,
      };
    case ANYTHING_ELSE_WE_SHOULD_KNOW_NOTES_RESET:
      return { ...state, anything_else_we_should_know_notes: "" };
    default:
      return { ...state };
  }
};

export default anythingElseWeShouldKnowNotesReducer;
