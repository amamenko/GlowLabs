const BEARD_IN_CART = "BEARD_IN_CART";
const BEARD_NOT_IN_CART = "BEARD_NOT_IN_CART";
const DERMAROLLING_IN_CART = "DERMAROLLING_IN_CART";
const DERMAROLLING_NOT_IN_CART = "DERMAROLLING_NOT_IN_CART";
const EXTRACTION_IN_CART = "EXTRACTION_IN_CART";
const EXTRACTION_NOT_IN_CART = "EXTRACTION_NOT_IN_CART";
const GUASHA_IN_CART = "GUASHA_IN_CART";
const GUASHA_NOT_IN_CART = "GUASHA_NOT_IN_CART";
const HYDROJELLY_IN_CART = "HYDROJELLY_IN_CART";
const HYDROJELLY_NOT_IN_CART = "HYDROJELLY_NOT_IN_CART";
const LED_IN_CART = "LED_IN_CART";
const LED_NOT_IN_CART = "LED_NOT_IN_CART";
const MICROCURRENT_IN_CART = "MICROCURRENT_IN_CART";
const MICROCURRENT_NOT_IN_CART = "MICROCURRENT_NOT_IN_CART";
const MICRODERMABRASION_IN_CART = "MICRODERMABRASION_IN_CART";
const MICRODERMABRASION_NOT_IN_CART = "MICRODERMABRASION_NOT_IN_CART";
const NANONEEDLING_IN_CART = "NANONEEDLING_IN_CART";
const NANONEEDLING_NOT_IN_CART = "NANONEEDLING_NOT_IN_CART";
const ADD_ONS_CART_RESET = "ADD_ONS_CART_RESET";

const addOnsArrReducer = (state = { add_ons_arr: [] }, action) => {
  const add_ons_arr_clone = [...state.add_ons_arr];

  switch (action.type) {
    case BEARD_IN_CART:
    case DERMAROLLING_IN_CART:
    case EXTRACTION_IN_CART:
    case GUASHA_IN_CART:
    case HYDROJELLY_IN_CART:
    case LED_IN_CART:
    case MICROCURRENT_IN_CART:
    case MICRODERMABRASION_IN_CART:
    case NANONEEDLING_IN_CART:
      return {
        ...state,
        add_ons_arr: add_ons_arr_clone.concat({
          name: action.payload.name,
          price: action.payload.price,
          duration: action.payload.duration
        })
      };
    case BEARD_NOT_IN_CART:
    case DERMAROLLING_NOT_IN_CART:
    case EXTRACTION_NOT_IN_CART:
    case GUASHA_NOT_IN_CART:
    case HYDROJELLY_NOT_IN_CART:
    case LED_NOT_IN_CART:
    case MICROCURRENT_NOT_IN_CART:
    case MICRODERMABRASION_NOT_IN_CART:
    case NANONEEDLING_NOT_IN_CART:
      return {
        ...state,
        add_ons_arr: add_ons_arr_clone.filter(
          item => item.name !== action.payload.name
        )
      };
    case ADD_ONS_CART_RESET:
      return {
        ...state,
        add_ons_arr: []
      };
    default:
      return { ...state };
  }
};

export default addOnsArrReducer;
