const ANY_CHEM_PEELS_LAST_MONTH_YES = "ANY_CHEM_PEELS_LAST_MONTH_YES";
const ANY_CHEM_PEELS_LAST_MONTH_YES_RESET =
  "ANY_CHEM_PEELS_LAST_MONTH_YES_RESET";

const anyChemPeelsLastMonthYesReducer = (
  state = { any_chem_peels_last_month_yes_active: false },
  action
) => {
  switch (action.type) {
    case ANY_CHEM_PEELS_LAST_MONTH_YES:
      return { ...state, any_chem_peels_last_month_yes_active: true };
    case ANY_CHEM_PEELS_LAST_MONTH_YES_RESET:
      return { ...state, any_chem_peels_last_month_yes_active: false };
    default:
      return { ...state };
  }
};

export default anyChemPeelsLastMonthYesReducer;
