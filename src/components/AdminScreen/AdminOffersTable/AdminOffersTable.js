import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchAdminOffers, createAdminOffer, updateAdminOffer} from '../../../ducks/AdminScreen';
import {productsNames, unitsByProduct, getProductsNameByOffers, getAmountByOffers, getProperlyDate, getProductName, getNicePriceByOffers} from '../../../others/usefulFunctions';
import ReactTooltip from 'react-tooltip';
import {blue500} from 'material-ui/styles/colors';
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
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from '../../common/Dialog/Dialog';
import Table from '../../common/Table/Table';

import './AdminOffersTable.css'

class AdminOfferTable extends Component {

  state = {
    filterDate1: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    filterDate2: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    popoverOpen: false,
    selectedRows: [],
    dialogOpen: false,
    dialogEditOpen: false,
    offerToUpdate: null,
    priceToUpdate: '',
    idProductNewOffer: '1',
    amountNewOffer: '',
    unitNewOffer: '',
    priceNewOffer: '',
    deliveryDateNewOffer: Date.now(),
    expanded: false
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
        return <TableRowColumn key={index}>{value === 'Pendiente' || value === 'PENDIENTE' ? <InfoIcon style={{paddingLeft: 'calc(50% - 12px)'}}/> : value === 'Cancelada' || value === 'CANCELADA' ? <HighLightIcon style={{paddingLeft: 'calc(50% - 12px)'}} color={pinkA200}/> : <CheckCircleIcon style={{paddingLeft: 'calc(50% - 12px)'}} color={cyan500}/>}</TableRowColumn>;
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
    const offer = {idProductNewOffer: productsNames.indexOf(idProductNewOffer), amountNewOffer, priceNewOffer, deliveryDateNewOffer, idProducer, unit, createdAt};
    await this.props.createAdminOffer(offer);
    this.props.fetchAdminOffers();
    this.setState({dialogOpen: false})
  };

  updateOffer = () => {
    this.props.updateAdminOffer(this.state.offerToUpdate.id, this.state.priceToUpdate);
    this.setState({dialogEditOpen: false});
    this.props.fetchAdminOffers();
  };

  componentWillMount() {
    this.props.fetchAdminOffers()
  }

  render() {

    return (
        <div className="AdminOffersTable">
          <Table expanded={this.state.expanded} columns={columns} data={this.props.adminOffers} renderItem={(value, type, index) => this.renderItem(value, type, index)} onRowSelection={this.onRowSelection} selectedRows={this.state.selectedRows}>
            <div>
              <h3>{this.props.name}</h3>
              {this.state.expanded ?
                  <RaisedButton
                      style={{display: 'block-inline', float: 'right', marginTop: '3vh', marginRight: '12px', minWidth: '44px'}}
                      // onClick={() => this.props.deleteTable(this.props.name)}
                      onClick={() => this.setState({expanded: false})}
                      icon={<RemoveIcon color={pinkA200}/>}
                      data-tip="Minimizar Tabla"
                  >
                  </RaisedButton>
                  :
                  <RaisedButton
                      style={{display: 'block-inline', float: 'right', marginTop: '3vh', marginRight: '12px', minWidth: '44px'}}
                      // onClick={this.handleTouchTap}
                      onClick={() => this.setState({expanded: true})}
                      icon={<AddIcon color={cyan500}/>}
                      data-tip="Expandir Tabla"
                  >
                  </RaisedButton>
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
          {this.state.expanded ?
              <div className="tableActions">
                <RaisedButton label="Editar Oferta" primary={true} disabled={this.state.selectedRows.length !== 1} style={{float: 'left', margin: '12px'}}
                              onClick={() => {
                                this.setState({offerToUpdate: this.props.adminOffers[(this.state.selectedRows[0])]});
                                this.setState({priceToUpdate: this.props.adminOffers[(this.state.selectedRows[0])].price});
                                this.setState({dialogEditOpen: true});
                              }
                              }/>
                <RaisedButton label="Crear Oferta" primary={true} style={{float: 'right', margin: '12px'}}
                              onClick={() => this.setState({dialogOpen: true})}/>
                <RaisedButton label="Cancelar" style={{float: 'right', margin: '12px'}}/>
              </div>
              :
              ''
          }
          <Dialog title='Crear Oferta' open={this.state.dialogOpen}
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
                        label="Guardar"
                        primary={true}
                        onClick={this.createOffer}
                    />]}
          >
            <div className="dialogContent">
              <div className="inputsContainer">
                <SelectField
                    floatingLabelText="Producto"
                    hintText="Tomate"
                    value={this.state.idProductNewOffer}
                    onChange={(event, index, value) => {
                      this.setState({
                        idProductNewOffer: value,
                        amountNewOffer: getAmountByOffers(value, this.props.producersOffers),
                        unitNewOffer: unitsByProduct[value],
                        priceNewOffer: getNicePriceByOffers(this.props.producersOffers, value, 0.15),
                        deliveryDateNewOffer: getProperlyDate(this.props.producersOffers, value)
                      })
                    }}
                    maxHeight={200}
                >
                  {getProductsNameByOffers(this.props.producersOffers).map((name, i) => <MenuItem value={name} key={i} primaryText={name}/>)}
                </SelectField><br/>
                <TextField
                    hintText="2500"
                    floatingLabelText="Precio sugerido"
                    value={'$' + this.state.priceNewOffer}
                    onChange={(event) => {
                      this.setState({priceNewOffer: event.target.value})
                    }}
                >
                </TextField>
                <br/>
                <TextField
                    hintText="15"
                    floatingLabelText="Cantidad Disponible"
                    value={this.state.amountNewOffer}
                    onChange={(event) => {
                      this.setState({amountNewOffer: event.target.value})
                    }}
                    disabled
                >
                </TextField>
                <br/>
                <TextField
                    hintText="Libra"
                    floatingLabelText="Unidad"
                    value={this.state.unitNewOffer}
                    onChange={(event) => {
                      this.setState({unitNewOffer: event.target.value})
                    }}
                    disabled
                >
                </TextField>
                <br/>

                <TextField
                    hintText="2017-10-20"
                    floatingLabelText="Fecha optima de entrega"
                    value={new Date(this.state.deliveryDateNewOffer).toISOString().split('T')[0]}
                    onChange={(event) => {
                      this.setState({deliveryDateNewOffer: event.target.value})
                    }}
                    disabled
                >
                </TextField>
                <br/>
              </div>
              <div className="extraInfo">
                <h2>Instrucciones</h2>
                {this.state.idProductNewOffer === '1' ?
                    <div>Para crear una oferta primero debes seleccionar uno de los producto ofrecidos por los provedores.</div>
                    :
                    <div>Hemos calculado la cantidad disponible del producto, su unidad y una fecha de entrega apropiada en base a las ofertas ofrecidas por los provedores. El precio sugerido genera una ganancia del 15% sobre las ofertas de los productores.</div>
                }
              </div>
            </div>
          </Dialog>
          <Dialog title='Editar Oferta' open={this.state.dialogEditOpen}
                  handleClose={() => {
                    this.setState({dialogEditOpen: false})
                  }}
                  actions={[
                    <FlatButton
                        label="Cancel"
                        primary={true}
                        onClick={() => {
                          this.setState({dialogEditOpen: false})
                        }}
                    />,
                    <FlatButton
                        label="Guardar"
                        primary={true}
                        onClick={this.updateOffer}
                    />]}
          >
            <div className="dialogContent">
              <div className="inputsContainer">
                <TextField
                    floatingLabelText="Producto"
                    value={this.state.offerToUpdate ? this.state.offerToUpdate.name : ''}
                >
                </TextField>
                <br/>
                <TextField
                    hintText="2500"
                    floatingLabelText="Precio sugerido"
                    type='number'
                    value={this.state.priceToUpdate}
                    onChange={(event) => {
                      this.setState({priceToUpdate: event.target.value})
                    }}
                >
                </TextField>
                <br/>
                <TextField
                    hintText="15"
                    floatingLabelText="Cantidad Disponible"
                    value={this.state.offerToUpdate ? this.state.offerToUpdate.amount : ''}
                    disabled
                >
                </TextField>
                <br/>
                <TextField
                    hintText="Libra"
                    floatingLabelText="Unidad"
                    value={this.state.offerToUpdate ? this.state.offerToUpdate.unit : ''}
                    disabled
                >
                </TextField>
                <br/>
                <TextField
                    hintText="2017-10-20"
                    floatingLabelText="Fecha optima de entrega"
                    value={this.state.offerToUpdate ? new Date(this.state.offerToUpdate.deliveryDate).toISOString().split('T')[0] : ''}
                    disabled
                >
                </TextField>
                <br/>
              </div>
              <div className="extraInfo">
                <h2>Instrucciones</h2>
                <div>Puedes editar la oferta cambiando su precio.</div>
              </div>
            </div>
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
  const {adminOffers, producersOffers} = state.AdminScreen;
  return {
    adminOffers,
    producersOffers
  }
}

export default connect(mapStateToProps, {fetchAdminOffers, createAdminOffer, updateAdminOffer})(AdminOfferTable);