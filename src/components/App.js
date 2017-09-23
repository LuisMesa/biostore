import React, {Component} from 'react';
import NavBar from './NavBar/NavBar';
import HomeScreen from './HomeScreen/HomeScreen';
import './App.css';

class App extends Component {


  render() {
    return (
        <div className="App">
          <NavBar/>
          <HomeScreen/>
        </div>
    );
  }
}

export default App;
