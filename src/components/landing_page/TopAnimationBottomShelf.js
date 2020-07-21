import React from "react";
import { useSelector } from "react-redux";
import { Spring } from "react-spring/renderprops";
import "./LandingPage.css";

const TopAnimationBottomShelf = (props) => {
  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );

  return (
    <Spring
      immediate={splashScreenComplete}
      from={{
        top: !props.currentScreenSize
          ? props.initialScreenSize >= 1200
            ? props.isSafari
              ? "4%"
              : "-50%"
            : "-50%"
          : props.currentScreenSize >= 1200
          ? props.isSafari
            ? "4%"
            : "-50%"
          : "-50%",
      }}
      to={{
        top: !props.currentScreenSize
          ? props.initialScreenSize >= 2200
            ? props.isSafari
              ? "72%"
              : "71%"
            : props.initialScreenSize >= 1800
            ? "69%"
            : props.initialScreenSize >= 1200
            ? props.isSafari
              ? "68%"
              : "73%"
            : props.initialScreenSize >= 768
            ? "38%"
            : props.initialScreenSize >= 600
            ? "60%"
            : props.initialScreenSize >= 360
            ? "40%"
            : "38.2%"
          : props.currentScreenSize >= 2200
          ? props.isSafari
            ? "72%"
            : "71%"
          : props.currentScreenSize >= 1800
          ? "69%"
          : props.currentScreenSize >= 1200
          ? props.isSafari
            ? "68%"
            : "73%"
          : props.currentScreenSize >= 768
          ? "38%"
          : props.currentScreenSize >= 600
          ? "60%"
          : props.currentScreenSize >= 360
          ? "40%"
          : "38.2%",
      }}
      config={{
        delay: !props.currentScreenSize
          ? props.initialScreenSize >= 600
            ? 1500
            : 900
          : props.initialScreenSize >= 600
          ? props.currentScreenSize >= 600
            ? 1500
            : 900
          : props.currentScreenSize >= 600
          ? 1500
          : 900,
        duration: 1500,
      }}
    >
      {(styles) => (
        <div
          className="top_content_bottom_shelf"
          style={{
            top:
              !props.currentScreenSize || !splashScreenComplete
                ? `${styles.top}`
                : props.currentScreenSize >= 2200
                ? props.isSafari
                  ? "66%"
                  : "71%"
                : props.currentScreenSize >= 1800
                ? "69%"
                : props.currentScreenSize >= 1200
                ? props.isSafari
                  ? "68%"
                  : "73%"
                : props.currentScreenSize >= 768
                ? "38%"
                : props.currentScreenSize >= 600
                ? "60%"
                : props.currentScreenSize >= 360
                ? "40%"
                : "38.2%",
          }}
        >
          <svg
            width="100%"
            height={
              !props.currentScreenSize
                ? props.initialScreenSize >= 2200
                  ? "35em"
                  : props.initialScreenSize >= 1800
                  ? "30em"
                  : props.initialScreenSize >= 1600
                  ? "20em"
                  : props.initialScreenSize >= 768
                  ? "10em"
                  : props.initialScreenSize >= 360
                  ? "7em"
                  : "5em"
                : props.currentScreenSize >= 2200
                ? "35em"
                : props.currentScreenSize >= 1800
                ? "30em"
                : props.currentScreenSize >= 1600
                ? "20em"
                : props.currentScreenSize >= 768
                ? "10em"
                : props.currentScreenSize >= 360
                ? "7em"
                : "5em"
            }
            viewBox="0 0 100 100"
          >
            <g transform="translate(-30 -62)">
              <path
                d="M.068 83.709c.127-1.353.321-2.324.855-2.733.387-.392.839-.562 1.374-.667.702-.105 79.644-.067 79.644-.067s80.133.075 80.165-.047c.522.226.835.549.948.782.294.604.633 1.379.76 2.732l.031 2.029c-.156.016-81.904-.031-81.904-.031s-81.647.022-81.78 0z"
                fill="rgb(94,94,102)"
                fillOpacity="1"
                strokeWidth=".336"
              />
              <path
                d="M1.874 90.379C.771 89.944.161 88.81.161 87.194v-1.487h163.69v1.539c0 1.557-.331 3.05-2.16 3.206l-79.257.138c-44.57.033-80.178-.06-80.56-.211z"
                fill="rgb(74,74,82)"
                fillOpacity="1"
                strokeWidth=".315"
              />
              <g
                transform="matrix(.39529 0 0 .3293 204.29 94.507)"
                fill="rgb(54,54,62)"
                fillOpacity="1"
              >
                <path d="M-161.583 65.007c1.403-1.584 38.76-75.55 38.76-76.745 0-.278-3.718-.505-8.262-.505h-8.262l-9.681 19.25-9.681 19.25-.057-19.25-.057-19.25h-16.091l.295 37.396c.278 35.14.41 37.523 2.2 39.5 2.415 2.666 8.608 2.868 10.836.354z" />
                <path d="M-161.583 65.007c1.403-1.584 38.839-76.025 38.839-77.22 0-.278-3.797-.03-8.341-.03h-8.262l-9.681 19.25-9.681 19.25-.057-19.25-.057-19.25h-16v35.35c0 36.427.407 40.727 4.04 42.67 2.87 1.537 7.5 1.15 9.2-.77z" />
              </g>
              <g
                transform="matrix(.40909 0 0 .32691 79.332 94.48)"
                fill="rgb(54,54,62)"
                fillOpacity="1"
              >
                <path d="M-136.064 65.007c-1.403-1.584-38.76-75.55-38.76-76.745 0-.278 3.719-.505 8.263-.505h8.262l9.68 19.25 9.682 19.25.057-19.25.057-19.25h16.091l-.296 37.396c-.277 35.14-.41 37.523-2.2 39.5-2.415 2.666-8.608 2.868-10.835.354z" />
                <path d="M-136.064 65.007c-1.403-1.584-38.912-76.124-38.912-77.319 0-.278 3.87.069 8.415.069h8.262l9.68 19.25 9.682 19.25.057-19.25.057-19.25h16v35.35c0 36.427-.407 40.727-4.04 42.67-2.87 1.537-7.5 1.15-9.2-.77z" />
              </g>
            </g>
          </svg>
        </div>
      )}
    </Spring>
  );
};

export default TopAnimationBottomShelf;
