const LIST_KNOWN_ALLERGIES_NOTES = "LIST_KNOWN_ALLERGIES_NOTES";

const ACTION_LIST_KNOWN_ALLERGIES_NOTES = (list_known_allergies_notes) => {
  return {
    type: LIST_KNOWN_ALLERGIES_NOTES,
    list_known_allergies_notes,
  };
};

export default ACTION_LIST_KNOWN_ALLERGIES_NOTES;
