const EmployeeType = require("../types/EmployeeType");
const Employee = require("../../models/employee");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

// Hide usernames and passwords
require("dotenv").config();

const updateEmployeeInvalidateTokensMutation = {
  type: EmployeeType,
  async resolve(parent, args, context) {
    const token = context.cookies["admin-access-token"];

    if (!token) {
      throw new UserInputError("User is not authenticated.");
    } else {
      const employee = await Employee.findOne({
        _id: jwt.decode(token).id.toString(),
      });

      if (!employee) {
        throw new UserInputError("No registered employee found.", {
          errors: {
            email: "No registered employee found.",
          },
        });
      } else {
        context.res.cookie(
          "logout",
          { logout: true },
          {
            maxAge: 1000 * 15,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            domain:
              process.env.NODE_ENV === "production"
                ? process.env.PRODUCTION_CLIENT_ROOT
                : "localhost",
          }
        );
        employee.tokenCount += 1;
        context.res.clearCookie("admin-access-token", {
          domain:
            process.env.NODE_ENV === "production"
              ? process.env.PRODUCTION_CLIENT_ROOT
              : "localhost",
        });
        context.res.clearCookie("admin-refresh-token", {
          domain:
            process.env.NODE_ENV === "production"
              ? process.env.PRODUCTION_CLIENT_ROOT
              : "localhost",
        });
        context.res.clearCookie("admin-dummy-token", {
          domain:
            process.env.NODE_ENV === "production"
              ? process.env.PRODUCTION_CLIENT_ROOT
              : "localhost",
        });

        const res = employee.save();

        return {
          ...res,
          id: employee._id,
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          phoneNumber: employee.phoneNumber,
          password: employee.password,
          createdAt: employee.createdAt,
          tokenCount: employee.tokenCount,
        };
      }
    }
  },
};

module.exports = updateEmployeeInvalidateTokensMutation;
