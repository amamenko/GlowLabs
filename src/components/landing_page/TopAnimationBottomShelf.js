import React from "react";
import { Spring } from "react-spring/renderprops";
import "./LandingPage.css";

const TopAnimationBottomShelf = props => {
  return (
    <Spring
      from={{ top: "-50%" }}
      to={{ top: props.initialScreenSize >= 768 ? "73%" : "38%" }}
      config={{
        delay: props.initialScreenSize >= 768 ? 3000 : 2000,
        duration: 2000
      }}
    >
      {styles => (
        <div
          className="top_content_bottom_shelf"
          style={{
            top:
              props.currentScreenSize === ""
                ? `${styles.top}`
                : props.currentScreenSize >= 768
                ? "73%"
                : "38%"
          }}
        >
          <svg
            width="100%"
            height={
              props.currentScreenSize === ""
                ? props.initialScreenSize >= 768
                  ? props.initialScreenSize >= 1800
                    ? "35rem"
                    : "20rem"
                  : "7rem"
                : props.currentScreenSize >= 768
                ? "20rem"
                : "7rem"
            }
            viewBox="0 0 100 100"
          >
            <g transform="translate(-30 -62)">
              <path
                d="M.068 83.709c.127-1.353.321-2.324.855-2.733.387-.392.839-.562 1.374-.667.702-.105 79.644-.067 79.644-.067s80.133.075 80.165-.047c.522.226.835.549.948.782.294.604.633 1.379.76 2.732l.031 2.029c-.156.016-81.904-.031-81.904-.031s-81.647.022-81.78 0z"
                id="path868"
                fill="#e2ba88"
                fillOpacity="1"
                strokeWidth=".336"
              />
              <path
                d="M1.874 90.379C.771 89.944.161 88.81.161 87.194v-1.487h163.69v1.539c0 1.557-.331 3.05-2.16 3.206l-79.257.138c-44.57.033-80.178-.06-80.56-.211z"
                id="path916"
                fill="#c89f7b"
                fillOpacity="1"
                strokeWidth=".315"
              />
              <g
                id="g935"
                transform="matrix(.39529 0 0 .3293 204.29 94.507)"
                fill="#8b8894"
                fillOpacity="1"
              >
                <path
                  d="M-161.583 65.007c1.403-1.584 38.76-75.55 38.76-76.745 0-.278-3.718-.505-8.262-.505h-8.262l-9.681 19.25-9.681 19.25-.057-19.25-.057-19.25h-16.091l.295 37.396c.278 35.14.41 37.523 2.2 39.5 2.415 2.666 8.608 2.868 10.836.354z"
                  id="path939"
                />
                <path
                  d="M-161.583 65.007c1.403-1.584 38.839-76.025 38.839-77.22 0-.278-3.797-.03-8.341-.03h-8.262l-9.681 19.25-9.681 19.25-.057-19.25-.057-19.25h-16v35.35c0 36.427.407 40.727 4.04 42.67 2.87 1.537 7.5 1.15 9.2-.77z"
                  id="path937"
                />
              </g>
              <g
                id="g929"
                transform="matrix(.40909 0 0 .32691 79.332 94.48)"
                fill="#8b8894"
                fillOpacity="1"
              >
                <path
                  d="M-136.064 65.007c-1.403-1.584-38.76-75.55-38.76-76.745 0-.278 3.719-.505 8.263-.505h8.262l9.68 19.25 9.682 19.25.057-19.25.057-19.25h16.091l-.296 37.396c-.277 35.14-.41 37.523-2.2 39.5-2.415 2.666-8.608 2.868-10.835.354z"
                  id="path933"
                />
                <path
                  d="M-136.064 65.007c-1.403-1.584-38.912-76.124-38.912-77.319 0-.278 3.87.069 8.415.069h8.262l9.68 19.25 9.682 19.25.057-19.25.057-19.25h16v35.35c0 36.427-.407 40.727-4.04 42.67-2.87 1.537-7.5 1.15-9.2-.77z"
                  id="path931"
                />
              </g>
            </g>
          </svg>
        </div>
      )}
    </Spring>
  );
};

export default TopAnimationBottomShelf;
