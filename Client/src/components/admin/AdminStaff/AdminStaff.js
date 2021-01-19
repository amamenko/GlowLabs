import React, { useEffect, useState, useMemo, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faSearch,
  faEllipsisH,
  faLongArrowAltLeft,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link, useLocation } from "react-router-dom";
import { FormGroup, Input } from "reactstrap";
import Modal from "react-modal";
import { Transition } from "react-spring/renderprops";
import imageCompression from "browser-image-compression";
import ImageUploader from "react-images-upload";
import Camera, { IMAGE_TYPES } from "react-html5-camera-photo";
import { useMutation } from "@apollo/react-hooks";
import updateAdminProfilePictureMutation from "../../../graphql/mutations/updateAdminProfilePictureMutation";
import LZString from "lz-string";
import { css } from "@emotion/css";
import BounceLoader from "react-spinners/BounceLoader";
import AdminStaffIndividualProfile from "./AdminStaffIndividualProfile";
import AdminAddStaffMember from "./AdminAddStaffMember";
import AdminRenderUpcomingAppointments from "../AdminClients/AdminRenderUpcomingAppointments";
import AdminRenderPastAppointments from "../AdminClients/AdminRenderPastAppointments";
import moment from "moment";
import ACTION_SPLASH_SCREEN_COMPLETE from "../../../actions/SplashScreenComplete/ACTION_SPLASH_SCREEN_COMPLETE";
import ACTION_SPLASH_SCREEN_HALFWAY from "../../../actions/SplashScreenHalfway/ACTION_SPLASH_SCREEN_HALFWAY";
import ACTION_LOGIN_IS_NOT_ACTIVE from "../../../actions/Login/ACTION_LOGIN_IS_NOT_ACTIVE";
import ACTION_ADMIN_CLIENT_PROFILE_SELECTED from "../../../actions/Admin/AdminLogin/AdminClientSectionSelected/ACTION_ADMIN_CLIENT_PROFILE_SELECTED.js";
import ACTION_ADD_PROFILE_PHOTO_CLICKED_RESET from "../../../actions/Admin/AddProfilePhotoClicked/ACTION_ADD_PROFILE_CLICKED_RESET";
import ACTION_LOADING_SPINNER_RESET from "../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_RESET";
import ACTION_LOADING_SPINNER_ACTIVE from "../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_ACTIVE";
import ACTION_IMAGE_LOADING from "../../../actions/Admin/ImageLoading/ACTION_IMAGE_LOADING";
import ACTION_IMAGE_LOADING_RESET from "../../../actions/Admin/ImageLoading/ACTION_IMAGE_LOADING_RESET";
import ACTION_ON_ACTIVITY_PAGE_RESET from "../../../actions/Admin/OnActivityPage/ACTION_ON_ACTIVITY_PAGE_RESET";
import "./AdminStaff.css";
import "react-html5-camera-photo/build/css/index.css";

const AdminStaff = (props) => {
  const {
    getEmployeeData,
    getEmployeeError,
    getEmployeesError,
    getEmployeesRefetch,
    getEmployeesData,
    getAllAppointmentsData,
    currentScreenSize,
    initialScreenSize,
    getClientsData,
    getClientsLoading,
    getAllAppointmentsRefetch,
    employeeDataRefetch,
    randomColorArray,
    resetNotifications,
  } = props;

  const dispatch = useDispatch();
  const location = useLocation();

  const selectedEmployeeBackRef = useRef(null);
  const backToClientsRef = useRef(null);
  let individualEmployeeRef = useRef(null);

  const splashScreenHalfway = useSelector(
    (state) => state.splashScreenHalfway.splashScreenHalfway
  );
  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );
  const adminAuthenticated = useSelector(
    (state) => state.adminAuthenticated.admin_authenticated
  );
  const logoutClicked = useSelector(
    (state) => state.logoutClicked.log_out_clicked
  );
  const loginIsActive = useSelector(
    (state) => state.loginIsActive.login_is_active
  );
  const adminClientSectionSelected = useSelector(
    (state) => state.adminClientSectionSelected.admin_client_section_selected
  );
  const addProfilePhotoClicked = useSelector(
    (state) => state.addProfilePhotoClicked.add_profile_photo_clicked
  );
  const loadingSpinnerActive = useSelector(
    (state) => state.loadingSpinnerActive.loading_spinner
  );
  const imageLoading = useSelector((state) => state.imageLoading.image_loading);
  const cancelAppointmentClicked = useSelector(
    (state) => state.cancelAppointmentClicked.cancelAppointmentClicked
  );
  const onActivityPage = useSelector(
    (state) => state.onActivityPage.on_activity_page
  );
  const adminNotifications = useSelector(
    (state) => state.adminNotifications.notifications
  );

  const [filteredAllEmployees, changeFilteredAllEmployees] = useState([]);
  const [employeeFilter, changeEmployeeFilter] = useState("");
  const [employeeToggled, changeEmployeeToggled] = useState("");
  const [employeeNameToggled, changeEmployeeNameToggled] = useState("");
  const [addStaffMemberClicked, changeAddStaffMemberClicked] = useState(false);
  const [
    selectedEmployeeAppointments,
    changeSelectedEmployeeAppointments,
  ] = useState([]);
  const [
    selectedEmployeePastAppointments,
    changeSelectedEmployeePastAppointments,
  ] = useState([]);

  const [takeAPhotoSelected, changeTakeAPhotoSelected] = useState(false);
  const [webcamURI, changeWebcamURI] = useState("");
  const [imageUploaded, changeImageUploaded] = useState("");
  const [imagePreviewAvailable, changeImagePreviewAvailable] = useState(false);
  const [pdfLoading, changePDFLoading] = useState(false);

  const [
    updateAdminProfilePicture,
    { data: updateAdminProfilePictureData },
  ] = useMutation(updateAdminProfilePictureMutation);

  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;

  useEffect(() => {
    if (!splashScreenComplete) {
      dispatch(ACTION_SPLASH_SCREEN_COMPLETE());
    }
    if (!splashScreenHalfway) {
      dispatch(ACTION_SPLASH_SCREEN_HALFWAY());
    }
  }, [dispatch, splashScreenComplete, splashScreenHalfway]);

  const redirectToAdminLogInPage = () => {
    if (!adminAuthenticated) {
      return <Redirect to="/admin" />;
    }
  };

  const handleChangeEmployeeFilter = (e) => {
    changeEmployeeFilter(e.currentTarget.value);
  };

  useEffect(() => {
    if (onActivityPage) {
      if (adminNotifications) {
        if (adminNotifications.length > 0) {
          if (adminNotifications.some((item) => item.new)) {
            resetNotifications();
          }
        }
      }
      dispatch(ACTION_ON_ACTIVITY_PAGE_RESET());
    }
  }, [onActivityPage, dispatch, resetNotifications, adminNotifications]);

  useEffect(() => {
    if (employeeToggled) {
      if (getEmployeesData) {
        if (getEmployeesData.employees.length > 0) {
          const selectedEmployee = getEmployeesData.employees.filter(
            (x) => x._id === employeeToggled
          )[0];

          if (!employeeNameToggled) {
            changeEmployeeNameToggled(
              selectedEmployee.firstName + " " + selectedEmployee.lastName
            );
          }
        }
      }
    } else {
      if (employeeNameToggled) {
        changeEmployeeNameToggled("");
      }
    }
  }, [employeeToggled, employeeNameToggled, getEmployeesData]);

  useEffect(() => {
    if (employeeNameToggled) {
      changeSelectedEmployeeAppointments({
        own_appointments: getAllAppointmentsData.all_appointments.filter(
          (x) =>
            x.esthetician === employeeNameToggled &&
            moment(
              x.date + " " + x.startTime + " " + x.morningOrEvening,
              "MMMM D, YYYY h:mm A"
            ).isAfter(moment())
        ),
      });

      changeSelectedEmployeePastAppointments({
        own_past_appointments: getAllAppointmentsData.all_appointments.filter(
          (x) =>
            x.esthetician === employeeNameToggled &&
            moment(
              x.date + " " + x.startTime + " " + x.morningOrEvening,
              "MMMM D, YYYY h:mm A"
            ).isBefore(moment())
        ),
      });
    } else {
      changeSelectedEmployeeAppointments([]);
    }
  }, [employeeNameToggled, getAllAppointmentsData]);

  const handleDeletedPreviewImage = () => {
    const deleteImageClass = document.getElementsByClassName("deleteImage");
    const uploadPictureClass = document.getElementsByClassName("uploadPicture");

    if (deleteImageClass) {
      if (deleteImageClass[0]) {
        deleteImageClass[0].style.display = "none";
      }
    }
    if (uploadPictureClass) {
      if (uploadPictureClass[0]) {
        uploadPictureClass[0].style.display = "none";
      }
    }
  };

  const handleImageUploaded = async (picture) => {
    dispatch(ACTION_IMAGE_LOADING());
    if (picture[0] || typeof picture === "string") {
      const reader = new FileReader();
      changeImagePreviewAvailable(true);
      try {
        let compressedImage;

        if (typeof picture === "object") {
          compressedImage = await imageCompression(picture[0], {
            maxSizeMB: 0.3,
            maxWidthOrHeight: 300,
          });
        } else if (typeof picture === "string") {
          await fetch(picture)
            .then((res) => {
              return res.blob();
            })
            .then(async (blob) => {
              compressedImage = await imageCompression(blob, {
                maxSizeMB: 0.3,
                maxWidthOrHeight: 300,
              });
            });
        }

        reader.readAsDataURL(compressedImage);

        reader.onloadend = async () => {
          const base64data = reader.result;

          const compressedBase64data = LZString.compressToEncodedURIComponent(
            base64data
          );
          dispatch(ACTION_IMAGE_LOADING_RESET());
          changeImageUploaded(compressedBase64data);
        };
      } catch (error) {
        dispatch(ACTION_IMAGE_LOADING_RESET());
        console.log(error);
      }
    } else {
      dispatch(ACTION_IMAGE_LOADING_RESET());
      changeImageUploaded("");
      changeImagePreviewAvailable(false);
      handleDeletedPreviewImage();
    }
  };

  const preventKeys = (e) => {
    if (
      e.key === ")" ||
      e.key === "(" ||
      e.key === "[" ||
      e.key === "]" ||
      e.key === "\\" ||
      e.key === "/"
    ) {
      e.preventDefault();
    }
  };

  useMemo(() => {
    if (getEmployeesData) {
      if (getEmployeesData.employees.length > 0) {
        if (changeEmployeeFilter) {
          changeFilteredAllEmployees(
            [...getEmployeesData.employees].filter((x) => {
              return (
                new RegExp(employeeFilter, "gi").test(
                  x.firstName + " " + x.lastName
                ) ||
                new RegExp(employeeFilter, "gi").test(x.email) ||
                new RegExp(employeeFilter, "gi").test(x.phoneNumber) ||
                new RegExp(employeeFilter, "gi").test(
                  x.phoneNumber.split(/[\W_]+/g).join("")
                )
              );
            })
          );
        }
      }
    }
  }, [employeeFilter, getEmployeesData]);

  // Allows click only if selected employee modal is not active

  const handleEmployeeToggled = (e, item) => {
    if (e.currentTarget && individualEmployeeRef) {
      if (individualEmployeeRef.current) {
        if (
          individualEmployeeRef.current.className === e.currentTarget.className
        ) {
          if (selectedEmployeeBackRef) {
            if (!selectedEmployeeBackRef.current) {
              if (item) {
                if (item._id) {
                  changeEmployeeToggled(item._id);
                }
              }
            }
          }
        }
      } else {
        if (
          e.currentTarget.innerText.includes(
            item.firstName[0].toUpperCase() +
              item.firstName.slice(1).toLowerCase()
          ) &&
          e.currentTarget.innerText.includes(
            item.lastName[0].toUpperCase() +
              item.lastName.slice(1).toLowerCase()
          )
        ) {
          if (selectedEmployeeBackRef) {
            if (!selectedEmployeeBackRef.current) {
              if (item) {
                if (item._id) {
                  changeEmployeeToggled(item._id);
                }
              }
            }
          }
        }
      }
    }
  };

  // Function for back arrow click to reset selected toggled employee

  const handleEmployeeUntoggled = (e) => {
    if (
      (e.currentTarget && selectedEmployeeBackRef) ||
      (e.currentTarget && backToClientsRef)
    ) {
      if (selectedEmployeeBackRef.current || backToClientsRef.current) {
        if (
          selectedEmployeeBackRef.current.className ===
            e.currentTarget.className ||
          backToClientsRef.current.className === e.currentTarget.className
        ) {
          changeEmployeeToggled("");

          if (pdfLoading) {
            changePDFLoading(false);
          }
        }
      }
    }
  };

  useEffect(() => {
    if (location.pathname || addProfilePhotoClicked || loadingSpinnerActive) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, addProfilePhotoClicked, loadingSpinnerActive]);

  // When account screen unmounts, allow navbar
  useEffect(() => {
    if (loginIsActive) {
      dispatch(ACTION_LOGIN_IS_NOT_ACTIVE());
    }
  }, [dispatch, loginIsActive]);

  const handleConfirmPhotoSubmit = () => {
    updateAdminProfilePicture({
      variables: {
        id: employeeToggled,
        profilePicture: imageUploaded,
      },
    });

    dispatch(ACTION_IMAGE_LOADING());
    changeImageUploaded("");
    dispatch(ACTION_ADD_PROFILE_PHOTO_CLICKED_RESET());
    changeImagePreviewAvailable(false);
    changeTakeAPhotoSelected(false);
    changeWebcamURI("");
  };

  const handleProfilePictureRender = (item) => {
    if (item.profilePicture) {
      return (
        <img
          className="admin_individual_client_picture_profile_avatar"
          src={LZString.decompressFromEncodedURIComponent(item.profilePicture)}
          alt={
            item.firstName[0].toUpperCase() +
            item.firstName.slice(1).toLowerCase() +
            " " +
            item.lastName[0].toUpperCase() +
            item.lastName.slice(1).toLowerCase() +
            " Profile Picture"
          }
        />
      );
    } else {
      return (
        <div
          className="admin_individual_client_initials_profile_avatar"
          style={{
            background:
              randomColorArray[
                getEmployeesData.employees
                  .sort((a, b) => a.firstName.localeCompare(b.firstName))
                  .map((x) => x.email)
                  .indexOf(item.email)
              ],
          }}
        >
          <p>
            {item.firstName[0].toUpperCase() + item.lastName[0].toUpperCase()}
          </p>
        </div>
      );
    }
  };

  useEffect(() => {
    if (updateAdminProfilePictureData) {
      const imageDataReceived = setTimeout(() => {
        if (imageLoading) {
          dispatch(ACTION_IMAGE_LOADING_RESET());
        }
      }, 500);
      getEmployeesRefetch();
      employeeDataRefetch();
      return () => {
        clearTimeout(imageDataReceived);
      };
    }
  }, [
    imageLoading,
    updateAdminProfilePictureData,
    dispatch,
    getEmployeesRefetch,
    employeeDataRefetch,
  ]);

  const renderBarInContactInfo = () => {
    if (!currentScreenSize) {
      if (initialScreenSize >= 1200) {
        return null;
      } else {
        return <p style={{ color: "rgb(200, 200, 200)" }}>|</p>;
      }
    } else {
      if (currentScreenSize >= 1200) {
        return null;
      } else {
        return <p style={{ color: "rgb(200, 200, 200)" }}>|</p>;
      }
    }
  };

  useEffect(() => {
    if (getClientsLoading) {
      dispatch(ACTION_LOADING_SPINNER_ACTIVE());
    } else {
      dispatch(ACTION_LOADING_SPINNER_RESET());
    }
  }, [dispatch, getClientsLoading]);

  useEffect(() => {
    if (getEmployeeError) {
      employeeDataRefetch();
    }
  }, [getEmployeeError, employeeDataRefetch]);

  useEffect(() => {
    if (getEmployeesError) {
      getEmployeesRefetch();
    }
  }, [getEmployeesError, getEmployeesRefetch]);

  return (
    <div className="admin_clients_container">
      {redirectToAdminLogInPage()}
      <Modal
        isOpen={imageLoading || loadingSpinnerActive || getClientsLoading}
        style={{
          content: {
            position: "fixed",
            zIndex: "10000",
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
          loading={imageLoading || loadingSpinnerActive || getClientsLoading}
        />
      </Modal>
      <div
        className="admin_clients_header"
        style={{
          zIndex:
            logoutClicked ||
            addProfilePhotoClicked ||
            loadingSpinnerActive ||
            imageLoading ||
            cancelAppointmentClicked ||
            getClientsLoading
              ? 0
              : 5,
          filter:
            cancelAppointmentClicked || getClientsLoading
              ? "blur(5px)"
              : "none",
        }}
      >
        <Link to="/admin/menu">
          <FontAwesomeIcon
            className="admin_clients_back_arrow"
            icon={faChevronLeft}
          />
        </Link>
        <h1>STAFF</h1>
      </div>
      <FormGroup>
        <div className="admin_clients_searchbar_container">
          <Input
            className="admin_clients_searchbar_input_field"
            placeholder="Filter by staff member's name or phone"
            onChange={handleChangeEmployeeFilter}
            maxLength={128}
            onKeyDown={preventKeys}
          />
          <FontAwesomeIcon
            className="admin_clients_searchbar_icon"
            icon={faSearch}
          />
        </div>
      </FormGroup>
      <div
        className="admin_clients_content_container"
        style={{ height: "55vh", overflow: "scroll", marginTop: "2vh" }}
      >
        {getEmployeesData
          ? getEmployeesData.employees.length > 0
            ? filteredAllEmployees
                .sort((a, b) => a.firstName.localeCompare(b.firstName))
                .map((item, i) => {
                  return (
                    <div
                      className="admin_individual_client_container"
                      key={i}
                      onClick={(e) => {
                        if (addStaffMemberClicked) {
                          return null;
                        } else {
                          handleEmployeeToggled(e, item);
                        }
                      }}
                      ref={individualEmployeeRef}
                    >
                      <Modal
                        isOpen={
                          addProfilePhotoClicked && employeeToggled === item._id
                        }
                        className="admin_individual_client_add_photo_modal"
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
                        <Transition
                          items={addProfilePhotoClicked}
                          from={{ transform: "translate3d(0, -65%, 0)" }}
                          enter={{ transform: "translate3d(0, 0, 0)" }}
                          leave={{ display: "none" }}
                        >
                          {(addProfilePhotoClicked) =>
                            addProfilePhotoClicked &&
                            ((styleprops) => (
                              <div
                                className="admin_individual_client_add_photo_modal_content_container"
                                style={styleprops}
                              >
                                {takeAPhotoSelected &&
                                !imagePreviewAvailable ? (
                                  <>
                                    <Camera
                                      isSilentMode={true}
                                      onTakePhotoAnimationDone={(dataUri) => {
                                        handleImageUploaded(dataUri);
                                        changeWebcamURI(dataUri);
                                      }}
                                      imageType={IMAGE_TYPES.JPG}
                                    />
                                    <div className="admin_individual_client_add_photo_modal_contents">
                                      <FontAwesomeIcon
                                        className="modal_x"
                                        icon={faTimes}
                                        onClick={() => {
                                          dispatch(
                                            ACTION_ADD_PROFILE_PHOTO_CLICKED_RESET()
                                          );
                                          changeTakeAPhotoSelected(false);
                                        }}
                                      />
                                    </div>
                                  </>
                                ) : (
                                  <div className="admin_individual_client_add_photo_modal_contents">
                                    <FontAwesomeIcon
                                      className="modal_x"
                                      icon={faTimes}
                                      onClick={() => {
                                        dispatch(
                                          ACTION_ADD_PROFILE_PHOTO_CLICKED_RESET()
                                        );
                                        changeTakeAPhotoSelected(false);
                                        changeImageUploaded("");
                                        changeImagePreviewAvailable(false);
                                        changeWebcamURI("");
                                      }}
                                    />
                                    <h2>Update employee profile picture</h2>
                                    <span
                                      className="admin_individual_client_add_photo_modal_buttons_container"
                                      style={{
                                        top:
                                          imageUploaded || imagePreviewAvailable
                                            ? "35%"
                                            : "45%",
                                      }}
                                    >
                                      <ImageUploader
                                        withIcon={
                                          imageUploaded || imagePreviewAvailable
                                            ? false
                                            : true
                                        }
                                        withLabel={false}
                                        buttonStyles={{
                                          display:
                                            imageUploaded ||
                                            imagePreviewAvailable
                                              ? "none"
                                              : "block",
                                        }}
                                        buttonText="Choose image"
                                        imgExtension={[".jpg", ".png", ".jpeg"]}
                                        maxFileSize={5242880}
                                        onChange={handleImageUploaded}
                                        singleImage={true}
                                        withPreview={true}
                                      />
                                      {(imageUploaded ||
                                        imagePreviewAvailable) &&
                                      takeAPhotoSelected ? (
                                        <div className="fileContainer">
                                          <div className="uploadPictureContainer">
                                            <div
                                              className="deleteImage"
                                              onClick={() => {
                                                changeWebcamURI("");
                                                changeImagePreviewAvailable(
                                                  false
                                                );
                                                dispatch(
                                                  ACTION_IMAGE_LOADING_RESET()
                                                );
                                                changeImagePreviewAvailable(
                                                  false
                                                );
                                                changeTakeAPhotoSelected(false);
                                                changeImageUploaded("");
                                              }}
                                            >
                                              X
                                            </div>
                                            <img
                                              src={webcamURI}
                                              className="uploadPicture"
                                              alt="preview"
                                            />
                                          </div>
                                        </div>
                                      ) : null}
                                      {imageUploaded ||
                                      imagePreviewAvailable ? (
                                        <div
                                          className="admin_individual_client_confirm_photo_button"
                                          onClick={handleConfirmPhotoSubmit}
                                        >
                                          <p>Confirm photo</p>
                                        </div>
                                      ) : null}
                                      {(initialScreenSize >= 1200 &&
                                        !imageUploaded &&
                                        !imagePreviewAvailable) ||
                                      (currentScreenSize >= 1200 &&
                                        !imageUploaded &&
                                        !imagePreviewAvailable) ? (
                                        <>
                                          <p
                                            style={{
                                              display: !currentScreenSize
                                                ? initialScreenSize >= 1200
                                                  ? "block"
                                                  : "none"
                                                : currentScreenSize >= 1200
                                                ? "block"
                                                : "none",
                                            }}
                                          >
                                            OR
                                          </p>
                                          <div
                                            className="admin_individual_client_take_a_photo_button"
                                            onClick={() =>
                                              changeTakeAPhotoSelected(true)
                                            }
                                          >
                                            <p>Take a photo</p>
                                          </div>{" "}
                                        </>
                                      ) : null}
                                    </span>
                                  </div>
                                )}
                              </div>
                            ))
                          }
                        </Transition>
                      </Modal>
                      <div
                        className="admin_individual_client_initials_square"
                        style={{
                          background: randomColorArray
                            ? randomColorArray[
                                getEmployeesData.employees
                                  .sort((a, b) =>
                                    a.firstName.localeCompare(b.firstName)
                                  )
                                  .map((x) => x.email)
                                  .indexOf(item.email)
                              ]
                            : "rgb(0, 0, 0)",
                        }}
                      >
                        <p>
                          {item.firstName[0].toUpperCase() +
                            item.lastName[0].toUpperCase()}
                        </p>
                      </div>
                      <div className="admin_individual_client_full_name">
                        <p>
                          {item.firstName[0].toUpperCase() +
                            item.firstName.slice(1).toLowerCase() +
                            " " +
                            item.lastName[0].toUpperCase() +
                            item.lastName.slice(1).toLowerCase()}
                        </p>
                        <p>
                          {item.employeeRole.length > 0
                            ? item.employeeRole.join(", ")
                            : null}
                        </p>
                        <p>{item.phoneNumber ? item.phoneNumber : null}</p>
                      </div>
                      <span className="admin_individual_client_spacer" />
                      <FontAwesomeIcon
                        style={{
                          zIndex: employeeToggled
                            ? logoutClicked ||
                              addProfilePhotoClicked ||
                              loadingSpinnerActive ||
                              imageLoading ||
                              cancelAppointmentClicked
                              ? -1
                              : 0
                            : loadingSpinnerActive
                            ? -1
                            : logoutClicked ||
                              addProfilePhotoClicked ||
                              imageLoading ||
                              cancelAppointmentClicked
                            ? 0
                            : 5,
                          transitionDelay:
                            logoutClicked || loadingSpinnerActive
                              ? "initial"
                              : !employeeToggled
                              ? "0.5s"
                              : "initial",
                        }}
                        icon={faEllipsisH}
                        className="admin_individual_client_expand_icon"
                      />
                      {addStaffMemberClicked ? (
                        <AdminAddStaffMember
                          handleProfilePictureRender={
                            handleProfilePictureRender
                          }
                          renderBarInContactInfo={renderBarInContactInfo}
                          getClientsData={getClientsData}
                          getEmployeesRefetch={getEmployeesRefetch}
                          addStaffMemberClicked={addStaffMemberClicked}
                          changeAddStaffMemberClicked={
                            changeAddStaffMemberClicked
                          }
                        />
                      ) : null}
                      <Transition
                        items={employeeToggled}
                        from={{ transform: "translateX(-100%)" }}
                        enter={{ transform: "translateX(0%)" }}
                        leave={{ transform: "translateX(-100%)" }}
                        config={{ duration: 200 }}
                      >
                        {(employeeToggled) =>
                          employeeToggled === item._id &&
                          ((styleprops) => (
                            <div
                              className="admin_individual_selected_client_container"
                              style={{
                                ...styleprops,
                                ...{
                                  zIndex:
                                    logoutClicked ||
                                    addProfilePhotoClicked ||
                                    loadingSpinnerActive ||
                                    imageLoading ||
                                    cancelAppointmentClicked
                                      ? 0
                                      : 1,
                                },
                              }}
                            >
                              <div className="admin_individual_selected_client_contents_container">
                                <div
                                  className="admin_individual_selected_client_back_container"
                                  ref={selectedEmployeeBackRef}
                                  onClick={(e) => {
                                    adminClientSectionSelected === ""
                                      ? handleEmployeeUntoggled(e)
                                      : dispatch(
                                          ACTION_ADMIN_CLIENT_PROFILE_SELECTED()
                                        );
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faLongArrowAltLeft}
                                    className="admin_individual_selected_client_back_arrow_icon"
                                  />
                                  <p>
                                    {adminClientSectionSelected === ""
                                      ? "Back to all staff"
                                      : "Back to " +
                                        item.firstName[0].toUpperCase() +
                                        item.firstName.slice(1).toLowerCase() +
                                        " " +
                                        item.lastName[0].toUpperCase() +
                                        item.lastName.slice(1).toLowerCase() +
                                        "'s Profile"}
                                  </p>
                                </div>
                                {adminClientSectionSelected === "" ? (
                                  <AdminStaffIndividualProfile
                                    item={item}
                                    employeeToggled={employeeToggled}
                                    changeEmployeeToggled={
                                      changeEmployeeToggled
                                    }
                                    handleProfilePictureRender={
                                      handleProfilePictureRender
                                    }
                                    renderBarInContactInfo={
                                      renderBarInContactInfo
                                    }
                                    getEmployeesData={getEmployeesData}
                                    getEmployeesRefetch={getEmployeesRefetch}
                                    getEmployeeData={getEmployeeData}
                                  />
                                ) : null}
                                {adminClientSectionSelected ===
                                "UpcomingAppointments" ? (
                                  <div className="admin_side_my_appointments_content_container">
                                    <AdminRenderUpcomingAppointments
                                      data={selectedEmployeeAppointments}
                                      getAllAppointmentsRefetch={
                                        getAllAppointmentsRefetch
                                      }
                                      item={item}
                                      override={override}
                                      loadingSpinnerActive={
                                        loadingSpinnerActive
                                      }
                                      currentScreenSize={currentScreenSize}
                                      initialScreenSize={initialScreenSize}
                                    />
                                  </div>
                                ) : adminClientSectionSelected ===
                                  "PastAppointments" ? (
                                  <div className="admin_side_my_appointments_content_container">
                                    <AdminRenderPastAppointments
                                      data={selectedEmployeePastAppointments}
                                      item={item}
                                      currentScreenSize={currentScreenSize}
                                      initialScreenSize={initialScreenSize}
                                    />
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          ))
                        }
                      </Transition>
                    </div>
                  );
                })
            : null
          : null}
        {getEmployeeData ? (
          getEmployeeData.employee ? (
            getEmployeeData.employee.employeeRole.includes("Admin") ? (
              <div
                className="add_staff_member_button_container"
                style={{
                  zIndex: employeeToggled
                    ? logoutClicked ||
                      addProfilePhotoClicked ||
                      loadingSpinnerActive ||
                      imageLoading ||
                      cancelAppointmentClicked ||
                      addStaffMemberClicked ||
                      employeeToggled
                      ? -1
                      : 0
                    : addStaffMemberClicked
                    ? -1
                    : logoutClicked ||
                      addProfilePhotoClicked ||
                      loadingSpinnerActive ||
                      imageLoading ||
                      cancelAppointmentClicked ||
                      addStaffMemberClicked
                    ? 0
                    : 5,
                }}
              >
                <div
                  className="add_staff_member_button"
                  onClick={() => changeAddStaffMemberClicked(true)}
                >
                  Add Staff Member
                </div>
              </div>
            ) : null
          ) : null
        ) : null}
      </div>
    </div>
  );
};

export default AdminStaff;
