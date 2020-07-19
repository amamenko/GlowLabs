const ADMIN_SELECTED_TREATMENTS = "ADMIN_SELECTED_TREATMENTS";

const ACTION_ADMIN_SELECTED_TREATMENTS = (admin_selected_treatments) => {
  return {
    type: ADMIN_SELECTED_TREATMENTS,
    admin_selected_treatments,
  };
};

export default ACTION_ADMIN_SELECTED_TREATMENTS;
