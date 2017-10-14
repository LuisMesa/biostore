import axios from 'axios';
import {BASE_URL} from './constants';

//Constants
const CHANGE_USER = 'CHANGE_USER';
const LOGIN_FAILED = 'LOGIN_FAILED';
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
const NOTIFICATION = 'NOTIFICATION';

//Actions Creators
export const doLogin = () => async dispatch => {
  //Do Login and get a response with a user inside
  //TODO complete this with the correct url
  // const response = await axios.get(BASE_URL + 'FIXFIXFIX');
  const response = {user: {name: 'Name1'}, state: true};
  if (response.state) {
    dispatch({
      type: CHANGE_USER,
      payload: response.user
    });
  }
  else {
    dispatch({
      type: LOGIN_FAILED,
    });
  }
};

export const addProductToCart = (product) => {
  return {
    type:ADD_PRODUCT_TO_CART,
    payload: product
  }
};

export const createOrder = (idClient, shippingAddress, delivery_at, items) => async dispatch =>{
// //created_at, delivery_at, shipping_address, consumer_id, order_items, (count, offer_id)
  const object = {
    create_at: Date.now(),
    delivery_at: delivery_at,
    shipping_address: shippingAddress,
    consumer_id: 1,
    order_items: items
  };
  await axios.post(BASE_URL + '/createorder/', object).then(response => {
    if (response.data.estado === 'ok') {
      dispatch({
        type: NOTIFICATION,
        payload: 'Exitoso'
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

//Reducer's Initial state
const INITIAL_STATE = {
  user: null,
  cart: {
    products: []
  }
};
//Reducer
export default function common(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_USER:
      return {...state, user: action.payload};
    case ADD_PRODUCT_TO_CART:
      return Object.assign({},state,{cart:{products:[...state.cart.products,action.payload]}});
    case NOTIFICATION:{
      return state;
    }
    default:
      return state;
  }
};
