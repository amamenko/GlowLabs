import React, { useCallback, useEffect, useRef, useState } from "react";
import LZString from "lz-string";
import moment from "moment";
import { useLocation, Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faFileDownload,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { css } from "@emotion/css";
import ClipLoader from "react-spinners/ClipLoader";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ConsentFormPDF from "../ConsentForm/ConsentFormPDF";
import CanvasDraw from "react-canvas-draw";
import ACTION_PDF_LOADING from "../../../../actions/PDFLoading/ACTION_PDF_LOADING";
import ACTION_PDF_LOADING_RESET from "../../../../actions/PDFLoading/ACTION_PDF_LOADING_RESET";
import "./MyProfile.css";

const MyProfile = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );
  const userAuthenticated = useSelector(
    (state) => state.userAuthenticated.user_authenticated
  );
  const logoutClicked = useSelector(
    (state) => state.logoutClicked.log_out_clicked
  );
  const pdfLoading = useSelector((state) => state.pdfLoading.pdf_loading);
  const adminAuthenticated = useSelector(
    (state) => state.adminAuthenticated.admin_authenticated
  );

  const [pdfSpinnerActive, changePDFSpinnerActive] = useState(false);

  const signature = useRef(null);
  const pdfDownloadRef = useRef(null);

  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;

  const redirectToHome = () => {
    if (!splashScreenComplete) {
      return <Redirect to="/" />;
    }
  };

  const redirectToLogInPage = () => {
    if (!userAuthenticated) {
      return <Redirect to="/account/login" />;
    }
  };

  useEffect(() => {
    if (location.pathname) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      if (pdfLoading) {
        dispatch(ACTION_PDF_LOADING_RESET());
      }
    };
  }, [pdfLoading, dispatch]);

  const loadingCompleted = useCallback(() => {
    changePDFSpinnerActive(true);
    if (!pdfLoading) {
      dispatch(ACTION_PDF_LOADING());
    } else {
      return null;
    }
  }, [pdfLoading, dispatch]);

  const handlePDFDownloadClick = useEffect(() => {
    if (pdfSpinnerActive) {
      const loadingSpinnerDuration = setTimeout(() => {
        changePDFSpinnerActive(false);
        if (pdfDownloadRef) {
          if (pdfDownloadRef.current) {
            pdfDownloadRef.current.click();
          }
        }
        dispatch(ACTION_PDF_LOADING_RESET());
      }, 3000);
      return () => {
        clearTimeout(loadingSpinnerDuration);
      };
    }
  }, [pdfSpinnerActive, dispatch]);

  const consentFormOnFile = (item) => {
    return (
      <div className="profile_button_container" onClick={loadingCompleted}>
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
        <p style={{ display: pdfLoading ? "none" : "block" }}>
          {"(" +
            moment.unix(item.consentForm.createdAt / 1000).format("l") +
            ")"}
        </p>
      </div>
    );
  };

  const noConsentFormOnFile = () => {
    return (
      <div className="profile_button_container" onClick={loadingCompleted}>
        <FontAwesomeIcon
          className="profile_button_icon"
          icon={faFileDownload}
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

  const renderDownloadConsentFormButton = () => {
    if (props.getClientData) {
      if (props.getClientData.client) {
        if (props.getClientData.client.consentForm) {
          if (props.getClientData.client.consentForm.date) {
            return (
              <>
                {pdfLoading ? (
                  <PDFDownloadLink
                    document={
                      props.getClientData ? (
                        <ConsentFormPDF
                          getClientData={{
                            client: props.getClientData.client,
                          }}
                          signature={
                            signature
                              ? signature.current
                                ? signature.current.canvasContainer.children[1].toDataURL()
                                : null
                              : null
                          }
                          consentFormLastUpdated={moment
                            .unix(
                              props.getClientData.client.consentForm.createdAt /
                                1000
                            )
                            .format("l")}
                          onClick={handlePDFDownloadClick}
                        />
                      ) : null
                    }
                    fileName={
                      props.getClientData.client.firstName[0].toUpperCase() +
                      props.getClientData.client.firstName
                        .slice(1)
                        .toLowerCase() +
                      "_" +
                      props.getClientData.client.lastName[0].toUpperCase() +
                      props.getClientData.client.lastName
                        .slice(1)
                        .toLowerCase() +
                      "_" +
                      "Glow_Labs_Consent_Form.pdf"
                    }
                  >
                    <div
                      className="profile_button_container"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "1rem",
                      }}
                      ref={pdfDownloadRef}
                    >
                      <ClipLoader
                        size={32}
                        css={override}
                        color={"rgb(44, 44, 52)"}
                        loading={pdfLoading}
                      />
                    </div>
                  </PDFDownloadLink>
                ) : (
                  consentFormOnFile(props.getClientData.client)
                )}
              </>
            );
          } else {
            if (!adminAuthenticated) {
              return noConsentFormOnFile();
            }
          }
        } else {
          if (!adminAuthenticated) {
            return noConsentFormOnFile();
          }
        }
      } else {
        if (!adminAuthenticated) {
          return noConsentFormOnFile();
        }
      }
    } else {
      if (!adminAuthenticated) {
        return noConsentFormOnFile();
      }
    }
  };

  return (
    <div
      className="my_profile_container"
      style={{ zIndex: logoutClicked ? -1 : "auto" }}
    >
      {redirectToHome()}
      {redirectToLogInPage()}
      <CanvasDraw
        className="consent_form_signature"
        saveData={
          props.getClientData
            ? props.getClientData.client
              ? props.getClientData.client.consentForm.consentFormSignature
                ? LZString.decompressFromEncodedURIComponent(
                    props.getClientData.client.consentForm.consentFormSignature
                  )
                  ? LZString.decompressFromEncodedURIComponent(
                      props.getClientData.client.consentForm
                        .consentFormSignature
                    ).toString()
                  : ""
                : ""
              : ""
            : ""
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
      <div
        className="my_profile_header"
        style={{ zIndex: logoutClicked ? 0 : 3 }}
      >
        <Link to="/account/clientprofile">
          <FontAwesomeIcon
            className="my_profile_back_arrow"
            icon={faChevronLeft}
          />
        </Link>
        <h1>MY PROFILE</h1>
      </div>
      <div className="profile_top_section">
        <div className="profile_client_avatar_container">
          {props.getClientData ? (
            props.getClientData.client ? (
              props.getClientData.client.profilePicture ? (
                <img
                  className="profile_client_image_profile"
                  src={LZString.decompressFromEncodedURIComponent(
                    props.getClientData.client.profilePicture
                  )}
                  alt={
                    props.getClientData.client.firstName[0].toUpperCase() +
                    props.getClientData.client.firstName
                      .slice(1)
                      .toLowerCase() +
                    " " +
                    props.getClientData.client.lastName[0].toUpperCase() +
                    props.getClientData.client.lastName.slice(1).toLowerCase() +
                    " Profile Picture"
                  }
                />
              ) : (
                <FontAwesomeIcon
                  className="profile_client_avatar"
                  icon={faUserCircle}
                />
              )
            ) : (
              <FontAwesomeIcon
                className="profile_client_avatar"
                icon={faUserCircle}
              />
            )
          ) : (
            <FontAwesomeIcon
              className="profile_client_avatar"
              icon={faUserCircle}
            />
          )}
        </div>
        <div className="profile_contact_information_container">
          <div className="profile_name_container">
            <p>Name</p>
            <p>
              {props.getClientData
                ? props.getClientData.client.firstName
                : null}{" "}
              {props.getClientData ? props.getClientData.client.lastName : null}
            </p>
          </div>
          <div className="profile_email_container">
            <p>Email</p>
            <p>
              {props.getClientData ? props.getClientData.client.email : null}
            </p>
          </div>
          <div className="profile_phone_number_container">
            <p>Phone Number</p>
            <p>
              {props.getClientData
                ? props.getClientData.client.phoneNumber
                : null}
            </p>
          </div>
          <div className="profile_membership_type_container">
            <p>Membership Type</p>
            <p>Default</p>
          </div>
        </div>
      </div>
      <div className="profile_bottom_buttons_container">
        {renderDownloadConsentFormButton()}
        {/* <Link to="/account/clientprofile/profile/routine">
          <div className="profile_button_container">
            <FontAwesomeIcon className="profile_button_icon" icon={faSpa} />
            <h2>Skin Care Routine</h2>
            <FontAwesomeIcon
              className="profile_button_expand"
              icon={faChevronRight}
            />
          </div>
        </Link>
        <div className="profile_button_container">
          <FontAwesomeIcon className="profile_button_icon" icon={faPencilAlt} />
          <h2>Quizzes</h2>
          <FontAwesomeIcon
            className="profile_button_expand"
            icon={faChevronRight}
          />
        </div>
        <div className="profile_button_container">
          <FontAwesomeIcon className="profile_button_icon" icon={faQuestion} />
          <h2>FAQs</h2>
          <FontAwesomeIcon
            className="profile_button_expand"
            icon={faChevronRight}
          />
        </div>
        <div className="profile_button_container">
          <FontAwesomeIcon className="profile_button_icon" icon={faCamera} />
          <h2>Before / After Photos</h2>
          <FontAwesomeIcon
            className="profile_button_expand"
            icon={faChevronRight}
          />
        </div> */}
      </div>
    </div>
  );
};

export default MyProfile;
