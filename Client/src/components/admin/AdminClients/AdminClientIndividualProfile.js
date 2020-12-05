import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faSpa,
  faChevronRight,
  faHistory,
  faCalendarAlt,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import LZString from "lz-string";
import ACTION_ADMIN_CLIENT_UPCOMING_APPOINTMENTS_SELECTED from "../../../actions/Admin/AdminLogin/AdminClientSectionSelected/ACTION_ADMIN_CLIENT_UPCOMING_APPOINTMENTS_SELECTED";
import ACTION_ADMIN_CLIENT_PAST_APPOINTMENTS_SELECTED from "../../../actions/Admin/AdminLogin/AdminClientSectionSelected/ACTION_ADMIN_CLIENT_PAST_APPOINTMENTS_SELECTED";
import { useDispatch } from "react-redux";
import ACTION_ADD_PROFILE_PHOTO_CLICKED from "../../../actions/Admin/AddProfilePhotoClicked/ACTION_ADD_PROFILE_PHOTO_CLICKED";

const AdminClientIndividualProfile = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="admin_client_profile_top_section">
        <div className="admin_client_profile_client_avatar_container">
          {props.getClientsData ? (
            props.getClientsData.clients.filter(
              (x) => x._id === props.clientToggled
            )[0].profilePicture ? (
              <img
                className="admin_individual_client_picture_profile_avatar"
                // Uses Encoded URI Component instead of any other compression to support cross-browser compatability
                src={LZString.decompressFromEncodedURIComponent(
                  props.getClientsData.clients.filter(
                    (x) => x._id === props.clientToggled
                  )[0].profilePicture
                )}
                alt={
                  props.item.firstName[0].toUpperCase() +
                  props.item.firstName.slice(1).toLowerCase() +
                  " " +
                  props.item.lastName[0].toUpperCase() +
                  props.item.lastName.slice(1).toLowerCase() +
                  " Profile Picture"
                }
              />
            ) : (
              props.handleProfilePictureRender(props.item)
            )
          ) : (
            props.handleProfilePictureRender(props.item)
          )}
          <div
            className="admin_individual_selected_client_camera_icon_container"
            onClick={() => dispatch(ACTION_ADD_PROFILE_PHOTO_CLICKED())}
          >
            <FontAwesomeIcon
              icon={faCamera}
              className="admin_individual_selected_client_camera_icon"
            />
          </div>
        </div>
        <div className="admin_individual_selected_client_full_name_container">
          <h2>
            {props.item.firstName[0].toUpperCase() +
              props.item.firstName.slice(1).toLowerCase() +
              " " +
              props.item.lastName[0].toUpperCase() +
              props.item.lastName.slice(1).toLowerCase()}
          </h2>
        </div>
        <div className="admin_individual_selected_client_contact_info_container">
          <p>{props.item.email}</p>
          {props.renderBarInContactInfo()}
          <p>{props.item.phoneNumber}</p>
        </div>
        <div className="admin_individual_selected_client_contact_info_container admin_individual_selected_membership_type_container">
          <p>Membership Type: Default</p>
        </div>
      </div>
      <div className="admin_client_profile_bottom_buttons_container">
        <div
          className="profile_button_container"
          onClick={() =>
            dispatch(ACTION_ADMIN_CLIENT_UPCOMING_APPOINTMENTS_SELECTED())
          }
        >
          <FontAwesomeIcon
            className="profile_button_icon"
            icon={faCalendarAlt}
          />
          <h2>Upcoming Appointments</h2>
          <FontAwesomeIcon
            className="profile_button_expand"
            icon={faChevronRight}
          />
        </div>
        <div
          className="profile_button_container"
          onClick={() =>
            dispatch(ACTION_ADMIN_CLIENT_PAST_APPOINTMENTS_SELECTED())
          }
        >
          <FontAwesomeIcon className="profile_button_icon" icon={faHistory} />
          <h2>Past Appointments</h2>
          <FontAwesomeIcon
            className="profile_button_expand"
            icon={faChevronRight}
          />
        </div>
        {/* <div className="profile_button_container">
          <FontAwesomeIcon
            className="profile_button_icon"
            icon={faCommentDots}
          />
          <h2>Recommended Routine</h2>
          <FontAwesomeIcon
            className="profile_button_expand"
            icon={faChevronRight}
          />
        </div>
        <div className="profile_button_container">
          <FontAwesomeIcon className="profile_button_icon" icon={faSpa} />
          <h2>
            {props.item.firstName[0].toUpperCase() +
              props.item.firstName.slice(1).toLowerCase()}
            's Skin Care Routine
          </h2>
          <FontAwesomeIcon
            className="profile_button_expand"
            icon={faChevronRight}
          />
        </div> */}
        {props.renderDownloadConsentFormButton(props.item)}
      </div>
    </>
  );
};

export default AdminClientIndividualProfile;
