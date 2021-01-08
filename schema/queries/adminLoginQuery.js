const graphql = require("graphql");
const AuthType = require("../types/AuthType");
const Employee = require("../../models/employee");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const createAdminTokens = require("../../createAdminTokens");
const { UserInputError } = require("apollo-server");

// Hide usernames and passwords
require("dotenv").config();

const { GraphQLString } = graphql;

const adminLoginQuery = {
  type: AuthType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const employee = await Employee.findOne({ email: args.email });

    if (!employee) {
      throw new UserInputError(
        "There is no registered employee associated with that email."
      );
    } else {
      if (!employee.permanentPasswordSet) {
        // Entered password is identical to temporary password
        if (args.password === employee.password) {
          context.res.clearCookie("dummy-token", {
            domain:
              process.env.NODE_ENV === "production"
                ? process.env.PRODUCTION_CLIENT_ROOT
                : "localhost",
          });
          context.res.clearCookie("access-token", {
            domain:
              process.env.NODE_ENV === "production"
                ? process.env.PRODUCTION_CLIENT_ROOT
                : "localhost",
          });
          context.res.clearCookie("refresh-token", {
            domain:
              process.env.NODE_ENV === "production"
                ? process.env.PRODUCTION_CLIENT_ROOT
                : "localhost",
          });
          context.res.clearCookie("temporary-facebook-dummy-token", {
            domain:
              process.env.NODE_ENV === "production"
                ? process.env.PRODUCTION_CLIENT_ROOT
                : "localhost",
          });

          const generateAdminDummyToken = (employee) => {
            const token = jwt.sign(
              {
                id: employee._id,
                employeeRole: employee.employeeRole,
                auth: true,
              },
              process.env.JWT_SECRET_KEY_DUMMY,
              { expiresIn: "15m" }
            );
            return token;
          };

          const generateAdminAccessToken = (employee) => {
            const token = jwt.sign(
              {
                id: employee._id,
                employeeRole: employee.employeeRole,
                email: employee.email,
                phoneNumber: employee.phoneNumber,
                firstName: employee.firstName,
                lastName: employee.lastName,
                tokenCount: employee.tokenCount,
              },
              process.env.JWT_SECRET_KEY_ACCESS,
              { expiresIn: "15m" }
            );
            return token;
          };

          const accessToken = generateAdminAccessToken(employee);
          const dummyToken = generateAdminDummyToken(employee);

          context.res.cookie("temporary-admin-access-token", accessToken, {
            maxAge: 1000 * 60 * 15,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            domain:
              process.env.NODE_ENV === "production"
                ? process.env.PRODUCTION_CLIENT_ROOT
                : "localhost",
          });

          context.res.cookie("temporary-admin-dummy-token", dummyToken, {
            maxAge: 1000 * 60 * 15,
            httpOnly: false,
            secure: process.env.NODE_ENV === "production" ? true : false,
            domain:
              process.env.NODE_ENV === "production"
                ? process.env.PRODUCTION_CLIENT_ROOT
                : "localhost",
          });
        } else {
          throw new UserInputError("Incorrect password.");
        }
      } else {
        const passwordsAreIdentical = await bcrypt
          .compare(args.password, employee.password)
          .catch((err) => {
            throw err;
          });

        if (!passwordsAreIdentical) {
          throw new UserInputError("Incorrect password.");
        }

        const generateAdminDummyToken = (employee) => {
          const token = jwt.sign(
            {
              id: employee._id,
              employeeRole: employee.employeeRole,
              auth: true,
            },
            process.env.JWT_SECRET_KEY_DUMMY,
            { expiresIn: "7d" }
          );
          return token;
        };

        const dummyToken = generateAdminDummyToken(employee);
        context.res.cookie("admin-dummy-token", dummyToken, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          secure: process.env.NODE_ENV === "production" ? true : false,
          domain:
            process.env.NODE_ENV === "production"
              ? process.env.PRODUCTION_CLIENT_ROOT
              : "localhost",
        });

        const { accessToken, refreshToken } = createAdminTokens(employee);

        context.res.cookie("admin-access-token", accessToken, {
          maxAge: 1000 * 60 * 15,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production" ? true : false,
          domain:
            process.env.NODE_ENV === "production"
              ? process.env.PRODUCTION_CLIENT_ROOT
              : "localhost",
        });

        context.res.cookie("admin-refresh-token", refreshToken, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production" ? true : false,
          domain:
            process.env.NODE_ENV === "production"
              ? process.env.PRODUCTION_CLIENT_ROOT
              : "localhost",
        });

        context.res.clearCookie("dummy-token", {
          domain:
            process.env.NODE_ENV === "production"
              ? process.env.PRODUCTION_CLIENT_ROOT
              : "localhost",
        });
        context.res.clearCookie("access-token", {
          domain:
            process.env.NODE_ENV === "production"
              ? process.env.PRODUCTION_CLIENT_ROOT
              : "localhost",
        });
        context.res.clearCookie("refresh-token", {
          domain:
            process.env.NODE_ENV === "production"
              ? process.env.PRODUCTION_CLIENT_ROOT
              : "localhost",
        });
        context.res.clearCookie("temporary-facebook-dummy-token", {
          domain:
            process.env.NODE_ENV === "production"
              ? process.env.PRODUCTION_CLIENT_ROOT
              : "localhost",
        });

        return {
          _id: employee._id,
          accessToken: accessToken,
          refreshToken: refreshToken,
        };
      }
    }
  },
};

module.exports = adminLoginQuery;
