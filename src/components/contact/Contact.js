import React, { useRef } from "react";
import { Spring } from "react-spring/renderprops";
import { useInView } from "react-intersection-observer";
import GoogleMapReact from "google-map-react";
import Footer from "../footer/Footer";
import ContactCustomMarker from "./ContactCustomMarker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import "./Contact.css";

const Contact = React.forwardRef((props, ref) => {
  const GoogleMapRef = useRef(null);
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: props.initialScreenSize >= 1200 ? 0.3 : 0.2
  });
  const today = new Date().getDay();

  const hours_today = () => {
    if (today === 0) {
      return <p className="open_status">Open today until 6:00 PM</p>;
    } else if ((today === 1) | (today === 6)) {
      return <p className="open_status">Closed today</p>;
    } else if (today === 5) {
      return <p className="open_status">Open today until 4:00 PM</p>;
    } else {
      return <p className="open_status">Open today until 8:00 PM</p>;
    }
  };

  return (
    <div className="contact_page_container" ref={props.ContactRef}>
      <div className="contact_ref_wrapper" ref={inViewRef}>
        {inView ? (
          <Spring
            from={{
              position: "relative",
              opacity: 0,
              width_desktop: "0%",
              width_landscape: "0%",
              width_mobile: "0%"
            }}
            to={{
              position: "relative",
              opacity: 1,
              width_desktop: "16%",
              width_landscape: "18%",
              width_mobile: "30%"
            }}
            config={{ duration: 1000 }}
          >
            {styles => (
              <div className="contacts_page_wrapping">
                <h2
                  style={{
                    position: `${styles.position}`,
                    opacity: `${styles.opacity}`
                  }}
                >
                  CONTACT
                </h2>
                <span
                  style={{
                    position: `${styles.position}`,
                    opacity: `${styles.opacity}`,
                    width:
                      props.currentScreenSize === ""
                        ? props.initialScreenSize >= 1200
                          ? `${styles.width_desktop}`
                          : props.initialScreenSize >= 600
                          ? `${styles.width_landscape}`
                          : `${styles.width_mobile}`
                        : props.currentScreenSize >= 1200
                        ? `${styles.width_desktop}`
                        : props.currentScreenSize >= 600
                        ? `${styles.width_landscape}`
                        : `${styles.width_mobile}`
                  }}
                  className="contacts_title_underline"
                />
                <br />
                <div className="contacts_content_flex_wrapper">
                  <div className="contacts_map_container">
                    <GoogleMapReact
                      ref={GoogleMapRef}
                      options={{
                        gestureHandling: "none",
                        zoomControl: true,
                        panControl: false,
                        mapTypeControl: false,
                        scrollwheel: false,
                        fullscreenControl: false
                      }}
                      yesIWantToUseGoogleMapApiInternals={true}
                      bootstrapURLKeys={{
                        key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
                      }}
                      center={{
                        lat: 40.62322,
                        lng: -73.722809
                      }}
                      defaultZoom={14}
                      style={{
                        position: `${styles.position}`,
                        opacity: `${styles.opacity}`,
                        width: "100%",
                        height: "100%"
                      }}
                    >
                      <ContactCustomMarker
                        currentScreenSize={props.currentScreenSize}
                        initialScreenSize={props.initialScreenSize}
                        text="Glow Labs"
                      />
                    </GoogleMapReact>
                  </div>
                  <div className="contact_written_content_flex_container">
                    <div className="contacts_text_container">
                      <h3>By Appointment Only</h3>
                      <h4>Glow Labs</h4>
                      <p>561 Willow Avenue,</p>
                      <p>
                        Located Inside <br /> "Angelica's Salon"
                      </p>
                      <p>Cedarhurst, NY, 11516</p>
                      <p>
                        <FontAwesomeIcon
                          className="contact_icon"
                          icon={faEnvelope}
                        />{" "}
                        glowlabs@yahoo.com
                      </p>
                      <p>
                        <FontAwesomeIcon
                          className="contact_icon"
                          icon={faPhone}
                        />{" "}
                        (347) 417-3883
                      </p>
                    </div>
                    <div className="open_status_flex_container">
                      <h3>By Appointment Only</h3>
                      <div className="day_and_time_container">
                        <div className="days_container">
                          <p>Sun</p>
                          <p>Mon</p>
                          <p>Tue</p>
                          <p>Wed</p>
                          <p>Thu</p>
                          <p>Fri</p>
                          <p>Sat</p>
                        </div>
                        <div className="hours_container">
                          <p>10:00 AM - 6:00 PM</p>
                          <p>Closed</p>
                          <p>10:00 AM - 8:00 PM</p>
                          <p>10:00 AM - 8:00 PM</p>
                          <p>10:00 AM - 8:00 PM</p>
                          <p>10:00 AM - 4:00 PM</p>
                          <p>Closed</p>
                        </div>
                      </div>
                      {hours_today()}
                    </div>
                  </div>
                </div>
                <Footer />
              </div>
            )}
          </Spring>
        ) : null}
      </div>
    </div>
  );
});

export default Contact;
