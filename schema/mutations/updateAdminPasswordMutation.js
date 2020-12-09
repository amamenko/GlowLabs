const graphql = require("graphql");
const EmployeeType = require("../types/EmployeeType");
const Employee = require("../../models/employee");
const { UserInputError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { GraphQLString } = graphql;

const updateAdminPasswordMutation = {
  type: EmployeeType,
  args: {
    password: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    if (!context.adminAuth) {
      throw new UserInputError("User is not authenticated.");
    } else {
      let token;

      if (context.cookies["temporary-admin-access-token"]) {
        token = context.cookies["temporary-admin-access-token"];
      } else if (context.cookies["admin-access-token"]) {
        token = context.cookies["admin-access-token"];
      }

      let filter = {
        _id: jwt.decode(token).id.toString(),
      };

      const update = {
        permanentPasswordSet: true,
        password: await bcrypt
          .hash(args.password, 12)
          .then((hash) => (args.password = hash))
          .catch((err) => {
            throw err;
          }),
      };

      const employee = await Employee.findOneAndUpdate(filter, update, {
        new: true,
      });

      const res = employee.save();

      return {
        ...res,
        id: employee._id,
        permanentPasswordSet: employee.permanentPasswordSet,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phoneNumber: employee.phoneNumber,
        password: employee.password,
      };
    }
  },
};

module.exports = updateAdminPasswordMutation;
