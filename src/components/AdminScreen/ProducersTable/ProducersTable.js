import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProducers, createProducer} from '../../../ducks/AdminScreen';
import LockIcon from 'material-ui/svg-icons/action/lock';
import LockOpenIcon from 'material-ui/svg-icons/action/lock-open';
import ReactTooltip from 'react-tooltip';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import HighLightIcon from 'material-ui/svg-icons/action/highlight-off';
import InfoIcon from 'material-ui/svg-icons/action/info-outline';
import CheckIcon from 'material-ui/svg-icons/navigation/check';
import CheckCircleIcon from 'material-ui/svg-icons/action/check-circle';
import {DatePicker, MenuItem, Popover, Menu, DropDownMenu} from 'material-ui';
import ArrowIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import {cyan500, pinkA200} from 'material-ui/styles/colors';
import AddIcon from 'material-ui/svg-icons/content/add';
import RemoveIcon from 'material-ui/svg-icons/content/clear';
import {TableRowColumn,} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from '../../common/Dialog/Dialog';
import Table from '../../common/Table/Table';

import './ProducersTable.css';

class ProducersTable extends Component {
  state = {
    filterDate1: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    filterDate2: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    dialogOpen: false,
    popoverOpen: false,
    selectedRows: [],
    name: '',
    lastName: '',
    email: '',
    password:'',
    address: '',
    latitude: '',
    longitude: '',
    phoneNumber: ''
  };

  handleChange = (event, index, value) => this.setState({value});

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      popoverOpen: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = (newTable) => {
    this.setState({
      popoverOpen: false,
    });
    this.props.addTable(newTable);
  };

  getFilteredData2() {
    // return this.props.data.filter(offer => {
    //   return this.state.filterDate1.getTime() < offer.deliveryDate && this.state.filterDate2.getTime() > offer.deliveryDate
    // })
    return this.props.data;
  }

  onRowSelection = (selectedRows) => {
    this.setState({selectedRows});
  };

  renderItem(value, type, index) {
    switch (type) {
      case 'editable':
        return <TableRowColumn key={index}>{value ? <LockIcon style={{paddingLeft: 'calc(50% - 12px)'}}/> : <LockOpenIcon style={{paddingLeft: 'calc(50% - 12px)'}}/>}</TableRowColumn>;
      case 'state':
        return <TableRowColumn key={index}>{value.toLowerCase() === 'Pendiente'.toLowerCase() ? <InfoIcon style={{paddingLeft: 'calc(50% - 12px)'}}/> : value.toLowerCase() === 'Cancelada'.toLowerCase() ? <HighLightIcon style={{paddingLeft: 'calc(50% - 12px)'}} color={pinkA200}/> : <CheckCircleIcon style={{paddingLeft: 'calc(50% - 12px)'}} color={cyan500}/>}</TableRowColumn>;
      case 'createdAt':
        return <TableRowColumn key={index}>{value.toISOString().split('T')[0]}</TableRowColumn>;
      case 'deliveryDate':
        return <TableRowColumn key={index}>{value.toISOString().split('T')[0]}</TableRowColumn>;
      case 'id':
        break;
      default:
        return <TableRowColumn key={index}>{value + ''}</TableRowColumn>
    }
  }

  createProducer = async () => {
    const {name, lastName, email, password, address, latitude, longitude, phoneNumber} = this.state;
    const newProducer = {
      name,
      email,
      lastname:lastName,
      password,
      address,
      latitude,
      longitude,
      phone_number:phoneNumber,
      farmurl: "./img/farms/farm4.jpg",
      url: "./img/producers/producer6.jpg"
    };
    await this.props.createProducer(newProducer);
    this.props.fetchProducers();
    this.setState({dialogOpen: false});
  };

  componentWillMount() {
    this.props.fetchProducers()
  }

  render() {
    return (
        <div className="ProducersOffersTable">
          <Table columns={columns} data={this.getFilteredData2()} renderItem={(value, type, index) => this.renderItem(value, type, index)} onRowSelection={this.onRowSelection} selectedRows={this.state.selectedRows}>
            <div>
              <h3>{this.props.name}</h3>
              {this.props.isCloseAvailable > 1 ?
                  <RaisedButton
                      style={{display: 'block-inline', float: 'right', marginTop: '3vh', marginRight: '12px', minWidth: '44px'}}
                      onClick={() => this.props.deleteTable(this.props.name)}
                      icon={<RemoveIcon color={pinkA200}/>}
                      data-tip="Eliminar esta tabla"
                  >
                    <ReactTooltip place="bottom" type="dark" effect="float" multiline={true} style={{fontSize: '10px'}}/>
                  </RaisedButton>
                  :
                  ''
              }
              {this.props.names.length > 0 ?
                  <RaisedButton
                      style={{display: 'block-inline', float: 'right', marginTop: '3vh', marginRight: '12px', minWidth: '44px'}}
                      onClick={this.handleTouchTap}
                      icon={<AddIcon color={cyan500}/>}
                      data-tip="Agregar tabla"
                  >
                    <ReactTooltip place="bottom" type="dark" effect="float" multiline={true} style={{fontSize: '10px'}}/>
                  </RaisedButton>
                  :
                  ''
              }
              <Popover
                  open={this.state.popoverOpen}
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  onRequestClose={this.handleRequestClose}
              >
                <Menu>
                  {this.props.names.map((name, index) => {
                    return <MenuItem primaryText={name} onClick={() => this.handleRequestClose(name)} key={index}/>
                  })}
                </Menu>
              </Popover>

              <DatePicker className='DatePicker' name='filterDate1' value={this.state.filterDate1}
                          onChange={(event, date) => {
                            this.setState({filterDate1: date})
                          }}
              />
              <span> - </span>
              <DatePicker className='DatePicker' name='filterDate2' value={this.state.filterDate2}
                          onChange={(event, date) => {
                            this.setState({filterDate2: date})
                          }}
              />
            </div>
          </Table>
          <div className="tableActions">
            <RaisedButton label="Agregar Productor" primary={true} style={{float: 'right', margin: '12px'}}
                          onClick={() => this.setState({dialogOpen: true})}/>
          </div>
          <Dialog title='Crear Productor' open={this.state.dialogOpen}
                  handleClose={() => {
                    this.setState({dialogOpen: false})
                  }}
                  actions={[
                    <FlatButton
                        label="Cancel"
                        primary={true}
                        onClick={() => {
                          this.setState({dialogOpen: false})
                        }}
                    />,
                    <FlatButton
                        label="Crear Productor"
                        primary={true}
                        onClick={this.createProducer}
                    />]}
          >
            <div className="dialogContent">
              <div className="inputsContainer">
            <TextField
                hintText="Juan"
                floatingLabelText="Nombre"
                onChange={(event) => {
                  this.setState({name: event.target.value})
                }}
            /><br />
            <TextField
                hintText="Pedraza"
                floatingLabelText="Apellido"
                onChange={(event) => {
                  this.setState({lastName: event.target.value})
                }}
            /><br />
            <TextField
                hintText="usuario@mail.com"
                floatingLabelText="Email"
                onChange={(event) => {
                  this.setState({email: event.target.value})
                }}
            /><br />
            <TextField
                hintText="Password"
                floatingLabelText="Clave"
                onChange={(event) => {
                  this.setState({password: event.target.value})
                }}
            /><br />
              </div>
              <div className="inputsContainer">
            <TextField
                hintText="Cll 4a # 7 - 38"
                floatingLabelText="Dirección"
                onChange={(event) => {
                  this.setState({address: event.target.value})
                }}
            /><br />
            <TextField
                hintText="4.556"
                floatingLabelText="Latitud"
                onChange={(event) => {
                  this.setState({latitude: event.target.value})
                }}
            /><br />
            <TextField
                hintText="-72.556"
                floatingLabelText="Longitud"
                onChange={(event) => {
                  this.setState({longitude: event.target.value})
                }}
            /><br />
            <TextField
                hintText="3138256724"
                floatingLabelText="Telefono"
                onChange={(event) => {
                  this.setState({phoneNumber: event.target.value})
                }}
            /><br />
              </div>
            </div>
          </Dialog>
        </div>
    );
  }
}

const columns = [
  {name: 'Mail'},
  {name: 'Nombre'},
  {name: 'Apellido'},
  {name: 'Dirección'},
  {name: 'Telefono'},
];
function mapStateToProps(state) {
  const producers = state.AdminScreen.producers;
  return {
    data: producers
  }
}

export default connect(mapStateToProps, {fetchProducers, createProducer})(ProducersTable);