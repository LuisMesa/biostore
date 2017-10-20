import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class Login extends Component {

  state = {
    email: '',
    password: ''
  };

  login = () => {
    this.props.login({
      email: this.state.email,
      password: this.state.password
    });
    this.props.handleClose();
  };

  render() {
    const actions = [
      <FlatButton
          label="Cancelar"
          primary={true}
          onClick={this.props.handleClose}
      />,
      <FlatButton
          label="Enviar"
          primary={true}
          onClick={this.login}
      />,
    ];

    return (
        <div>
          <Dialog
              title="Iniciar Sesión"
              actions={actions}
              modal={true}
              open={this.props.open}
              autoDetectWindowHeight={true}
          >
            <div>
              <TextField
                  hintText="juan1234@gmail.com"
                  floatingLabelText="Email"
                  value={this.state.email}
                  onChange={(event) => this.setState({email: event.target.value})}
              /><br />
              <TextField
                  floatingLabelText="Contraseña"
                  type="password"
                  value={this.state.password}
                  onChange={(event) => this.setState({password: event.target.value})}
              /><br />
              <div style={{fontSize: '12px', fontWeight: 'bold', color: '#000000'}}>
                <br />Si no ha creado una cuenta de usuario, por favor cierre esta ventana y haga clic en el botón REGISTRO
              </div>
            </div>
          </Dialog>
        </div>
    );
  }
}

export default Login;

/*
 Nombre del Componente: Login
 Descripcion:           Captura datos de usuario para validarlos contra la base de datos y
 permitir el acceso a usuarios con una cuenta creada.
 Estado:                En desarollo
 Desarrollador:         Steven Alexander Erira Fierro
 Luis Andres Mesa Fajardo
 */