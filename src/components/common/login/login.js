import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
class login extends React.Component {
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
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Enviar"
                primary={true}
                onClick={this.handleClose}
            />,
        ];

        return (
            <div>
                <FlatButton style={{color:'rgb(255, 255, 255)', display:'inline'}} label="Iniciar Sesión" onClick={this.handleOpen} />
                <Dialog
                    title="Iniciar Sesión"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
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

export default login;