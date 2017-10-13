import axios from 'axios';
import {BASE_URL} from './constants';

const CREATE_OFFER = 'CREATE_OFFER';
const NOTIFICATION='NOTIFICATION';


export const createOffer = (newOffer) => async dispatch => {
  const object = newOffer;
  console.log(object);
  await axios.post(BASE_URL + '/addproduceroffer/', object).then(response => {
    if (response.data.estado === 'ok') {
      dispatch({
        type: CREATE_OFFER,
        payload: object
      });
    }
    else {
      dispatch({
        type: NOTIFICATION,
        payload: 'El servidor ha rechazado los datos.'
      });
    }
  }).catch(error => {
    console.log(error);
    dispatch({
      type: NOTIFICATION,
      payload: 'No se pudo conectar con el servidor, no se han guardado los datos.'
    });
  });
};
const INITIAL_STATE = {
  offers:[ ]
};

export default function ProducerScreen(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_OFFER: {
      console.log('bin')
      return {...state, offers: [...state.offers, action.payload]};
    }
    default:
      return state;
  }
};