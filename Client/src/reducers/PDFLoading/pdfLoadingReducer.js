const PDF_LOADING = "PDF_LOADING";
const PDF_LOADING_RESET = "PDF_LOADING_RESET";

const pdfLoadingReducer = (state = { pdf_loading: false }, action) => {
  switch (action.type) {
    case PDF_LOADING:
      return { ...state, pdf_loading: true };
    case PDF_LOADING_RESET:
      return { ...state, pdf_loading: false };
    default:
      return { ...state };
  }
};

export default pdfLoadingReducer;
