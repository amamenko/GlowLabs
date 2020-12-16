const graphql = require("graphql");
const PersonalEventType = require("../types/PersonalEventType");
const PersonalEvent = require("../../models/personalevent");
const { UserInputError } = require("apollo-server");
const createNotificationFunction = require("./notifications/createNotificationFunction");
const Employee = require("../../models/employee");
const Notification = require("../../models/notification");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { GraphQLString, GraphQLBoolean, GraphQLID, GraphQLInt } = graphql;

const UPDATED_EMPLOYEE = "getUpdatedEmployee";

const updatePersonalEventMutation = {
  type: PersonalEventType,
  args: {
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    notes: { type: GraphQLString },
    date: { type: GraphQLString },
    staff: { type: GraphQLString },
    startTime: { type: GraphQLString },
    endTime: { type: GraphQLString },
    duration: { type: GraphQLInt },
    allDay: { type: GraphQLBoolean },
    blockTime: { type: GraphQLBoolean },
  },
  async resolve(parent, args, context) {
    const adminAccessToken = context.cookies["admin-access-token"];

    if (!adminAccessToken) {
      throw new UserInputError("Admin is not authenticated.");
    } else {
      const personalEvent = await PersonalEvent.findOne({
        _id: args._id,
      });

      const update = {
        title: args.title ? args.title : personalEvent.title,
        notes: args.notes ? args.notes : personalEvent.notes,
        date: args.date ? args.date : personalEvent.date,
        staff: args.staff ? args.staff : personalEvent.staff,
        startTime: args.startTime ? args.startTime : personalEvent.startTime,
        endTime: args.endTime ? args.endTime : personalEvent.endTime,
        duration: args.duration ? args.duration : personalEvent.duration,
        allDay:
          args.allDay !== personalEvent.allDay
            ? args.allDay
            : personalEvent.allDay,
        blockTime:
          args.blockTime !== personalEvent.blockTime
            ? args.blockTime
            : personalEvent.blockTime,
      };

      const updatedPersonalEvent = await PersonalEvent.findOneAndUpdate(
        {
          _id: args._id,
        },
        update,
        {
          new: true,
        }
      );

      const decodedAdminID = jwt.decode(adminAccessToken).id.toString();

      const updatingEmployee = await Employee.findOne({
        _id: decodedAdminID,
      });

      let newNotification = new Notification({
        _id: new mongoose.Types.ObjectId(),
        new: true,
        type: "updatePersonalEvent",
        date: args.date,
        time: args.startTime,
        allDay: args.allDay,
        originalAssociatedStaffFirstName: args.staff.split(" ")[0],
        originalAssociatedStaffLastName: args.staff.split(" ")[1],
        createdByFirstName: updatingEmployee.firstName,
        createdByLastName: updatingEmployee.lastName,
      });

      const updateNotification = createNotificationFunction(
        newNotification,
        updatingEmployee
      );

      await Employee.updateMany(
        { employeeRole: "Admin", _id: { $ne: decodedAdminID } },
        update,
        {
          new: true,
          multi: true,
        }
      );

      const updatedEmployee = await Employee.findOneAndUpdate(
        { _id: decodedAdminID },
        updateNotification,
        {
          new: true,
        }
      );

      const updatedEmployeeRes = await updatedEmployee.save();

      context.pubsub.publish(UPDATED_EMPLOYEE, {
        employee: updatedEmployeeRes,
      });

      const updatedPersonalEventRes = await updatedPersonalEvent.save();

      return {
        ...updatedPersonalEventRes,
        ...updatedEmployeeRes,
      };
    }
  },
};

module.exports = updatePersonalEventMutation;
