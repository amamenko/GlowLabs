import React from "react";
import { Spring } from "react-spring/renderprops";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import Facial_Mask_Sheets from "../../images/Facial_Mask_Sheets.jpg";
import Facial_Masks from "../../images/Facial_Masks.jpg";
import Facial_Masks_Cream from "../../images/Facial_Masks_Cream.jpg";
import Acne from "../../images/Acne.jpg";
import "./Instagram.css";

const Instagram = React.forwardRef((props, ref) => {
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: props.initialScreenSize >= 1200 ? 0.3 : 0.2
  });
  return (
    <div className="instagram_page_wrapping" ref={props.InstagramRef}>
      <header className="instagram_page_header" ref={inViewRef}>
        {inView ? (
          <Spring
            from={{
              position: "relative",
              opacity: 0,
              animation:
                props.currentScreenSize === ""
                  ? props.initialScreenSize >= 1200
                    ? "big_real_clients_line 1s forwards"
                    : "real_clients_line 1s forwards"
                  : props.currentScreenSize >= 1200
                  ? "big_real_clients_line forwards"
                  : "real_clients_line 1s forwards"
            }}
            to={{ position: "relative", opacity: 1 }}
            config={{ duration: 1000 }}
          >
            {styles => (
              <>
                <div className="instagram_top_page_wrapping">
                  <h2
                    style={{
                      position: `${styles.position}`,
                      opacity: `${styles.opacity}`
                    }}
                  >
                    REAL CLIENTS
                  </h2>
                  <span
                    style={{
                      position: `${styles.position}`,
                      opacity: `${styles.opacity}`,
                      animation: `${styles.animation}`
                    }}
                    className="real_clients_title_underline"
                  />
                  <br />
                  <h3
                    style={{
                      position: `${styles.position}`,
                      opacity: `${styles.opacity}`
                    }}
                  >
                    <p
                      style={{
                        position: `${styles.position}`,
                        opacity: `${styles.opacity}`
                      }}
                    >
                      Follow us on <br />
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
                            position: `${styles.position}`,
                            opacity: `${styles.opacity}`
                          }}
                          icon={faInstagram}
                        />
                      </div>
                      @glow.labs
                    </div>
                  </h3>
                </div>
                <div className="instagram_images_wrapping">
                  <div className="instagram_images_top_wrapping">
                    <img
                      className="instagram_image left"
                      alt="Facial_Masks_Cream"
                      src={Facial_Masks_Cream}
                      style={{
                        position: `${styles.position}`,
                        opacity: `${styles.opacity}`
                      }}
                    />
                    <img
                      className="instagram_image"
                      alt="Facial masks"
                      src={Facial_Masks}
                      style={{
                        position: `${styles.position}`,
                        opacity: `${styles.opacity}`
                      }}
                    />
                  </div>
                  <div className="instagram_images_bottom_wrapping">
                    <img
                      className="instagram_image left"
                      alt="Acne"
                      src={Acne}
                      style={{
                        position: `${styles.position}`,
                        opacity: `${styles.opacity}`
                      }}
                    />
                    <img
                      className="instagram_image"
                      alt="Facial_Mask_Sheets"
                      src={Facial_Mask_Sheets}
                      style={{
                        position: `${styles.position}`,
                        opacity: `${styles.opacity}`
                      }}
                    />
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
