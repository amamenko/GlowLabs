const IMAGE_LOADING = "IMAGE_LOADING";
const IMAGE_LOADING_RESET = "IMAGE_LOADING_RESET";

const imageLoadingReducer = (state = { image_loading: false }, action) => {
  switch (action.type) {
    case IMAGE_LOADING:
      return { ...state, image_loading: true };
    case IMAGE_LOADING_RESET:
      return { ...state, image_loading: false };
    default:
      return { ...state };
  }
};

export default imageLoadingReducer;
