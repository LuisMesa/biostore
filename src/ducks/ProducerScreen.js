import axios from 'axios';
import {BASE_URL} from './constants';

const CREATE_OFFER = 'CREATE_OFFER';
const CHANGE_OFFERS = 'CHANGE_OFFERS';
const NOTIFICATION = 'NOTIFICATION';

export const fetchOffers = () => async dispatch => {
  const offers = (await axios.get(BASE_URL + '/offersbyproducer/1/')).data;
  dispatch({
    type: CHANGE_OFFERS,
    payload: offers
  });
};

export const createOffer = (newOffer) => async dispatch => {
  const object = newOffer;
  await axios.post(BASE_URL + '/addproduceroffer/', object).then(response => {
    if (response.data.estado === 'ok') {
      dispatch({
        type: NOTIFICATION,
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
    dispatch({
      type: NOTIFICATION,
      payload: 'No se pudo conectar con el servidor, no se han guardado los datos.'
    });
  });
};
const INITIAL_STATE = {
  offers: []
};

export default function ProducerScreen(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_OFFERS: {
      return {...state, offers: clearData(action.payload)};
    }
    case CREATE_OFFER: {
      return {...state, offers: [...state.offers, action.payload]};
    }
    case NOTIFICATION: {
      return state;
    }
    default:
      return state;
  }
};

const clearData = (oldData) => {
  // console.log(oldData);
  return oldData.map((item, index) => {
    const fixed = {
      id: item.pk,
      name: item.pk,
      amount: item.fields.count,
      price: item.fields.unit_price,
      createdAt: new Date(item.fields.create_at),
      deliveryDate: new Date(item.fields.available_at),
      editable: item.fields.editable,
      state: item.fields.state
    };
    // console.log(fixed,item.create_at);
    return fixed;
  })
};

const max = 2 * 7 * 24 * 60 * 60 * 1000;
const min = 0;
const tempOffers = [
  {id: '1', name: 'Producto12', amount: '2', price: '34400', createdAt: new Date(Date.now() - Math.floor((Math.random() * max) + min)), deliveryDate: new Date(Date.now() - Math.floor((Math.random() * max) + min)), editable: true, state: 'Pendiente'},
  {id: '2', name: 'Producto12', amount: '2', price: '34400', createdAt: new Date(Date.now() - Math.floor((Math.random() * max) + min)), deliveryDate: new Date(Date.now() - Math.floor((Math.random() * max) + min)), editable: true, state: 'Pendiente'},
  {id: '3', name: 'Producto12', amount: '2', price: '34400', createdAt: new Date(Date.now() - Math.floor((Math.random() * max) + min)), deliveryDate: new Date(Date.now() - Math.floor((Math.random() * max) + min)), editable: true, state: 'Pendiente'},
  {id: '4', name: 'Producto12', amount: '2', price: '34400', createdAt: new Date(Date.now() - Math.floor((Math.random() * max) + min)), deliveryDate: new Date(Date.now() - Math.floor((Math.random() * max) + min)), editable: true, state: 'Pendiente'},
  {id: '5', name: 'Producto12', amount: '2', price: '34400', createdAt: new Date(Date.now() - Math.floor((Math.random() * max) + min)), deliveryDate: new Date(Date.now() - Math.floor((Math.random() * max) + min)), editable: true, state: 'Pendiente'},
  {id: '6', name: 'Producto12', amount: '2', price: '34400', createdAt: new Date(Date.now() - Math.floor((Math.random() * max) + min)), deliveryDate: new Date(Date.now() - Math.floor((Math.random() * max) + min)), editable: true, state: 'Pendiente'},
  {id: '7', name: 'Producto12', amount: '2', price: '34400', createdAt: new Date(Date.now() - Math.floor((Math.random() * max) + min)), deliveryDate: new Date(Date.now() - Math.floor((Math.random() * max) + min)), editable: true, state: 'Pendiente'},
  {id: '8', name: 'Producto12', amount: '2', price: '34400', createdAt: new Date(Date.now() - Math.floor((Math.random() * max) + min)), deliveryDate: new Date(Date.now() - Math.floor((Math.random() * max) + min)), editable: true, state: 'Pendiente'},
  {id: '9', name: 'Producto12', amount: '2', price: '34400', createdAt: new Date(Date.now() - Math.floor((Math.random() * max) + min)), deliveryDate: new Date(Date.now() - Math.floor((Math.random() * max) + min)), editable: true, state: 'Pendiente'},
  {id: '10', name: 'Producto12', amount: '2', price: '34400', createdAt: new Date(Date.now() - Math.floor((Math.random() * max) + min)), deliveryDate: new Date(Date.now() - Math.floor((Math.random() * max) + min)), editable: true, state: 'Pendiente'},
];