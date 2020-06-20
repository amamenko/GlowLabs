import React from "react";
import { Spring } from "react-spring/renderprops";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import Glowing_Pink from "../../images/Glowing_Pink.jpg";
import Dryness_Pink from "../../images/Dryness_Pink.jpg";
import HydroJellyMask_Pink from "../../images/HydroJellyMask_Pink.jpg";
import HydroJellyMaskLady_Pink from "../../images/HydroJellyMaskLady_Pink.jpg";
import Facial_Masks from "../../images/Facial_Masks.jpg";
import Peach_Fuzz from "../../images/Peach_Fuzz.jpg";
import Glass_Skin_Pink from "../../images/Glass_Skin_Pink.jpg";
import Sunscreen_Pink from "../../images/Sunscreen_Pink.jpg";
import "./Instagram.css";

const Instagram = React.forwardRef((props, ref) => {
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: props.initialScreenSize >= 1200 ? 0.3 : 0.2,
  });
  return (
    <div className="instagram_page_wrapping" ref={props.InstagramRef}>
      <header className="instagram_page_header" ref={inViewRef}>
        {inView ? (
          <Spring
            from={{
              opacity: 0,
              width_desktop: "0%",
              width_landscape: "0%",
              width_mobile: "0%",
            }}
            to={{
              opacity: 1,
              width_desktop: "21%",
              width_landscape: "23%",
              width_mobile: "35%",
            }}
            config={{ duration: 1000 }}
          >
            {(styles) => (
              <>
                <div className="instagram_top_page_wrapping">
                  <h2
                    style={{
                      opacity: `${styles.opacity}`,
                    }}
                  >
                    FOLLOW US
                  </h2>
                  <span
                    style={{
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
                          : `${styles.width_mobile}`,
                    }}
                    className="real_clients_title_underline"
                  />
                  <br />
                  <h3
                    className="small_screen_follow_prompt"
                    style={{
                      opacity: `${styles.opacity}`,
                    }}
                  >
                    <p
                      style={{
                        position: `${styles.position}`,
                        opacity: `${styles.opacity}`,
                      }}
                    >
                      Connect with us on <br />
                      Instagram <br />
                      to see our <br />
                      facials in action
                      <br />
                    </p>
                    <div className="insta_handle_wrapper">
                      <div
                        onClick={() =>
                          window.open(
                            "https://instagram.com/glow.labs",
                            "_blank"
                          )
                        }
                        href="#"
                      >
                        <FontAwesomeIcon
                          className="real_clients_instagram_icon"
                          style={{
                            opacity: `${styles.opacity}`,
                          }}
                          icon={faInstagram}
                        />
                      </div>
                      @glow.labs
                    </div>
                  </h3>
                </div>
                <div className="all_instagram_images_container">
                  <div className="instagram_images_wrapping left_side">
                    <div className="instagram_images_top_wrapping">
                      <div className="instagram_image left">
                        <img
                          alt="Glowing_Pink"
                          src={Glowing_Pink}
                          style={{
                            width: "125%",
                            opacity: `${styles.opacity}`,
                          }}
                        />
                      </div>
                      <div className="instagram_image">
                        <img
                          alt="Dryness_Pink"
                          src={Dryness_Pink}
                          style={{
                            width: "110%",
                            opacity: `${styles.opacity}`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="instagram_images_bottom_wrapping">
                      <div className="instagram_image left">
                        <img
                          alt="HydroJellyMask_Pink"
                          src={HydroJellyMask_Pink}
                          style={{
                            width:
                              props.currentScreenSize === ""
                                ? props.initialScreenSize >= 600
                                  ? "150%"
                                  : "140%"
                                : props.currentScreenSize >= 600
                                ? "150%"
                                : "140%",
                            overflow: "hidden",
                            opacity: `${styles.opacity}`,
                          }}
                        />
                      </div>
                      <div className="instagram_image">
                        <img
                          alt="HydroJellyMaskLady_Pink"
                          src={HydroJellyMaskLady_Pink}
                          style={{
                            width:
                              props.currentScreenSize === ""
                                ? props.initialScreenSize >= 1200
                                  ? "110%"
                                  : "110%"
                                : props.currentScreenSize >= 1200
                                ? "110%"
                                : "110%",
                            overflow: "hidden",
                            opacity: `${styles.opacity}`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="large_screen_follow_prompt"
                    style={{
                      opacity: `${styles.opacity}`,
                    }}
                  >
                    <p
                      style={{
                        opacity: `${styles.opacity}`,
                      }}
                    >
                      Connect with us <br /> on Instagram <br /> to see our
                      facials in action
                      <br />
                    </p>
                    <div className="insta_handle_wrapper">
                      <div
                        onClick={() =>
                          window.open(
                            "https://instagram.com/glow.labs",
                            "_blank"
                          )
                        }
                        href="#"
                      >
                        <FontAwesomeIcon
                          className="real_clients_instagram_icon"
                          style={{
                            opacity: `${styles.opacity}`,
                          }}
                          icon={faInstagram}
                        />
                      </div>
                      @glow.labs
                    </div>
                  </div>
                  <div className="instagram_images_wrapping large_screen right_side">
                    <div className="instagram_images_top_wrapping">
                      <div className="instagram_image left">
                        <img
                          alt="Facial_Masks"
                          src={Facial_Masks}
                          style={{
                            width:
                              props.currentScreenSize === ""
                                ? props.initialScreenSize >= 1200
                                  ? "130%"
                                  : "100%"
                                : props.currentScreenSize >= 1200
                                ? "130%"
                                : "100%",
                            opacity: `${styles.opacity}`,
                          }}
                        />
                      </div>
                      <div className="instagram_image">
                        <img
                          alt="Peach_Fuzz"
                          src={Peach_Fuzz}
                          style={{
                            width:
                              props.currentScreenSize === ""
                                ? props.initialScreenSize >= 1200
                                  ? "130%"
                                  : "100%"
                                : props.currentScreenSize >= 1200
                                ? "130%"
                                : "100%",
                            opacity: `${styles.opacity}`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="instagram_images_bottom_wrapping">
                      <div className="instagram_image left">
                        <img
                          alt="Glass_Skin_Pink"
                          src={Glass_Skin_Pink}
                          style={{
                            width:
                              props.currentScreenSize === ""
                                ? props.initialScreenSize >= 1200
                                  ? "115%"
                                  : "100%"
                                : props.currentScreenSize >= 1200
                                ? "115%"
                                : "100%",
                            overflow: "hidden",
                            opacity: `${styles.opacity}`,
                          }}
                        />
                      </div>
                      <div className="instagram_image">
                        <img
                          alt="Sunscreen_Pink"
                          src={Sunscreen_Pink}
                          style={{
                            width:
                              props.currentScreenSize === ""
                                ? props.initialScreenSize >= 1200
                                  ? "130%"
                                  : "100%"
                                : props.currentScreenSize >= 1200
                                ? "130%"
                                : "100%",
                            opacity: `${styles.opacity}`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Spring>
        ) : null}
      </header>
    </div>
  );
});

export default Instagram;
