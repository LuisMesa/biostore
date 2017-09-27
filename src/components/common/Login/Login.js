import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class Login extends Component {
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
                            id="usuario"
                        /><br />
                        <TextField
                            hintText="Ingrese su contraseña"
                            floatingLabelText="Contraseña"
                            type="password"
                            id = "password"
                        />
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default Login;