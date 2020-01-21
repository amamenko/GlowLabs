import React, { useState } from "react";
import "./Contact.css";
import GoogleMapReact from "google-map-react";
import ContactCustomMarker from "./ContactCustomMarker";

const Contact = props => {
  const [height, changeHeight] = useState("34.11335");
  const [width, changeWidth] = useState("34.11335");

  const mapChildClick = () => {
    if (height === "34.11335" && width === "34.11335") {
      changeHeight("68.2267");
      changeWidth("68.2267");
    } else {
      changeHeight("34.11335");
      changeWidth("34.11335");
    }
  };
  return (
    <div className="contact_page_container">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCXxihdTmGU3eTyO7CCTqDv37OVz6Rl420" }}
        defaultCenter={{
          lat: 40.62322,
          lng: -73.722809
        }}
        defaultZoom={14}
        onChildClick={mapChildClick}
      >
        <ContactCustomMarker
          height={height}
          width={width}
          lat={40.62322}
          lng={-73.722809}
          text="Glow Labs"
        />
      </GoogleMapReact>
    </div>
  );
};

export default Contact;
