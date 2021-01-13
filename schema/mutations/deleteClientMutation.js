const graphql = require("graphql");
const ClientType = require("../types/ClientType");
const Client = require("../../models/client");
const Employee = require("../../models/employee");
const Notification = require("../../models/notification");
const { UserInputError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const createNotificationFunction = require("./notifications/createNotificationFunction");

const { GraphQLID } = graphql;

const UPDATED_EMPLOYEE = "getUpdatedEmployee";

const deleteClientMutation = {
  type: ClientType,
  args: {
    _id: { type: GraphQLID },
  },
  async resolve(parent, args, context) {
    const adminAccessToken = context.cookies["admin-access-token"];

    if (!adminAccessToken) {
      throw new UserInputError("Admin is not authenticated.");
    } else {
      const deletedClient = await Client.findById({
        _id: args._id,
      });

      await Client.findByIdAndDelete({
        _id: args._id,
      });

      const decodedAdminID = jwt.decode(adminAccessToken).id.toString();

      const deletingEmployee = await Employee.findOne({
        _id: decodedAdminID,
      });

      let newNotification = new Notification({
        _id: new mongoose.Types.ObjectId(),
        new: true,
        type: "removeClient",
        associatedClientFirstName: deletedClient.firstName,
        associatedClientLastName: deletedClient.lastName,
        createdByFirstName: deletingEmployee.firstName,
        createdByLastName: deletingEmployee.lastName,
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

      context.pubsub.publish(UPDATED_EMPLOYEE, {
        employee: updatedEmployeeRes,
      });

      return {
        _id: args._id,
        ...updatedEmployeeRes,
      };
    }
  },
};

module.exports = deleteClientMutation;
