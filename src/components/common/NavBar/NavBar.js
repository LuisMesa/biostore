import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Login from './../login/login.js'

import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  signUp(){
    console.log('signUp')
  }

  render() {
    return (
        <AppBar className="NavBar" title="BIOSTORE"
                onLeftIconButtonTouchTap={this.handleToggle}
                style={styles.navBar}
                iconElementRight={
                  <div style={{marginTop:'5%'}}>
                    <Login />
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
