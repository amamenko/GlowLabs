import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ACTION_SPLASH_SCREEN_COMPLETE from "../../../actions/SplashScreenComplete/ACTION_SPLASH_SCREEN_COMPLETE";
import ACTION_SPLASH_SCREEN_HALFWAY from "../../../actions/SplashScreenHalfway/ACTION_SPLASH_SCREEN_HALFWAY";
import ACTION_LOGIN_IS_NOT_ACTIVE from "../../../actions/Login/ACTION_LOGIN_IS_NOT_ACTIVE";
import { Redirect, Link, useLocation } from "react-router-dom";
import ACTION_BODY_SCROLL_ALLOW from "../../../actions/Body_Scroll/ACTION_BODY_SCROLL_ALLOW";
import {
  faHome,
  faBriefcase,
  faUsers,
  faCalendarWeek,
  faBell,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AdminMenu.css";

const AdminMenu = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
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

  useEffect(() => {
    if (location.state) {
      if (location.state.changedAdminPassword) {
        window.location.reload();
      }
    }
  }, [location.state]);

  const redirectToClientsPage = () => {
    if (!props.currentScreenSize) {
      if (props.initialScreenSize >= 1200) {
        return <Redirect to="/admin/clients" />;
      }
    } else if (props.currentScreenSize >= 1200) {
      return <Redirect to="/admin/clients" />;
    }
  };

  return (
    <div className="admin_menu_container">
      {redirectToAdminLogInPage()}
      {redirectToClientsPage()}
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
            to="/admin/activity"
            onClick={() => dispatch(ACTION_BODY_SCROLL_ALLOW())}
          >
            <FontAwesomeIcon icon={faBell} className="admin_menu_box_icon" />
            <h2>ACTIVITY</h2>
            {props.getNotificationsData ? (
              props.getNotificationsData.notifications ? (
                props.getNotificationsData.notifications.length > 0 ? (
                  props.getNotificationsData.notifications.filter(
                    (notification) => notification.new
                  ).length > 0 ? (
                    <span className="fa-layers fa-fw">
                      <FontAwesomeIcon
                        className="small_menu_notifications_circle_counter"
                        icon={faCircle}
                      />
                      <p>
                        {props.getNotificationsData.notifications.filter(
                          (notification) => notification.new
                        ).length < 10
                          ? props.getNotificationsData.notifications.filter(
                              (notification) => notification.new
                            ).length
                          : "9+"}
                      </p>
                    </span>
                  ) : null
                ) : null
              ) : null
            ) : null}
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
            to="/admin/staff"
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
            to="/admin/schedule"
            onClick={() => dispatch(ACTION_BODY_SCROLL_ALLOW())}
          >
            <FontAwesomeIcon
              icon={faCalendarWeek}
              className="admin_menu_box_icon"
            />
            <h2>SCHEDULE</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
