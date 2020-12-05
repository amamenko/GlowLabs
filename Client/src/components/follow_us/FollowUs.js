import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Spring } from "react-spring/renderprops";
import { useInView } from "react-intersection-observer";
import "./FollowUs.css";
import "./Instagram.css";
import composeRefs from "@seznam/compose-react-refs";
import FrontDecal from "../../images/FollowUsImages/FrontDecal.jpg";
import FrontCouch from "../../images/FollowUsImages/FrontCouch.jpg";
import FrontDesk from "../../images/FollowUsImages/FrontDesk.jpg";
import SaltCave from "../../images/FollowUsImages/SaltCave.jpg";
import LED from "../../images/FollowUsImages/LED.jpg";
import DimRoom from "../../images/FollowUsImages/DimRoom.jpg";
import NeonSign from "../../images/FollowUsImages/NeonSign.jpg";
import Dermaplaning from "../../images/FollowUsImages/Dermaplaning.jpg";

const FollowUs = React.forwardRef((props, ref) => {
  const { InstagramRef, initialScreenSize, name } = props;
  const followUsHeaderRef = useRef(null);

  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: initialScreenSize >= 1200 ? 0.3 : 0.2,
  });

  return (
    <div
      className="follow_us_container"
      id={name}
      ref={composeRefs(InstagramRef, inViewRef)}
    >
      {inView ? (
        <>
          <header className="follow_us_sub_container_header">
            <Spring
              from={{
                opacity: 0,
              }}
              to={{
                opacity: 1,
              }}
              config={{ duration: 1000 }}
            >
              {(styles) => (
                <>
                  <h1
                    style={{
                      opacity: `${styles.opacity}`,
                    }}
                    ref={followUsHeaderRef}
                  >
                    FOLLOW US
                  </h1>
                  <span
                    style={{
                      opacity: `${styles.opacity}`,
                      width: followUsHeaderRef.current
                        ? followUsHeaderRef.current.clientWidth + "px"
                        : "0px",
                    }}
                    className="follow_us_underline"
                  />
                </>
              )}
            </Spring>
          </header>
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
                <div
                  className="follow_us_sub_container_left"
                  style={{
                    opacity: `${propstyles.opacity}`,
                  }}
                >
                  <div className="insta_photo_1">
                    <img
                      alt="Front_Decal"
                      src={FrontDecal}
                      style={{
                        opacity: `${propstyles.opacity}`,
                      }}
                    />
                  </div>
                  <div className="insta_photo_2">
                    <img
                      alt="Front_Couch"
                      src={FrontCouch}
                      style={{
                        opacity: `${propstyles.opacity}`,
                      }}
                    />
                  </div>
                  <div className="insta_photo_3">
                    <img
                      alt="Front_Desk"
                      src={FrontDesk}
                      style={{
                        opacity: `${propstyles.opacity}`,
                      }}
                    />
                  </div>
                  <div className="insta_photo_4">
                    <img
                      alt="Salt_Cave"
                      src={SaltCave}
                      style={{
                        opacity: `${propstyles.opacity}`,
                      }}
                    />
                  </div>
                </div>

                <div
                  className="follow_us_sub_container_middle"
                  style={{
                    opacity: `${propstyles.opacity}`,
                  }}
                >
                  <p>
                    Connect with us on <br />
                    Instagram <br />
                    to see our <br />
                    facials in action
                    <br />
                  </p>
                  <FontAwesomeIcon
                    className="instagram_icon"
                    icon={faInstagram}
                    onClick={() =>
                      window.open("https://instagram.com/glow.labs", "_blank")
                    }
                  />
                  <p>@glow.labs</p>
                </div>

                <div
                  className="follow_us_sub_container_right"
                  style={{
                    opacity: `${propstyles.opacity}`,
                  }}
                >
                  <div className="insta_photo_5">
                    <img
                      alt="LED"
                      src={LED}
                      style={{
                        opacity: `${propstyles.opacity}`,
                      }}
                    />
                  </div>
                  <div className="insta_photo_6">
                    <img
                      alt="Dim_Room"
                      src={DimRoom}
                      style={{
                        opacity: `${propstyles.opacity}`,
                      }}
                    />
                  </div>
                  <div className="insta_photo_7">
                    <img
                      alt="Neon_Sign"
                      src={NeonSign}
                      style={{
                        opacity: `${propstyles.opacity}`,
                      }}
                    />
                  </div>
                  <div className="insta_photo_8">
                    <img
                      alt="Dermaplaning"
                      src={Dermaplaning}
                      style={{
                        opacity: `${propstyles.opacity}`,
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </Spring>
        </>
      ) : null}
    </div>
  );
});

export default FollowUs;
