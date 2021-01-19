const graphql = require("graphql");
const EmployeeType = require("./types/EmployeeType");
const Employee = require("../models/employee");

const { GraphQLObjectType, GraphQLID } = graphql;

// Hide usernames and passwords
require("dotenv").config();

const UPDATED_EMPLOYEE = "getUpdatedEmployee";

const Subscription = new GraphQLObjectType({
  name: "Subscription",
  fields: {
    getUpdatedEmployee: {
      type: EmployeeType,
      args: {
        _id: { type: GraphQLID },
      },
      resolve: async (payload, args, context, info) => {
        const employee = await Employee.findById({
          _id: args._id,
        });

        if (employee) {
          return employee;
        }
      },
      subscribe: (parent, args, { pubsub }, info) => {
        return pubsub.asyncIterator(UPDATED_EMPLOYEE);
      },
    },
  },
});

module.exports = Subscription;
