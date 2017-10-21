import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchAdminOffers, createAdminOffer } from '../../../ducks/AdminScreen';
import ReactTooltip from 'react-tooltip';
import LockIcon from 'material-ui/svg-icons/action/lock';
import LockOpenIcon from 'material-ui/svg-icons/action/lock-open';
import HighLightIcon from 'material-ui/svg-icons/action/highlight-off';
import InfoIcon from 'material-ui/svg-icons/action/info-outline';
import CheckCircleIcon from 'material-ui/svg-icons/action/check-circle';
import {DatePicker, MenuItem, Popover, Menu, DropDownMenu} from 'material-ui';
import {cyan500, pinkA200} from 'material-ui/styles/colors';
import AddIcon from 'material-ui/svg-icons/content/add';
import RemoveIcon from 'material-ui/svg-icons/content/clear';
import {TableRowColumn,} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from '../../common/Dialog/Dialog';
import Table from '../../common/Table/Table';

import './AdminOffersTable.css'

class AdminOfferTable  extends Component {

  state = {
    filterDate1: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    filterDate2: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    popoverOpen: false,
    selectedRows: [],
    dialogOpen:false,
    idProductNewOffer: '1',
    amountNewOffer: '',
    priceNewOffer: '2000',
    deliveryDateNewOffer: Date.now()
  };

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

  onRowSelection = (selectedRows) => {
    this.setState({selectedRows});
  };

  getFilteredData() {
    return this.props.data.filter(item => {
      return this.state.filterDate1.getTime() < item.deliveryDate && this.state.filterDate2.getTime() > item.deliveryDate
    })
  }


  renderItem(value, type, index) {
    switch (type) {
      case 'editable':
        return <TableRowColumn key={index}>{value ? <LockIcon style={{paddingLeft: 'calc(50% - 12px)'}}/> : <LockOpenIcon style={{paddingLeft: 'calc(50% - 12px)'}}/>}</TableRowColumn>;
      case 'state':
        return <TableRowColumn key={index}>{value === 'Pendiente' || value === 'PENDIENTE' ? <InfoIcon style={{paddingLeft: 'calc(50% - 12px)'}}/> : value === 'Cancelada'|| value === 'CANCELADA' ? <HighLightIcon style={{paddingLeft: 'calc(50% - 12px)'}} color={pinkA200}/> : <CheckCircleIcon style={{paddingLeft: 'calc(50% - 12px)'}} color={cyan500}/>}</TableRowColumn>;
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

  createOffer = async () => {
    const {idProductNewOffer, amountNewOffer, priceNewOffer, deliveryDateNewOffer} = this.state;
    const idProducer = '1';
    const unit = 'Libra';
    const createdAt = Date.now();
    const offer = {idProductNewOffer, amountNewOffer, priceNewOffer, deliveryDateNewOffer: new Date(deliveryDateNewOffer).getTime(), idProducer, unit, createdAt};
    await this.props.createAdminOffer(offer);
    this.props.fetchAdminOffers();
    this.setState({dialogOpen:false})
  };

  componentWillMount() {
    this.props.fetchAdminOffers()
  }

  render() {

    return (
        <div className="AdminOffersTable">
          <Table columns={columns} data={this.props.adminOffers} renderItem={(value, type, index) => this.renderItem(value, type, index)} onRowSelection={this.onRowSelection} selectedRows={this.state.selectedRows}>
            <div>
              <h3>{this.props.name}</h3>
              {this.props.isCloseAvailable>1?
                  <RaisedButton
                      style={{display: 'block-inline', float: 'right', marginTop: '3vh', marginRight: '12px', minWidth: '44px'}}
                      onClick={() => this.props.deleteTable(this.props.name)}
                      icon={<RemoveIcon color={pinkA200}/>}
                      data-tip="Eliminar esta tabla"
                  >
                    <ReactTooltip place="bottom" type="dark" effect="float" multiline={true} style={{fontSize:'10px'}}/>
                  </RaisedButton>
                  :
                  ''
              }

              {this.props.names.length>0?
                  <RaisedButton
                      style={{display: 'block-inline', float: 'right', marginTop: '3vh', marginRight: '12px', minWidth: '44px'}}
                      onClick={this.handleTouchTap}
                      icon={<AddIcon color={cyan500}/>}
                      data-tip="Agregar tabla"
                  >
                    <ReactTooltip place="bottom" type="dark" effect="float" multiline={true} style={{fontSize:'10px'}}/>
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
            <RaisedButton label="Crear Oferta" primary={true} style={{float: 'right', margin: '12px'}}
                          onClick={()=>this.setState({dialogOpen:true})}/>
            <RaisedButton label="Cancelar" style={{float: 'right', margin: '12px'}}/>
          </div>
          <Dialog title='Crear Oferta' open={this.state.dialogOpen}
                  handleClose={()=>{this.setState({dialogOpen:false})}}
                  actions={[
                    <FlatButton
                        label="Cancel"
                        primary={true}
                        onClick={()=>{this.setState({dialogOpen:false})}}
                    />,
                    <FlatButton
                        label="Guardar"
                        primary={true}
                        onClick={this.createOffer}
                    />]}
          >
            <TextField
                hintText="Tomate"
                floatingLabelText="Producto"
            /><br />
            <TextField
                hintText="15"
                floatingLabelText="Cantidad"
                onChange={(event)=>{this.setState({amountNewOffer:event.target.value})}}
            /><br />
            <TextField
                hintText="Libra"
                floatingLabelText="Unidad"
                onChange={(event)=>{this.setState({unitNewOffer:event.target.value})}}
            /><br />
            <TextField
                hintText="2500"
                floatingLabelText="Precio"
                onChange={(event)=>{this.setState({priceNewOffer:event.target.value})}}
            /><br />
            <TextField
                hintText="2017-10-20"
                floatingLabelText="Fecha Entrega"
                onChange={(event)=>{this.setState({deliveryDateNewOffer:event.target.value})}}
            /><br />
          </Dialog>
        </div>
    );
  }
}
const columns = [
  {name: 'Producto'},
  {name: 'Cantidad'},
  {name: 'Unidad'},
  {name: 'Precio'},
  {name: 'Creación'},
  {name: 'Entrega'},
];

function mapStateToProps(state) {
  const {adminOffers} = state.AdminScreen;
  return {
    adminOffers
  }
}

export default connect(mapStateToProps, {fetchAdminOffers, createAdminOffer})(AdminOfferTable);