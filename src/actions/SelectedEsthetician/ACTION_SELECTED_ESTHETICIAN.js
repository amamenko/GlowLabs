const SELECTED_ESTHETICIAN = "SELECTED_ESTHETICIAN";

const ACTION_SELECTED_ESTHETICIAN = (selectedEsthetician) => {
  return {
    type: SELECTED_ESTHETICIAN,
    selectedEsthetician,
  };
};

export default ACTION_SELECTED_ESTHETICIAN;
