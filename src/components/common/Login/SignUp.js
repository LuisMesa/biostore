import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {Step, Stepper, StepLabel,} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';

class SignUp extends Component {
  state = {
    finished: false,
    stepIndex: 0,
    email:'',
    password1:'',
    password2:'',
    name:'',
    lastName:'',
    id:'',
    address:'',
    phone:'',
    emailErrorMessage:'',
    passwordErrorMessage:''
  };

  validaCorreo = (correo)  => {
      if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(correo)) {
        this.setState({emailErrorMessage:"La dirección de email " + correo + "es incorrecta."});
    } else {
        this.setState ({emailErrorMessage:""})
    }
  }

  validaPassword = (password) => {
      if (this.state.password1 !== password){
          this.setState ({passwordErrorMessage:"las contraseñas no coinciden"})
      } else {
        this.setState ({passwordErrorMessage:""})
      }
  }

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

  finish = () =>{
    this.props.register({
      uid:  this.state.id,
      name:  this.state.name,
      email:  this.state.email,
      lastname:  this.state.lastName,
      password:  this.state.password1,
      address:  this.state.address,
      phone_number: this.state.phone
    });
    this.handleClose();
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
            <div>
              <TextField
                  hintText="Juan123@gmail.com"
                  floatingLabelText="Correo"
                  id="correo"
                  type="email"
                  onChange={(event)=>{this.setState({email:event.target.value} ); this.validaCorreo(event.target.value)}}
                  value={this.state.email}
                  errorText={this.state.emailErrorMessage}
                  //pattern = "([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+"
              /><br />
              <TextField
                  floatingLabelText="Clave"
                  id="clave"
                  onChange={(event)=>this.setState({password1:event.target.value})}
                  value={this.state.password1}
                  type='password'
              /><br />
              <TextField
                  floatingLabelText="Confirmar Clave"
                  id="clave1"
                  onChange={(event)=>{this.setState({password2:event.target.value});this.validaPassword(event.target.value)}}
                  value={this.state.password2}
                  type='password'
                  errorText={this.state.passwordErrorMessage}
              /><br />
            </div>
        );
      case 1:
        return (
            <div>
              <TextField
                  hintText="Juan"
                  floatingLabelText="Nombre"
                  onChange={(event)=>this.setState({name:event.target.value})}
                  value={this.state.name}
              /><br />
              <TextField
                  hintText="Corredor"
                  floatingLabelText="Apellido"
                  onChange={(event)=>this.setState({lastName:event.target.value})}
                  value={this.state.lastName}
              /><br />
              <TextField
                  hintText="1052407234"
                  floatingLabelText="Cedula"
                  onChange={(event)=>this.setState({id:event.target.value})}
                  value={this.state.id}
                  type="number"
              /><br />
            </div>
        );
      case 2:
        return (
            <div>
              <TextField
                  hintText="Cll 4a # 7a - 23"
                  floatingLabelText="Dirección de Entrega"
                  onChange={(event)=>this.setState({address:event.target.value})}
                  value={this.state.address}
              /><br />
              <TextField
                  hintText="3138256821"
                  floatingLabelText="Número telefonico"
                  onChange={(event)=>this.setState({phone:event.target.value})}
                  value={this.state.phone}
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
    this.props.handleClose();
  };

  render() {
    const actions = [
      <FlatButton
          label="Cancelar"
          primary={true}
          onClick={this.props.handleClose}
      />
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
                          Gracias por Registrarte :)
                        </p>
                    ) : (
                        <div>
                          <div style={{fontSize: '12px'}}>{this.getStepContent(stepIndex)}</div>
                          <FlatButton
                              label="Anterior"
                              disabled={stepIndex === 0}
                              onClick={this.handlePrev}
                              style={{marginRight: 12}}
                          />
                          <RaisedButton
                              id = "nextBtn"
                              label={stepIndex === 2 ? 'Finalizar' : 'Siguiente'}
                              disabled = {this.state.error === 0 ? true : false}
                              primary={true}
                              onClick={stepIndex === 2 ? this.finish : this.handleNext}
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