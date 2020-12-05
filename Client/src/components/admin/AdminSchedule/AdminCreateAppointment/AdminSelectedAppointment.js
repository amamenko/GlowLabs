import React, { useEffect, useCallback } from "react";
import { Transition } from "react-spring/renderprops";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft, faTimes } from "@fortawesome/free-solid-svg-icons";
import ACTION_CANCEL_APPOINTMENT_CLICKED from "../../../../actions/CancelAppointmentClicked/ACTION_CANCEL_APPOINTMENT_CLICKED";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { BounceLoader } from "react-spinners";
import { css } from "@emotion/css";
import ACTION_CANCEL_APPOINTMENT_CLICKED_RESET from "../../../../actions/CancelAppointmentClicked/ACTION_CANCEL_APPOINTMENT_CLICKED_RESET";
import { useMutation } from "@apollo/react-hooks";
import { deleteAppointmentMutation } from "../../../../graphql/queries/queries";
import ACTION_LOADING_SPINNER_RESET from "../../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_RESET";
import ACTION_LOADING_SPINNER_ACTIVE from "../../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_ACTIVE";

const AdminSelectedAppointment = React.forwardRef((props, ref) => {
  const {
    allAdminAppointments,
    currentToggledAppointment,
    handleAppointmentUntoggled,
    renderSummaryCardTreatments,
    renderSummaryCardAddOns,
    changeCurrentToggledAppointment,
    getAllAppointmentsRefetch,
  } = props;
  const { selectedAppointmentBackRef, backToAppointmentsRef } = ref;

  const [deleteAppointment, { loading, data }] = useMutation(
    deleteAppointmentMutation
  );

  const dispatch = useDispatch();

  const cancelAppointmentClicked = useSelector(
    (state) => state.cancelAppointmentClicked.cancelAppointmentClicked
  );
  const loadingSpinnerActive = useSelector(
    (state) => state.loadingSpinnerActive.loading_spinner
  );

  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;

  const handleCancelAppointment = (item) => {
    deleteAppointment({
      variables: { _id: item.id },
    });
  };

  const resetStatesAfterLoading = useCallback(() => {
    getAllAppointmentsRefetch();
    dispatch(ACTION_LOADING_SPINNER_RESET());
    dispatch(ACTION_CANCEL_APPOINTMENT_CLICKED_RESET());
    changeCurrentToggledAppointment(false);
  }, [dispatch, changeCurrentToggledAppointment, getAllAppointmentsRefetch]);

  useEffect(() => {
    if (data) {
      const loadingFunction = setTimeout(() => resetStatesAfterLoading(), 2000);
      return () => {
        clearTimeout(loadingFunction);
      };
    }
  }, [data, resetStatesAfterLoading]);

  useEffect(() => {
    if (loading) {
      dispatch(ACTION_LOADING_SPINNER_ACTIVE());
    }
  }, [loading, data, dispatch]);

  return (
    <Transition
      items={currentToggledAppointment}
      from={{ transform: "translateX(-100%)" }}
      enter={{ transform: "translateX(0%)" }}
      leave={{ transform: "translateX(-100%)" }}
      config={{ duration: 200 }}
    >
      {(currentToggledAppointment) =>
        currentToggledAppointment ===
          (allAdminAppointments.find((x) => x.id === currentToggledAppointment)
            ? allAdminAppointments.find(
                (x) => x.id === currentToggledAppointment
              ).id
            : null) &&
        ((styleprops) => (
          <div
            className="admin_side_schedule_calendar_individual_selected_appointment_container"
            style={styleprops}
          >
            <Modal
              isOpen={
                cancelAppointmentClicked &&
                currentToggledAppointment ===
                  (allAdminAppointments.filter(
                    (x) => x.id === currentToggledAppointment
                  )[0]
                    ? allAdminAppointments.filter(
                        (x) => x.id === currentToggledAppointment
                      )[0].id
                    : null)
              }
              className="cancel_appointment_modal"
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
              <BounceLoader
                size={100}
                css={override}
                color={"rgb(44, 44, 52)"}
                loading={loadingSpinnerActive}
              />
              <Transition
                items={cancelAppointmentClicked && !loadingSpinnerActive}
                from={{ transform: "translate3d(0, -65%, 0)" }}
                enter={{ transform: "translate3d(0, 0, 0)" }}
                leave={{ display: "none" }}
              >
                {(cancelAppointmentClicked) =>
                  cancelAppointmentClicked &&
                  ((styleprops) => (
                    <div
                      className="cancel_appointment_modal_content_container"
                      style={styleprops}
                    >
                      <div className="log_out_modal_contents admin_cancel_appointment">
                        <FontAwesomeIcon
                          className="modal_x"
                          icon={faTimes}
                          onClick={() =>
                            dispatch(ACTION_CANCEL_APPOINTMENT_CLICKED_RESET())
                          }
                        />
                        <h2>
                          Are you sure you want to cancel{" "}
                          {allAdminAppointments.filter(
                            (x) => x.id === currentToggledAppointment
                          )[0]
                            ? allAdminAppointments
                                .filter(
                                  (x) => x.id === currentToggledAppointment
                                )[0]
                                .client.firstName[0].toUpperCase() +
                              allAdminAppointments
                                .filter(
                                  (x) => x.id === currentToggledAppointment
                                )[0]
                                .client.firstName.slice(1)
                                .toLowerCase() +
                              " " +
                              allAdminAppointments
                                .filter(
                                  (x) => x.id === currentToggledAppointment
                                )[0]
                                .client.lastName[0].toUpperCase() +
                              allAdminAppointments
                                .filter(
                                  (x) => x.id === currentToggledAppointment
                                )[0]
                                .client.lastName.slice(1)
                                .toLowerCase() +
                              "'s "
                            : null}
                          appointment?
                        </h2>
                        <span className="logout_buttons_container">
                          <div
                            className="logout_button yes_cancel_appointment_button"
                            onClick={() =>
                              handleCancelAppointment(currentToggledAppointment)
                            }
                          >
                            <p>YES, CANCEL</p>
                          </div>
                          <div
                            className="cancel_logout_button no_dont_cancel_appointment_button"
                            onClick={() =>
                              dispatch(
                                ACTION_CANCEL_APPOINTMENT_CLICKED_RESET()
                              )
                            }
                          >
                            <p>NO, GO BACK</p>
                          </div>
                        </span>
                      </div>
                    </div>
                  ))
                }
              </Transition>
            </Modal>
            <div className="my_individual_selected_appointment_contents_container">
              <div
                className="my_individual_selected_appointment_back_container"
                ref={selectedAppointmentBackRef}
                onClick={(e) => handleAppointmentUntoggled(e)}
              >
                <FontAwesomeIcon
                  icon={faLongArrowAltLeft}
                  className="my_individual_selected_appointment_back_arrow_icon"
                />
                <p>Back to My Schedule</p>
              </div>
              <div className="selected_appointment_date_and_time_header">
                <p>Client Information</p>
              </div>
              <div className="selected_appointment_date_and_time_content_container">
                <div className="selected_appointment_date_and_time_content">
                  <p>
                    {allAdminAppointments.filter(
                      (x) => x.id === currentToggledAppointment
                    )[0]
                      ? allAdminAppointments
                          .filter((x) => x.id === currentToggledAppointment)[0]
                          .client.firstName[0].toUpperCase() +
                        allAdminAppointments
                          .filter((x) => x.id === currentToggledAppointment)[0]
                          .client.firstName.slice(1)
                          .toLowerCase() +
                        " " +
                        allAdminAppointments
                          .filter((x) => x.id === currentToggledAppointment)[0]
                          .client.lastName[0].toUpperCase() +
                        allAdminAppointments
                          .filter((x) => x.id === currentToggledAppointment)[0]
                          .client.lastName.slice(1)
                          .toLowerCase()
                      : null}
                  </p>
                  <p>
                    {" "}
                    {allAdminAppointments.filter(
                      (x) => x.id === currentToggledAppointment
                    )[0]
                      ? allAdminAppointments.filter(
                          (x) => x.id === currentToggledAppointment
                        )[0].client.phoneNumber
                      : null}
                  </p>
                  <p>
                    {" "}
                    {allAdminAppointments.filter(
                      (x) => x.id === currentToggledAppointment
                    )[0]
                      ? allAdminAppointments.filter(
                          (x) => x.id === currentToggledAppointment
                        )[0].client.email
                      : null}
                  </p>
                </div>
              </div>
              <div className="selected_appointment_date_and_time_header">
                <p>Appointment Date &amp; Time</p>
              </div>
              <div className="selected_appointment_date_and_time_content_container">
                <div className="selected_appointment_date_and_time_content">
                  <p>
                    {moment(
                      allAdminAppointments.filter(
                        (x) => x.id === currentToggledAppointment
                      )[0].date,
                      "LL"
                    )
                      .format("LLLL")
                      .split(" ")
                      .slice(
                        0,
                        moment(
                          allAdminAppointments.filter(
                            (x) => x.id === currentToggledAppointment
                          )[0].date,
                          "LL"
                        )
                          .format("LLLL")
                          .split(" ").length - 2
                      )
                      .join(" ")}
                  </p>
                  <p>
                    {allAdminAppointments.filter(
                      (x) => x.id === currentToggledAppointment
                    )[0].startTime +
                      " " +
                      (Number(
                        allAdminAppointments
                          .filter((x) => x.id === currentToggledAppointment)[0]
                          .startTime.split(":")[0]
                      ) >= 12 ||
                      Number(
                        allAdminAppointments
                          .filter((x) => x.id === currentToggledAppointment)[0]
                          .startTime.split(":")[0]
                      ) < 9
                        ? "PM"
                        : "AM")}{" "}
                    -{" "}
                    {allAdminAppointments.filter(
                      (x) => x.id === currentToggledAppointment
                    )[0].endTime +
                      " " +
                      (Number(
                        allAdminAppointments
                          .filter((x) => x.id === currentToggledAppointment)[0]
                          .endTime.split(":")[0]
                      ) >= 12 ||
                      Number(
                        allAdminAppointments
                          .filter((x) => x.id === currentToggledAppointment)[0]
                          .endTime.split(":")[0]
                      ) < 9
                        ? "PM"
                        : "AM")}{" "}
                  </p>
                  <p>
                    (
                    {allAdminAppointments.filter(
                      (x) => x.id === currentToggledAppointment
                    )[0].duration >= 60
                      ? Math.floor(
                          allAdminAppointments.filter(
                            (x) => x.id === currentToggledAppointment
                          )[0].duration / 60
                        )
                      : allAdminAppointments.filter(
                          (x) => x.id === currentToggledAppointment
                        )[0].duration}{" "}
                    {allAdminAppointments.filter(
                      (x) => x.id === currentToggledAppointment
                    )[0].duration >= 60
                      ? Math.floor(
                          allAdminAppointments.filter(
                            (x) => x.id === currentToggledAppointment
                          )[0].duration / 60
                        ) === 1
                        ? "hour"
                        : "hours"
                      : null}
                    {Number.isInteger(
                      allAdminAppointments.filter(
                        (x) => x.id === currentToggledAppointment
                      )[0].duration / 60
                    )
                      ? null
                      : " "}
                    {allAdminAppointments.filter(
                      (x) => x.id === currentToggledAppointment
                    )[0].duration >= 60
                      ? Number.isInteger(
                          allAdminAppointments.filter(
                            (x) => x.id === currentToggledAppointment
                          )[0].duration / 60
                        )
                        ? null
                        : allAdminAppointments.filter(
                            (x) => x.id === currentToggledAppointment
                          )[0].duration -
                          Math.floor(
                            allAdminAppointments.filter(
                              (x) => x.id === currentToggledAppointment
                            )[0].duration / 60
                          ) *
                            60 +
                          " minutes"
                      : "minutes"}
                    )
                  </p>
                </div>
              </div>
              <div className="selected_appointment_treatments_header">
                <p>Treatment</p>
              </div>
              {renderSummaryCardTreatments()}
              {allAdminAppointments.filter(
                (x) => x.id === currentToggledAppointment
              )[0].addOns.length === 0 ? null : (
                <>
                  <div className="selected_appointment_add_ons_header">
                    <p>
                      Add On
                      {allAdminAppointments.filter(
                        (x) => x.id === currentToggledAppointment
                      )[0].addOns.length > 1
                        ? "s"
                        : null}
                    </p>
                  </div>
                  {renderSummaryCardAddOns()}
                </>
              )}
              <div className="selected_appointment_total_header admin_side_total_header">
                <p>Total</p>
                <p>
                  $
                  {
                    allAdminAppointments.filter(
                      (x) => x.id === currentToggledAppointment
                    )[0].price
                  }
                </p>
              </div>
              <div className="selected_appointment_date_and_time_header">
                <p>Notes</p>
              </div>
              <div className="selected_appointment_date_and_time_content_container">
                <div className="selected_appointment_date_and_time_content">
                  <p>
                    {" "}
                    {allAdminAppointments.filter(
                      (x) => x.id === currentToggledAppointment
                    )[0].notes
                      ? allAdminAppointments.filter(
                          (x) => x.id === currentToggledAppointment
                        )[0].notes
                      : "No notes provided"}
                  </p>
                </div>
              </div>
              <div className="selected_appointments_bottom_buttons_container">
                {moment(
                  allAdminAppointments.filter(
                    (x) => x.id === currentToggledAppointment
                  )[0].date,
                  "MMMM D, YYYY"
                ).format("MMMM D, YYYY") >= moment().format("MMMM D, YYYY") ? (
                  <div
                    className="cancel_appointment_button"
                    onClick={() =>
                      dispatch(ACTION_CANCEL_APPOINTMENT_CLICKED())
                    }
                  >
                    <p>Cancel Appointment</p>
                  </div>
                ) : null}
                <div
                  className="back_to_all_appointments_button"
                  ref={backToAppointmentsRef}
                  onClick={(e) => handleAppointmentUntoggled(e)}
                >
                  <p>Back to Appointments</p>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </Transition>
  );
});

export default AdminSelectedAppointment;
