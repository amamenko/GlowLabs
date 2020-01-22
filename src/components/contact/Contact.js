import React from "react";
import { Spring } from "react-spring/renderprops";
import { useInView } from "react-intersection-observer";
import "./Contact.css";
import GoogleMapReact from "google-map-react";
import ContactCustomMarker from "./ContactCustomMarker";

const Contact = React.forwardRef((props, ref) => {
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: props.initialScreenSize >= 1200 ? 0.3 : 0.2
  });
  return (
    <div className="contact_page_container" ref={inViewRef}>
      {inView ? (
        <Spring
          from={{
            position: "relative",
            opacity: 0,
            animation:
              props.currentScreenSize === ""
                ? props.initialScreenSize >= 1200
                  ? "big_contacts_line 1s forwards"
                  : "contacts_line 1s forwards"
                : props.currentScreenSize >= 1200
                ? "big_contacts_line forwards"
                : "contacts_line 1s forwards"
          }}
          to={{ position: "relative", opacity: 1 }}
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
                  animation: `${styles.animation}`
                }}
                className="contacts_title_underline"
              />
              <br />
              <div style={{ width: "100vw", height: "40vh" }}>
                <GoogleMapReact
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
                  defaultCenter={{
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
                    lat={40.62322}
                    lng={-73.722809}
                    text="Glow Labs"
                  />
                </GoogleMapReact>
              </div>
            </div>
          )}
        </Spring>
      ) : null}
    </div>
  );
});

export default Contact;
