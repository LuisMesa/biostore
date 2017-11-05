import axios from 'axios';
import {BASE_URL} from './constants';

const CHANGE_PRODUCERS_OFFERS = 'CHANGE_PRODUCERS_OFFERS';
const CHANGE_ADMIN_OFFERS = 'CHANGE_ADMIN_OFFERS';
const CHANGE_CUSTOMER_ORDERS = 'CHANGE_CUSTOMER_ORDERS';
const CHANGE_PRODUCERS_ORDERS = 'CHANGE_PRODUCERS_ORDERS';
const CHANGE_PRODUCERS = 'CHANGE_PRODUCERS';
const SET_STATE_SOME_PRODUCERS_OFFERS = 'SET_STATE_SOME_PRODUCERS_OFFERS';
const NOTIFICATION = 'NOTIFICATION';
const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION';
const CREATE_OFFER = 'CREATE_OFFER';
const CREATE_PRODUCER = 'CREATE_PRODUCER';

export const fetchProducersOffers = () => async dispatch => {
  const offers = (await axios.get(BASE_URL + '/producersoffers')).data;
  dispatch({
    type: CHANGE_PRODUCERS_OFFERS,
    payload: offers
  });
};
export const fetchAdminOffers = () => async dispatch => {
  const offers = (await axios.get(BASE_URL + '/adminoffers')).data;
  dispatch({
    type: CHANGE_ADMIN_OFFERS,
    payload: offers
  });
};
export const fetchCustomerOffers = () => async dispatch => {
  const offers = (await axios.get(BASE_URL + '/orders')).data;
  dispatch({
    type: CHANGE_CUSTOMER_ORDERS,
    payload: offers
  });
};
export const fetchProducers = () => async dispatch => {
  const producers = (await axios.get(BASE_URL + '/producers/')).data;
  dispatch({
    type: CHANGE_PRODUCERS,
    payload: producers
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
  // console.log(object);
  await axios.post(BASE_URL + '/saveoffers/', object).then(response => {
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
    dispatch({
      type: NOTIFICATION,
      payload: 'No se pudo conectar con el servidor, no se han guardado los datos.'
    });
  });
};

export const createProducer = (newProducer) => async dispatch => {
  const object = newProducer;
  console.log(object);
  await axios.post(BASE_URL + '/addproducer/', object).then(response => {
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

export const createAdminOffer = (newOffer) => async dispatch => {
  const object = newOffer;
  await axios.post(BASE_URL + '/addadminoffer/', object).then(response => {
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
  producers:[],
  notifications: []
};

export default function AdminScreen(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_PRODUCERS_OFFERS: {
      return {...state, producersOffers: clearProducersOffers(action.payload)};
    }
    case CHANGE_ADMIN_OFFERS: {
      return {...state, adminOffers: clearAdminOffers(action.payload)};
    }
    case CHANGE_CUSTOMER_ORDERS: {
      return {...state, customersOrders: clearCustomersOrders(action.payload)};
    }
    case CHANGE_PRODUCERS: {
      return {...state, producers: clearProducers(action.payload)};
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
    case CREATE_PRODUCER:{
      // const newProducer = {id: index, mail: 'correo@cor@.com', name: 'Quemado', lastName:'Codigo', address: 'Direccion', phone: '12345678',}
      // return {...state, producers: [...state.producers, action.payload]};
      return state;
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

const clearProducersOffers = (oldData) => {
  return oldData.map((item, index) => {
    const fixed = {
      id: item.id,
      name: item.productType.title,
      amount: item.count,
      price: item.unit_price,
      producer: item.producer.name,
      createdAt: new Date(item.create_at),
      deliveryDate: new Date(item.available_at),
      editable: item.editable,
      state: item.state
    };
    return fixed;
  })
};

const clearAdminOffers = (oldData) => {
  return oldData.map((item, index) => {
    const fixed = {
      id: item.id,
      name: item.productType.title,
      amount: item.count,
      unit:item.unit_type,
      price: item.unit_price,
      createdAt: new Date(item.create_at),
      deliveryDate: new Date(item.delivery_date),
    };
    return fixed;
  })
};

const clearCustomersOrders = (oldData) => {
  return oldData.map((item, index) => {
    const fixed = {
      id: item.order.id,
      name: item.offer.productType.title,
      amount: item.count,
      unit: item.offer.unit_type,
      price: item.offer.unit_price,
      deliveryDate: new Date(item.order.delivery_at),
      client: item.order.consumer.name,
      phone: item.order.consumer.phone_number,
    };
    return fixed;
  })
};
const clearProducers = (oldData) => {
  // console.log(oldData);
  return oldData.map((item, index) => {
    const fixed = {
      id: item.fields.uid,
      mail: item.fields.email,
      name: item.fields.name,
      lastName:item.fields.last_name,
      address: item.fields.address,
      phone: item.fields.phone_number,
    };
    return fixed;
  })
};


const max = 2 * 7 * 24 * 60 * 60 * 1000;
const min = 0;
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