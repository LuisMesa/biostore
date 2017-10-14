import axios from 'axios';
import {BASE_URL} from './constants';

const CHANGE_FARM_FILTER = 'CHANGE_FARM_FILTER';
const CHANGE_VEGETABLES_FILTER = 'CHANGE_VEGETABLE_FILTER';
const CHANGE_FRUITS_FILTER = 'CHANGE_FRUITS_FILTER';
const CHANGE_OFFERS_PRODUCTS = 'CHANGE_OFFERS_PRODUCTS';

export const changeFarmFilter = (exclusive) => {
  return {
    type: CHANGE_FARM_FILTER,
    payload: exclusive
  }
};

export const changeVegetablesFilter = (exclusive) => {
  return {
    type: CHANGE_VEGETABLES_FILTER,
    payload: exclusive
  }
};

export const changeFruitsFilter = (exclusive) => {
  return {
    type: CHANGE_FRUITS_FILTER,
    payload: exclusive
  }
};

export const fetchOffers = () => async dispatch => {
  const offers = (await axios.get(BASE_URL + '/adminoffers/')).data;
  dispatch({
    type: CHANGE_OFFERS_PRODUCTS,
    payload: offers
  });
};



const INITIAL_STATE = {
  offers:[],
  filters: {
    farm: true,
    vegetables: true,
    fruits: true
  }
};

export default function ProductsScreen(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_FARM_FILTER: {
      let newFilters = {...state.filters};
      if (action.payload) {
        newFilters.farm = true;
        newFilters.fruits = false;
        newFilters.vegetables = false;
      }
      else
        newFilters.farm = !newFilters.farm;
      return {...state, filters: newFilters};
    }
    case CHANGE_VEGETABLES_FILTER: {
      let newFilters = {...state.filters};
      if (action.payload) {
        newFilters.farm = false;
        newFilters.fruits = false;
        newFilters.vegetables = true;
      }
      else
        newFilters.vegetables = !newFilters.vegetables;
      return {...state, filters: newFilters};
    }
    case CHANGE_FRUITS_FILTER: {
      let newFilters = {...state.filters};
      if (action.payload) {
        newFilters.farm = false;
        newFilters.fruits = true;
        newFilters.vegetables = false;
      }
      else
        newFilters.fruits = !newFilters.fruits;
      return {...state, filters: newFilters};
    }
    case CHANGE_OFFERS_PRODUCTS: {
      return {...state, offers: clearOffersData(action.payload)};
    }
    default:
      return state;
  }
}

const clearOffersData = (oldData) => {
  console.log(oldData);
  return oldData.map((item, index) => {
    const fixed = {
      id: item.id,
      src: item.productType.url,
      nombre: item.productType.title,
      categoria: item.productType.description,
      precio: item.fields.unit_price,
      createdAt: new Date(item.fields.create_at),
      deliveryDate: new Date(item.fields.available_at),
      editable: item.fields.editable,
      state: item.fields.state
    };
    return fixed;
  })
  // const array = [];
  // oldData.forEach(item =>{
  //   if(item.pk ==='1')
  //       array.push({src: './img/items/tomate.jpg', nombre: 'Tomate', categoria: 'Frutas', precio: '2500', unidad: 'Libra'},)
  // });
  // return array;
};

// const products = [
//   {src: './img/items/manzana.jpg', nombre: 'Manzana', categoria: 'Frutas', precio: '2500', unidad: 'Libra'},
//   {src: './img/items/arveja.jpg', nombre: 'Arveja', categoria: 'Verduras', precio: '2500', unidad: 'Libra'},
//   {src: './img/items/huevo.jpg', nombre: 'Huevo', categoria: 'Granja', precio: '300', unidad: 'Unidad'},
//   {src: './img/items/durazno.jpg', nombre: 'Durazno', categoria: 'Frutas', precio: '2500', unidad: 'Libra'},
//   {src: './img/items/frambuesa.jpg', nombre: 'Frambuesa', categoria: 'Frutas', precio: '4000', unidad: 'Libra'},
//   {src: './img/items/queso.jpg', nombre: 'Queso', categoria: 'Granja', precio: '2500', unidad: 'Libra'},
//   {src: './img/items/ciruela.jpg', nombre: 'Ciruela', categoria: 'Frutas', precio: '1000', unidad: 'Libra'},
//   {src: './img/items/papa.jpg', nombre: 'Papa', categoria: 'Verduras', precio: '500', unidad: 'Libra'},
//   {src: './img/items/pera.jpg', nombre: 'Pera', categoria: 'Frutas', precio: '1500', unidad: 'Libra'},
// ];
