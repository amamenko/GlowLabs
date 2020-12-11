const graphql = require("graphql");
const mongoose = require("mongoose");
const EmployeeType = require("../types/EmployeeType");
const Employee = require("../../models/employee");
const Notification = require("../../models/notification");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const createNotificationFunction = require("./notifications/createNotificationFunction");

const { GraphQLID } = graphql;

const NEW_NOTIFICATION = "NEW_NOTIFICATION";

const deleteEmployeeMutation = {
  type: EmployeeType,
  args: {
    _id: { type: GraphQLID },
  },
  async resolve(parent, args, { cookies, pubsub }) {
    const adminAccessToken = cookies["admin-access-token"];

    if (!adminAccessToken) {
      throw new UserInputError("Admin is not authenticated.");
    } else {
      const deletedEmployee = await Employee.findById({
        _id: args._id,
      });

      await Employee.findByIdAndDelete({
        _id: args._id,
      });

      const decodedAdminID = jwt.decode(adminAccessToken).id.toString();

      const deletingEmployee = await Employee.findOne({
        _id: decodedAdminID,
      });

      let filter = {
        $or: [{ _id: decodedAdminID }, { employeeRole: "Admin" }],
      };

      let newNotification = new Notification({
        _id: new mongoose.Types.ObjectId(),
        new: true,
        type: "deleteStaff",
        originalAssociatedStaffFirstName: deletedEmployee.firstName,
        originalAssociatedStaffLastName: deletedEmployee.lastName,
        createdByFirstName: deletingEmployee.firstName,
        createdByLastName: deletingEmployee.lastName,
      });

      const update = createNotificationFunction(
        newNotification,
        deletingEmployee
      );

      await Employee.updateMany(filter, update, {
        new: true,
      });

      pubsub.publish(NEW_NOTIFICATION, update);

      return {
        _id: args._id,
      };
    }
  },
};

module.exports = deleteEmployeeMutation;
