const graphql = require("graphql");
const EmployeeType = require("../types/EmployeeType");
const Employee = require("../../models/employee");
const { UserInputError } = require("apollo-server");

const { GraphQLString, GraphQLID } = graphql;

const employeeQuery = {
  type: EmployeeType,
  args: {
    _id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const employee = await Employee.findOne(args);

    if (employee === null) {
      throw new UserInputError("No employee found.");
    } else {
      return employee;
    }
  },
};

module.exports = employeeQuery;
