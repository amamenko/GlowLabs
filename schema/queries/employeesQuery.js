const graphql = require("graphql");
const EmployeeType = require("../types/EmployeeType");
const Employee = require("../../models/employee");

const { GraphQLList } = graphql;

const employeesQuery = {
  type: new GraphQLList(EmployeeType),
  async resolve(parent, args) {
    return await Employee.find({});
  },
};

module.exports = employeesQuery;
