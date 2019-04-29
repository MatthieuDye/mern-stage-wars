import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { returnErrors } from './errorsActions';

import { GET_OFFERS, ADD_OFFER, DELETE_OFFER, OFFERS_LOADING } from './types';

export const getOffers = () => dispatch => {
  dispatch(setOffersLoading());
  axios
    .get('/api/offers')
    .then(res =>
      dispatch({
        type: GET_OFFERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addOffer = offer => (dispatch, getState) => {
  axios
    .post('/api/offer', offer)
    .then(res =>
      dispatch({
        type: ADD_OFFER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteOffer = id => (dispatch, getState) => {
  axios
    .delete('/api/offer/${id}')
    .then(res =>
      dispatch({
        type: DELETE_OFFER,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setOffersLoading = () => {
  return {
    type: OFFERS_LOADING
  };
};