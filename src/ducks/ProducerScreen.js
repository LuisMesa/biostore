import axios from 'axios';
import {BASE_URL} from './constants';
import {getProductName} from '../others/usefulFunctions';

const CREATE_OFFER = 'CREATE_OFFER';
const CHANGE_OFFERS = 'CHANGE_OFFERS';
const CHANGE_ORDERS = 'CHANGE_ORDERS';
const NOTIFICATION = 'NOTIFICATION';

export const fetchOffers = () => async dispatch => {
  const offers = (await axios.get(BASE_URL + '/offersbyproducer/1/')).data;
  dispatch({
    type: CHANGE_OFFERS,
    payload: offers
  });
};
export const fetchOrders = () => async dispatch => {
  const orders = (await axios.get(BASE_URL + '/ordersbyproducer/1/')).data;
  // const orders =[];
  dispatch({
    type: CHANGE_ORDERS,
    payload: orders
  });
};

export const createOffer = (newOffer) => async dispatch => {
  const object = newOffer;
  // console.log(object);
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
  offers: [],
  orders: []
};

export default function ProducerScreen(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_OFFERS: {
      return {...state, offers: clearData(action.payload)};
    }
    case CHANGE_ORDERS: {
      return {...state, orders: clearOrdersData(action.payload)};
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
  return oldData.map((item, index) => {
    const fixed = {
      id: item.pk,
      name: getProductName(item.fields.productType),
      amount: item.fields.count,
      price: item.fields.unit_price,
      createdAt: new Date(item.fields.create_at),
      deliveryDate: new Date(item.fields.available_at),
      // editable: item.fields.editable,
      state: item.fields.state
    };
    // console.log(fixed)
    return fixed;
  })
};

const clearOrdersData = (oldData) => {
  return oldData.map((item, index) => {
    const fixed = {
      id: item.order.id,
      name: item.offer.productType.title,
      amount: item.count,
      price: item.offer.unit_price,
      // createdAt: new Date(item.fields.create_at),
      deliveryDate: new Date(item.order.delivery_at),
      address: item.order.shipping_address,
      // state: item.fields.state
    };
    return fixed;
  })
};