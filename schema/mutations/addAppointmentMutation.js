const graphql = require("graphql");
const mongoose = require("mongoose");
const AppointmentType = require("../types/AppointmentType");
const AddOnInput = require("../types/inputs/AddOnInput");
const ClientInput = require("../types/inputs/ClientInput");
const TreatmentInput = require("../types/inputs/TreatmentInput");
const Client = require("../../models/client");
const Appointment = require("../../models/appointment");
const moment = require("moment");
const {
  ICalendar,
  YahooCalendar,
  GoogleCalendar,
  OutlookCalendar,
} = require("datebook");
const mjmlUtils = require("mjml-utils");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const Notification = require("../../models/notification");
const createNotificationFunction = require("./notifications/createNotificationFunction");
const Employee = require("../../models/employee");

// Used to normalize phone numbers for use by Twilio
const phone = require("phone");

// Hide usernames and passwords
require("dotenv").config();

const { GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;

const UPDATED_EMPLOYEE = "getUpdatedEmployee";

const addAppointmentMutation = {
  type: AppointmentType,
  args: {
    date: { type: new GraphQLNonNull(GraphQLString) },
    startTime: { type: new GraphQLNonNull(GraphQLString) },
    morningOrEvening: { type: new GraphQLNonNull(GraphQLString) },
    endTime: { type: new GraphQLNonNull(GraphQLString) },
    duration: { type: new GraphQLNonNull(GraphQLInt) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    client: { type: new GraphQLList(ClientInput) },
    esthetician: { type: new GraphQLNonNull(GraphQLString) },
    treatments: { type: new GraphQLList(TreatmentInput) },
    addOns: { type: new GraphQLList(AddOnInput) },
    bookedWithCardSquareID: { type: GraphQLString },
    notes: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const foundClient = await Client.findOne({
      email: args.client[0].email,
      phoneNumber: args.client[0].phoneNumber,
    });

    let appt_res;

    const createEventObject = (appointment) => {
      const eventObject = {
        title: "Glow Labs Appointment",
        location: "1506 Broadway, Hewlett, NY 11557",
        description: appointment
          ? (appointment.treatments[0].name
              ? appointment.treatments[0].name === "ChemicalPeel"
                ? "Chemical Peel"
                : appointment.treatments[0].name
              : "") +
            (appointment.treatments[0].name.includes("Salt Cave")
              ? " Treatment"
              : " Facial") +
            (appointment.addOns[0]
              ? appointment.addOns[0].name
                ? ", " +
                  appointment.addOns
                    .map((x) =>
                      x.name === "ExtraExtractions"
                        ? "Extra Extractions Add On"
                        : x.name + " Add On"
                    )
                    .join(", ")
                : ""
              : "")
          : "",
        start: appointment
          ? moment(
              moment(appointment.date, "LL")
                .format("LLLL")
                .split(" ")
                .slice(
                  0,
                  moment(appointment.date, "LL").format("LLLL").split(" ")
                    .length - 2
                )
                .join(" ") +
                " " +
                appointment.startTime +
                " " +
                appointment.morningOrEvening,
              "LLLL"
            ).format()
          : "",
        end: appointment
          ? moment(
              moment(appointment.date, "LL")
                .format("LLLL")
                .split(" ")
                .slice(
                  0,
                  moment(appointment.date, "LL").format("LLLL").split(" ")
                    .length - 2
                )
                .join(" ") +
                " " +
                appointment.startTime +
                " " +
                appointment.morningOrEvening,
              "LLLL"
            )
              .add(appointment.duration, "minutes")
              .format()
          : "",
      };

      return eventObject;
    };

    const twilioTextingFunction = (clientObject, appointmentObject) => {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const client = require("twilio")(accountSid, authToken);

      // Format phone number for Twilio texting purposes
      const clientPhoneNumber = phone(clientObject.phoneNumber);

      client.messages
        .create({
          body:
            "Hi, " +
            clientObject.firstName[0].toUpperCase() +
            clientObject.firstName.slice(1).toLowerCase() +
            "! Your Glow Labs appointment has been scheduled for " +
            appointmentObject.startTime +
            " " +
            appointmentObject.morningOrEvening +
            " on " +
            moment(appointmentObject.date, "MMMM D, YYYY").format(
              "dddd, MMMM Do, YYYY"
            ) +
            ` at 1506 Broadway, Hewlett, NY 11557. Reply Y to confirm.\n\nIf you need to cancel or reschedule your appointment, please call us at (516) 442-8122 or visit ${
              process.env.NODE_ENV === "production"
                ? "https://is.gd/glow_labs"
                : "https://is.gd/glowlabs"
            }. We look forward to seeing you soon!`,
          from: process.env.GLOW_LABS_TEXT_NUMBER,
          to:
            process.env.NODE_ENV === "production"
              ? clientPhoneNumber[0]
              : process.env.TWILIO_TEST_TEXT_NUMBER,
        })
        .then((message) => console.log(message.sid))
        .catch((err) => console.log(err));
    };

    const auth = context.isAuth;
    const token = context.cookies["access-token"];

    const adminToken = context.cookies["admin-access-token"];

    let decodedAdminID = "";
    let currentSignedInEmployee = "";

    if (adminToken) {
      decodedAdminID = jwt.decode(adminToken).id.toString();

      currentSignedInEmployee = await Employee.findOne({
        _id: decodedAdminID,
      });
    }

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

    let appointment = new Appointment({
      _id: new mongoose.Types.ObjectId(),
      date: args.date,
      startTime: args.startTime,
      morningOrEvening: args.morningOrEvening,
      endTime: args.endTime,
      duration: args.duration,
      price: args.price,
      esthetician: args.esthetician,
      bookedWithCardSquareID: args.bookedWithCardSquareID,
      createdAt: args.createdAt,
      client: foundClient
        ? auth !== undefined && !adminToken
          ? {
              _id: jwt.decode(token).id,
              firstName: jwt.decode(token).firstName,
              lastName: jwt.decode(token).lastName,
              email: jwt.decode(token).email,
              phoneNumber: jwt.decode(token).phoneNumber,
            }
          : {
              _id: await Client.findOne({
                email: args.client[0].email,
              })._id,
              firstName: args.client[0].firstName,
              lastName: args.client[0].lastName,
              email: args.client[0].email,
              phoneNumber: args.client[0].phoneNumber,
            }
        : {
            _id: new mongoose.Types.ObjectId(),
            firstName: args.client[0].firstName,
            lastName: args.client[0].lastName,
            email: args.client[0].email,
            phoneNumber: args.client[0].phoneNumber,
          },
      treatments: args.treatments,
      addOns: args.addOns === [] ? null : args.addOns,
      notes: args.notes === "" ? null : args.notes,
      confirmed: false,
    });

    let client;

    let newNotification = new Notification({
      _id: new mongoose.Types.ObjectId(),
      new: true,
      type: "bookAppointment",
      date: args.date,
      time: args.startTime + " " + args.morningOrEvening,
      associatedClientFirstName: args.client[0].firstName,
      associatedClientLastName: args.client[0].lastName,
      originalAssociatedStaffFirstName: args.esthetician.split(" ")[0],
      originalAssociatedStaffLastName: args.esthetician.split(" ")[1],
      createdByFirstName: currentSignedInEmployee
        ? currentSignedInEmployee.firstName
        : args.client[0].firstName,
      createdByLastName: currentSignedInEmployee
        ? currentSignedInEmployee.lastName
        : args.client[0].lastName,
    });

    const updateNotifications = (staff) =>
      createNotificationFunction(newNotification, staff);

    if (!foundClient) {
      client = new Client({
        _id: new mongoose.Types.ObjectId(),
        firstName: args.client[0].firstName,
        lastName: args.client[0].lastName,
        email: args.client[0].email,
        phoneNumber: args.client[0].phoneNumber,
        squareCustomerId: args.client[0].squareCustomerId,
        unsavedSquareCardIDs: [args.client[0].unsavedSquareCardIDs],
      });

      const emailTaken = await Client.findOne({
        email: args.client[0].email,
      });
      const phoneNumberTaken = await Client.findOne({
        phoneNumber: args.client[0].phoneNumber,
      });

      if (!emailTaken || !phoneNumberTaken) {
        appt_res = await appointment.save();
        const client_res = await client.save();

        (
          await Employee.find({
            employeeRole: "Admin",
            firstName: {
              $ne: args.esthetician.split(" ")[0],
            },
            lastName: { $ne: args.esthetician.split(" ")[1] },
          })
        ).forEach((currentEmployee) => {
          const notificationsObj = updateNotifications(currentEmployee);
          currentEmployee.notifications = notificationsObj.notifications;

          currentEmployee.save();
        });

        const updatedEmployee = await Employee.findOne(
          {
            firstName: args.esthetician.split(" ")[0].trim(),
            lastName: args.esthetician.split(" ")[1].trim(),
          },
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

        const iCalEvent = new ICalendar(createEventObject(appt_res));
        const yahooCalendarEvent = new YahooCalendar(
          createEventObject(appt_res)
        );
        const googleCalendarEvent = new GoogleCalendar(
          createEventObject(appt_res)
        );
        const outlookCalendarEvent = new OutlookCalendar(
          createEventObject(appt_res)
        );

        mjmlUtils
          .inject(`./emails/BookedAppointment.html`, {
            firstName:
              client_res.firstName[0].toUpperCase() +
              client_res.firstName.slice(1).toLowerCase(),
            date: appt_res.date,
            day: moment(appt_res.date, "LL").format("dddd"),
            startTime: appt_res.startTime + " " + appt_res.morningOrEvening,
            treatment: appt_res.treatments[0].name.includes("Salt Cave")
              ? "Salt Cave"
              : appt_res.treatments[0].name === "ChemicalPeel"
              ? "Chemical Peel with " + appt_res.esthetician
              : appt_res.treatments[0].name +
                " Facial with " +
                appt_res.esthetician,
            eventCalendarLink: client_res.email
              .toLowerCase()
              .includes("yahoo.com")
              ? yahooCalendarEvent.render()
              : client_res.email.toLowerCase().includes("gmail.com")
              ? googleCalendarEvent.render()
              : client_res.email.toLowerCase().includes("hotmail.com") ||
                client_res.email.toLowerCase().includes("outlook.com")
              ? outlookCalendarEvent.render()
              : iCalEvent.render(),
            consentFormLink:
              process.env.NODE_ENV === "production"
                ? `${process.env.PRODUCTION_URL}/api/${client_res._id}/consentform`
                : `http://localhost:4000/api/${client_res._id}/consentform`,
          })
          .then(async (finalTemplate) => {
            await transporter.sendMail({
              from: process.env.GLOW_LABS_EMAIL,
              to: client_res.email,
              subject: "Your Glow Labs Appointment",
              html: finalTemplate,
            });
          });

        // Sends appointment confirmation text from Twilio
        twilioTextingFunction(client_res, appt_res);

        const generateGuestConsentFormAccessToken = (client_res) => {
          const token = jwt.sign(
            {
              id: client_res._id,
              auth: true,
            },
            process.env.JWT_SECRET_KEY_ACCESS,
            { expiresIn: "7d" }
          );
          return token;
        };

        const guestConsentFormAccessToken = generateGuestConsentFormAccessToken(
          client_res
        );

        if (!adminToken) {
          // Set Guest Consent Form Cookie
          context.res.cookie(
            "guest-consent-form-access-token",
            guestConsentFormAccessToken,
            {
              maxAge: 1000 * 60 * 60 * 24 * 7,
              secure: process.env.NODE_ENV === "production" ? true : false,
            }
          );
        }

        return {
          ...appt_res,
          ...client_res,
          ...updatedEmployeeRes,
          createdAt: appt_res.createdAt,
          client: {
            createdAt: client_res.createdAt,
            firstName: client_res.firstName,
            lastName: client_res.lastName,
            email: client_res.email,
            phoneNumber: client_res.phoneNumber,
            consentForm: client_res.consentForm,
            squareCustomerId: client_res.squareCustomerId,
          },
          date: appt_res.date,
          startTime: appt_res.startTime,
          morningOrEvening: appt_res.morningOrEvening,
          endTime: appt_res.endTime,
          duration: appt_res.duration,
          price: appt_res.price,
          treatments: appt_res.treatments,
          addOns: appt_res.addOns,
          bookedWithCardSquareID: appt_res.bookedWithCardSquareID,
          notes: appt_res.notes,
          confirmed: appt_res.confirmed,
        };
      }

      appt_res = await appointment.save();

      const iCalEvent = new ICalendar(createEventObject(appt_res));
      const yahooCalendarEvent = new YahooCalendar(createEventObject(appt_res));
      const googleCalendarEvent = new GoogleCalendar(
        createEventObject(appt_res)
      );
      const outlookCalendarEvent = new OutlookCalendar(
        createEventObject(appt_res)
      );

      mjmlUtils
        .inject(`./emails/BookedAppointment.html`, {
          firstName:
            args.client[0].firstName[0].toUpperCase() +
            args.client[0].firstName.slice(1).toLowerCase(),
          date: appt_res.date,
          day: moment(appt_res.date, "LL").format("dddd"),
          startTime: appt_res.startTime + " " + appt_res.morningOrEvening,
          treatment: appt_res.treatments[0].name.includes("Salt Cave")
            ? "Salt Cave"
            : appt_res.treatments[0].name === "ChemicalPeel"
            ? "Chemical Peel with " + appt_res.esthetician
            : appt_res.treatments[0].name +
              " Facial with " +
              appt_res.esthetician,
          eventCalendarLink: args.client[0].email
            .toLowerCase()
            .includes("yahoo.com")
            ? yahooCalendarEvent.render()
            : args.client[0].email.toLowerCase().includes("gmail.com")
            ? googleCalendarEvent.render()
            : args.client[0].email.toLowerCase().includes("hotmail.com") ||
              args.client[0].email.toLowerCase().includes("outlook.com")
            ? outlookCalendarEvent.render()
            : iCalEvent.render(),
          consentFormLink:
            process.env.NODE_ENV === "production"
              ? `${process.env.PRODUCTION_URL}/api/${client_res._id}/consentform`
              : `http://localhost:4000/${client_res._id}/consentform`,
        })
        .then(async (finalTemplate) => {
          await transporter.sendMail({
            from: process.env.GLOW_LABS_EMAIL,
            to: args.client[0].email,
            subject: "Your Glow Labs Appointment",
            html: finalTemplate,
          });
        });

      // Sends appointment confirmation text from Twilio
      twilioTextingFunction(args.client[0], appt_res);

      client = await Client.findOne({
        email: args.client[0].email,
      });

      const generateGuestConsentFormAccessToken = (client) => {
        const token = jwt.sign(
          {
            id: client._id,
            auth: true,
          },
          process.env.JWT_SECRET_KEY_ACCESS,
          { expiresIn: "7d" }
        );
        return token;
      };

      const guestConsentFormAccessToken = generateGuestConsentFormAccessToken(
        client
      );

      if (!adminToken) {
        // Set Guest Consent Form Cookie
        context.res.cookie(
          "guest-consent-form-access-token",
          guestConsentFormAccessToken,
          {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            secure: process.env.NODE_ENV === "production" ? true : false,
          }
        );
      }

      (
        await Employee.find({
          employeeRole: "Admin",
          firstName: {
            $ne: args.esthetician.split(" ")[0],
          },
          lastName: { $ne: args.esthetician.split(" ")[1] },
        })
      ).forEach((currentEmployee) => {
        const notificationsObj = updateNotifications(currentEmployee);
        currentEmployee.notifications = notificationsObj.notifications;

        currentEmployee.save();
      });

      const updatedEmployee = await Employee.findOne(
        {
          firstName: args.esthetician.split(" ")[0],
          lastName: args.esthetician.split(" ")[1],
        },
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
        ...appt_res,
        ...updatedEmployeeRes,
        ...client,
        createdAt: appt_res.createdAt,
        client: {
          createdAt: client.createdAt,
          firstName: client.firstName,
          lastName: client.lastName,
          email: client.email,
          phoneNumber: client.phoneNumber,
          consentForm: client.consentForm,
        },
        esthetician: appt_res.esthetician,
        date: appt_res.date,
        startTime: appt_res.startTime,
        morningOrEvening: appt_res.morningOrEvening,
        endTime: appt_res.endTime,
        duration: appt_res.duration,
        price: appt_res.price,
        treatments: appt_res.treatments,
        addOns: appt_res.addOns,
        bookedWithCardSquareID: appt_res.bookedWithCardSquareID,
        notes: appt_res.notes,
        confirmed: appt_res.confirmed,
      };
    }
    appt_res = await appointment.save();

    const iCalEvent = new ICalendar(createEventObject(appt_res));
    const yahooCalendarEvent = new YahooCalendar(createEventObject(appt_res));
    const googleCalendarEvent = new GoogleCalendar(createEventObject(appt_res));
    const outlookCalendarEvent = new OutlookCalendar(
      createEventObject(appt_res)
    );

    mjmlUtils
      .inject(`./emails/BookedAppointment.html`, {
        firstName:
          args.client[0].firstName[0].toUpperCase() +
          args.client[0].firstName.slice(1).toLowerCase(),
        date: appt_res.date,
        day: moment(appt_res.date, "LL").format("dddd"),
        startTime: appt_res.startTime + " " + appt_res.morningOrEvening,
        treatment: appt_res.treatments[0].name.includes("Salt Cave")
          ? "Salt Cave"
          : appt_res.treatments[0].name === "ChemicalPeel"
          ? "Chemical Peel with " + appt_res.esthetician
          : appt_res.treatments[0].name +
            " Facial with " +
            appt_res.esthetician,
        eventCalendarLink: args.client[0].email
          .toLowerCase()
          .includes("yahoo.com")
          ? yahooCalendarEvent.render()
          : args.client[0].email.toLowerCase().includes("gmail.com")
          ? googleCalendarEvent.render()
          : args.client[0].email.toLowerCase().includes("hotmail.com") ||
            args.client[0].email.toLowerCase().includes("outlook.com")
          ? outlookCalendarEvent.render()
          : iCalEvent.render(),
        consentFormLink:
          process.env.NODE_ENV === "production"
            ? `${process.env.PRODUCTION_URL}/api/${client_res._id}/consentform`
            : `http://localhost:4000/${client_res._id}/consentform`,
      })
      .then(async (finalTemplate) => {
        await transporter.sendMail({
          from: process.env.GLOW_LABS_EMAIL,
          to: args.client[0].email,
          subject: "Your Glow Labs Appointment",
          html: finalTemplate,
        });
      });

    // Sends appointment confirmation text from Twilio
    twilioTextingFunction(args.client[0], appt_res);

    client = await Client.findOne({
      email: args.client[0].email,
    });

    if (auth === undefined) {
      const generateGuestConsentFormAccessToken = (client) => {
        const token = jwt.sign(
          {
            id: client._id,
            auth: true,
          },
          process.env.JWT_SECRET_KEY_ACCESS,
          { expiresIn: "7d" }
        );
        return token;
      };

      const guestConsentFormAccessToken = generateGuestConsentFormAccessToken(
        client
      );

      if (!adminToken) {
        // Set Guest Consent Form Cookie
        context.res.cookie(
          "guest-consent-form-access-token",
          guestConsentFormAccessToken,
          {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            secure: process.env.NODE_ENV === "production" ? true : false,
          }
        );
      }
    }

    (
      await Employee.find({
        employeeRole: "Admin",
        firstName: {
          $ne: args.esthetician.split(" ")[0],
        },
        lastName: { $ne: args.esthetician.split(" ")[1] },
      })
    ).forEach((currentEmployee) => {
      const notificationsObj = updateNotifications(currentEmployee);
      currentEmployee.notifications = notificationsObj.notifications;

      currentEmployee.save();
    });

    const updatedEmployee = await Employee.findOne(
      {
        firstName: args.esthetician.split(" ")[0],
        lastName: args.esthetician.split(" ")[1],
      },
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
      ...appt_res,
      ...client,
      createdAt: appt_res.createdAt,
      esthetician: appt_res.esthetician,
      client: {
        createdAt: client.createdAt,
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        phoneNumber: client.phoneNumber,
        consentForm: client.consentForm,
      },
      date: appt_res.date,
      startTime: appt_res.startTime,
      morningOrEvening: appt_res.morningOrEvening,
      endTime: appt_res.endTime,
      duration: appt_res.duration,
      price: appt_res.price,
      treatments: appt_res.treatments,
      addOns: appt_res.addOns,
      bookedWithCardSquareID: appt_res.bookedWithCardSquareID,
      notes: appt_res.notes,
      confirmed: appt_res.confirmed,
    };
  },
};

module.exports = addAppointmentMutation;
