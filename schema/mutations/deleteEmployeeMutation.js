const graphql = require("graphql");
const EmployeeType = require("../types/EmployeeType");
const Employee = require("../../models/employee");
const { UserInputError } = require("apollo-server");

const { GraphQLID } = graphql;

const deleteEmployeeMutation = {
  type: EmployeeType,
  args: {
    _id: { type: GraphQLID },
  },
  async resolve(parent, args, context) {
    const adminAccessToken = context.cookies["admin-access-token"];

    if (!adminAccessToken) {
      throw new UserInputError("Admin is not authenticated.");
    } else {
      await Employee.findByIdAndDelete({
        _id: args._id,
      });

      return {
        _id: args._id,
      };
    }
  },
};

module.exports = deleteEmployeeMutation;
