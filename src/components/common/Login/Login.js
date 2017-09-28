import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


class Login extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
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
            onClick={this.props.handleClose}
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
                        hintText="Ingrese su nombre de usuario"
                        floatingLabelText="Ingrese su nombre de usuario"
                    /><br />
                    <TextField
                        hintText="Ingrese su contraseña"
                        floatingLabelText="Contraseña"
                        type="password"
                    /><br />
                    <div style={{fontSize:'12px', fontWeight:'bold', color:'#000000'}}>
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
                        permitir el aceso a usuarios con una cuenta creada.
 Estado:                En desarollo
 Desarrollador:         Steven Alexander Erira Fierro
                        Luis Andres mesa Fajardo
 */