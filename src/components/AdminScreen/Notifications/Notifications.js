import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createNotification} from '../../../ducks/common';
import {FlatButton, MenuItem, Paper, RaisedButton, SelectField, Snackbar, TextField} from "material-ui";
import {productsNames} from "../../../others/usefulFunctions";

import './Notifications.css';

class Notifications extends Component {
  state = {
    img: './img/items/pera.jpg',
    title: '',
    text: '',
    openSnackBar: false,
    snackBarText: 'Notificación creada'
  };

  createNotification = async () => {
    const resp = await this.props.createNotification({img: this.state.img, title: this.state.title, text: this.state.text});
    this.setState({
      openSnackBar: true,
      img: './img/items/pera.jpg',
      title: '',
      text: '',
    });
  };


  render() {
    return (
        <div className='Notifications'>
          <div className='header'>
            <h3>Notificaciones</h3>
          </div>
          <div className='container'>
          <Paper className='Paper'>
            <div className='body'>
            <div className='inputs'>
              <TextField
                  hintText="Frambuesas disponibles"
                  floatingLabelText="Titulo de la notificación"
                  onChange={(event) => {
                    this.setState({title: event.target.value})
                  }}
              /><br/>
              <TextField
                  hintText="Desde hoy hay disponibles frambuesas en biostore"
                  floatingLabelText="Texto de la notificación"
                  multiLine={true}
                  rowsMax={3}
                  onChange={(event) => {
                    this.setState({text: event.target.value})
                  }}
              /><br/>
              <SelectField
                  floatingLabelText="Imagen"
                  value={this.state.img}
                  onChange={(event, index, value) => this.setState({img: value})}
                  maxHeight={200}
              >
                {productsNames.map((name, i) => <MenuItem value={'./img/items/' + name.toLowerCase() + '.jpg'} key={i} primaryText={name}/>)}
              </SelectField><br/>
            </div>
            <div className='Instructions'>
              <h2>Crear Notificación</h2>
              <div>La notificación que envies será vista por los clientes cuando entrar al sitio web y en su correo</div>
            </div>
            </div>
            <div className='footer'>
              <RaisedButton label="Crear Notificación" primary={true} onClick={this.createNotification}/>
            </div>
          </Paper>
          </div>
          <Snackbar
              open={this.state.openSnackBar}
              message={this.state.snackBarText}
              autoHideDuration={4000}
              onRequestClose={() => this.setState({openSnackBar: false})}
          />
        </div>
    );
  }
}

export default connect(null, {createNotification})(Notifications);