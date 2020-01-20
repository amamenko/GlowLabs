import React from "react";
import "./Contact.css";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import Logo from "../../svgs/GlowLabsSmallLogo.svg";

const Contact = props => (
  <div className="contact_page_container">
    <Map
      style={{
        width: "100%",
        height: "20vh"
      }}
      initialCenter={{
        lat: 40.62322,
        lng: -73.722809
      }}
      google={props.google}
      zoom={14}
    >
      <Marker
        title={"Glow Labs"}
        name={"Glow Labs"}
        icon={{
          url: Logo,
          scaledSize: new props.google.maps.Size(50, 35)
        }}
      />
    </Map>
  </div>
);

export default GoogleApiWrapper({
  apiKey: "AIzaSyCXxihdTmGU3eTyO7CCTqDv37OVz6Rl420"
})(Contact);
