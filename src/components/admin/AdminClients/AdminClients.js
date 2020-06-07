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
  faCamera,
  faTimes,
  faSpa,
  faChevronRight,
  faHistory,
  faCalendarAlt,
  faCommentDots,
  faFilePdf,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import ACTION_SPLASH_SCREEN_COMPLETE from "../../../actions/SplashScreenComplete/ACTION_SPLASH_SCREEN_COMPLETE";
import ACTION_SPLASH_SCREEN_HALFWAY from "../../../actions/SplashScreenHalfway/ACTION_SPLASH_SCREEN_HALFWAY";
import ACTION_LOGIN_IS_NOT_ACTIVE from "../../../actions/Login/ACTION_LOGIN_IS_NOT_ACTIVE";
import { Redirect, Link, useLocation } from "react-router-dom";
import { FormGroup, Input, Modal } from "reactstrap";
import { Transition } from "react-spring/renderprops";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import imageCompression from "browser-image-compression";
import ImageUploader from "react-images-upload";
import Camera from "react-html5-camera-photo";
import { useMutation } from "@apollo/react-hooks";
import { updateClientProfilePictureMutation } from "../../../graphql/queries/queries";
import moment from "moment";
import LZString from "lz-string";
import "react-html5-camera-photo/build/css/index.css";
import "./AdminClients.css";
import { css } from "emotion";
import { BounceLoader } from "react-spinners";
import CanvasDraw from "react-canvas-draw";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ConsentFormPDF from "../../account/clientprofile/ConsentForm/ConsentFormPDF";

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
  const [filteredAllClients, changeFilteredAllClients] = useState([]);
  const [clientFilter, changeClientFilter] = useState("");
  const [clientToggled, changeClientToggled] = useState("");
  const [addProfilePhotoClicked, changeAddProfilePhotoClicked] = useState(
    false
  );
  const [takeAPhotoSelected, changeTakeAPhotoSelected] = useState(false);
  const [imageUploaded, changeImageUploaded] = useState("");
  const [imagePreviewAvailable, changeImagePreviewAvailable] = useState(false);
  const [imageLoading, changeImageLoading] = useState(false);
  const [loadingSpinnerActive, changeLoadingSpinnerActive] = useState(false);
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
    const checkModalRef = setInterval(() => {
      let currentRef;

      if (selectedClientBackRef) {
        currentRef = selectedClientBackRef.current;
      }

      if (currentRef) {
        if (clientToggled) {
          disableBodyScroll({ targetElement: currentRef });
        } else {
          enableBodyScroll({ targetElement: currentRef });
        }
      }
    }, 100);
    return () => {
      clearInterval(checkModalRef);
      clearAllBodyScrollLocks();
    };
  }, [clientToggled]);

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
    changeImageLoading(true);
    if (picture[0]) {
      const reader = new FileReader();
      changeImagePreviewAvailable(true);
      try {
        const compressedImage = await imageCompression(picture[0], {
          maxSizeMB: 0.3,
          maxWidthOrHeight: 300,
        });
        reader.readAsDataURL(compressedImage);

        reader.onloadend = async () => {
          const base64data = reader.result;
          const compressedBase64data = await LZString.compressToUTF16(
            base64data
          );
          changeImageLoading(false);
          changeImageUploaded(compressedBase64data);
        };
      } catch (error) {
        changeImageLoading(false);
        console.log(error);
      }
    } else {
      changeImageLoading(false);
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

    changeImageLoading(true);
    changeImageUploaded("");
    changeAddProfilePhotoClicked(false);
    changeImagePreviewAvailable(false);
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
          src={LZString.decompressFromUTF16(item.profilePicture)}
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
          changeImageLoading(false);
        }, 500);
        return () => {
          clearTimeout(imageDataReceived);
        };
      }
    }
  }, [imageLoading, updateClientProfilePictureData]);

  const handlePDFDownloadClick = useEffect(() => {
    if (loadingSpinnerActive) {
      const loadingSpinnerDuration = setTimeout(() => {
        changeLoadingSpinnerActive(false);
        if (pdfDownloadRef) {
          pdfDownloadRef.current.click();
        }
      }, 2000);
      return () => {
        clearTimeout(loadingSpinnerDuration);
      };
    }
  }, [loadingSpinnerActive]);

  const loadingCompleted = useCallback(() => {
    changeLoadingSpinnerActive(true);
    if (!pdfLoading) {
      changePDFLoading(true);
    } else {
      return null;
    }
  }, [pdfLoading]);

  const consentFormOnFile = (item) => {
    return (
      <div
        className="profile_button_container"
        onClick={() => loadingCompleted()}
      >
        <FontAwesomeIcon
          className="profile_button_icon"
          icon={faFileDownload}
          style={{
            color: "rgba(0, 129, 177, 0.9)",
          }}
        />
        <h2
          style={{
            color: "rgba(0, 129, 177, 0.9)",
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
          }}
        />
        <h2
          style={{
            color: "rgba(177, 48, 0, 0.9)",
          }}
        >
          No Consent Form on File
        </h2>
      </div>
    );
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
        style={{ zIndex: logoutClicked ? 0 : 5 }}
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
                                {takeAPhotoSelected ? (
                                  <>
                                    <Camera isSilentMode={true} />
                                    <div className="admin_individual_client_add_photo_modal_contents">
                                      <FontAwesomeIcon
                                        className="modal_x"
                                        icon={faTimes}
                                        onClick={() => {
                                          changeAddProfilePhotoClicked(false);
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
                                        changeAddProfilePhotoClicked(false);

                                        changeImageUploaded("");
                                        changeImagePreviewAvailable(false);
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
                                      {imageUploaded ||
                                      imagePreviewAvailable ? (
                                        <div
                                          className="admin_individual_client_confirm_photo_button"
                                          onClick={handleConfirmPhotoSubmit}
                                        >
                                          <p>Confirm photo</p>
                                        </div>
                                      ) : null}
                                      {props.initialScreenSize >= 1200 ||
                                      props.currentScreenSize >= 1200 ? (
                                        <>
                                          <p>OR</p>
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
                                ...{ zIndex: logoutClicked ? 0 : 1 },
                              }}
                            >
                              <CanvasDraw
                                className="consent_form_signature"
                                saveData={
                                  item.consentForm
                                    ? item.consentForm.consentFormSignature
                                      ? LZString.decompressFromUTF16(
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
                                  onClick={(e) => handleClientUntoggled(e)}
                                >
                                  <FontAwesomeIcon
                                    icon={faLongArrowAltLeft}
                                    className="admin_individual_selected_client_back_arrow_icon"
                                  />
                                  <p>Back to all clients</p>
                                </div>
                                <div className="admin_client_profile_top_section">
                                  <div className="admin_client_profile_client_avatar_container">
                                    {props.getClientsData ? (
                                      props.getClientsData.clients.filter(
                                        (x) => x._id === clientToggled
                                      )[0].profilePicture ? (
                                        <img
                                          className="admin_individual_client_picture_profile_avatar"
                                          src={LZString.decompressFromUTF16(
                                            props.getClientsData.clients.filter(
                                              (x) => x._id === clientToggled
                                            )[0].profilePicture
                                          )}
                                          alt={
                                            item.firstName[0].toUpperCase() +
                                            item.firstName
                                              .slice(1)
                                              .toLowerCase() +
                                            " " +
                                            item.lastName[0].toUpperCase() +
                                            item.lastName
                                              .slice(1)
                                              .toLowerCase() +
                                            " Profile Picture"
                                          }
                                        />
                                      ) : (
                                        handleProfilePictureRender(item)
                                      )
                                    ) : (
                                      handleProfilePictureRender(item)
                                    )}
                                    <div
                                      className="admin_individual_selected_client_camera_icon_container"
                                      onClick={() =>
                                        changeAddProfilePhotoClicked(true)
                                      }
                                    >
                                      <FontAwesomeIcon
                                        icon={faCamera}
                                        className="admin_individual_selected_client_camera_icon"
                                      />
                                    </div>
                                  </div>
                                  <div className="admin_individual_selected_client_full_name_container">
                                    <h2>
                                      {item.firstName[0].toUpperCase() +
                                        item.firstName.slice(1).toLowerCase() +
                                        " " +
                                        item.lastName[0].toUpperCase() +
                                        item.lastName.slice(1).toLowerCase()}
                                    </h2>
                                  </div>
                                  <div className="admin_individual_selected_client_contact_info_container">
                                    <p>{item.email}</p>
                                    <p>|</p>
                                    <p>{item.phoneNumber}</p>
                                  </div>
                                  <div className="admin_individual_selected_client_contact_info_container">
                                    <p>Membership Type: Default</p>
                                  </div>
                                </div>
                                <div className="admin_client_profile_bottom_buttons_container">
                                  <div className="profile_button_container">
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
                                  <div className="profile_button_container">
                                    <FontAwesomeIcon
                                      className="profile_button_icon"
                                      icon={faHistory}
                                    />
                                    <h2>Past Appointments</h2>
                                    <FontAwesomeIcon
                                      className="profile_button_expand"
                                      icon={faChevronRight}
                                    />
                                  </div>
                                  <div className="profile_button_container">
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
                                    <FontAwesomeIcon
                                      className="profile_button_icon"
                                      icon={faSpa}
                                    />
                                    <h2>
                                      {item.firstName[0].toUpperCase() +
                                        item.firstName.slice(1).toLowerCase()}
                                      's Skin Care Routine
                                    </h2>
                                    <FontAwesomeIcon
                                      className="profile_button_expand"
                                      icon={faChevronRight}
                                    />
                                  </div>
                                  {item.consentForm ? (
                                    item.consentForm.date ? (
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
                                                  .unix(
                                                    item.consentForm.createdAt /
                                                      1000
                                                  )
                                                  .format("l")}
                                                onClick={handlePDFDownloadClick}
                                              />
                                            }
                                            fileName={
                                              item.firstName[0].toUpperCase() +
                                              item.firstName
                                                .slice(1)
                                                .toLowerCase() +
                                              "_" +
                                              item.lastName[0].toUpperCase() +
                                              item.lastName
                                                .slice(1)
                                                .toLowerCase() +
                                              "_" +
                                              "Glow_Labs_Consent_Form.pdf"
                                            }
                                          >
                                            <div
                                              className="profile_button_container"
                                              ref={pdfDownloadRef}
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
                                                }}
                                              />
                                              <h2
                                                style={{
                                                  color: item.consentForm
                                                    ? item.consentForm.date
                                                      ? "rgba(0, 129, 177, 0.9)"
                                                      : "rgba(177, 48, 0, 0.9)"
                                                    : "rgba(177, 48, 0, 0.9)",
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
                                                        .unix(
                                                          item.consentForm
                                                            .createdAt / 1000
                                                        )
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
                                    ) : (
                                      noConsentFormOnFile()
                                    )
                                  ) : (
                                    noConsentFormOnFile()
                                  )}
                                </div>
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
