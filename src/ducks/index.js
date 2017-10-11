import {combineReducers} from 'redux';
import common from './common';
import HomeScreen from './HomeScreen';
import ProductsScreen from './ProductsScreen';
import AdminScreen from './AdminScreen';

export default combineReducers({
  common,
  HomeScreen,
  ProductsScreen,
  AdminScreen
})
