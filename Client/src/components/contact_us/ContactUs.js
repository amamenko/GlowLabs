import React, { useRef } from "react";
import "./ContactUs.css";
import "./Contact.css";
import GoogleMapReact from "google-map-react";
import { useInView } from "react-intersection-observer";
import { Spring } from "react-spring/renderprops";
import composeRefs from "@seznam/compose-react-refs";
import ContactCustomMarker from "./ContactCustomMarker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import BottomFooter from "./footer/BottomFooter";

const ContactUs = (props) => {
  const { ContactRef, initialScreenSize, currentScreenSize, name } = props;

  const contactUsHeaderRef = useRef(null);
  const GoogleMapRef = useRef(null);

  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: initialScreenSize >= 1200 ? 0.3 : 0.2,
  });

  const today = new Date().getDay();

  const hours_today = () => {
    if (today === 6) {
      return <p className="open_status">Closed today</p>;
    } else if (today === 5) {
      return <p className="open_status">Open today until 4:00 PM</p>;
    } else {
      return <p className="open_status">Open today until 8:00 PM</p>;
    }
  };

  const mapOptions = (maps) => {
    return {
      gestureHandling: "none",
      zoomControl: true,
      panControl: false,
      mapTypeControl: false,
      scrollwheel: false,
      fullscreenControl: false,
      zoomControlOptions: {
        position: maps.ControlPosition.LEFT_CENTER,
      },
    };
  };

  return (
    <div
      className="contact_us_page_container"
      id={name}
      ref={composeRefs(ContactRef, inViewRef)}
    >
      {inView ? (
        <Spring
          from={{
            opacity: 0,
          }}
          to={{
            opacity: 1,
          }}
          config={{ duration: 1000 }}
        >
          {(propstyles) => (
            <>
              <div className="contact_us_map_container" ref={ContactRef}>
                <GoogleMapReact
                  ref={GoogleMapRef}
                  options={mapOptions}
                  onGoogleApiLoaded={({ maps }) => {
                    mapOptions(maps);
                  }}
                  yesIWantToUseGoogleMapApiInternals={true}
                  bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                  }}
                  center={{
                    lat: 40.643635,
                    lng: -73.695618,
                  }}
                  defaultZoom={14}
                  style={{
                    position: `${propstyles.position}`,
                    opacity: `${propstyles.opacity}`,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <ContactCustomMarker
                    lat={40.643635}
                    lng={-73.695618}
                    currentScreenSize={currentScreenSize}
                    initialScreenSize={initialScreenSize}
                    text="Glow Labs"
                  />
                </GoogleMapReact>
              </div>
              <header className="contact_us_header">
                <>
                  <h1
                    style={{
                      opacity: `${propstyles.opacity}`,
                    }}
                    ref={contactUsHeaderRef}
                  >
                    CONTACT US
                  </h1>
                  <span
                    style={{
                      opacity: `${propstyles.opacity}`,
                      width: contactUsHeaderRef.current
                        ? contactUsHeaderRef.current.clientWidth + "px"
                        : "0px",
                    }}
                    className="contact_us_underline"
                  />
                </>
              </header>
              <div className="contact_us_address_container">
                <div className="contact_us_marker_icon">
                  {" "}
                  <FontAwesomeIcon
                    className="contact_icon"
                    icon={faMapMarkerAlt}
                  />
                </div>
                <div className="contact_us_address">
                  <p>1506 Broadway,</p>
                  <p>Hewlett, NY 11557</p>
                </div>
              </div>
              <div className="contact_us_contact_container">
                <p>
                  <FontAwesomeIcon className="contact_icon" icon={faEnvelope} />{" "}
                  glowlabs@yahoo.com
                </p>
                <p>
                  <FontAwesomeIcon className="contact_icon" icon={faPhone} />{" "}
                  (516) 442-8122
                </p>
              </div>
              <div className="contact_us_times_section">
                <h2>Business Hours</h2>
                <div className="contact_us_availability_container">
                  <div className="contact_us_days_container">
                    <p>Sun</p>
                    <p>Mon</p>
                    <p>Tue</p>
                    <p>Wed</p>
                    <p>Thu</p>
                    <p>Fri</p>
                    <p>Sat</p>
                  </div>
                  <div className="contact_us_hours_container">
                    <p>10:00 AM - 8:00 PM</p>
                    <p>10:00 AM - 8:00 PM</p>
                    <p>10:00 AM - 8:00 PM</p>
                    <p>10:00 AM - 8:00 PM</p>
                    <p>10:00 AM - 8:00 PM</p>
                    <p>10:00 AM - 4:00 PM</p>
                    <p>Closed</p>
                  </div>
                </div>
              </div>
              <div className="contact_us_open_status">
                {" "}
                <h3>By Appointment Only</h3>
                {hours_today()}
              </div>
              <BottomFooter
                currentScreenSize={props.currentScreenSize}
                initialScreenSize={props.initialScreenSize}
              />
            </>
          )}
        </Spring>
      ) : null}
    </div>
  );
};

export default ContactUs;
