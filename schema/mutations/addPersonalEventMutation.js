const graphql = require("graphql");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const PersonalEvent = require("../../models/personalevent");
const PersonalEventType = require("../types/PersonalEventType");
const Employee = require("../../models/employee");
const Notification = require("../../models/notification");
const createNotificationFunction = require("./notifications/createNotificationFunction");

const { GraphQLString, GraphQLBoolean, GraphQLInt, GraphQLNonNull } = graphql;

const NEW_NOTIFICATION = "new_notificaton";

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
  async resolve(parent, args, { pubsub, cookies }) {
    const adminAccessToken = cookies["admin-access-token"];

    if (adminAccessToken) {
      let personalEvent = new PersonalEvent({
        _id: new mongoose.Types.ObjectId(),
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

      let filter = {
        $or: [{ _id: decodedAdminID }, { employeeRole: "Admin" }],
      };

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
      });

      const update = createNotificationFunction(
        newNotification,
        addingEmployee
      );

      await Employee.updateMany(filter, update, {
        new: true,
      });

      const personalEventRes = await personalEvent.save();

      return {
        ...personalEventRes,
      };
    }

    console.log(pubsub);

    pubsub.publish(NEW_NOTIFICATION, {
      notifications: { type: "addPersonalEvent" },
    });
  },
};

module.exports = addPersonalEventMutation;
