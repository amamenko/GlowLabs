[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/amamenko/GlowLabs">
    <img src="Client/src/images/GlowLabsCroppedLogo.jpg" alt="Logo" width="350" />
  </a>

  <h3 align="center">Glow Labs Facial Bar - CRUD Application</h3>

  <p align="center">
    MERN stack appointment scheduling and employee/client management application
    <br />
    <br />
    <a href="https://glowlabs.ga">View Demo</a>
    ·
    <a href="https://github.com/amamenko/GlowLabs/issues">Report Issue</a> 
  </p>
</p>


## Background

Glow Labs, a small business, has been using [Square](https://squareup.com/us/en) for booking appointments, managing clients and employees, and as a point of sale (POS) system. Its website, built by using [Wix](https://www.wix.com/), displays its Square booking workflow
in an iframe. It has also been using [WaiverForever](https://www.waiverforever.com/) for handling consent forms - clients are not able to receive copies.

Square Appointments does not charge a monthly subscription fee if there is only one staff member. However, [a monthly charge of $50 for 2-5 members and $90 for 6-11 members (and even more for even larger teams)](https://squareup.com/help/us/en/article/6238-square-appointments-faqs) is incurred.
Glow Labs has several staff members and therefore has to pay a monthly fee. Square's [POS](https://squareup.com/us/en/point-of-sale/software) system is free to use and there are no setup fees or monthly subscription fees.

Ideally, appointments, consent forms, and profile management would all be handled on the same domain. Also, sensitive client-entered credit card information should be handled securely and integrated with Square's POS system.


## Functionality

<p align="center">
<a href="https://glowlabs.ga">
    <img  src="Client/src/images/GL_Responsive.png" alt="Glow Labs Skin Care Responsiveness Demo Screenshots" />
</a>
</span>
<br/ >
<br />


This is a MERN (MongoDB, Express, React, Node.js) stack application that uses [Redux](https://github.com/reduxjs/redux) for state management and [Apollo Client](https://www.npmjs.com/package/apollo-boost) to fetch data from a MongoDB database via [GraphQL](https://graphql.org/). It has some of the following features:

<strong>Responsive design, SEO, and performance optimizations by means of:</strong>
* Custom, effective meta tags with [metatags.io](https://metatags.io/) and favicons with [favicon.io](https://favicon.io/).
* SVG compression using [SVGOMG](https://jakearchibald.github.io/svgomg/), static site image compression using [Squoosh](https://squoosh.app/), and user-uploaded image compression using [browser-image-compression](https://www.npmjs.com/package/browser-image-compression) and [LZString](https://github.com/pieroxy/lz-string)).
* Lazy loading and SVG stroke-dashoffset animation triggers and animation on landing page with the [Intersection Observer API](https://www.npmjs.com/package/react-intersection-observer) and [react-spring](https://www.npmjs.com/package/react-spring).
* [Code-splitting](https://reactjs.org/docs/code-splitting.html) along shopping cart routes and authenticated user routes.

<strong>Guest clients are able to:</strong>
* Add and remove facial treatments and add-ons (certain combinations disallowed) from their shopping cart.
* Select a staff member they would like their service with (or, if no preference, select a random staff member).
* Choose an available time and date for their appointment.
* Fill out contact information and any appointment notes.
* Submit credit card information securely through a [Square Payment Form](https://github.com/square/react-square-payment-form) to hold their appointment. This form is an iframe (no credit card information is stored on Glow Labs' MongoDB database. Rather, this information goes to Square's POS).
* Book selected appointments and receive: 
  * Confirmation and reminder texts via [Twilio](https://www.npmjs.com/package/twilio) and [node-cron](https://www.npmjs.com/package/node-cron) (to which they can reply to confirm their appointment).
  * Confirmation emails (created using the [MJML](https://github.com/mjmlio/mjml) markup language) via [Nodemailer](https://www.npmjs.com/package/nodemailer).
  * Link to fill out and sign a consent form.
* Log in or create an account by entering details or using [Passport](https://www.npmjs.com/package/passport-facebook) to authenticate with Facebook via OAuth 2.0. Authentication is done by [JSON Web Tokens](https://jwt.io/introduction/) and [HttpOnly](https://owasp.org/www-community/HttpOnly) access and refresh cookies, as well as an additional client-visible "dummy" cookie after validation.

<strong>Authenticated clients are able to do all of the above, as well as:</strong>
* See upcoming and past appointments.
* Cancel an upcoming appointment.
* Save their credit card information for future bookings, if they wish (again, this card information is not saved to Glow Labs' MongoDB database, but is queried from [Square](https://github.com/square/square-nodejs-sdk)).
* Download PDF copies of their latest consent forms via [React-PDF](https://www.npmjs.com/package/react-pdf).

<strong>Authenticated staff members are able to:</strong>
* Receive real-time relevant activity updates such as new bookings or cancellations in their employee dashboard via GraphQL [subscriptions](https://www.apollographql.com/docs/react/data/subscriptions/) powered by [Google Cloud Pub/Sub](https://cloud.google.com/pubsub/docs/overview).
* View all clients and staff members and each individual's upcoming and past appointments, as well as PDF copies of client consent forms, if present.
* Update client and their own profile photos by uploading a photo or taking a photo with a [webcam](https://github.com/MABelanger/react-html5-camera-photo).
* Add, delete, or update appointments and personal events in their own calendar.

<strong>Authenticated staff members with "admin" status are also able to:</strong>
* Add new staff members.
* Delete clients and staff members.
* Update all clients' and staff members' profile photos.
* View and manage all staff members' calendars.

## Deployment

Server deployed via [AWS EC2](https://aws.amazon.com/ec2/) instance with [NGINX](https://www.nginx.com/) and SSL secured with [Let's Encrypt](https://letsencrypt.org/). Client-side deployed with [Vercel](https://vercel.com/).

## Local Development

To develop this project locally, follow the steps below.

### Prerequisites

You will need to have the following software installed:
* npm
* Git
* Node.js

### Installation

1. Create a [Google Maps Platform](https://developers.google.com/maps/gmp-get-started) billing account, create a project, enable the Google Maps API, and get an [API key](https://developers.google.com/maps/documentation/javascript/get-api-key).
2. Enable the [Google Pub/Sub API](https://cloud.google.com/pubsub) for that same project, add a new topic with a name of your  choosing, and then add a new subscription with the name "getUpdatedEmployee." Leave the delivery type as "Pull."
3. Create a new [Square Developer](https://squareup.com/signup?country_code=us&v=developers) account, create a new application, and get its Sandbox credentials.
4. Create a [Twilio](https://www.twilio.com/try-twilio) account and get its account SID and authorization token.
5. Create a [Facebook for Developers](https://developers.facebook.com/) account, register a new application, and get its ID and secret.
6. Create a [MongoDB](https://account.mongodb.com/account/register) account, create a new database, and get its connection string to connect to [Mongoose](https://mongoosejs.com/docs/).
7. Clone the Github repository.
   ```sh
   git clone https://github.com/amamenko/GlowLabs.git
   ```
8. Install all client-side NPM packages.
   ```sh
   cd Client
   npm install
   ```
9. Enter your Google Maps API token and Square Sandbox application details as client-side environment variables.
   ```sh
   REACT_APP_GOOGLE_MAPS_API_KEY=YOUR GOOGLE MAPS API KEY
   REACT_APP_SQUARE_SANDBOX_APPLICATION_ID=YOUR SQUARE SANDBOX APPLICATION ID
   REACT_APP_SQUARE_SANDBOX_LOCATION_ID=YOUR SQUARE SANDBOX LOCATION ID
   REACT_APP_SQUARE_SANDBOX_ACCESS_TOKEN=YOUR SQUARE SANDBOX ACCESS TOKEN
   ```
10. Install all server-side NPM packages.
     ```sh
     cd ..
     npm install
     ```
11. Enter your Square Sandbox, Twilio, Facebook for Developers, Google Cloud, and MongoDB credentials as server-side environment variables. Also enter your own Nodemailer email/password combinations and JSON Web Token secret keys as environment variables.
    ```sh
     SQUARE_SANDBOX_ACCESS_TOKEN=YOUR SQUARE SANDBOX ACCESS TOKEN
     TWILIO_ACCOUNT_SID=YOUR TWILIO ACCOUNT SID
     TWILIO_AUTH_TOKEN=YOUR TWILIO AUTH TOKEN
     GLOW_LABS_TEXT_NUMBER=YOUR TWILIO TEXTING NUMBER
     TWILIO_TEST_TEXT_NUMBER=YOUR OUTBOUND TEST TEXT NUMBER
     FACEBOOK_APP_ID=YOUR FACEBOOK APP ID
     FACEBOOK_APP_SECRET=YOUR FACEBOOK APP SECRET
     JWT_SECRET_KEY_DUMMY=YOUR DUMMY JWT KEY
     JWT_SECRET_KEY_ACCESS=YOUR ACCESS JWT KEY
     JWT_SECRET_KEY_REFRESH=YOUR REFRESH JWT KEY
     MONGO_DB_USERNAME=YOUR MONGODB USERNAME
     MONGO_DB_PASSWORD=YOUR MONGODB PASSWORD
     GOOGLE_PUB_SUB_PROJECT_ID=YOUR GOOGLE CLOUD PUB/SUB PROJECT ID
     GOOGLE_PUB_SUB_CLIENT_EMAIL=YOUR GOOGLE CLOUD PUB/SUB CLIENT EMAIL
     GOOGLE_PUB_SUB_PRIVATE_KEY_PART_ONE=PART ONE OF YOUR GOOGLE CLOUD PUB/SUB PRIVATE KEY
     GOOGLE_PUB_SUB_PRIVATE_KEY_PART_TWO=PART TWO OF YOUR GOOGLE CLOUD PUB/SUB PRIVATE KEY
     GLOW_LABS_EMAIL=YOUR EMAIL
     GLOW_LABS_EMAIL_APP_PASSWORD=YOUR EMAIL PASSWORD
    ```
12. Build for production.
    ```sh
    npm run build
    ```

<!-- CONTRIBUTING -->
## Contributing

Contributions are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/MyFeature`)
3. Commit your Changes (`git commit -m 'Add my feature'`)
4. Push to the Branch (`git push origin feature/MyFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.



<!-- CONTACT -->
## Contact

Avraham (Avi) Mamenko - avimamenko@gmail.com

Project Link: [https://github.com/amamenko/GlowLabs](https://github.com/amamenko/GlowLabs)


<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* Glow Labs
* [Square Developer](https://developer.squareup.com/us/en) 
* [Facebook for Developers](https://developers.facebook.com/)
* [Twilio](https://www.npmjs.com/package/twilio)
* [Nodemailer](https://www.npmjs.com/package/nodemailer)
* [MJML](https://github.com/mjmlio/mjml)
* [Moment.js](https://github.com/moment/moment)
* [Google Maps API](https://developers.google.com/maps/)
* [React-PDF](https://www.npmjs.com/package/react-pdf)
* [React Icons](https://react-icons.github.io/react-icons)
* [react-spring](https://www.npmjs.com/package/react-spring)
* [Tippy.js for React](https://www.npmjs.com/package/@tippyjs/react)
* [React Burger Menu](https://github.com/negomi/react-burger-menu)
* [node-cron](https://www.npmjs.com/package/node-cron)
* [Best-README-Template](https://github.com/othneildrew/Best-README-Template)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/amamenko/GlowLabs/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/avrahammamenko
