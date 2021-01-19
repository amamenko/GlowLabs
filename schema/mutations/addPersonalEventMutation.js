const graphql = require("graphql");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const PersonalEvent = require("../../models/personalevent");
const PersonalEventType = require("../types/PersonalEventType");
const Employee = require("../../models/employee");
const Notification = require("../../models/notification");
const createNotificationFunction = require("./notifications/createNotificationFunction");

const { GraphQLString, GraphQLBoolean, GraphQLInt, GraphQLNonNull } = graphql;

const UPDATED_EMPLOYEE = "getUpdatedEmployee";

const addPersonalEventMutation = {
  type: PersonalEventType,
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    notes: { type: GraphQLString },
    staff: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    startTime: { type: new GraphQLNonNull(GraphQLString) },
    endTime: { type: new GraphQLNonNull(GraphQLString) },
    duration: { type: new GraphQLNonNull(GraphQLInt) },
    allDay: { type: GraphQLBoolean },
    blockTime: { type: GraphQLBoolean },
  },
  async resolve(parent, args, context) {
    const adminAccessToken = context.cookies["admin-access-token"];

    const personalEventID = new mongoose.Types.ObjectId();

    if (adminAccessToken) {
      let personalEvent = new PersonalEvent({
        _id: personalEventID,
        title: args.title,
        notes: args.notes,
        staff: args.staff,
        date: args.date,
        startTime: args.startTime,
        endTime: args.endTime,
        duration: args.duration,
        allDay: args.allDay,
        blockTime: args.blockTime,
      });

      const decodedAdminID = jwt.decode(adminAccessToken).id.toString();

      const addingEmployee = await Employee.findOne({
        _id: decodedAdminID,
      });

      let newNotification = new Notification({
        _id: new mongoose.Types.ObjectId(),
        new: true,
        type: "addPersonalEvent",
        date: args.date,
        time: args.startTime,
        allDay: args.allDay,
        originalAssociatedStaffFirstName: args.staff.split(" ")[0],
        originalAssociatedStaffLastName: args.staff.split(" ")[1],
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

      const personalEventRes = await personalEvent.save();

      context.pubsub.publish(UPDATED_EMPLOYEE, {
        employee: updatedEmployeeRes,
      });

      return {
        ...personalEventRes,
        ...updatedEmployeeRes,
      };
    }
  },
};

module.exports = addPersonalEventMutation;
