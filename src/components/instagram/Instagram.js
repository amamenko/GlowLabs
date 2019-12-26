import React from "react";
import Hydrojelly from "../../images/Hydrojelly.jpg";
import LED from "../../images/LED.jpg";
import WoodsLamp from "../../images/WoodsLamp.jpg";
import Hydrojelly2 from "../../images/Hydrojelly2.jpg";
import "./Instagram.css";

const Instagram = () => {
  return (
    <div className="instagram_page_wrapping">
      <div className="instagram_images_wrapping">
        <div className="instagram_images_top_wrapping">
          <img
            className="instagram_image left"
            alt="Hydrojelly Mask"
            src={Hydrojelly}
          />
          <img className="instagram_image" alt="Hydrojelly + LED" src={LED} />
        </div>
        <div className="instagram_images_bottom_wrapping">
          <img
            className="instagram_image left"
            alt="Woodslamp Analysis"
            src={WoodsLamp}
          />
          <img
            className="instagram_image"
            alt="Hydrojelly Mask"
            src={Hydrojelly2}
          />
        </div>
      </div>
    </div>
  );
};

export default Instagram;
