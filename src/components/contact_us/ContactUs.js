import React, { useState, useRef } from "react";
import "./ContactUs.css";
import GoogleMapReact from "google-map-react";
import { useInView } from "react-intersection-observer";
import { Spring } from "react-spring/renderprops";
import composeRefs from "@seznam/compose-react-refs";

const ContactUs = (props) => {
  const headlineRef = useRef(null);
  const GoogleMapRef = useRef(null);

  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: props.initialScreenSize >= 1200 ? 0.3 : 0.2,
  });

  const [pageRendered, changePageRendered] = useState(false);

  return (
    <div
      className="contact_us_page_container"
      id={props.name}
      ref={composeRefs(props.ContactRef, inViewRef)}
    >
      {inView ? (
        <Spring
          from={{
            opacity: 0,
            width: "0px",
          }}
          to={{
            opacity: 1,
            width: headlineRef.current
              ? headlineRef.current.clientWidth + "px"
              : "0px",
          }}
          immediate={pageRendered}
          onRest={() => changePageRendered(true)}
          config={{ duration: 1000 }}
        >
          {(styles) => (
            <>
              <div className="contact_us_map_container" ref={props.ContactRef}>
                <GoogleMapReact
                  ref={GoogleMapRef}
                  options={{
                    gestureHandling: "none",
                    zoomControl: true,
                    panControl: false,
                    mapTypeControl: false,
                    scrollwheel: false,
                    fullscreenControl: false,
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
                    position: `${styles.position}`,
                    opacity: `${styles.opacity}`,
                    width: "100%",
                    height: "100%",
                  }}
                ></GoogleMapReact>
              </div>
              <header className="contact_us_header">
                <h1
                  style={{
                    opacity: `${styles.opacity}`,
                  }}
                  ref={headlineRef}
                >
                  CONTACT US
                </h1>
                <span
                  style={{
                    opacity: `${styles.opacity}`,
                    width: `${styles.width}`,
                  }}
                  className="contact_us_underline"
                />
              </header>
            </>
          )}
        </Spring>
      ) : null}
    </div>
  );
};

export default ContactUs;
