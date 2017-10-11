import axios from 'axios';
import {BASE_URL} from './constants';

const CHANGE_PRODUCERS_OFFERS='CHANGE_PRODUCERS_OFFERS';
const SET_STATE_PRODUCERS_OFFERS='SET_STATE_PRODUCERS_OFFERS';

export const fetchProducersOffers = () => async dispatch => {
  const offers = (await axios.get(BASE_URL + 'products/baseproducts/')).data;
  dispatch({
    type: CHANGE_PRODUCERS_OFFERS,
    payload: offers
  });
};



const INITIAL_STATE={
  producersOffers:[],
  adminOffers:[],
  producersOrders:[],
  customersOrders:[],
};

export default function AdminScreen(state = INITIAL_STATE, action){
  switch (action.type) {
    case CHANGE_PRODUCERS_OFFERS:
      // TODO return {...state, producersOffers: action.payload};
      return {...state, producersOffers: producersOffers};
    default:
      return state;
  }
};

const max = 2 * 7 * 24 * 60 * 60 * 1000;
const min = 0;
const producersOffers = [
  [{data: 'Producto12'}, {data: '2'}, {data: '34400'}, {data: 'Productor1'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date', filter: true}, {data: true, type: 'lock'}, {data: 'Pendiente', type: 'close-check-info'},{data: '1', type:'ID'}],
  [{data: 'Producto1'}, {data: '2'}, {data: '34400'}, {data: 'Productor1'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date', filter: true}, {data: false, type: 'lock'}, {data: 'Pendiente', type: 'close-check-info'}],
  [{data: 'Producto1'}, {data: '2'}, {data: '34400'}, {data: 'Productor1'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date', filter: true}, {data: true, type: 'lock'}, {data: 'Pendiente', type: 'close-check-info'}],
  [{data: 'Producto1'}, {data: '2'}, {data: '34400'}, {data: 'Productor1'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date', filter: true}, {data: true, type: 'lock'}, {data: 'Pendiente', type: 'close-check-info'}],
  [{data: 'Producto1'}, {data: '2'}, {data: '34400'}, {data: 'Productor1'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date', filter: true}, {data: true, type: 'lock'}, {data: 'Pendiente', type: 'close-check-info'}],
  [{data: 'Producto1'}, {data: '2'}, {data: '34400'}, {data: 'Productor1'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date', filter: true}, {data: true, type: 'lock'}, {data: 'Pendiente', type: 'close-check-info'}],
  [{data: 'Producto1'}, {data: '2'}, {data: '34400'}, {data: 'Productor1'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date', filter: true}, {data: true, type: 'lock'}, {data: 'Pendiente', type: 'close-check-info'}],
  [{data: 'Producto1'}, {data: '2'}, {data: '34400'}, {data: 'Productor1'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date', filter: true}, {data: true, type: 'lock'}, {data: 'Pendiente', type: 'close-check-info'}],
  [{data: 'Producto1'}, {data: '2'}, {data: '34400'}, {data: 'Productor1'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date'}, {data: new Date(Date.now() - Math.floor((Math.random() * max) + min)), type: 'date', filter: true}, {data: true, type: 'lock'}, {data: 'Pendiente', type: 'close-check-info'}],
];