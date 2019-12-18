import React from "react";
import { Spring } from "react-spring/renderprops";

const Sunscreen = () => {
  return (
    <Spring
      from={{ display: "none", opacity: "0" }}
      to={{ display: "inline", opacity: "1" }}
      config={{ delay: 4000, duration: 1500 }}
    >
      {props => (
        <svg
          className="sun_screen"
          width="100%"
          style={{
            display: `${props.display}`,
            opacity: `${props.opacity}`
          }}
          viewBox="0 0 50 50"
        >
          <g id="layer1" transform="translate(0 -700) scale(2.5)">
            <g
              id="g826"
              transform="matrix(.22834 0 0 .24084 122.887 304.474)"
              strokeWidth=".265"
            >
              <path
                d="M-522.46-42.489c-.075-5.351-.37-12.848-.678-17.264-.3-4.293-.725-10.543-.945-13.89a991.81 991.81 0 00-.551-8.004l-.151-1.918h15.864c10.186 0 15.895.093 15.952.26.048.144.015 1.305-.075 2.58-.09 1.276-.415 6.367-.723 11.315-.308 4.948-.691 10.067-.851 11.377-.16 1.31-.346 7.203-.414 13.097-.068 5.893-.18 10.983-.248 11.31l-.125.596h-26.922z"
                id="path840"
                fill="#f9d59b"
              />
              <path
                d="M-522.188-42.753c-.07-6.137-.321-12.7-.68-17.794a6750.04 6750.04 0 01-.966-13.89 699.77 699.77 0 00-.537-7.475l-.142-1.653h31.17l-.09 1.124-.381 4.697c-.277 3.383-.801 11.516-1.755 27.21-.34 5.59-.36 7.162-.1 7.95.212.64.263 1.62.148 2.82-.097 1.012-.197 2.94-.223 4.287l-.047 2.448h-26.286zm24.148-21.517c0-1.388-.064-1.595-.463-1.52-.833.158-.765 3.127.07 3.127.304 0 .393-.364.393-1.607z"
                id="path838"
                fill="#f9d764"
              />
              <path
                d="M-522.188-42.753c-.07-6.137-.321-12.7-.68-17.794a6750.04 6750.04 0 01-.966-13.89 699.77 699.77 0 00-.537-7.475l-.142-1.653h31.17l-.09 1.124-.381 4.697c-.277 3.383-.801 11.516-1.755 27.21-.34 5.59-.36 7.162-.1 7.95.212.64.263 1.62.148 2.82-.097 1.012-.197 2.94-.223 4.287l-.047 2.448h-26.286zm10.494-13.028l.718-1.32-1.257-.796c-.691-.439-1.351-.797-1.466-.797-.323 0-1.54 2.045-1.54 2.588 0 .502 1.653 1.628 2.406 1.639.236.003.737-.574 1.14-1.314zm8.537.647c.631-.37 1.148-.735 1.148-.813 0-.248-1.365-2.478-1.609-2.628-.363-.225-2.624 1.202-2.624 1.656 0 .666 1.127 2.458 1.546 2.458.215 0 .908-.303 1.54-.673zm-3.672-4.236c2.143-.895 3.317-2.642 3.32-4.937.001-1.988-1.022-3.725-2.733-4.64-2.487-1.33-5.743-.386-7.12 2.063-.65 1.157-.813 3.3-.342 4.5 1.052 2.68 4.283 4.097 6.875 3.014zm8.92-4.88v-1.72l-1.168-.084c-.644-.046-1.453-.013-1.8.074-.583.147-.623.268-.55 1.671l.08 1.513 1.19.164c2.256.309 2.249.314 2.249-1.619zm-18.255-.133c0-1.577-.005-1.588-.809-1.667-.445-.043-1.13.043-1.521.192-.64.243-.713.404-.713 1.557 0 .707.085 1.37.188 1.473.104.104.788.153 1.522.11l1.333-.078zm3.854-6.26c.559-.314 1.07-.71 1.135-.881.133-.345-1.296-2.78-1.63-2.78-.117 0-.775.355-1.461.79l-1.248.792.671 1.325c.755 1.489 1.063 1.58 2.533.754zm9.64-.754l.672-1.325-1.248-.791c-.686-.436-1.342-.792-1.457-.792-.32 0-1.54 2.044-1.537 2.575.003.499 1.674 1.627 2.44 1.647.29.007.705-.475 1.13-1.314z"
                id="path836"
                fill="#f7bd69"
              />
              <path
                d="M-521.854-40.108c-.001-5.977-.648-19.756-1.183-25.201-.079-.8-.318-4.372-.532-7.938-.215-3.565-.462-7.345-.55-8.4l-.16-1.918h25.188l-.07 8.665-.07 8.665-1.058.132-1.059.132-.08 1.525c-.055 1.081.021 1.552.265 1.618.19.05.702.2 1.138.333l.794.241.132 9.916.133 9.915 1.587.133 1.588.132.077 1.918.078 1.918h-1.414c-.778 0-1.557.143-1.731.318-.2.199-.318 1.188-.318 2.646v2.328h-22.754l-.002-7.078zm10.189-15.678l.671-1.326-1.248-.791c-.686-.435-1.346-.791-1.466-.791-.312 0-1.82 2.439-1.711 2.768.123.377 2.06 1.455 2.624 1.46.286.003.71-.492 1.13-1.32zm8.445.725c.57-.325 1.078-.714 1.127-.865.108-.329-1.4-2.768-1.71-2.768-.12 0-.785.358-1.476.797l-1.257.797.718 1.32c.4.736.904 1.317 1.139 1.314.232-.002.888-.27 1.459-.595zm-3.61-4.309c2.116-.884 3.312-2.638 3.328-4.88.02-2.994-1.93-5.055-4.954-5.236-2.13-.128-3.68.651-4.758 2.393-.607.98-.754 1.522-.754 2.785 0 1.73.404 2.725 1.55 3.813 1.554 1.474 3.712 1.909 5.589 1.125zm-9.334-5.013c0-1.577-.005-1.588-.809-1.667-.445-.043-1.13.043-1.521.192-.64.243-.713.404-.713 1.557 0 .707.085 1.37.188 1.473.104.104.788.153 1.522.11l1.333-.078zm4.011-6.361c.632-.37 1.148-.764 1.148-.874 0-.346-1.564-2.687-1.794-2.687-.12 0-.78.356-1.467.792l-1.248.791.671 1.325c.396.782.85 1.325 1.107 1.325.24 0 .952-.302 1.583-.672zm9.477-.533c.815-1.39.706-1.669-.99-2.534-1.176-.6-1.38-.507-2.24 1.021-.647 1.152-.574 1.37.722 2.155 1.333.808 1.716.71 2.508-.642z"
                id="path834"
                fill="#f6ab2e"
              />
              <path
                d="M-521.676-39.446c.038-5.568-.448-17.527-.842-20.704-.072-.582-.307-4.154-.523-7.937-.376-6.579-.822-12.78-1.052-14.618l-.108-.86h12.447c11.242 0 12.432.04 12.287.418-.089.23-.16 4.04-.16 8.467v8.048h-.776c-1.196 0-1.606.604-1.606 2.368 0 1.688.232 2.035 1.455 2.173l.794.09.07 9.633c.045 6.366.165 9.75.352 9.976.16.193.995.376 1.915.42l1.632.079v3.175l-1.664.132c-1.064.085-1.758.275-1.928.53-.145.217-.23 1.438-.188 2.711l.075 2.315h-22.225zm9.974-15.29c1.03-1.745 1.196-2.197.966-2.628-.31-.577-2.847-1.942-3.293-1.771-.527.202-2.032 2.968-1.86 3.418.191.496 2.464 1.77 3.173 1.779.324.003.728-.315 1.014-.798zm8.65.109c.702-.382 1.344-.87 1.426-1.085.16-.417-1.017-2.785-1.643-3.304-.297-.247-.636-.176-1.606.335-.676.356-1.443.86-1.705 1.121-.459.456-.445.532.364 2.05.974 1.827 1.274 1.911 3.164.883zm-2.805-4.685c.575-.315 1.405-1.084 1.844-1.709 1.067-1.52 1.283-4.181.468-5.766-2.857-5.556-10.87-3.673-10.894 2.56-.013 3.448 2.89 6.023 6.344 5.626.655-.076 1.662-.395 2.238-.71zm-9.806-3.24c.088-.23.16-1.056.16-1.834 0-2.145-.705-2.61-2.941-1.94-.857.256-1.045.445-1.185 1.19-.266 1.416.077 2.684.761 2.816 1.508.292 3.046.18 3.205-.233zm3.624-7.717c.71-.4 1.354-.889 1.43-1.087.165-.429-1.361-3.194-1.87-3.39-.375-.144-2.842 1.094-3.315 1.664-.208.25-.057.762.57 1.94.991 1.858 1.288 1.94 3.185.873zm9.772-.78c1.001-1.776.94-1.956-1.045-3.078-1.015-.573-1.521-.724-1.81-.542-.544.343-1.919 2.955-1.765 3.353.177.46 2.527 1.757 3.199 1.766.42.006.793-.387 1.42-1.5z"
                id="path832"
                fill="#f5a01a"
              />
              <path
                d="M-521.65-40.637c.062-6.51-.085-10.068-1.016-24.672-.598-9.386-1.196-17.272-1.328-17.525-.132-.253-.24-.52-.24-.595 0-.075 1.37-.136 3.043-.136h3.042V-66.883l-.722.274c-.981.373-1.122.668-1.122 2.358 0 1.711.15 2.014 1.116 2.256l.722.181.07 9.696.069 9.695 2.49.077c2.437.075 2.507.06 3.307-.698 2.24-2.123 4.5-2.192 6.7-.204.975.88 1.122.925 3.52 1.062 1.377.079 3.307.217 4.29.306l1.785.164V-38.898l-1.653.178c-.91.098-5.88.257-11.047.354l-9.392.177-.076 2.58-.076 2.58h-3.552z"
                id="path830"
                fill="#ef9004"
              />
              <path
                d="M-521.57-38.697c-.18-.216-.278-.973-.231-1.786l.08-1.41 1.544-.08c1.947-.101 2.293.174 2.293 1.822 0 .996-.114 1.343-.512 1.556-.756.404-2.809.339-3.174-.102z"
                id="path828"
                fill="#c87300"
              />
            </g>
          </g>
        </svg>
      )}
    </Spring>
  );
};

export default Sunscreen;