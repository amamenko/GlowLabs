const express = require("express");
const compression = require("compression");
const { graphqlHTTP } = require("express-graphql");
const expressPlayground = require("graphql-playground-middleware-express")
  .default;
const { ApolloServer } = require("apollo-server-express");
const { PubSub } = require("apollo-server");
const { GooglePubSub } = require("@axelspringer/graphql-google-pubsub");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Appointment = require("./models/appointment");
const Client = require("./models/client");
const Employee = require("./models/employee");
const Notification = require("./models/notification");
const createNotificationFunction = require("./schema/mutations/notifications/createNotificationFunction");
const jwt = require("jsonwebtoken");
const createTokens = require("./createTokens");
const createAdminTokens = require("./createAdminTokens");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const parseUrl = require("parseurl");
const getMainImage = require("./getMainImage");
const cron = require("node-cron");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const http = require("http");
const { ApiError, Environment } = require("square");
const SquareClient = require("square").Client;

// Used to normalize phone numbers for use by Twilio
const phone = require("phone");

// Fix Puppeteer memory leak issue
process.setMaxListeners(Infinity);

// Hide usernames and passwords
require("dotenv").config();

const app = express();

app.use(cookieParser());

// Compress all responses
app.use(compression());

// Prevent request entity too large errors
app.use(express.json({ limit: "50mb" }));

// Cross-Origin Requests
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.PRODUCTION_CLIENT_URL
        : "http://localhost:3000",
    credentials: true,
  })
);

const port = process.env.PORT || 4000;

// Allow 200 responses, but not 304 not modified
app.disable("etag");

app.post("/api/customers", (req, res) => {
  res.setHeader(
    "Authorization",
    `Bearer ${process.env.SQUARE_SANDBOX_ACCESS_TOKEN}`
  );

  const requestParams = req.body;

  const client = new SquareClient({
    environment: Environment.Sandbox,
    accessToken: process.env.SQUARE_SANDBOX_ACCESS_TOKEN,
  });

  const { customersApi } = client;

  const idempotencyKey = uuidv4();

  const createCustomer = async () => {
    const requestBody = {
      idempotencyKey: idempotencyKey,
      givenName: requestParams.given_name,
      familyName: requestParams.family_name,
      emailAddress: requestParams.email_address,
      phoneNumber: requestParams.phone_number,
    };

    try {
      let { result } = await customersApi.createCustomer(requestBody);
      console.log(
        "API called successfully. Customer created successfully Returned data: " +
          result
      );
      res.send(result);
    } catch (error) {
      if (error instanceof ApiError) {
        console.log("Errors: ", error.errors);
        res.send(error.errors);
      } else {
        console.log("Unexpected Error: ", res.send(error));
      }
    }
  };

  createCustomer();
});

app.get("/smsresponse", async (req, res) => {
  const twiml = new MessagingResponse();

  const allApps = await Appointment.find({});
  const clientApps = allApps.filter(
    (appointment) => phone(appointment.client.phoneNumber)[0] === req.query.From
  );

  const upcomingClientApps = clientApps.filter((appointment) => {
    const date = moment(
      appointment.date +
        " " +
        appointment.startTime +
        " " +
        appointment.morningOrEvening,
      "MMMM D, YYYY h:mm A"
    );
    const now = moment();

    // Show upcoming unconfirmed appointments
    return date > now && !appointment.confirmed;
  });

  if (
    req.query.Body === "Y" ||
    req.query.Body === "y" ||
    req.query.Body === "Yes" ||
    req.query.Body === "YES" ||
    req.query.Body === "yes"
  ) {
    upcomingClientApps.forEach(async (item) => {
      let filter = {
        _id: item._id,
      };

      const update = {
        confirmed: true,
      };

      if (!item.confirmed) {
        const appointment = await Appointment.findOneAndUpdate(filter, update, {
          new: true,
        });

        const newNotification = new Notification({
          _id: new mongoose.Types.ObjectId(),
          new: true,
          type: "confirmAppointment",
          date: item.date,
          time: item.startTime + " " + item.morningOrEvening,
          associatedClientFirstName: item.client.firstName,
          associatedClientLastName: item.client.lastName,
          originalAssociatedStaffFirstName: item.esthetician.split(" ")[0],
          originalAssociatedStaffLastName: item.esthetician.split(" ")[1],
          createdByFirstName: item.client.firstName,
          createdByLastName: item.client.lastName,
          createdAt: Date.now(),
        });

        const updateNotifications = (staff) =>
          createNotificationFunction(newNotification, staff);

        (
          await Employee.find({
            employeeRole: "Admin",
            firstName: {
              $ne: item.esthetician.split(" ")[0],
            },
            lastName: { $ne: item.esthetician.split(" ")[1] },
          })
        ).forEach((currentEmployee) => {
          const notificationsObj = updateNotifications(currentEmployee);
          currentEmployee.notifications = notificationsObj.notifications;

          currentEmployee.save();
        });

        const updatedEmployee = await Employee.findOne(
          {
            firstName: item.esthetician.split(" ")[0],
            lastName: item.esthetician.split(" ")[1],
          },
          (err, currentEmployee) => {
            const notificationsObj = updateNotifications(currentEmployee);
            currentEmployee.notifications = notificationsObj.notifications;

            currentEmployee.save();
          }
        );

        updatedEmployee.save();
        appointment.save();
      }
    });

    if (upcomingClientApps.length === 1) {
      twiml.message("Thank you, your appointment has been confirmed!");
    } else if (upcomingClientApps.length > 1) {
      twiml.message("Thank you, your appointments have been confirmed!");
    } else {
      return null;
    }
  } else {
    return null;
  }

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

// Schedule Twilio text appointment reminders
cron.schedule("* * * * *", async () => {
  const allApps = await Appointment.find({});
  const allAppsArr = allApps.map((appointment) => {
    return {
      id: appointment._id,
      client: appointment.client,
      startTime: appointment.startTime + " " + appointment.morningOrEvening,
      appointmentDate: appointment.date,
      dayPrior: moment(
        appointment.date +
          " " +
          appointment.startTime +
          " " +
          appointment.morningOrEvening,
        "MMMM D, YYYY h:mm A"
      )
        .subtract(1, "days")
        .format("MMMM D, YYYY h:mm A"),
      hourPrior: moment(
        appointment.date +
          " " +
          appointment.startTime +
          " " +
          appointment.morningOrEvening,
        "MMMM D, YYYY h:mm A"
      )
        .subtract(1, "hours")
        .format("MMMM D, YYYY h:mm A"),
      confirmed: appointment.confirmed,
    };
  });

  const currentDate = moment().format("MMMM D, YYYY h:mm A");

  const dayPriorMatchArr = allAppsArr.filter((x) => x.dayPrior === currentDate);
  const hourPriorMatchArr = allAppsArr.filter(
    (x) => x.hourPrior === currentDate
  );

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  if (dayPriorMatchArr.length > 0) {
    dayPriorMatchArr.forEach((appointment) => {
      // Format phone number for Twilio texting purposes
      const clientPhoneNumber = phone(appointment.client.phoneNumber);

      client.messages
        .create({
          body:
            "Hi, " +
            appointment.client.firstName[0].toUpperCase() +
            appointment.client.firstName.slice(1).toLowerCase() +
            "! This is a reminder for your Glow Labs appointment tomorrow, " +
            moment(appointment.appointmentDate, "MMMM D, YYYY").format(
              "dddd, MMMM Do, YYYY"
            ) +
            " at " +
            appointment.startTime +
            ". " +
            (!appointment.confirmed ? "Reply Y to confirm." : "See you then!"),
          from: process.env.GLOW_LABS_TEXT_NUMBER,
          to:
            process.env.NODE_ENV === "production"
              ? clientPhoneNumber[0]
              : process.env.TWILIO_TEST_TEXT_NUMBER,
        })
        .then((message) => console.log(message.sid))
        .catch((err) => console.log(err));
    });
  } else if (hourPriorMatchArr.length > 0) {
    hourPriorMatchArr.forEach((appointment) => {
      // Format phone number for Twilio texting purposes
      const clientPhoneNumber = phone(appointment.client.phoneNumber);

      client.messages
        .create({
          body:
            "Hi, " +
            appointment.client.firstName[0].toUpperCase() +
            appointment.client.firstName.slice(1).toLowerCase() +
            "! We look forward to seeing you at your Glow Labs appointment today at " +
            appointment.startTime +
            ". " +
            (!appointment.confirmed
              ? "Reply Y to confirm."
              : "Have a great day!"),
          from: process.env.GLOW_LABS_TEXT_NUMBER,
          to:
            process.env.NODE_ENV === "production"
              ? clientPhoneNumber[0]
              : process.env.TWILIO_TEST_TEXT_NUMBER,
        })
        .then((message) => console.log(message.sid))
        .catch((err) => console.log(err));
    });
  } else {
    return null;
  }
});

app.post("/api/customers/card", (req, res) => {
  res.setHeader(
    "Authorization",
    `Bearer ${process.env.SQUARE_SANDBOX_ACCESS_TOKEN}`
  );
  const requestParams = req.body;

  const client = new SquareClient({
    environment: Environment.Sandbox,
    accessToken: process.env.SQUARE_SANDBOX_ACCESS_TOKEN,
  });

  const { customersApi } = client;

  const idempotencyKey = uuidv4();

  const customerId = requestParams.customerId;

  const createCard = async () => {
    const requestBody = {
      idempotencyKey: idempotencyKey,
      cardNonce: requestParams.card_nonce,
      billingAddress: requestParams.billing_address,
      cardholderName: requestParams.cardholder_name,
      verificationToken: requestParams.verification_token,
    };

    try {
      let { result } = await customersApi.createCustomerCard(
        customerId,
        requestBody
      );
      console.log(
        "API called successfully. Customer card created successfully. Returned data: " +
          result
      );
      res.send(result);
    } catch (error) {
      if (error instanceof ApiError) {
        console.log("Errors: ", error.errors);
        res.send({ error: error.errors });
      } else {
        console.log("Unexpected Error: ", res.send(error));
      }
    }
  };

  createCard();
});

app.post("/api/customers/delete_card", (req, res) => {
  res.setHeader(
    "Authorization",
    `Bearer ${process.env.SQUARE_SANDBOX_ACCESS_TOKEN}`
  );
  const requestParams = req.body;

  const client = new SquareClient({
    environment: Environment.Sandbox,
    accessToken: process.env.SQUARE_SANDBOX_ACCESS_TOKEN,
  });

  const { customersApi } = client;

  const customerId = requestParams.customerId;
  const cardId = requestParams.cardId;

  const deleteCard = async () => {
    try {
      let { result } = await customersApi.deleteCustomerCard(
        customerId,
        cardId
      );
      console.log("API called successfully. Returned data: " + result);
      res.send(result);
    } catch (error) {
      if (error instanceof ApiError) {
        console.log("Errors: ", error.errors);
        res.send(error.errors);
      } else {
        console.log("Unexpected Error: ", res.send(error));
      }
    }
  };

  deleteCard();
});

app.post("/api/retrieve_customer", (req, res) => {
  res.setHeader(
    "Authorization",
    `Bearer ${process.env.SQUARE_SANDBOX_ACCESS_TOKEN}`
  );

  const requestParams = req.body;

  const client = new SquareClient({
    environment: Environment.Sandbox,
    accessToken: process.env.SQUARE_SANDBOX_ACCESS_TOKEN,
  });

  const { customersApi } = client;

  const customerId = requestParams.data.squareCustomerId;

  const getCustomer = async () => {
    try {
      let { result } = await customersApi.retrieveCustomer(customerId);
      console.log("API called successfully. Returned data: " + result);
      res.send(result);
    } catch (error) {
      if (error instanceof ApiError) {
        console.log("Errors: ", error.errors);
        res.send(error.errors);
      } else {
        console.log("Unexpected Error: ", res.send(error));
      }
    }
  };

  getCustomer();
});

app.post("/api/delete_customer", (req, res) => {
  res.setHeader(
    "Authorization",
    `Bearer ${process.env.SQUARE_SANDBOX_ACCESS_TOKEN}`
  );
  const requestParams = req.body;

  const client = new SquareClient({
    environment: Environment.Sandbox,
    accessToken: process.env.SQUARE_SANDBOX_ACCESS_TOKEN,
  });

  const { customersApi } = client;

  const customerId = requestParams.data.squareCustomerId;

  const removeCustomer = async () => {
    try {
      let { result } = await customersApi.deleteCustomer(customerId);
      console.log("API called successfully. Returned data: " + result);
      res.send(result);
    } catch (error) {
      if (error instanceof ApiError) {
        console.log("Errors: ", error.errors);
        res.send(error.errors);
      } else {
        console.log("Unexpected Error: ", res.send(error));
      }
    }
  };

  removeCustomer();
});

app.use(async (req, res, next) => {
  let requestURL = req.originalUrl;
  let parsedURL = parseUrl(req).pathname;

  let urlArr = requestURL.split("");
  urlArr.splice(0, 1);
  let shortenedURL = urlArr.join("");

  let pathName = req.path.slice(1);

  let closingIndex;

  if (pathName.includes("https://")) {
    let url = pathName.slice(9);
    closingIndex = url.indexOf("/") + 10;
  } else if (pathName.includes("http://")) {
    let url = pathName.slice(8);
    closingIndex = url.indexOf("/") + 9;
  }

  const baseURL = req.path.slice(1, closingIndex);

  if (
    req.path.split("http://").length > 1 ||
    req.path.split("http://").join("").split("https://").length > 1
  ) {
    if (res.statusCode === 200) {
      let mainImage = await getMainImage(parsedURL, shortenedURL, baseURL)
        .then((data) => {
          return data;
        })
        .catch((err) => console.log(err));

      res.status(200).send({
        url: shortenedURL,
        image: mainImage,
      });
    } else {
      app.get(req.url, async (req, res) => {
        if (res.statusCode === 301) {
          let mainImage = await getMainImage(
            parsedURL,
            shortenedURL,
            baseURL
          ).then((data) => {
            return data;
          });

          return res.status(301).send({ url: shortenedURL, image: mainImage });
        } else if (res.statusCode === 302) {
          let mainImage = await getMainImage(
            parsedURL,
            shortenedURL,
            baseURL
          ).then((data) => {
            return data;
          });

          return res.status(302).send({ url: shortenedURL, image: mainImage });
        } else if (res.statusCode === 304) {
          let mainImage = await getMainImage(
            parsedURL,
            shortenedURL,
            baseURL
          ).then((data) => {
            return data;
          });

          return res.status(304).send({ url: shortenedURL, image: mainImage });
        }
      });
    }
    return next();
  }

  return next();
});

const googlePubSubOptions = {
  projectId: process.env.GOOGLE_PUB_SUB_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_PUB_SUB_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PUB_SUB_PRIVATE_KEY.replace(
      new RegExp("\\\\n", "g"),
      "\n"
    ),
  },
};

const pubsub =
  process.env.NODE_ENV === "production"
    ? new GooglePubSub(googlePubSubOptions)
    : new PubSub();

const server = new ApolloServer({
  schema,
  context: async ({ req, res }) => {
    return {
      req,
      res,
      pubsub,
    };
  },
  playground: process.env.NODE_ENV === "production" ? false : true,
});

passport.use(
  new FacebookStrategy(
    {
      clientID: `${process.env.FACEBOOK_APP_ID}`,
      clientSecret: `${process.env.FACEBOOK_APP_SECRET}`,
      callbackURL:
        process.env.NODE_ENV === "production"
          ? `${process.env.PRODUCTION_SERVER_URL}/api/auth/facebook/callback`
          : `http://localhost:${port}/api/auth/facebook/callback`,
      profileFields: [
        "emails",
        "first_name",
        "last_name",
        "picture.type(small)",
      ],
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      if (accessToken) {
        req.isAuth = true;
        req.facebookAccessToken = accessToken;
        req.facebookProfile = profile._json;
      } else {
        req.isAuth = false;
      }
      return done();
    }
  )
);

app.get(
  "/api/auth/facebook",
  passport.authenticate("facebook", {
    authType: "rerequest",
    scope: ["email"],
  })
);

// Set guest consent form cookie upon accessing link from appointment email
app.get("/api/:id/consentform", async (req, res) => {
  const accessToken = req.cookies["access-token"];
  const refreshToken = req.cookies["refresh-token"];
  const dummyToken = req.cookies["dummy-token"];

  const client = await Client.findOne({ _id: req.params.id });

  if (client) {
    const generateGuestConsentFormAccessToken = (client) => {
      const token = jwt.sign(
        {
          id: req.params.id,
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

    if (!accessToken && !refreshToken && !dummyToken) {
      // Set Guest Consent Form Cookie
      res.cookie(
        "guest-consent-form-access-token",
        guestConsentFormAccessToken,
        {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          secure: process.env.NODE_ENV === "production" ? true : false,
          domain:
            process.env.NODE_ENV === "production"
              ? process.env.PRODUCTION_CLIENT_ROOT
              : "localhost",
        }
      );
    }

    res.redirect(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_CLIENT_URL
          : "http://localhost:3000"
      }/account/clientprofile/consentform/page1`
    );
  }
});

app.get("/api/auth/facebook/callback", (req, res, next) => {
  passport.authenticate("facebook", async (err, user, info) => {
    if (err) {
      return next(err);
    }

    let client;

    client = await Client.findOne({ email: req.facebookProfile.email });

    if (!client) {
      client = await Client.create({
        _id: new mongoose.mongo.ObjectID(),
        email: req.facebookProfile.email,
        firstName: req.facebookProfile.first_name,
        lastName: req.facebookProfile.last_name,
      });
    }

    const generateDummyToken = (client) => {
      const token = jwt.sign(
        {
          id: client._id,
          picture: req.facebookProfile.picture.data.url,
          auth: true,
        },
        process.env.JWT_SECRET_KEY_DUMMY,
        { expiresIn: "60d" }
      );
      return token;
    };

    const generateAccessToken = (client) => {
      const token = jwt.sign(
        {
          id: client._id,
          email: client.email,
          phoneNumber: client.phoneNumber,
          firstName: client.firstName,
          lastName: client.lastName,
          tokenCount: client.tokenCount,
        },
        process.env.JWT_SECRET_KEY_ACCESS,
        { expiresIn: "60d" }
      );
      return token;
    };

    const accessToken = generateAccessToken(client);
    const dummyToken = generateDummyToken(client);

    if (client) {
      req.isAuth = true;
      if (client.phoneNumber) {
        res.clearCookie("temporary-facebook-access-token", {
          domain:
            process.env.NODE_ENV === "production"
              ? process.env.PRODUCTION_CLIENT_ROOT
              : "localhost",
        });
        res.clearCookie("temporary-facebook-dummy-token", {
          domain:
            process.env.NODE_ENV === "production"
              ? process.env.PRODUCTION_CLIENT_ROOT
              : "localhost",
        });

        res.cookie("access-token", accessToken, {
          maxAge: 1000 * 60 * 60 * 24 * 60,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production" ? true : false,
          domain:
            process.env.NODE_ENV === "production"
              ? process.env.PRODUCTION_CLIENT_ROOT
              : "localhost",
        });

        res.cookie("dummy-token", dummyToken, {
          maxAge: 1000 * 60 * 60 * 24 * 60,
          httpOnly: false,
          secure: process.env.NODE_ENV === "production" ? true : false,
          domain:
            process.env.NODE_ENV === "production"
              ? process.env.PRODUCTION_CLIENT_ROOT
              : "localhost",
        });
      } else {
        res.cookie("temporary-facebook-access-token", accessToken, {
          maxAge: 1000 * 60 * 15,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production" ? true : false,
          domain:
            process.env.NODE_ENV === "production"
              ? process.env.PRODUCTION_CLIENT_ROOT
              : "localhost",
        });

        res.cookie("temporary-facebook-dummy-token", dummyToken, {
          maxAge: 1000 * 60 * 15,
          httpOnly: false,
          secure: process.env.NODE_ENV === "production" ? true : false,
          domain:
            process.env.NODE_ENV === "production"
              ? process.env.PRODUCTION_CLIENT_ROOT
              : "localhost",
        });
      }

      res.redirect(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_CLIENT_URL
            : "http://localhost:3000"
        }/account/clientprofile`
      );
    } else {
      req.isAuth = false;
      res.redirect(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_CLIENT_URL
            : "http://localhost:3000"
        }/account/login`
      );
    }
  })(req, res, next);
});

// Connect to MongoDB with Mongoose
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@glowlabs-qo7rk.mongodb.net/test?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

// Refresh logged-in client's tokens
app.use(async (req, res, next) => {
  const refreshToken = req.cookies["refresh-token"];
  const logoutCookie = req.cookies.logout;

  const generateDummyToken = (client) => {
    const token = jwt.sign(
      {
        id: client._id,
        auth: true,
      },
      process.env.JWT_SECRET_KEY_DUMMY,
      { expiresIn: "7d" }
    );
    return token;
  };

  if (refreshToken) {
    if (logoutCookie === undefined) {
      const refreshClient = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET_KEY_REFRESH
      );

      const client = await Client.findOne({ email: refreshClient.email });

      const tokens = createTokens(client);
      res.clearCookie("access-token", {
        domain:
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_CLIENT_ROOT
            : "localhost",
      });
      res.clearCookie("refresh-token", {
        domain:
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_CLIENT_ROOT
            : "localhost",
      });
      res.clearCookie("dummy-token", {
        domain:
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_CLIENT_ROOT
            : "localhost",
      });

      const dummyToken = generateDummyToken(client);
      res.cookie("dummy-token", dummyToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === "production" ? true : false,
        domain:
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_CLIENT_ROOT
            : "localhost",
      });

      res.cookie("access-token", tokens.accessToken, {
        maxAge: 1000 * 60 * 15,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        domain:
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_CLIENT_ROOT
            : "localhost",
      });

      res.cookie("refresh-token", tokens.refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        domain:
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_CLIENT_ROOT
            : "localhost",
      });
    }
  }
  return next();
});

// Refresh logged-in employee's tokens
app.use(async (req, res, next) => {
  const adminRefreshToken = req.cookies["admin-refresh-token"];
  const logoutCookie = req.cookies.logout;

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

  if (adminRefreshToken) {
    if (logoutCookie === undefined) {
      const refreshAdmin = jwt.verify(
        adminRefreshToken,
        process.env.JWT_SECRET_KEY_REFRESH
      );

      const employee = await Employee.findOne({
        email: refreshAdmin.email,
      });

      const tokens = createAdminTokens(employee);
      res.clearCookie("admin-access-token", {
        domain:
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_CLIENT_ROOT
            : "localhost",
      });
      res.clearCookie("admin-refresh-token", {
        domain:
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_CLIENT_ROOT
            : "localhost",
      });
      res.clearCookie("admin-dummy-token", {
        domain:
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_CLIENT_ROOT
            : "localhost",
      });

      const dummyToken = generateAdminDummyToken(employee);
      res.cookie("admin-dummy-token", dummyToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === "production" ? true : false,
        domain:
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_CLIENT_ROOT
            : "localhost",
      });

      res.cookie("admin-access-token", tokens.accessToken, {
        maxAge: 1000 * 60 * 15,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        domain:
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_CLIENT_ROOT
            : "localhost",
      });

      res.cookie("admin-refresh-token", tokens.refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        domain:
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_CLIENT_ROOT
            : "localhost",
      });
    }
  }
  return next();
});

// Set pubsub as universal context
app.use((req, res, next) => {
  req.pubsub = pubsub;
  return next();
});

// Handle client authentication
app.use(async (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  const refreshToken = req.cookies["refresh-token"];
  const dummyToken = req.cookies["dummy-token"];
  const temporaryFacebookAccessToken =
    req.cookies["temporary-facebook-access-token"];
  const temporaryFacebookDummyToken =
    req.cookies["temporary-facebook-dummy-token"];
  const logoutCookie = req.cookies.logout;

  if (logoutCookie) {
    res.clearCookie("access-token", {
      domain:
        process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_CLIENT_ROOT
          : "localhost",
    });
    res.clearCookie("refresh-token", {
      domain:
        process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_CLIENT_ROOT
          : "localhost",
    });
    res.clearCookie("dummy-token", {
      domain:
        process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_CLIENT_ROOT
          : "localhost",
    });
    res.clearCookie("logout", {
      domain:
        process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_CLIENT_ROOT
          : "localhost",
    });
  }

  const generateDummyToken = (client) => {
    const token = jwt.sign(
      {
        id: client.id,
        auth: true,
      },
      process.env.JWT_SECRET_KEY_DUMMY,
      { expiresIn: "7d" }
    );
    return token;
  };

  if (!accessToken && !refreshToken && !temporaryFacebookAccessToken) {
    // No tokens in cookies
    req.isAuth = false;
    if (dummyToken) {
      res.clearCookie("dummy-token", {
        domain:
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_CLIENT_ROOT
            : "localhost",
      });
    }
    return next();
  } else {
    try {
      // Check validity/existence of access token
      // If valid access token, no need to check refresh token => USER AUTHENTICATED
      const accessClient = jwt.verify(
        accessToken,
        process.env.JWT_SECRET_KEY_ACCESS
      );
      req.isAuth = true;
      if (!dummyToken) {
        const dummyToken = generateDummyToken(accessClient);
        res.cookie("dummy-token", dummyToken, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          secure: process.env.NODE_ENV === "production" ? true : false,
          domain:
            process.env.NODE_ENV === "production"
              ? process.env.PRODUCTION_CLIENT_ROOT
              : "localhost",
        });
      }
      req.id = accessClient.id;
      return next();
    } catch {}

    // User does not have a valid access token / no access token => check refresh token
    if (!refreshToken) {
      // User does not have a refresh token and no temporary access token => UNAUTHENTICATED
      if (temporaryFacebookAccessToken) {
        req.isAuth = true;
        const client = await Client.findOne({
          _id: jwt.decode(temporaryFacebookAccessToken).id,
        });

        if (client.phoneNumber) {
          const generateFacebookDummyToken = (client) => {
            const token = jwt.sign(
              {
                id: client._id,
                picture: jwt.decode(temporaryFacebookDummyToken).picture,
                auth: true,
              },
              process.env.JWT_SECRET_KEY_DUMMY,
              { expiresIn: "60d" }
            );
            return token;
          };

          const generateFacebookAccessToken = (client) => {
            const token = jwt.sign(
              {
                id: client._id,
                email: client.email,
                phoneNumber: client.phoneNumber,
                firstName: client.firstName,
                lastName: client.lastName,
                tokenCount: client.tokenCount,
              },
              process.env.JWT_SECRET_KEY_ACCESS,
              { expiresIn: "60d" }
            );
            return token;
          };

          const accessToken = generateFacebookAccessToken(client);
          const dummyToken = generateFacebookDummyToken(client);

          res.clearCookie("temporary-facebook-access-token", {
            domain:
              process.env.NODE_ENV === "production"
                ? process.env.PRODUCTION_CLIENT_ROOT
                : "localhost",
          });
          res.clearCookie("temporary-facebook-dummy-token", {
            domain:
              process.env.NODE_ENV === "production"
                ? process.env.PRODUCTION_CLIENT_ROOT
                : "localhost",
          });

          res.cookie("access-token", accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 60,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            domain:
              process.env.NODE_ENV === "production"
                ? process.env.PRODUCTION_CLIENT_ROOT
                : "localhost",
          });

          res.cookie("dummy-token", dummyToken, {
            maxAge: 1000 * 60 * 60 * 24 * 60,
            httpOnly: false,
            secure: process.env.NODE_ENV === "production" ? true : false,
            domain:
              process.env.NODE_ENV === "production"
                ? process.env.PRODUCTION_CLIENT_ROOT
                : "localhost",
          });
        }
      } else {
        req.isAuth = false;
        if (dummyToken) {
          res.clearCookie("dummy-token", {
            domain:
              process.env.NODE_ENV === "production"
                ? process.env.PRODUCTION_CLIENT_ROOT
                : "localhost",
          });
        }
        if (temporaryFacebookDummyToken) {
          res.clearCookie("temporary-facebook-dummy-token", {
            domain:
              process.env.NODE_ENV === "production"
                ? process.env.PRODUCTION_CLIENT_ROOT
                : "localhost",
          });
        }
      }
      return next();
    }

    let refreshClient;

    // Check validity of refresh token
    try {
      refreshClient = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET_KEY_REFRESH
      );
    } catch {
      // Refresh token is invalid
      req.isAuth = false;
      if (dummyToken) {
        res.clearCookie("dummy-token", {
          domain:
            process.env.NODE_ENV === "production"
              ? process.env.PRODUCTION_CLIENT_ROOT
              : "localhost",
        });
      }
      return next();
    }

    const client = await Client.findOne({ _id: refreshClient.id });

    // Refresh token is expired / not valid
    if (!client || client.tokenCount !== refreshClient.tokenCount) {
      req.isAuth = false;
      if (dummyToken) {
        res.clearCookie("dummy-token", {
          domain:
            process.env.NODE_ENV === "production"
              ? process.env.PRODUCTION_CLIENT_ROOT
              : "localhost",
        });
      }
      return next();
    }

    // Refresh token is valid => USER AUTHENTICATED and gets new refresh / access tokens
    req.isAuth = true;
    if (dummyToken) {
      res.clearCookie("dummy-token", {
        domain:
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_CLIENT_ROOT
            : "localhost",
      });
      const dummyToken = generateDummyToken(refreshClient);
      res.cookie("dummy-token", dummyToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === "production" ? true : false,
        domain:
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_CLIENT_ROOT
            : "localhost",
      });
    }

    const tokens = createTokens(client);

    res.cookie("access-token", tokens.accessToken, {
      maxAge: 1000 * 60 * 15,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      domain:
        process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_CLIENT_ROOT
          : "localhost",
    });
    res.cookie("refresh-token", tokens.refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      domain:
        process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_CLIENT_ROOT
          : "localhost",
    });
    req.id = client.id;
    return next();
  }
});

// Handle employee authentication
app.use(async (req, res, next) => {
  const accessToken = req.cookies["admin-access-token"];
  const refreshToken = req.cookies["admin-refresh-token"];
  const dummyToken = req.cookies["admin-dummy-token"];
  const temporaryAdminAccessToken = req.cookies["temporary-admin-access-token"];
  const temporaryAdminDummyToken = req.cookies["temporary-admin-dummy-token"];
  const logoutCookie = req.cookies.logout;

  if (logoutCookie) {
    res.clearCookie("admin-access-token", {
      domain:
        process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_CLIENT_ROOT
          : "localhost",
    });
    res.clearCookie("admin-refresh-token", {
      domain:
        process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_CLIENT_ROOT
          : "localhost",
    });
    res.clearCookie("admin-dummy-token", {
      domain:
        process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_CLIENT_ROOT
          : "localhost",
    });
    res.clearCookie("logout", {
      domain:
        process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_CLIENT_ROOT
          : "localhost",
    });
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

  if (!accessToken && !refreshToken && !temporaryAdminAccessToken) {
    // No employee tokens in cookies
    req.adminAuth = false;
    if (dummyToken) {
      res.clearCookie("admin-dummy-token", {
        domain:
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_CLIENT_ROOT
            : "localhost",
      });
    }
    return next();
  } else {
    try {
      // Check validity/existence of access token
      // If valid access token, no need to check refresh token => USER AUTHENTICATED
      const accessEmployee = jwt.verify(
        accessToken,
        process.env.JWT_SECRET_KEY_ACCESS
      );

      req.adminAuth = true;

      if (!dummyToken) {
        const dummyToken = generateAdminDummyToken(accessEmployee);
        res.cookie("admin-dummy-token", dummyToken, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          secure: process.env.NODE_ENV === "production" ? true : false,
          domain:
            process.env.NODE_ENV === "production"
              ? process.env.PRODUCTION_CLIENT_ROOT
              : "localhost",
        });
      }

      req.id = accessEmployee.id;
      return next();
    } catch {}

    // User does not have a valid access token / no access token => check refresh token
    if (!refreshToken) {
      // User does not have a refresh token and no temporary access token => UNAUTHENTICATED
      if (temporaryAdminAccessToken) {
        req.adminAuth = true;
        const employee = await Employee.findOne({
          _id: jwt.decode(temporaryAdminAccessToken).id,
        });

        if (employee.permanentPasswordSet) {
          const tokens = createAdminTokens(employee);
          res.clearCookie("temporary-admin-access-token", {
            domain:
              process.env.NODE_ENV === "production"
                ? process.env.PRODUCTION_CLIENT_ROOT
                : "localhost",
          });
          res.clearCookie("temporary-admin-dummy-token", {
            domain:
              process.env.NODE_ENV === "production"
                ? process.env.PRODUCTION_CLIENT_ROOT
                : "localhost",
          });

          const dummyToken = generateAdminDummyToken(employee);
          res.cookie("admin-dummy-token", dummyToken, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            secure: process.env.NODE_ENV === "production" ? true : false,
            domain:
              process.env.NODE_ENV === "production"
                ? process.env.PRODUCTION_CLIENT_ROOT
                : "localhost",
          });

          res.cookie("admin-access-token", tokens.accessToken, {
            maxAge: 1000 * 60 * 15,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            domain:
              process.env.NODE_ENV === "production"
                ? process.env.PRODUCTION_CLIENT_ROOT
                : "localhost",
          });

          res.cookie("admin-refresh-token", tokens.refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            domain:
              process.env.NODE_ENV === "production"
                ? process.env.PRODUCTION_CLIENT_ROOT
                : "localhost",
          });
        }
      } else {
        req.adminAuth = false;
        if (dummyToken) {
          res.clearCookie("admin-dummy-token", {
            domain:
              process.env.NODE_ENV === "production"
                ? process.env.PRODUCTION_CLIENT_ROOT
                : "localhost",
          });
        }
        if (temporaryAdminDummyToken) {
          res.clearCookie("temporary-admin-dummy-token", {
            domain:
              process.env.NODE_ENV === "production"
                ? process.env.PRODUCTION_CLIENT_ROOT
                : "localhost",
          });
        }
      }
      return next();
    }

    let refreshAdmin;

    // Check validity of refresh token
    try {
      refreshAdmin = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET_KEY_REFRESH
      );
    } catch {
      // Refresh token is invalid
      req.adminAuth = false;
      if (dummyToken) {
        res.clearCookie("admin-dummy-token", {
          domain:
            process.env.NODE_ENV === "production"
              ? process.env.PRODUCTION_CLIENT_ROOT
              : "localhost",
        });
      }
      return next();
    }

    const employee = await Employee.findOne({ _id: refreshAdmin.id });

    // Refresh token is expired / not valid
    if (!employee || employee.tokenCount !== refreshAdmin.tokenCount) {
      req.adminAuth = false;
      if (dummyToken) {
        res.clearCookie("admin-dummy-token", {
          domain:
            process.env.NODE_ENV === "production"
              ? process.env.PRODUCTION_CLIENT_ROOT
              : "localhost",
        });
      }
      return next();
    }

    // Refresh token is valid => USER AUTHENTICATED and gets new refresh / access tokens
    req.adminAuth = true;
    if (dummyToken) {
      res.clearCookie("admin-dummy-token", {
        domain:
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_CLIENT_ROOT
            : "localhost",
      });

      const dummyToken = generateAdminDummyToken(refreshAdmin);
      res.cookie("admin-dummy-token", dummyToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === "production" ? true : false,
        domain:
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_CLIENT_ROOT
            : "localhost",
      });
    }

    const tokens = createAdminTokens(employee);

    res.cookie("admin-access-token", tokens.accessToken, {
      maxAge: 1000 * 60 * 15,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      domain:
        process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_CLIENT_ROOT
          : "localhost",
    });
    res.cookie("admin-refresh-token", tokens.refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      domain:
        process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_CLIENT_ROOT
          : "localhost",
    });
    req.id = employee.id;
    return next();
  }
});

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

server.applyMiddleware({
  app,
});

app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(port, () => {
  console.log(
    `🚀 Server ready at ${
      process.env.NODE_ENV === "production"
        ? process.env.PRODUCTION_SERVER_URL + server.graphqlPath
        : "http://localhost:" + port + server.graphqlPath
    }`
  );
  console.log(
    `🚀 Subscriptions ready at ${
      process.env.NODE_ENV === "production"
        ? "wss://" +
          process.env.PRODUCTION_SERVER_ROOT +
          server.subscriptionsPath
        : "ws://localhost:" + port + server.subscriptionsPath
    }`
  );
});
