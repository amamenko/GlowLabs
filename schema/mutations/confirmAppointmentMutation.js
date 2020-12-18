const graphql = require("graphql");
const AppointmentInput = require("../types/inputs/AppointmentInput");
const Appointment = require("../../models/appointment");
const Notification = require("../../models/notification");
const createNotificationFunction = require("./notifications/createNotificationFunction");
const jwt = require("jsonwebtoken");
const Employee = require("../../models/employee");
const mongoose = require("mongoose");

const { GraphQLID } = graphql;

const UPDATED_EMPLOYEE = "getUpdatedEmployee";

const confirmAppointmentMutation = {
  type: AppointmentInput,
  args: {
    _id: { type: GraphQLID },
  },
  async resolve(parent, args, context) {
    const adminAccessToken = context.cookies["admin-access-token"];

    const selectedAppointment = await Appointment.findById({
      _id: args._id,
    });

    let filter = {
      _id: args._id,
    };

    const update = {
      confirmed: true,
    };

    const appointment = await Appointment.findOneAndUpdate(filter, update, {
      new: true,
    });

    let decodedAdminID = "";
    let confirmingEmployee = "";

    if (adminAccessToken) {
      decodedAdminID = jwt.decode(adminAccessToken).id.toString();
      confirmingEmployee = await Employee.findOne({
        _id: decodedAdminID,
      });
    }

    const newNotification = new Notification({
      _id: new mongoose.Types.ObjectId(),
      new: true,
      type: "confirmAppointment",
      date: selectedAppointment.date,
      time:
        selectedAppointment.startTime +
        " " +
        selectedAppointment.morningOrEvening,
      associatedClientFirstName: selectedAppointment.client.firstName,
      associatedClientLastName: selectedAppointment.client.lastName,
      originalAssociatedStaffFirstName: selectedAppointment.esthetician.split(
        " "
      )[0],
      originalAssociatedStaffLastName: selectedAppointment.esthetician.split(
        " "
      )[1],
      createdByFirstName: adminAccessToken
        ? confirmingEmployee.firstName
        : selectedAppointment.client.firstName,
      createdByLastName: adminAccessToken
        ? confirmingEmployee.lastName
        : selectedAppointment.client.lastName,
    });

    const updateNotifications = (staff) =>
      createNotificationFunction(newNotification, staff);

    (
      await Employee.find({
        employeeRole: "Admin",
        firstName: {
          $ne: selectedAppointment.esthetician.split(" ")[0],
        },
        lastName: { $ne: selectedAppointment.esthetician.split(" ")[1] },
      })
    ).forEach((currentEmployee) => {
      const notificationsObj = updateNotifications(currentEmployee);
      currentEmployee.notifications = notificationsObj.notifications;

      currentEmployee.save();
    });

    const updatedEmployee = await Employee.findOne(
      {
        firstName: selectedAppointment.esthetician.split(" ")[0],
        lastName: selectedAppointment.esthetician.split(" ")[1],
      },
      (err, currentEmployee) => {
        const notificationsObj = updateNotifications(currentEmployee);
        currentEmployee.notifications = notificationsObj.notifications;

        currentEmployee.save();
      }
    );

    const appt_res = await appointment.save();

    const updatedEmployeeRes = await updatedEmployee.save();

    context.pubsub.publish(UPDATED_EMPLOYEE, {
      employee: updatedEmployeeRes,
    });

    return {
      ...appt_res,
      ...updatedEmployeeRes,
      createdAt: appt_res.createdAt,
      esthetician: appt_res.esthetician,
      date: appt_res.date,
      startTime: appt_res.startTime,
      morningOrEvening: appt_res.morningOrEvening,
      endTime: appt_res.endTime,
      duration: appt_res.duration,
      price: appt_res.price,
      treatments: appt_res.treatments,
      addOns: appt_res.addOns,
      bookedWithCardSquareID: appt_res.bookedWithCardSquareID,
      notes: appt_res.notes,
      confirmed: appt_res.confirmed,
    };
  },
};

module.exports = confirmAppointmentMutation;
