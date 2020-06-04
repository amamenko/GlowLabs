import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "./AdminClients.css";
import { useSelector, useDispatch } from "react-redux";
import ACTION_SPLASH_SCREEN_COMPLETE from "../../../actions/SplashScreenComplete/ACTION_SPLASH_SCREEN_COMPLETE";
import ACTION_SPLASH_SCREEN_HALFWAY from "../../../actions/SplashScreenHalfway/ACTION_SPLASH_SCREEN_HALFWAY";
import { Redirect, Link } from "react-router-dom";

const AdminClients = (props) => {
  const dispatch = useDispatch();
  const splashScreenHalfway = useSelector(
    (state) => state.splashScreenHalfway.splashScreenHalfway
  );
  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );
  const adminAuthenticated = useSelector(
    (state) => state.adminAuthenticated.admin_authenticated
  );

  useEffect(() => {
    if (!splashScreenComplete) {
      dispatch(ACTION_SPLASH_SCREEN_COMPLETE());
    }
    if (!splashScreenHalfway) {
      dispatch(ACTION_SPLASH_SCREEN_HALFWAY());
    }
  }, [dispatch, splashScreenComplete, splashScreenHalfway]);

  const redirectToHome = () => {
    if (!splashScreenComplete) {
      return <Redirect to="/" />;
    }
  };

  const redirectToAdminLogInPage = () => {
    if (!adminAuthenticated) {
      return <Redirect to="/admin" />;
    }
  };

  return (
    <div className="admin_clients_container">
      {redirectToHome()}
      {redirectToAdminLogInPage()}
      <div className="admin_clients_header">
        <Link to="/admin/menu">
          <FontAwesomeIcon
            className="admin_clients_back_arrow"
            icon={faChevronLeft}
          />
        </Link>
        <h1>CLIENTS</h1>
      </div>
      <div className="admin_clients_content_container">
        {props.getClientsData
          ? props.getClientsData.clients.length > 0
            ? props.getClientsData.clients.map((item, i) => (
                <div className="admin_individual_client_container" key={i}>
                  {item.firstName[0].toUpperCase() +
                    item.firstName.slice(1).toLowerCase() +
                    " " +
                    item.lastName[0].toUpperCase() +
                    item.lastName.slice(1).toLowerCase()}
                </div>
              ))
            : null
          : null}
      </div>
    </div>
  );
};

export default AdminClients;
