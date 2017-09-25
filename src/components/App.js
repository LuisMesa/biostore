import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import NavBar from './common/NavBar/NavBar';
import HomeScreen from './HomeScreen/HomeScreen';
import ProductsScreen from './ProductsScreen/ProductsScreen';

import './App.css';

class App extends Component {


  render() {
    return (
        <div className="App">
          <NavBar/>
            <Route exact path="/" component={HomeScreen}/>
            <Route path="/products" component={ProductsScreen}/>
        </div>
    );
  }
}

export default App;
