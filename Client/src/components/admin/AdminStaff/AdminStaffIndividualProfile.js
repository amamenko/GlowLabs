import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faChevronRight,
  faHistory,
  faCalendarAlt,
  faTrashAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import LZString from "lz-string";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import BounceLoader from "react-spinners/BounceLoader";
import { Transition } from "react-spring/renderprops";
import { css } from "@emotion/css";
import deleteEmployeeMutation from "../../../graphql/mutations/deleteEmployeeMutation";
import { useMutation } from "@apollo/react-hooks";
import { useCallback } from "react";
import ACTION_LOADING_SPINNER_RESET from "../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_RESET";
import ACTION_LOADING_SPINNER_ACTIVE from "../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_ACTIVE";
import ACTION_ADMIN_CLIENT_UPCOMING_APPOINTMENTS_SELECTED from "../../../actions/Admin/AdminLogin/AdminClientSectionSelected/ACTION_ADMIN_CLIENT_UPCOMING_APPOINTMENTS_SELECTED";
import ACTION_ADMIN_CLIENT_PAST_APPOINTMENTS_SELECTED from "../../../actions/Admin/AdminLogin/AdminClientSectionSelected/ACTION_ADMIN_CLIENT_PAST_APPOINTMENTS_SELECTED";
import ACTION_ADD_PROFILE_PHOTO_CLICKED from "../../../actions/Admin/AddProfilePhotoClicked/ACTION_ADD_PROFILE_PHOTO_CLICKED";

const AdminStaffIndividualProfile = (props) => {
  const dispatch = useDispatch();
  const loadingSpinnerActive = useSelector(
    (state) => state.loadingSpinnerActive.loading_spinner
  );

  const [deleteStaffMemberClicked, changeDeleteStaffMemberClicked] = useState(
    false
  );

  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;

  const [deleteEmployee, { loading, data }] = useMutation(
    deleteEmployeeMutation
  );

  const handleDeleteEmployee = (item) => {
    deleteEmployee({
      variables: { _id: item },
    });

    if (deleteStaffMemberClicked) {
      changeDeleteStaffMemberClicked(false);
    }
  };

  const resetStatesAfterLoading = useCallback(() => {
    props.getEmployeesRefetch();
    dispatch(ACTION_LOADING_SPINNER_RESET());
    props.changeEmployeeToggled("");
  }, [props, dispatch]);

  useEffect(() => {
    if (data) {
      const loadingFunction = setTimeout(() => resetStatesAfterLoading(), 2000);
      return () => {
        clearTimeout(loadingFunction);
      };
    }
  }, [data, resetStatesAfterLoading]);

  useEffect(() => {
    if (loading) {
      dispatch(ACTION_LOADING_SPINNER_ACTIVE());
    }
  }, [loading, data, dispatch]);

  return (
    <>
      <Modal
        isOpen={deleteStaffMemberClicked}
        className="cancel_appointment_modal"
        style={{
          content: {
            position: "fixed",
            zIndex: 10000,
            opacity: 0.99,
            height: "100%",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            paddingBottom: "10%",
            borderRadius: "none",
            width: "100vw",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            border: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <BounceLoader
          size={100}
          css={override}
          color={"rgb(44, 44, 52)"}
          loading={loadingSpinnerActive}
        />
        <Transition
          items={deleteStaffMemberClicked && !loadingSpinnerActive}
          from={{ transform: "translate3d(0, -65%, 0)" }}
          enter={{ transform: "translate3d(0, 0, 0)" }}
          leave={{ display: "none" }}
        >
          {(deleteStaffMemberClicked) =>
            deleteStaffMemberClicked &&
            ((styleprops) => (
              <div
                className="cancel_appointment_modal_content_container"
                style={styleprops}
              >
                <div className="log_out_modal_contents admin_cancel_appointment">
                  <FontAwesomeIcon
                    className="modal_x"
                    icon={faTimes}
                    onClick={() => changeDeleteStaffMemberClicked(false)}
                  />
                  <h2>
                    Are you sure you want to remove{" "}
                    {props.item.firstName[0].toUpperCase() +
                      props.item.firstName.slice(1).toLowerCase() +
                      " " +
                      props.item.lastName[0].toUpperCase() +
                      props.item.lastName.slice(1).toLowerCase()}{" "}
                    as a staff member?
                  </h2>
                  <span className="logout_buttons_container">
                    <div
                      className="logout_button yes_cancel_appointment_button"
                      onClick={() =>
                        handleDeleteEmployee(props.employeeToggled)
                      }
                    >
                      <p>YES, REMOVE</p>
                    </div>
                    <div
                      className="cancel_logout_button no_dont_cancel_appointment_button"
                      onClick={() => changeDeleteStaffMemberClicked(false)}
                    >
                      <p>NO, GO BACK</p>
                    </div>
                  </span>
                </div>
              </div>
            ))
          }
        </Transition>
      </Modal>
      <div className="admin_client_profile_top_section">
        <div className="admin_client_profile_client_avatar_container">
          {props.getEmployeesData ? (
            props.getEmployeesData.employees.filter(
              (x) => x._id === props.employeeToggled
            )[0].profilePicture ? (
              <img
                className="admin_individual_client_picture_profile_avatar"
                // Uses Encoded URI Component instead of any other compression to support cross-browser compatability
                src={LZString.decompressFromEncodedURIComponent(
                  props.getEmployeesData.employees.filter(
                    (x) => x._id === props.employeeToggled
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
          {props.getEmployeeData ? (
            props.getEmployeeData.employee ? (
              props.getEmployeeData.employee.employeeRole.includes("Admin") ? (
                <div
                  className="admin_individual_selected_client_camera_icon_container"
                  onClick={() => dispatch(ACTION_ADD_PROFILE_PHOTO_CLICKED())}
                >
                  <FontAwesomeIcon
                    icon={faCamera}
                    className="admin_individual_selected_client_camera_icon"
                  />
                </div>
              ) : null
            ) : null
          ) : null}
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
          <p>
            Role:{" "}
            {props.item.employeeRole.length > 0
              ? props.item.employeeRole.join(", ")
              : "None"}
          </p>
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
        {props.getEmployeeData ? (
          props.getEmployeeData.employee ? (
            props.getEmployeeData.employee.employeeRole.includes("Admin") &&
            props.getEmployeeData.employee._id !== props.employeeToggled ? (
              <div
                className="profile_button_container"
                onClick={() => changeDeleteStaffMemberClicked(true)}
              >
                <FontAwesomeIcon
                  className="profile_button_icon"
                  icon={faTrashAlt}
                  style={{ color: "rgb(177, 48, 0)" }}
                />
                <h2 style={{ color: "rgb(177, 48, 0)" }}>
                  Delete Staff Member
                </h2>
              </div>
            ) : null
          ) : null
        ) : null}
      </div>
    </>
  );
};

export default AdminStaffIndividualProfile;
