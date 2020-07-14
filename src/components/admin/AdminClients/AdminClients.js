import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faSearch,
  faEllipsisH,
  faLongArrowAltLeft,
  faTimes,
  faFilePdf,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import ACTION_SPLASH_SCREEN_COMPLETE from "../../../actions/SplashScreenComplete/ACTION_SPLASH_SCREEN_COMPLETE";
import ACTION_SPLASH_SCREEN_HALFWAY from "../../../actions/SplashScreenHalfway/ACTION_SPLASH_SCREEN_HALFWAY";
import ACTION_LOGIN_IS_NOT_ACTIVE from "../../../actions/Login/ACTION_LOGIN_IS_NOT_ACTIVE";
import ACTION_ADMIN_CLIENT_PROFILE_SELECTED from "../../../actions/Admin/AdminLogin/AdminClientSectionSelected/ACTION_ADMIN_CLIENT_PROFILE_SELECTED.js";
import { Redirect, Link, useLocation } from "react-router-dom";
import { FormGroup, Input } from "reactstrap";
import Modal from "react-modal";
import { Transition } from "react-spring/renderprops";
import imageCompression from "browser-image-compression";
import ImageUploader from "react-images-upload";
import Camera, { IMAGE_TYPES } from "react-html5-camera-photo";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import {
  updateClientProfilePictureMutation,
  getOwnAppointmentsQuery,
  getOwnPastAppointmentsQuery,
} from "../../../graphql/queries/queries";
import moment from "moment";
import LZString from "lz-string";
import "react-html5-camera-photo/build/css/index.css";
import "./AdminClients.css";
import { css } from "emotion";
import { BounceLoader } from "react-spinners";
import CanvasDraw from "react-canvas-draw";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ConsentFormPDF from "../../account/clientprofile/ConsentForm/ConsentFormPDF";
import AdminClientIndividualProfile from "./AdminClientIndividualProfile";
import AdminRenderUpcomingAppointments from "./AdminRenderUpcomingAppointments";
import AdminRenderPastAppointments from "./AdminRenderPastAppointments";
import ACTION_ADD_PROFILE_PHOTO_CLICKED_RESET from "../../../actions/Admin/AddProfilePhotoClicked/ACTION_ADD_PROFILE_CLICKED_RESET";
import ACTION_LOADING_SPINNER_RESET from "../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_RESET";
import ACTION_LOADING_SPINNER_ACTIVE from "../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_ACTIVE";
import ACTION_IMAGE_LOADING from "../../../actions/Admin/ImageLoading/ACTION_IMAGE_LOADING";
import ACTION_IMAGE_LOADING_RESET from "../../../actions/Admin/ImageLoading/ACTION_IMAGE_LOADING_RESET";

const AdminClients = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();

  let signature = useRef(null);
  let pdfDownloadRef = useRef(null);

  const selectedClientBackRef = useRef(null);
  const backToClientsRef = useRef(null);
  let individualClientRef = useRef(null);

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

  const [filteredAllClients, changeFilteredAllClients] = useState([]);
  const [clientFilter, changeClientFilter] = useState("");
  const [clientToggled, changeClientToggled] = useState("");

  const [takeAPhotoSelected, changeTakeAPhotoSelected] = useState(false);
  const [webcamURI, changeWebcamURI] = useState("");
  const [imageUploaded, changeImageUploaded] = useState("");
  const [imagePreviewAvailable, changeImagePreviewAvailable] = useState(false);
  const [pdfLoading, changePDFLoading] = useState(false);

  const [
    updateClientProfilePicture,
    { data: updateClientProfilePictureData },
  ] = useMutation(updateClientProfilePictureMutation);

  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;

  const [
    getOwnAppointments,
    { data: getOwnAppointmentsData, refetch: getOwnAppointmentsRefetch },
  ] = useLazyQuery(getOwnAppointmentsQuery, {
    fetchPolicy: "no-cache",
  });

  const [
    getOwnPastAppointments,
    { data: getOwnPastAppointmentsData },
  ] = useLazyQuery(getOwnPastAppointmentsQuery, {
    fetchPolicy: "no-cache",
  });

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

  useEffect(() => {
    return () => {
      if (pdfLoading) {
        changePDFLoading(false);
      }
    };
  }, [pdfLoading]);

  const handleChangeClientFilter = (e) => {
    changeClientFilter(e.currentTarget.value);
  };

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
    if (props.getClientsData) {
      if (props.getClientsData.clients.length > 0) {
        if (changeClientFilter) {
          changeFilteredAllClients(
            [...props.getClientsData.clients].filter((x) => {
              return (
                new RegExp(clientFilter, "gi").test(
                  x.firstName + " " + x.lastName
                ) ||
                new RegExp(clientFilter, "gi").test(x.email) ||
                new RegExp(clientFilter, "gi").test(x.phoneNumber) ||
                new RegExp(clientFilter, "gi").test(
                  x.phoneNumber.split(/[\W_]+/g).join("")
                )
              );
            })
          );
        }
      }
    }
  }, [clientFilter, props.getClientsData]);

  useMemo(() => {
    if (clientToggled) {
      const clientEmail = [...props.getClientsData.clients].filter(
        (x) => x._id === clientToggled
      )[0].email;

      getOwnAppointments({
        variables: { _id: clientToggled, email: clientEmail },
      });

      getOwnPastAppointments({
        variables: { _id: clientToggled, email: clientEmail },
      });
    }
  }, [
    clientToggled,
    getOwnAppointments,
    getOwnPastAppointments,
    props.getClientsData,
  ]);

  // Allows click only if selected client modal is not active

  const handleClientToggled = (e, item) => {
    if (e.currentTarget && individualClientRef) {
      if (individualClientRef.current) {
        if (
          individualClientRef.current.className === e.currentTarget.className
        ) {
          if (selectedClientBackRef) {
            if (!selectedClientBackRef.current) {
              if (item) {
                if (item._id) {
                  changeClientToggled(item._id);
                }
              }
            }
          }
        }
      } else {
        if (
          e.currentTarget.innerText.includes(item.email) &&
          e.currentTarget.innerText.includes(
            item.firstName[0].toUpperCase() +
              item.firstName.slice(1).toLowerCase()
          ) &&
          e.currentTarget.innerText.includes(
            item.lastName[0].toUpperCase() +
              item.lastName.slice(1).toLowerCase()
          )
        ) {
          if (selectedClientBackRef) {
            if (!selectedClientBackRef.current) {
              if (item) {
                if (item._id) {
                  changeClientToggled(item._id);
                }
              }
            }
          }
        }
      }
    }
  };

  // Function for back arrow click to reset selected toggled client

  const handleClientUntoggled = (e) => {
    if (
      (e.currentTarget && selectedClientBackRef) ||
      (e.currentTarget && backToClientsRef)
    ) {
      if (selectedClientBackRef.current || backToClientsRef.current) {
        if (
          selectedClientBackRef.current.className ===
            e.currentTarget.className ||
          backToClientsRef.current.className === e.currentTarget.className
        ) {
          changeClientToggled("");

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
    updateClientProfilePicture({
      variables: {
        id: clientToggled,
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

  useMemo(() => {
    if (updateClientProfilePictureData) {
      props.getClientsRefetch();
    }
  }, [props, updateClientProfilePictureData]);

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
              props.randomColorArray[
                props.getClientsData.clients
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
    if (imageLoading) {
      if (updateClientProfilePictureData) {
        const imageDataReceived = setTimeout(() => {
          dispatch(ACTION_IMAGE_LOADING_RESET());
        }, 500);
        return () => {
          clearTimeout(imageDataReceived);
        };
      }
    }
  }, [imageLoading, updateClientProfilePictureData, dispatch]);

  useEffect(() => {
    if (loadingSpinnerActive) {
      const loadingSpinnerDuration = setTimeout(() => {
        if (pdfDownloadRef) {
          pdfDownloadRef.current.click();
        }
        dispatch(ACTION_LOADING_SPINNER_RESET());
        changePDFLoading(false);
      }, 3000);
      return () => {
        clearTimeout(loadingSpinnerDuration);
      };
    } else {
      if (pdfDownloadRef) {
        if (pdfDownloadRef.current) {
          pdfDownloadRef.current.click();
        }
      }
    }
  }, [loadingSpinnerActive, dispatch]);

  const loadingCompleted = useCallback(() => {
    dispatch(ACTION_LOADING_SPINNER_ACTIVE());

    if (!pdfLoading) {
      changePDFLoading(true);
    } else {
      return null;
    }
  }, [pdfLoading, dispatch]);

  const consentFormOnFile = (item) => {
    return (
      <div
        className="profile_button_container"
        onClick={() => loadingCompleted()}
        style={{
          cursor: "pointer",
        }}
      >
        <FontAwesomeIcon
          className="profile_button_icon"
          icon={faFileDownload}
          style={{
            color: "rgba(0, 129, 177, 0.9)",
            cursor: "pointer",
          }}
        />
        <h2
          style={{
            color: "rgba(0, 129, 177, 0.9)",
            cursor: "pointer",
          }}
        >
          Download Latest Consent Form
        </h2>
        <p>
          {"(" +
            moment.unix(item.consentForm.createdAt / 1000).format("l") +
            ")"}
        </p>
      </div>
    );
  };

  const noConsentFormOnFile = () => {
    return (
      <div className="profile_button_container">
        <FontAwesomeIcon
          className="profile_button_icon"
          icon={faFilePdf}
          style={{
            color: "rgba(177, 48, 0, 0.9)",
            cursor: "default",
          }}
        />
        <h2
          style={{
            color: "rgba(177, 48, 0, 0.9)",
            cursor: "default",
          }}
        >
          No Consent Form on File
        </h2>
      </div>
    );
  };

  const renderBarInContactInfo = () => {
    if (!props.currentScreenSize) {
      if (props.initialScreenSize >= 1200) {
        return null;
      } else {
        return <p style={{ color: "rgb(200, 200, 200)" }}>|</p>;
      }
    } else {
      if (props.currentScreenSize >= 1200) {
        return null;
      } else {
        return <p style={{ color: "rgb(200, 200, 200)" }}>|</p>;
      }
    }
  };

  const renderDownloadConsentFormButton = (item) => {
    if (item) {
      if (item.consentForm) {
        if (item.consentForm.date) {
          return (
            <>
              {pdfLoading ? (
                <PDFDownloadLink
                  document={
                    <ConsentFormPDF
                      getClientData={{ client: item }}
                      signature={
                        signature
                          ? signature.current
                            ? signature.current.canvasContainer.children[1].toDataURL()
                            : null
                          : null
                      }
                      consentFormLastUpdated={moment
                        .unix(item.consentForm.createdAt / 1000)
                        .format("l")}
                    />
                  }
                  fileName={
                    item.firstName[0].toUpperCase() +
                    item.firstName.slice(1).toLowerCase() +
                    "_" +
                    item.lastName[0].toUpperCase() +
                    item.lastName.slice(1).toLowerCase() +
                    "_" +
                    "Glow_Labs_Consent_Form.pdf"
                  }
                >
                  <div
                    className="profile_button_container"
                    ref={pdfDownloadRef}
                    style={{
                      cursor: item.consentForm
                        ? item.consentForm.date
                          ? "pointer"
                          : "default"
                        : "default",
                    }}
                  >
                    <FontAwesomeIcon
                      className="profile_button_icon"
                      icon={
                        item.consentForm
                          ? item.consentForm.date
                            ? faFileDownload
                            : faFilePdf
                          : faFilePdf
                      }
                      style={{
                        color: item.consentForm
                          ? item.consentForm.date
                            ? "rgba(0, 129, 177, 0.9)"
                            : "rgba(177, 48, 0, 0.9)"
                          : "rgba(177, 48, 0, 0.9)",
                        cursor: item.consentForm
                          ? item.consentForm.date
                            ? "pointer"
                            : "default"
                          : "default",
                      }}
                    />
                    <h2
                      style={{
                        color: item.consentForm
                          ? item.consentForm.date
                            ? "rgba(0, 129, 177, 0.9)"
                            : "rgba(177, 48, 0, 0.9)"
                          : "rgba(177, 48, 0, 0.9)",
                        cursor: item.consentForm
                          ? item.consentForm.date
                            ? "pointer"
                            : "default"
                          : "default",
                      }}
                    >
                      {item.consentForm
                        ? item.consentForm.date
                          ? "Download Latest Consent Form"
                          : "No Consent Form on File"
                        : "No Consent Form on File"}
                    </h2>
                    {item.consentForm ? (
                      item.consentForm.date ? (
                        <p>
                          {"(" +
                            moment
                              .unix(item.consentForm.createdAt / 1000)
                              .format("l") +
                            ")"}
                        </p>
                      ) : null
                    ) : null}
                  </div>
                </PDFDownloadLink>
              ) : (
                consentFormOnFile(item)
              )}
            </>
          );
        } else {
          return noConsentFormOnFile();
        }
      } else {
        return noConsentFormOnFile();
      }
    } else {
      return noConsentFormOnFile();
    }
  };

  return (
    <div className="admin_clients_container">
      {redirectToAdminLogInPage()}
      <Modal
        isOpen={imageLoading || loadingSpinnerActive}
        className="complete_registration_loading_modal"
      >
        <BounceLoader
          size={100}
          css={override}
          color={"rgb(44, 44, 52)"}
          loading={imageLoading || loadingSpinnerActive}
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
            cancelAppointmentClicked
              ? 0
              : 5,
          filter: cancelAppointmentClicked ? "blur(5px)" : "none",
        }}
      >
        <Link to="/admin/menu">
          <FontAwesomeIcon
            className="admin_clients_back_arrow"
            icon={faChevronLeft}
          />
        </Link>
        <h1>CLIENTS</h1>
      </div>
      <FormGroup>
        <div className="admin_clients_searchbar_container">
          <Input
            className="admin_clients_searchbar_input_field"
            placeholder="Filter by client name, email, or phone #"
            onChange={handleChangeClientFilter}
            maxLength={128}
            onKeyDown={preventKeys}
          />
          <FontAwesomeIcon
            className="admin_clients_searchbar_icon"
            icon={faSearch}
          />
        </div>
      </FormGroup>
      <div className="admin_clients_content_container">
        {props.getClientsData
          ? props.getClientsData.clients.length > 0
            ? filteredAllClients
                .sort((a, b) => a.firstName.localeCompare(b.firstName))
                .map((item, i) => {
                  return (
                    <div
                      className="admin_individual_client_container"
                      key={i}
                      onClick={(e) => handleClientToggled(e, item)}
                      ref={individualClientRef}
                    >
                      <Modal
                        isOpen={
                          addProfilePhotoClicked && clientToggled === item._id
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
                                    <h2>Update client profile picture</h2>
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
                                      {(props.initialScreenSize >= 1200 &&
                                        !imageUploaded &&
                                        !imagePreviewAvailable) ||
                                      (props.currentScreenSize >= 1200 &&
                                        !imageUploaded &&
                                        !imagePreviewAvailable) ? (
                                        <>
                                          <p
                                            style={{
                                              display: !props.currentScreenSize
                                                ? props.initialScreenSize >=
                                                  1200
                                                  ? "block"
                                                  : "none"
                                                : props.currentScreenSize >=
                                                  1200
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
                          background:
                            props.randomColorArray[
                              props.getClientsData.clients
                                .sort((a, b) =>
                                  a.firstName.localeCompare(b.firstName)
                                )
                                .map((x) => x.email)
                                .indexOf(item.email)
                            ],
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
                        <p>{item.email ? item.email : null}</p>
                        <p>{item.phoneNumber ? item.phoneNumber : null}</p>
                      </div>
                      <FontAwesomeIcon
                        style={{
                          zIndex: logoutClicked || clientToggled ? 0 : 1,
                          transitionDelay: logoutClicked
                            ? "initial"
                            : !clientToggled
                            ? "0.5s"
                            : "initial",
                        }}
                        icon={faEllipsisH}
                        className="admin_individual_client_expand_icon"
                      />
                      <Transition
                        items={clientToggled}
                        from={{ transform: "translateX(-100%)" }}
                        enter={{ transform: "translateX(0%)" }}
                        leave={{ transform: "translateX(-100%)" }}
                        config={{ duration: 200 }}
                      >
                        {(clientToggled) =>
                          clientToggled === item._id &&
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
                              <CanvasDraw
                                className="consent_form_signature"
                                saveData={
                                  item.consentForm
                                    ? item.consentForm.consentFormSignature
                                      ? LZString.decompressFromEncodedURIComponent(
                                          item.consentForm.consentFormSignature
                                        )
                                      : null
                                    : null
                                }
                                hideGrid={true}
                                hideInterface={true}
                                disabled
                                canvasHeight="100%"
                                canvasWidth="100%"
                                immediateLoading={true}
                                ref={signature ? signature : null}
                                style={{ display: "none" }}
                              />
                              <div className="admin_individual_selected_client_contents_container">
                                <div
                                  className="admin_individual_selected_client_back_container"
                                  ref={selectedClientBackRef}
                                  onClick={(e) => {
                                    adminClientSectionSelected === ""
                                      ? handleClientUntoggled(e)
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
                                      ? "Back to all clients"
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
                                  <AdminClientIndividualProfile
                                    item={item}
                                    clientToggled={clientToggled}
                                    handleProfilePictureRender={
                                      handleProfilePictureRender
                                    }
                                    renderBarInContactInfo={
                                      renderBarInContactInfo
                                    }
                                    renderDownloadConsentFormButton={
                                      renderDownloadConsentFormButton
                                    }
                                    getClientsData={props.getClientsData}
                                  />
                                ) : adminClientSectionSelected ===
                                  "UpcomingAppointments" ? (
                                  <div className="admin_side_my_appointments_content_container">
                                    <AdminRenderUpcomingAppointments
                                      data={getOwnAppointmentsData}
                                      getOwnAppointmentsRefetch={
                                        getOwnAppointmentsRefetch
                                      }
                                      item={item}
                                      override={override}
                                      loadingSpinnerActive={
                                        loadingSpinnerActive
                                      }
                                      currentScreenSize={
                                        props.currentScreenSize
                                      }
                                      initialScreenSize={
                                        props.initialScreenSize
                                      }
                                    />
                                  </div>
                                ) : adminClientSectionSelected ===
                                  "PastAppointments" ? (
                                  <div className="admin_side_my_appointments_content_container">
                                    <AdminRenderPastAppointments
                                      data={getOwnPastAppointmentsData}
                                      item={item}
                                      currentScreenSize={
                                        props.currentScreenSize
                                      }
                                      initialScreenSize={
                                        props.initialScreenSize
                                      }
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
      </div>
    </div>
  );
};

export default AdminClients;
