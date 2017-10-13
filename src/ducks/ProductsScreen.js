const CHANGE_FARM_FILTER = 'CHANGE_FARM_FILTER';
const CHANGE_VEGETABLES_FILTER = 'CHANGE_VEGETABLE_FILTER';
const CHANGE_FRUITS_FILTER = 'CHANGE_FRUITS_FILTER';
const NOTIFICATION='NOTIFICATION';

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
//
// export const createOrder = (idClient, shippingAddress, delivery_at, items) => {
// //   //fechas, direccion, idCliente y arreglo (idOferta, cantidad)
// //created_at, delivery_at, shipping_address, consumer_id, order_items, (count, offer_id)
//   return {
//     type: CHANGE_FRUITS_FILTER,
//     payload: exclusive
//   }
// };

const INITIAL_STATE = {
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
    default:
      return state;
  }
}

