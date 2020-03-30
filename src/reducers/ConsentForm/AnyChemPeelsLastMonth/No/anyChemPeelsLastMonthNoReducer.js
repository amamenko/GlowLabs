const ANY_CHEM_PEELS_LAST_MONTH_NO = "ANY_CHEM_PEELS_LAST_MONTH_NO";
const ANY_CHEM_PEELS_LAST_MONTH_NO_RESET = "ANY_CHEM_PEELS_LAST_MONTH_NO_RESET";

const anyChemPeelsLastMonthNoReducer = (
  state = { any_chem_peels_last_month_no_active: false },
  action
) => {
  switch (action.type) {
    case ANY_CHEM_PEELS_LAST_MONTH_NO:
      return { ...state, any_chem_peels_last_month_no_active: true };
    case ANY_CHEM_PEELS_LAST_MONTH_NO_RESET:
      return { ...state, any_chem_peels_last_month_no_active: false };
    default:
      return { ...state };
  }
};

export default anyChemPeelsLastMonthNoReducer;
