const EmployeeType = require("../types/EmployeeType");
const Employee = require("../../models/employee");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

// Hide usernames and passwords
require("dotenv").config();

const UPDATED_EMPLOYEE = "getUpdatedEmployee";

const resetNotificationsMutation = {
  type: EmployeeType,
  async resolve(parent, args, context) {
    const adminAccessToken = context.cookies["admin-access-token"];

    if (adminAccessToken) {
      const decodedAdminID = jwt.decode(adminAccessToken).id.toString();

      const currentEmployee = await Employee.findOne({
        _id: decodedAdminID,
      });

      let filter = { _id: decodedAdminID };

      const update = {
        notifications: currentEmployee.notifications.map((notification) => {
          notification.new = false;
          return notification;
        }),
      };

      const updatedEmployee = await Employee.findOneAndUpdate(filter, update, {
        new: true,
      });

      const updatedEmployeeRes = await updatedEmployee.save();

      context.pubsub.publish(UPDATED_EMPLOYEE, {
        employee: updatedEmployeeRes,
      });

      return {
        ...updatedEmployeeRes,
      };
    } else {
      throw new UserInputError("Admin is not authenticated.");
    }
  },
};

module.exports = resetNotificationsMutation;
