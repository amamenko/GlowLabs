const graphql = require("graphql");
const EmployeeType = require("../types/EmployeeType");
const Employee = require("../../models/employee");
const { UserInputError } = require("apollo-server");

const { GraphQLString, GraphQLID } = graphql;

const updateAdminProfilePictureMutation = {
  type: EmployeeType,
  args: {
    id: { type: GraphQLID },
    profilePicture: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const adminAccessToken = context.cookies["admin-access-token"];

    if (!adminAccessToken) {
      throw new UserInputError("Admin is not authenticated.");
    } else {
      const employee = await Employee.findOneAndUpdate(
        {
          _id: args.id,
        },
        { profilePicture: args.profilePicture },
        {
          new: true,
        }
      );

      const res = await employee.save();

      return {
        ...res,
        _id: employee._id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phoneNumber: employee.phoneNumber,
        profilePicture: employee.profilePicture,
      };
    }
  },
};

module.exports = updateAdminProfilePictureMutation;
