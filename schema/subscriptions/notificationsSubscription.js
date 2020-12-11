const graphql = require("graphql");
const Employee = require("../../models/employee");
const NotificationType = require("../types/NotificationType");
const jwt = require("jsonwebtoken");

const { GraphQLList } = graphql;

const notificationsSubscription = {
  type: new GraphQLList(NotificationType),
  async resolve(parent, args, context) {
    const adminAccessToken = context.cookies["admin-access-token"];

    if (!adminAccessToken) {
      throw new UserInputError("Admin is not authenticated.");
    } else {
      const employee = await Employee.findById({
        _id: jwt.decode(adminAccessToken).id,
      });

      return employee.notifications;
    }
  },
};

module.exports = notificationsSubscription;
