import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class MediodePago extends React.Component {
    state = {
        open: false,
        tipodepago: "",
        name: "",
        creditCardNumber: "",
        cci: ""
    };

    handleClose = () => {
        this.props.handleClose()
    };

    formulario = (valor) => {
        this.setState({tipodepago: valor})
        if (valor === "credit"){
            document.getElementById('fromCredito').style.display = 'block';
        }
        else if (valor === "cash"){
            document.getElementById('fromCredito').style.display = 'none';
        }
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onClick={this.props.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.props.handleClose}
            />,
        ];

        return (
            <div>
                <Dialog
                    title="Seleccione su medio de pago"
                    actions={actions}
                    modal={false}
                    open={this.props.open}
                    autoScrollBodyContent={true}
                >
                    <div>
                        <RadioButtonGroup name="mediodePago" defaultSelected="not_light">
                            <RadioButton
                                value="cash"
                                label="Efectivo"
                                style={styles.radioButton}
                                onClick={()=>this.formulario("cash")}
                            />
                            <RadioButton
                                value="credit"
                                label="Tarjeta de Credito"
                                style={styles.radioButton}
                                onClick={()=> this.formulario("credit")}
                            />
                        </RadioButtonGroup>
                        <div id="fromCredito" style={{display: 'none'}}>
                            <TextField
                                hintText="Juan"
                                floatingLabelText="Nombre"
                                onChange={(event)=>this.setState({name:event.target.value})}
                                value={this.state.name}
                            />
                            <TextField
                                floatingLabelText="Digite el número de su tarjeta"
                                fullWidth={true}
                                onChange={(event)=>this.setState({creditCardNumber:event.target.value})}
                                value={this.state.creditCardNumber}
                                type="number"
                            />
                            <TextField
                                floatingLabelText="Digite el código CCI"
                                onChange={(event)=>this.setState({cci:event.target.value})}
                                value={this.state.cci}
                                type="number"
                            />
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}

const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 5,
    },
    button: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '100'
    }
};