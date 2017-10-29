import axios from 'axios';
import {BASE_URL} from './constants';

//Constants
const CHANGE_RECENT_PRODUCTS = 'CHANGE_RECENT_PRODUCTS';

//Actions Creators
export const fetchRecentProducts = () => async dispatch => {
  const offers = (await axios.get(BASE_URL + '/adminoffers/')).data;
  dispatch({
    type: CHANGE_RECENT_PRODUCTS,
    payload: offers
  });
};


//Reducer's Initial state
const INITIAL_STATE = {
  user: null,
  recentProducts: []
};
//Reducer
export default function HomeScreen(state = INITIAL_STATE, action){
  switch (action.type) {
    case CHANGE_RECENT_PRODUCTS:
      // return {...state, recentProducts: action.payload};
      return {...state, recentProducts: clearOffersData(action.payload).slice(0,9)};
    default:
      return state;
  }
};

const clearOffersData = (oldData) => {
  // console.log('oldData',oldData);
  return oldData.map((item, index) => {
    const fixed = {
      id: item.id,
      src: item.productType.url,
      nombre: item.productType.title,
      categoria: item.productType.description,
      precio: item.unit_price,
      unidad: item.unit_type,
      fechaEntrega: item.delivery_date,
      cantidad: item.count,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    };
    return fixed;
  });
}

const products = [
  {src: './img/items/manzana.jpg', nombre: 'Manzana', categoria: 'Frutas', precio: '2500', unidad: 'Libra'},
  {src: './img/items/arveja.jpg', nombre: 'Arveja', categoria: 'Verduras', precio: '2500', unidad: 'Libra'},
  {src: './img/items/huevo.jpg', nombre: 'Huevo', categoria: 'Granja', precio: '300', unidad: 'Unidad'},
  {src: './img/items/durazno.jpg', nombre: 'Durazno', categoria: 'Frutas', precio: '2500', unidad: 'Libra'},
  {src: './img/items/frambuesa.jpg', nombre: 'Frambuesa', categoria: 'Frutas', precio: '4000', unidad: 'Libra'},
  {src: './img/items/queso.jpg', nombre: 'Queso', categoria: 'Granja', precio: '2500', unidad: 'Libra'},
  {src: './img/items/ciruela.jpg', nombre: 'Ciruela', categoria: 'Frutas', precio: '1000', unidad: 'Libra'},
  {src: './img/items/papa.jpg', nombre: 'Papa', categoria: 'Vegetales', precio: '500', unidad: 'Libra'},
  {src: './img/items/pera.jpg', nombre: 'Pera', categoria: 'Frutas', precio: '1500', unidad: 'Libra'},
];

