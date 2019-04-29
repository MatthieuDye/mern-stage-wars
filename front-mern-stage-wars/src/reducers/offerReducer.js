import {
  GET_OFFERS,
  ADD_OFFER,
  DELETE_OFFER,
  OFFERS_LOADING
} from '../actions/types';

const initialState = {
  offers: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_OFFERS:
      return {
        ...state,
        offers: action.payload,
        loading: false
      };
    case DELETE_OFFER:
      return {
        ...state,
        offers: state.offers.filter(offer => offer._id !== action.payload)
      };
    case ADD_OFFER:
      return {
        ...state,
        offers: [action.payload, ...state.offers]
      };
    case OFFERS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}