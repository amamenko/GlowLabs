const graphql = require("graphql");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Appointment = require("../../models/appointment");
const AppointmentInput = require("../types/inputs/AppointmentInput");
const Employee = require("../../models/employee");
const { UserInputError } = require("apollo-server");
const Notification = require("../../models/notification");
const createNotificationFunction = require("./notifications/createNotificationFunction");

const { GraphQLID } = graphql;

const UPDATED_EMPLOYEE = "getUpdatedEmployee";

const deleteAppointmentMutation = {
  type: AppointmentInput,
  args: {
    _id: { type: GraphQLID },
  },
  async resolve(parent, args, context) {
    const accessToken = context.cookies["access-token"];
    const adminAccessToken = context.cookies["admin-access-token"];

    if (!context.isAuth && !adminAccessToken) {
      throw new UserInputError("User is not authenticated.");
    } else {
      const selectedAppointment = await Appointment.findById({
        _id: args._id,
      });

      if (accessToken) {
        const allApps = await Appointment.find({});

        const filteredArr = allApps
          .filter((item) =>
            item.client._id
              ? item.client._id.toString() ===
                jwt.decode(accessToken).id.toString()
              : null
          )
          .filter((item) => (item._id ? item._id === args._id : null));

        if (filteredArr) {
          deletedAppointment = await Appointment.findByIdAndDelete({
            _id: args._id,
          });

          const decodedAdminID = jwt.decode(adminAccessToken).id.toString();

          const deletingEmployee = await Employee.findOne({
            _id: decodedAdminID,
          });

          let newNotification = new Notification({
            _id: new mongoose.Types.ObjectId(),
            new: true,
            type: "cancelAppointment",
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
            createdByFirstName: deletingEmployee.firstName,
            createdByLastName: deletingEmployee.lastName,
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

          const updatedEmployeeRes = await updatedEmployee.save();

          context.pubsub.publish(UPDATED_EMPLOYEE, {
            employee: updatedEmployeeRes,
          });

          return {
            _id: args._id,
          };
        }
      } else {
        if (adminAccessToken) {
          deletedAppointment = await Appointment.findByIdAndDelete({
            _id: args._id,
          });

          const decodedAdminID = jwt.decode(adminAccessToken).id.toString();

          const deletingEmployee = await Employee.findOne({
            _id: decodedAdminID,
          });

          let newNotification = new Notification({
            _id: new mongoose.Types.ObjectId(),
            new: true,
            type: "cancelAppointment",
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
            createdByFirstName: deletingEmployee.firstName,
            createdByLastName: deletingEmployee.lastName,
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

          const updatedEmployeeRes = await updatedEmployee.save();

          context.pubsub.publish(UPDATED_EMPLOYEE, {
            employee: updatedEmployeeRes,
          });

          return {
            _id: args._id,
            ...updatedEmployeeRes,
          };
        } else {
          return null;
        }
      }
    }
  },
};

module.exports = deleteAppointmentMutation;
