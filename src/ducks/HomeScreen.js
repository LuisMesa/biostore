import axios from 'axios';
import {BASE_URL} from './constants';

//Constants
const CHANGE_RECENT_PRODUCTS = 'CHANGE_RECENT_PRODUCTS';

//Actions Creators
export const getRecentProducts = () => async dispatch => {
  const products = (await axios.get(BASE_URL + 'products/baseproducts/')).data;

  dispatch({
    type: CHANGE_RECENT_PRODUCTS,
    payload: products
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
      // TODO return {...state, recentProducts: action.payload};
      return {...state, recentProducts: products};
    default:
      return state;
  }
};
//TODO This array is temporal it will be deleted soon
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

