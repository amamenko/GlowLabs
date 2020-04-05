const CONSENT_FORM_PAGE_1 = "CONSENT_FORM_PAGE_1";
const CONSENT_FORM_PAGE_2 = "CONSENT_FORM_PAGE_2";
const CONSENT_FORM_PAGE_3 = "CONSENT_FORM_PAGE_3";
const CONSENT_FORM_PAGE_4 = "CONSENT_FORM_PAGE_4";
const CONSENT_FORM_PAGE_5 = "CONSENT_FORM_PAGE_5";
const CONSENT_FORM_PAGE_6 = "CONSENT_FORM_PAGE_6";
const CONSENT_FORM_PAGE_7 = "CONSENT_FORM_PAGE_7";

const consentFormLastPageOpenedReducer = (
  state = { consent_form_active_page: "page1" },
  action
) => {
  switch (action.type) {
    case CONSENT_FORM_PAGE_1:
      return { ...state, consent_form_active_page: "page1" };
    case CONSENT_FORM_PAGE_2:
      return { ...state, consent_form_active_page: "page2" };
    case CONSENT_FORM_PAGE_3:
      return { ...state, consent_form_active_page: "page3" };
    case CONSENT_FORM_PAGE_4:
      return { ...state, consent_form_active_page: "page4" };
    case CONSENT_FORM_PAGE_5:
      return { ...state, consent_form_active_page: "page5" };
    case CONSENT_FORM_PAGE_6:
      return { ...state, consent_form_active_page: "page6" };
    case CONSENT_FORM_PAGE_7:
      return { ...state, consent_form_active_page: "page7" };
    default:
      return { ...state };
  }
};

export default consentFormLastPageOpenedReducer;
