import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFileSignature,
  faCalendarCheck,
  faUser,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import LZString from "lz-string";
import "./ClientProfile.css";
import ACTION_CONSENT_FORM_LAST_UPDATED from "../../../actions/ConsentForm/LastUpdated/ACTION_CONSENT_FORM_LAST_UPDATED";
import ACTION_SPLASH_SCREEN_COMPLETE from "../../../actions/SplashScreenComplete/ACTION_SPLASH_SCREEN_COMPLETE";
import ACTION_SPLASH_SCREEN_HALFWAY from "../../../actions/SplashScreenHalfway/ACTION_SPLASH_SCREEN_HALFWAY";
import ACTION_BODY_SCROLL_ALLOW from "../../../actions/Body_Scroll/ACTION_BODY_SCROLL_ALLOW";
import ConsentFormPDF from "./ConsentForm/ConsentFormPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CanvasDraw from "react-canvas-draw";

const ClientProfile = (props) => {
  const dispatch = useDispatch();
  const splashScreenHalfway = useSelector(
    (state) => state.splashScreenHalfway.splashScreenHalfway
  );
  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );
  const userAuthenticated = useSelector(
    (state) => state.userAuthenticated.user_authenticated
  );
  const consentFormLastPageOpened = useSelector(
    (state) => state.consentFormLastPageOpened.consent_form_active_page
  );
  const consentFormLastUpdated = useSelector(
    (state) => state.consentFormLastUpdated.consent_form_last_updated
  );
  const [pdfLoading, changePDFLoading] = useState(false);

  useMemo(() => {
    if (!props.called) {
      props.getOwnAppointments();
    }
  }, [props]);

  useEffect(() => {
    if (!splashScreenComplete) {
      dispatch(ACTION_SPLASH_SCREEN_COMPLETE());
    }
    if (!splashScreenHalfway) {
      dispatch(ACTION_SPLASH_SCREEN_HALFWAY());
    }
  }, [dispatch, splashScreenComplete, splashScreenHalfway]);

  console.log(pdfLoading);

  const loadingCompleted = useCallback(() => {
    if (!pdfLoading) {
      changePDFLoading(true);
    }
  }, [pdfLoading]);

  useMemo(() => {
    if (props.getClientData && props.getClientData.client.consentForm.date) {
      loadingCompleted();
      if (
        consentFormLastUpdated !==
        moment
          .unix(props.getClientData.client.consentForm.createdAt / 1000)
          .format("l")
      ) {
        dispatch(
          ACTION_CONSENT_FORM_LAST_UPDATED(
            moment
              .unix(props.getClientData.client.consentForm.createdAt / 1000)
              .format("l")
          )
        );
      }
    }
  }, [props.getClientData, consentFormLastUpdated, dispatch, loadingCompleted]);

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

  const signature = useRef(null);

  return (
    <div className="client_profile_page_container">
      <CanvasDraw
        className="consent_form_signature"
        saveData={
          props.getClientData
            ? props.getClientData.client
              ? props.getClientData.client.consentForm.consentFormSignature
                ? LZString.decompressFromUTF16(
                    props.getClientData.client.consentForm.consentFormSignature
                  )
                : null
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
      {redirectToHome()}
      {redirectToLogInPage()}
      <div className="client_profile_page_header">
        <h1>MENU</h1>
      </div>
      <div className="client_profile_page_content_container">
        <div className="profile_home_box_container">
          <Link
            className="profile_box_container_link"
            to="/"
            onClick={() => dispatch(ACTION_BODY_SCROLL_ALLOW())}
          >
            <FontAwesomeIcon icon={faHome} className="profile_box_icon" />
            <h2>HOME</h2>
          </Link>
        </div>
        <div className="profile_consent_form_box_container">
          <Link
            className="profile_box_container_link"
            to={`/account/clientprofile/consentform/${consentFormLastPageOpened}`}
          >
            <FontAwesomeIcon
              icon={faFileSignature}
              className="profile_box_icon"
            />
            <h2>CONSENT FORM</h2>
            {consentFormLastUpdated ? (
              <span className="consent_form_last_updated_on_container">
                <p>Last Updated On:</p>
                <p>{consentFormLastUpdated}</p>
              </span>
            ) : null}
          </Link>
        </div>
        <div className="profile_my_appointments_box_container">
          <Link
            className="profile_box_container_link"
            to={"/account/clientprofile/upcomingappointments"}
          >
            <FontAwesomeIcon
              icon={faCalendarCheck}
              className="profile_box_icon"
            />
            <h2>MY APPOINTMENTS</h2>
          </Link>
          {consentFormLastUpdated ? (
            <>
              {pdfLoading ? (
                <PDFDownloadLink
                  document={
                    props.getClientData ? (
                      <ConsentFormPDF
                        getClientData={
                          props.getClientData ? props.getClientData : null
                        }
                        signature={
                          props.getClientData
                            ? signature
                              ? signature.current
                                ? signature.current.canvasContainer.children[1].toDataURL()
                                : null
                              : null
                            : null
                        }
                        consentFormLastUpdated={consentFormLastUpdated}
                      />
                    ) : null
                  }
                  fileName="glow_labs_consent_form.pdf"
                >
                  <span className="consent_form_download_pdf_container">
                    <FontAwesomeIcon
                      icon={faFilePdf}
                      style={{ color: "rgba(0, 129, 177, 0.8)" }}
                    />
                    <p>Download PDF Copy</p>
                  </span>
                </PDFDownloadLink>
              ) : (
                <span className="consent_form_download_pdf_container">
                  <FontAwesomeIcon
                    icon={faFilePdf}
                    style={{ color: "rgba(0, 129, 177, 0.8)" }}
                  />
                  <p>Download PDF Copy</p>
                </span>
              )}
            </>
          ) : null}
        </div>
        <div className="profile_my_profile_box_container">
          <Link
            className="profile_box_container_link"
            to={`/account/clientprofile/consentform/${consentFormLastPageOpened}`}
          >
            <FontAwesomeIcon icon={faUser} className="profile_box_icon" />
            <h2>MY PROFILE</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
