import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Login from '../Login/Login';
import SignUp from '../Login/SignUp';

import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      logInOpen: false,
      signUpOpen: false
    };
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {

    return (
        <AppBar className="NavBar" title="BIOSTORE"
                onLeftIconButtonTouchTap={this.handleToggle}
                style={styles.navBar}
                iconElementRight={
                  <div style={{marginTop: '7px'}}>
                    <FlatButton style={{color: 'rgb(255, 255, 255)'}} label="Inicio" onClick={() =>this.setState({logInOpen: !this.state.logInOpen})}/>
                    <FlatButton style={{color: 'rgb(255, 255, 255)'}} label="Registro" onClick={() => this.setState({signUpOpen: !this.state.signUpOpen})}/>
                  </div>
                }
        >
          <Drawer
              docked={false}
              open={this.state.open}
              onRequestChange={(open) => this.setState({open})}
          >

            <Link to="/"><MenuItem onTouchTap={() => this.handleToggle()}>Home</MenuItem></Link>
            <Link to="/products"><MenuItem onTouchTap={() => this.handleToggle()}>Productos</MenuItem></Link>
          </Drawer>
          <Login open = {this.state.logInOpen} handleClose={() =>this.setState({logInOpen: false})}/>
          <SignUp open = {this.state.signUpOpen} handleClose={() =>this.setState({signUpOpen: false})}/>
        </AppBar>
    )
  }
}
const styles = {
  navBar: {
    position: 'fixed',
    top: '0px',
    left: '0px'
  }
};
export default NavBar;