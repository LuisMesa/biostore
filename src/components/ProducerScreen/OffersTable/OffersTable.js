import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchOffers, createOffer } from '../../../ducks/ProducerScreen';
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
import Table from '../../common/Table/Table';

class OffersTable extends Component {

  state = {
    filterDate1: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    filterDate2: new Date(),
    popoverOpen: false,
    selectedRows: [],
    idProductNewOffer: '1',
    amountNewOffer: '5',
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
    const offer = {idProductNewOffer, amountNewOffer, priceNewOffer, deliveryDateNewOffer, idProducer, unit, createdAt};
    await this.props.createOffer(offer);
    this.props.fetchOffers();
  };

  componentWillMount() {
    this.props.fetchOffers()
  }

  render() {
    return (
        <div className="OffersTable">
          <Table columns={columns} data={this.props.offers} renderItem={(value, type, index) => this.renderItem(value, type, index)} onRowSelection={this.onRowSelection} selectedRows={this.state.selectedRows}>
            <div>
              <h3>{this.props.name}</h3>
              <RaisedButton
                  style={{display: 'block-inline', float: 'right', marginTop: '3vh', marginRight: '12px', minWidth: '44px'}}
                  onClick={() => this.props.deleteTable(this.props.name)}
                  icon={<RemoveIcon color={pinkA200}/>}
              />
              {this.props.names.length>0?
                  <RaisedButton
                      style={{display: 'block-inline', float: 'right', marginTop: '3vh', marginRight: '12px', minWidth: '44px'}}
                      onClick={this.handleTouchTap}
                      icon={<AddIcon color={cyan500}/>}
                  />
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
                          onClick={this.createOffer}/>
            <RaisedButton label="Cancelar" style={{float: 'right', margin: '12px'}}/>
          </div>
        </div>
    );
  }
}
const columns = [
  {name: 'Producto'},
  {name: 'Cantidad'},
  {name: 'Precio'},
  {name: 'Creación'},
  {name: 'Entrega'},
  {name: 'Estado'},
];

function mapStateToProps(status) {
  const {offers} = status.ProducerScreen;
  return {
    offers
  }
}

export default connect(mapStateToProps, {fetchOffers, createOffer})(OffersTable);