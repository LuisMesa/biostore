import axios from 'axios';
import {BASE_URL} from './constants';

const CHANGE_PRODUCERS_OFFERS = 'CHANGE_PRODUCERS_OFFERS';
const SET_STATE_SOME_PRODUCERS_OFFERS = 'SET_STATE_SOME_PRODUCERS_OFFERS';
const NOTIFICATION = 'NOTIFICATION';
const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION';
const CREATE_OFFER = 'CREATE_OFFER';

export const fetchProducersOffers = () => async dispatch => {

  const offers = (await axios.get(BASE_URL + '/producersoffers')).data;
  dispatch({
    type: CHANGE_PRODUCERS_OFFERS,
    payload: offers
  });
};

export const setStateSomeProducersOffers = (ids, newState) => {
  return {
    type: SET_STATE_SOME_PRODUCERS_OFFERS,
    payload: {ids, newState}
  };
};

export const saveProducersOffers = (acceptedIds, canceledIds) => async dispatch => {
  const object = {acceptedIds, canceledIds};
  //TODO
  await axios.post(BASE_URL + '/prueba/', object).then(response => {
    if (response.data.estado === 'ok') {
      dispatch({
        type: NOTIFICATION,
        payload: 'Datos guardados.'
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

export const deleteNotification = () => {
  return {
    type: DELETE_NOTIFICATION,
  }
};

export const createOffer = (newOffer) => async dispatch => {
  const object = newOffer;
  await axios.post(BASE_URL + '/prueba/', object).then(response => {
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
  producersOffers: [],
  adminOffers: [],
  producersOrders: [],
  customersOrders: [],
  notifications: []
};

export default function AdminScreen(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_PRODUCERS_OFFERS: {
      // TODO return {...state, producersOffers: action.payload};
      return {...state, producersOffers: producersOffers};
    }
    case SET_STATE_SOME_PRODUCERS_OFFERS: {
      const stateCopy = {...state};
      const newArray = stateCopy.producersOffers.map(offer => {
            if (action.payload.ids.find(id => id === offer.id)) {
              offer.state = action.payload.newState;
            }
            return offer
          }
      );
      return {...state, producersOffers: newArray};
    }
    case NOTIFICATION: {
      return {...state, notifications: [...state.notifications, action.payload]};
    }
    case DELETE_NOTIFICATION: {
      const newArray = [...state.notifications];
      newArray.shift();
      return {...state, notifications: newArray};
    }
    default:
      return state;
  }
};

const max = 2 * 7 * 24 * 60 * 60 * 1000;
const min = 0;
// const producersOffers = [
//   {id: '1', items: [{data: 'Producto12'}, {data: '2'}, {data: '34400'}, {data: 'Productor1'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date', filter: true}, {data: true, type: 'editable'}, {data: 'Pendiente', type: 'state'}]},
//   {id: '2', items: [{data: 'Producto1'}, {data: '2'}, {data: '34400'}, {data: 'Productor1'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date', filter: true}, {data: false, type: 'editable'}, {data: 'Pendiente', type: 'state'}]},
//   {id: '3', items: [{data: 'Producto1'}, {data: '2'}, {data: '34400'}, {data: 'Productor1'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date', filter: true}, {data: true, type: 'editable'}, {data: 'Pendiente', type: 'state'}]},
//   {id: '4', items: [{data: 'Producto1'}, {data: '2'}, {data: '34400'}, {data: 'Productor1'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date', filter: true}, {data: true, type: 'editable'}, {data: 'Pendiente', type: 'state'}]},
//   {id: '5', items: [{data: 'Producto1'}, {data: '2'}, {data: '34400'}, {data: 'Productor1'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date', filter: true}, {data: true, type: 'editable'}, {data: 'Pendiente', type: 'state'}]},
//   {id: '6', items: [{data: 'Producto1'}, {data: '2'}, {data: '34400'}, {data: 'Productor1'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date', filter: true}, {data: true, type: 'editable'}, {data: 'Pendiente', type: 'state'}]},
//   {id: '7', items: [{data: 'Producto1'}, {data: '2'}, {data: '34400'}, {data: 'Productor1'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date', filter: true}, {data: true, type: 'editable'}, {data: 'Pendiente', type: 'state'}]},
//   {id: '8', items: [{data: 'Producto1'}, {data: '2'}, {data: '34400'}, {data: 'Productor1'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date', filter: true}, {data: true, type: 'editable'}, {data: 'Pendiente', type: 'state'}]},
//   {id: '9', items: [{data: 'Producto1'}, {data: '2'}, {data: '34400'}, {data: 'Productor1'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date', filter: true}, {data: true, type: 'editable'}, {data: 'Pendiente', type: 'state'}]},
// ];
const producersOffers = [
  {id: '1', name: 'Producto12', amount: '2', price: '34400', producer: 'Productor1', createdAt: new Date(Date.now() - Math.floor((Math.random() * max) + min)), deliveryDate: new Date(Date.now() - Math.floor((Math.random() * max) + min)), editable: true, state: 'Pendiente'},
  {id: '2', name: 'Producto12', amount: '2', price: '34400', producer: 'Productor1', createdAt: new Date(Date.now() - Math.floor((Math.random() * max) + min)), deliveryDate: new Date(Date.now() - Math.floor((Math.random() * max) + min)), editable: true, state: 'Pendiente'},
  {id: '3', name: 'Producto12', amount: '2', price: '34400', producer: 'Productor1', createdAt: new Date(Date.now() - Math.floor((Math.random() * max) + min)), deliveryDate: new Date(Date.now() - Math.floor((Math.random() * max) + min)), editable: true, state: 'Pendiente'},
  {id: '4', name: 'Producto12', amount: '2', price: '34400', producer: 'Productor1', createdAt: new Date(Date.now() - Math.floor((Math.random() * max) + min)), deliveryDate: new Date(Date.now() - Math.floor((Math.random() * max) + min)), editable: true, state: 'Pendiente'},
  {id: '5', name: 'Producto12', amount: '2', price: '34400', producer: 'Productor1', createdAt: new Date(Date.now() - Math.floor((Math.random() * max) + min)), deliveryDate: new Date(Date.now() - Math.floor((Math.random() * max) + min)), editable: true, state: 'Pendiente'},
  {id: '6', name: 'Producto12', amount: '2', price: '34400', producer: 'Productor1', createdAt: new Date(Date.now() - Math.floor((Math.random() * max) + min)), deliveryDate: new Date(Date.now() - Math.floor((Math.random() * max) + min)), editable: true, state: 'Pendiente'},
  {id: '7', name: 'Producto12', amount: '2', price: '34400', producer: 'Productor1', createdAt: new Date(Date.now() - Math.floor((Math.random() * max) + min)), deliveryDate: new Date(Date.now() - Math.floor((Math.random() * max) + min)), editable: true, state: 'Pendiente'},
  {id: '8', name: 'Producto12', amount: '2', price: '34400', producer: 'Productor1', createdAt: new Date(Date.now() - Math.floor((Math.random() * max) + min)), deliveryDate: new Date(Date.now() - Math.floor((Math.random() * max) + min)), editable: true, state: 'Pendiente'},
  {id: '9', name: 'Producto12', amount: '2', price: '34400', producer: 'Productor1', createdAt: new Date(Date.now() - Math.floor((Math.random() * max) + min)), deliveryDate: new Date(Date.now() - Math.floor((Math.random() * max) + min)), editable: true, state: 'Pendiente'},
  {id: '10', name: 'Producto12', amount: '2', price: '34400', producer: 'Productor1', createdAt: new Date(Date.now() - Math.floor((Math.random() * max) + min)), deliveryDate: new Date(Date.now() - Math.floor((Math.random() * max) + min)), editable: true, state: 'Pendiente'},

];