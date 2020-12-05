const CONSENT_FORM_PDF_READY = "CONSENT_FORM_PDF_READY";
const CONSENT_FORM_PDF_READY_RESET = "CONSENT_FORM_PDF_READY_RESET";

const consentFormPDFReducer = (
  state = { consent_form_pdf_ready: false },
  action
) => {
  switch (action.type) {
    case CONSENT_FORM_PDF_READY:
      return { ...state, consent_form_pdf_ready: true };
    case CONSENT_FORM_PDF_READY_RESET:
      return { ...state, consent_form_pdf_ready: false };
    default:
      return { ...state };
  }
};

export default consentFormPDFReducer;
