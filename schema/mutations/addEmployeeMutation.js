const graphql = require("graphql");
const mongoose = require("mongoose");
const generator = require("generate-password");
const mjmlUtils = require("mjml-utils");
const nodemailer = require("nodemailer");
const EmployeeType = require("../types/EmployeeType");
const Employee = require("../../models/employee");
const Notification = require("../../models/notification");
const jwt = require("jsonwebtoken");
const createNotificationFunction = require("./notifications/createNotificationFunction");

// Hide usernames and passwords
require("dotenv").config();

const { GraphQLString, GraphQLList, GraphQLNonNull } = graphql;

const UPDATED_EMPLOYEE = "getUpdatedEmployee";

const addEmployeeMutation = {
  type: EmployeeType,
  args: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
    employeeRole: { type: new GraphQLList(GraphQLString) },
  },
  async resolve(parent, args, context) {
    const adminAccessToken = context.cookies["admin-access-token"];

    if (adminAccessToken) {
      // Generate temporary password for new employee
      const password = generator.generate({
        length: 10,
        numbers: true,
        lowercase: true,
        uppercase: true,
        excludeSimilarCharacters: true,
      });

      let transporter = nodemailer.createTransport({
        host: "smtp.mail.yahoo.com",
        service: "yahoo",
        secure: false,
        auth: {
          user: process.env.GLOW_LABS_EMAIL,
          pass: process.env.GLOW_LABS_EMAIL_APP_PASSWORD,
        },
        debug: false,
        logger: true,
      });

      let employee = new Employee({
        _id: new mongoose.Types.ObjectId(),
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        password: password,
        phoneNumber: args.phoneNumber,
        employeeRole: args.employeeRole,
      });

      mjmlUtils
        .inject(`./emails/TemporaryPassword.html`, {
          firstName:
            employee.firstName[0].toUpperCase() +
            employee.firstName.slice(1).toLowerCase(),
          temporaryPassword: employee.password,
          adminLoginLink:
            process.env.NODE_ENV === "production"
              ? `${process.env.PRODUCTION_CLIENT_URL}/admin`
              : "http://localhost:3000/admin",
        })
        .then(async (finalTemplate) => {
          await transporter.sendMail({
            from: process.env.GLOW_LABS_EMAIL,
            to: employee.email,
            subject: "Glow Labs Temporary Password",
            html: finalTemplate,
          });
        });

      const newEmployeeRes = await employee.save();

      const decodedAdminID = jwt.decode(adminAccessToken).id.toString();

      const addingEmployee = await Employee.findOne({
        _id: decodedAdminID,
      });

      let newNotification = new Notification({
        _id: new mongoose.Types.ObjectId(),
        new: true,
        type: "addStaff",
        originalAssociatedStaffFirstName: args.firstName,
        originalAssociatedStaffLastName: args.lastName,
        createdByFirstName: addingEmployee.firstName,
        createdByLastName: addingEmployee.lastName,
        createdAt: Date.now(),
      });

      const updateNotifications = (staff) =>
        createNotificationFunction(newNotification, staff);

      (
        await Employee.find({
          employeeRole: "Admin",
          _id: { $ne: decodedAdminID },
        })
      ).forEach((currentEmployee) => {
        const notificationsObj = updateNotifications(currentEmployee);
        currentEmployee.notifications = notificationsObj.notifications;

        currentEmployee.save();
      });

      const updatedEmployee = await Employee.findOne(
        { _id: decodedAdminID },
        (err, currentEmployee) => {
          const notificationsObj = updateNotifications(currentEmployee);
          currentEmployee.notifications = notificationsObj.notifications;

          currentEmployee.save();
        }
      );

      const updatedEmployeeRes = await updatedEmployee.save();

      context.pubsub.publish(UPDATED_EMPLOYEE, {
        employee: updatedEmployeeRes,
      });

      return {
        ...newEmployeeRes,
        ...updatedEmployeeRes,
      };
    }
  },
};

module.exports = addEmployeeMutation;
