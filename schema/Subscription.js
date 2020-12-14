const graphql = require("graphql");
const EmployeeType = require("./types/EmployeeType");
const Employee = require("../models/employee");

const { GraphQLObjectType, GraphQLID } = graphql;

const UPDATED_EMPLOYEE = "employee";

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

        console.log(payload);

        if (employee) {
          return employee;
        }
      },
      subscribe: (parent, args, { pubsub }, info) => {
        console.log(pubsub);
        return pubsub.asyncIterator(UPDATED_EMPLOYEE);
      },
    },
  },
});

module.exports = Subscription;
