import {combineReducers} from 'redux';
import common from './common';
import HomeScreen from './HomeScreen';
import ProductsScreen from './ProductsScreen';
import AdminScreen from './AdminScreen';
import ProducerScreen from './ProducerScreen';

export default combineReducers({
  common,
  HomeScreen,
  ProductsScreen,
  AdminScreen,
  ProducerScreen
})
