const BACIAL_IN_CART = "BACIAL_IN_CART";
const BACIAL_NOT_IN_CART = "BACIAL_NOT_IN_CART";
const CALM_IN_CART = "CALM_IN_CART";
const CALM_NOT_IN_CART = "CALM_NOT_IN_CART";
const CBD_IN_CART = "CBD_IN_CART";
const CBD_NOT_IN_CART = "CBD_NOT_IN_CART";
const CHEM_PEEL_IN_CART = "CHEM_PEEL_IN_CART";
const CHEM_PEEL_NOT_IN_CART = "CHEM_PEEL_NOT_IN_CART";
const CLARIFY_IN_CART = "CLARIFY_IN_CART";
const CLARIFY_NOT_IN_CART = "CLARIFY_NOT_IN_CART";
const DERMAPLANE_IN_CART = "DERMAPLANE_IN_CART";
const DERMAPLANE_NOT_IN_CART = "DERMAPLANE_NOT_IN_CART";
const GLOW_IN_CART = "GLOW_IN_CART";
const GLOW_NOT_IN_CART = "GLOW_NOT_IN_CART";
const MICRO_IN_CART = "MICRO_IN_CART";
const MICRO_NOT_IN_CART = "MICRO_NOT_IN_CART";
const QUENCH_IN_CART = "QUENCH_IN_CART";
const QUENCH_NOT_IN_CART = "QUENCH_NOT_IN_CART";
const QUICKIE_IN_CART = "QUICKIE_IN_CART";
const QUICKIE_NOT_IN_CART = "QUICKIE_NOT_IN_CART";
const REJUVENATE_IN_CART = "REJUVENATE_IN_CART";
const REJUVENATE_NOT_IN_CART = "REJUVENATE_NOT_IN_CART";

const treatmentsArrReducer = (state = { treatments_arr: [] }, action) => {
  const treatments_arr_clone = [...state.treatments_arr];

  switch (action.type) {
    case BACIAL_IN_CART:
    case CALM_IN_CART:
    case CBD_IN_CART:
    case CHEM_PEEL_IN_CART:
    case CLARIFY_IN_CART:
    case DERMAPLANE_IN_CART:
    case GLOW_IN_CART:
    case MICRO_IN_CART:
    case QUENCH_IN_CART:
    case QUICKIE_IN_CART:
    case REJUVENATE_IN_CART:
      return {
        ...state,
        treatments_arr: treatments_arr_clone.concat({
          name: action.payload.name,
          price: action.payload.price
        })
      };
    case BACIAL_NOT_IN_CART:
    case CALM_NOT_IN_CART:
    case CBD_NOT_IN_CART:
    case CHEM_PEEL_NOT_IN_CART:
    case CLARIFY_NOT_IN_CART:
    case DERMAPLANE_NOT_IN_CART:
    case GLOW_NOT_IN_CART:
    case MICRO_NOT_IN_CART:
    case QUENCH_NOT_IN_CART:
    case QUICKIE_NOT_IN_CART:
    case REJUVENATE_NOT_IN_CART:
      return {
        ...state,
        treatments_arr:
          treatments_arr_clone.length > 0
            ? treatments_arr_clone.filter(
                item => item.name !== action.payload.name
              )
            : []
      };
    default:
      return { ...state };
  }
};

export default treatmentsArrReducer;
