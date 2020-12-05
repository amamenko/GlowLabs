const ADD_PROFILE_PHOTO_CLICKED = "ADD_PROFILE_PHOTO_CLICKED";
const ADD_PROFILE_PHOTO_CLICKED_RESET = "ADD_PROFILE_PHOTO_CLICKED_RESET";

const addProfilePhotoClickedReducer = (
  state = { add_profile_photo_clicked: false },
  action
) => {
  switch (action.type) {
    case ADD_PROFILE_PHOTO_CLICKED:
      return { ...state, add_profile_photo_clicked: true };
    case ADD_PROFILE_PHOTO_CLICKED_RESET:
      return { ...state, add_profile_photo_clicked: false };
    default:
      return { ...state };
  }
};

export default addProfilePhotoClickedReducer;
