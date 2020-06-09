import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ACTION_SPLASH_SCREEN_COMPLETE from "../../../actions/SplashScreenComplete/ACTION_SPLASH_SCREEN_COMPLETE";
import ACTION_SPLASH_SCREEN_HALFWAY from "../../../actions/SplashScreenHalfway/ACTION_SPLASH_SCREEN_HALFWAY";
import ACTION_LOGIN_IS_NOT_ACTIVE from "../../../actions/Login/ACTION_LOGIN_IS_NOT_ACTIVE";
import { Redirect, Link } from "react-router-dom";
import ACTION_BODY_SCROLL_ALLOW from "../../../actions/Body_Scroll/ACTION_BODY_SCROLL_ALLOW";
import {
  faHome,
  faBriefcase,
  faUsers,
  faCalendarWeek,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AdminMenu.css";

const AdminMenu = (props) => {
  const dispatch = useDispatch();
  const splashScreenHalfway = useSelector(
    (state) => state.splashScreenHalfway.splashScreenHalfway
  );
  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );
  const loginIsActive = useSelector(
    (state) => state.loginIsActive.login_is_active
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

  // When account screen unmounts, allow navbar
  useEffect(() => {
    if (loginIsActive) {
      dispatch(ACTION_LOGIN_IS_NOT_ACTIVE());
    }
  }, [dispatch, loginIsActive]);

  const redirectToAdminLogInPage = () => {
    if (!adminAuthenticated) {
      return <Redirect to="/admin" />;
    }
  };

  return (
    <div className="admin_menu_container">
      {redirectToAdminLogInPage()}
      <div className="admin_menu_page_header">
        <h1>ADMIN MENU</h1>
      </div>
      <div className="admin_menu_content_container">
        <div className="admin_menu_box_container">
          <Link
            className="admin_menu_box_container_link"
            to="/"
            onClick={() => dispatch(ACTION_BODY_SCROLL_ALLOW())}
          >
            <FontAwesomeIcon icon={faHome} className="admin_menu_box_icon" />
            <h2>HOME</h2>
          </Link>
        </div>
        <div className="admin_menu_box_container">
          <Link
            className="admin_menu_box_container_link"
            to="/admin/clients"
            onClick={() => dispatch(ACTION_BODY_SCROLL_ALLOW())}
          >
            <FontAwesomeIcon icon={faUsers} className="admin_menu_box_icon" />
            <h2>CLIENTS</h2>
          </Link>
        </div>
        <div className="admin_men_box_container">
          <Link
            className="admin_menu_box_container_link"
            to="/"
            onClick={() => dispatch(ACTION_BODY_SCROLL_ALLOW())}
          >
            <FontAwesomeIcon
              icon={faBriefcase}
              className="admin_menu_box_icon"
            />
            <h2>STAFF</h2>
          </Link>
        </div>
        <div className="admin_menu_box_container">
          <Link
            className="admin_menu_box_container_link"
            to="/"
            onClick={() => dispatch(ACTION_BODY_SCROLL_ALLOW())}
          >
            <FontAwesomeIcon
              icon={faCalendarWeek}
              className="admin_menu_box_icon"
            />
            <h2>MY SCHEDULE</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;