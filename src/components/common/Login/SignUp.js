import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {Step, Stepper, StepLabel,} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';

class SignUp extends Component {
  state = {
    open: false,
    finished: false,
    stepIndex: 0,
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
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
              <TextField
                  hintText="Confirme su contraseña"
                  floatingLabelText="Confirme su Contraseña"
              /><br />
            </div>
        );
      case 1:
        return (
            <div>
              <TextField
                  hintText="Ingrese su nombre"
                  floatingLabelText="Nombre"
              /><br />
              <TextField
                  hintText="Ingrese su apellido"
                  floatingLabelText="Apellido"
              /><br />
              <TextField
                  hintText="Ingrese su número de cedula"
                  floatingLabelText="Cedula"
                  type="password"
              /><br />
            </div>
        );
      case 2:
        return (
            <div>
              <TextField
                  hintText="Dirección de entrega de pedidos"
                  floatingLabelText="Dirección de entrega de pedidos"
              /><br />
              <TextField
                  hintText="Ingrese su número de telefono"
                  floatingLabelText="Número telefonico"
              /><br />
            </div>
        );
      default:
        return 'Por favor llene todos los datos';
    }
  }

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
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
        <div>
          <Dialog
              title="Registro de usuarios"
              actions={actions}
              modal={true}
              open={this.props.open}
              autoScrollBodyContent={true}
          >
            <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
              <Stepper activeStep={stepIndex}>
                <Step>
                  <StepLabel>Datos de cuenta</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Datos personales</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Datos de contacto</StepLabel>
                </Step>
              </Stepper>
              <div style={contentStyle}>
                {finished ? (
                        <p>
                          <a
                              href="#"
                              onClick={(event) => {
                                event.preventDefault();
                                this.setState({stepIndex: 0, finished: false});
                              }}
                          >
                            Click here
                          </a> to reset the example.
                        </p>
                    ) : (
                        <div>
                          <div style={{fontSize: '12px'}}>{this.getStepContent(stepIndex)}</div>
                          <FlatButton
                              label="Back"
                              disabled={stepIndex === 0}
                              onClick={this.handlePrev}
                              style={{marginRight: 12}}
                          />
                          <RaisedButton
                              label={stepIndex === 2 ? 'Finish' : 'Next'}
                              primary={true}
                              onClick={this.handleNext}
                          /></div>
                    )}
              </div>
            </div>
          </Dialog>
        </div>
    );
  }
}

export default SignUp;

/*
 Nombre del Componente:  SignUp
 Descripción:            Captura datos de usuario para crear cuenta de usuario.
 Estado:                 En desarollo
 Desarrollador:          Steven Alexander Erira Fierro
 Luis Andres mesa Fajardo
 */