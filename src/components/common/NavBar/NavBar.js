import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signUp, login} from '../../../ducks/common';
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

  register = (newUser) => {
    this.props.signUp(newUser)
  };

  login = (authData) => {
    this.props.login(authData);
  };


  render() {
    return (
        <AppBar className="NavBar" title="BIOSTORE"
                onLeftIconButtonTouchTap={this.handleToggle}
                style={styles.navBar}
                iconElementRight={this.props.user ?
                    <div style={{marginTop: '7px'}}>
                      <FlatButton style={{color: 'rgb(255, 255, 255)'}} label={this.props.user.name} onClick={() => this.setState({logInOpen: !this.state.logInOpen})}/>
                    </div>
                    :
                    <div style={{marginTop: '7px'}}>
                      <FlatButton style={{color: 'rgb(255, 255, 255)'}} label="Inicio" onClick={() => this.setState({logInOpen: !this.state.logInOpen})}/>
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
            <Link to="/admin"><MenuItem onTouchTap={() => this.handleToggle()}>Administrador</MenuItem></Link>
            <Link to="/producer"><MenuItem onTouchTap={() => this.handleToggle()}>Productor</MenuItem></Link>
          </Drawer>
          <Login open={this.state.logInOpen} handleClose={() => this.setState({logInOpen: false})} login={this.login}/>
          <SignUp open={this.state.signUpOpen} handleClose={() => this.setState({signUpOpen: false})} register={this.register}/>
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

function mapStateToProps(state) {
  const {user} = state.common;
  return {
    user
  }
}
export default connect(mapStateToProps, {signUp, login})(NavBar);