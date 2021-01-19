const graphql = require("graphql");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const PersonalEventType = require("../types/PersonalEventType");
const PersonalEvent = require("../../models/personalevent");
const Employee = require("../../models/employee");
const Notification = require("../../models/notification");
const { UserInputError } = require("apollo-server");
const createNotificationFunction = require("./notifications/createNotificationFunction");

const { GraphQLID } = graphql;

const UPDATED_EMPLOYEE = "getUpdatedEmployee";

const deletePersonalEventMutation = {
  type: PersonalEventType,
  args: {
    _id: { type: GraphQLID },
  },
  async resolve(parent, args, context) {
    const adminAccessToken = context.cookies["admin-access-token"];

    if (adminAccessToken) {
      const associatedPersonalEvent = await PersonalEvent.findById({
        _id: args._id,
      });

      const decodedAdminID = jwt.decode(adminAccessToken).id.toString();

      const addingEmployee = await Employee.findOne({
        _id: decodedAdminID,
      });

      let newNotification = new Notification({
        _id: new mongoose.Types.ObjectId(),
        new: true,
        type: "cancelPersonalEvent",
        date: associatedPersonalEvent.date,
        time: associatedPersonalEvent.startTime,
        allDay: associatedPersonalEvent.allDay,
        originalAssociatedStaffFirstName: addingEmployee.firstName,
        originalAssociatedStaffLastName: addingEmployee.lastName,
        createdByFirstName: addingEmployee.firstName,
        createdByLastName: addingEmployee.lastName,
        createdAt: Date.now(),
      });

      const updateNotifications = (staff) =>
        createNotificationFunction(newNotification, staff);

      (
        await Employee.find({
          employeeRole: "Admin",
          _id: { $ne: decodedAdminID },
        })
      ).forEach((currentEmployee) => {
        const notificationsObj = updateNotifications(currentEmployee);
        currentEmployee.notifications = notificationsObj.notifications;

        currentEmployee.save();
      });

      const updatedEmployee = await Employee.findOne(
        { _id: decodedAdminID },
        (err, currentEmployee) => {
          const notificationsObj = updateNotifications(currentEmployee);
          currentEmployee.notifications = notificationsObj.notifications;

          currentEmployee.save();
        }
      );

      const updatedEmployeeRes = await updatedEmployee.save();

      const deletePersonalEventRes = await PersonalEvent.findByIdAndDelete({
        _id: args._id,
      });

      context.pubsub.publish(UPDATED_EMPLOYEE, {
        employee: updatedEmployeeRes,
      });

      return {
        ...deletePersonalEventRes,
        ...updatedEmployeeRes,
      };
    } else {
      throw new UserInputError("Admin is not authenticated.");
    }
  },
};

module.exports = deletePersonalEventMutation;
