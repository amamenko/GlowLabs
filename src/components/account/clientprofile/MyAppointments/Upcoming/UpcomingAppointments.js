import React from "react";
import "../MyAppointments.css";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { getOwnAppointmentsQuery } from "../../../../../graphql/queries/queries";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";

const UpcomingAppointments = () => {
  const splashScreenComplete = useSelector(
    state => state.splashScreenComplete.splashScreenComplete
  );
  const userAuthenticated = useSelector(
    state => state.userAuthenticated.user_authenticated
  );
  const dummyToken = useSelector(state => state.dummyToken.dummy_token);

  const { data } = useQuery(getOwnAppointmentsQuery, {
    fetchPolicy: "no-cache"
  });

  console.log(data);

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

  return (
    <div className="my_appointments_container">
      {redirectToHome()}
      {redirectToLogInPage()}
      <div className="my_appointments_header">
        <Link to="/account/clientprofile">
          <FontAwesomeIcon
            className="my_appointments_header_back_arrow"
            icon={faChevronLeft}
          />
        </Link>
        <h1>MY APPOINTMENTS</h1>
      </div>
      <div className="my_appointments_sub_header">
        <div className="upcoming_appointments_upcoming_title_container">
          <h2>UPCOMING</h2>
        </div>
        <Link
          to="/account/clientprofile/pastappointments"
          className="sub_header_container_link"
        >
          <div className="upcoming_appointments_past_title_container">
            <h2>PAST</h2>
          </div>
        </Link>
      </div>
      <div className="my_appointments_content_container">
        {data
          ? data.own_appointments.map((item, i) => (
              <div key={i} className="my_individual_appointment_container">
                <div className="my_appointment_date_square">
                  <p>
                    {item.date
                      .split(" ")[1]
                      .slice(0, item.date.split(" ")[1].indexOf(","))
                      .concat(
                        " " +
                          item.date
                            .split(" ")[0]
                            .slice(0, 3)
                            .toUpperCase()
                      )}
                  </p>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default UpcomingAppointments;
