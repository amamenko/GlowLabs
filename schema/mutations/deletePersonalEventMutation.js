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

const NEW_NOTIFICATION = "new_notification";

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

      let filter = {
        $or: [{ _id: decodedAdminID }, { employeeRole: "Admin" }],
      };

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
      });

      const update = createNotificationFunction(
        newNotification,
        addingEmployee
      );

      context.pubsub.publish(NEW_NOTIFICATION, update);

      await Employee.updateMany(filter, update, {
        new: true,
      });

      const deletePersonalEventRes = await PersonalEvent.findByIdAndDelete({
        _id: args._id,
      });

      return {
        _id: args._id,
        ...deletePersonalEventRes,
      };
    } else {
      throw new UserInputError("Admin is not authenticated.");
    }
  },
};

module.exports = deletePersonalEventMutation;
