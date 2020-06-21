import React from "react";
import { Redirect, Link } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import "./AdminSchedule.css";

const AdminSchedule = (props) => {
  const logoutClicked = useSelector(
    (state) => state.logoutClicked.log_out_clicked
  );
  const adminAuthenticated = useSelector(
    (state) => state.adminAuthenticated.admin_authenticated
  );

  const redirectToAdminLogInPage = () => {
    if (!adminAuthenticated) {
      return <Redirect to="/admin" />;
    }
  };

  return (
    <div className="admin_schedule_container">
      {redirectToAdminLogInPage()}
      <div
        className="admin_schedule_header"
        style={{ zIndex: logoutClicked ? 0 : 5 }}
      >
        <Link to="/admin/menu">
          <FontAwesomeIcon
            className="admin_schedule_back_arrow"
            icon={faChevronLeft}
          />
        </Link>
        <h1>SCHEDULE</h1>
      </div>
    </div>
  );
};

export default AdminSchedule;
