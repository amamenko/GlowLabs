const graphql = require("graphql");
const PersonalEventType = require("../types/PersonalEventType");
const PersonalEvent = require("../../models/personalevent");
const { UserInputError } = require("apollo-server");
const createNotificationFunction = require("./notifications/createNotificationFunction");

const { GraphQLID } = graphql;

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

      const updatedEmployee = await Employee.updateMany(
        filter,
        createNotificationFunction(newNotification, addingEmployee),
        {
          new: true,
        }
      );

      const updatedEmployeeRes = await updatedEmployee.save();
      const deletePersonalEventRes = await PersonalEvent.findByIdAndDelete({
        _id: args._id,
      });

      return {
        _id: args._id,
        ...deletePersonalEventRes,
        ...updatedEmployeeRes,
      };
    } else {
      throw new UserInputError("Admin is not authenticated.");
    }
  },
};

module.exports = deletePersonalEventMutation;
