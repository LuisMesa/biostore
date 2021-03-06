import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';


export default class MediodePago extends React.Component {
    state = {
        open: false,
        tipodepago: "cash",
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
                label="Cancelar"
                secondary={true}
                onClick={this.props.handleCloseBad}
            />,
            <FlatButton
                label="Aceptar"
                primary={true}
                keyboardFocused={true}
                onClick={this.props.handleCloseGood}
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
                        <RadioButtonGroup name="mediodePago" defaultSelected="cash">
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