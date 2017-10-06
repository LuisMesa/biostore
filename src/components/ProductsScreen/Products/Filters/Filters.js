import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Paper, Checkbox} from 'material-ui';
import {changeVegetablesFilter, changeFarmFilter, changeFruitsFilter} from '../../../../ducks/ProductsScreen';

import './Filters.css';
class Filters extends Component {
  render() {
    return (
        <div className="Filters">
          <Paper className="filters">
            <div name="filters" className="checkBoxGroup">
              <Checkbox value="Granja" label="Granja" className="checkBox" checked={this.props.filters.farm}
                        onCheck={() => {
                          if (atLeastOne(this.props.filters, this.props.filters.farm)) this.props.changeFarmFilter()
                        }}/>
              <Checkbox value="Frutas" label="Frutas" className="checkBox" checked={this.props.filters.fruits }
                        onCheck={() => {
                          if (atLeastOne(this.props.filters, this.props.filters.fruits)) this.props.changeFruitsFilter()
                        }}/>
              <Checkbox value="Verduras" label="Verduras" className="checkBox" checked={this.props.filters.vegetables}
                        onCheck={() => {
                          if (atLeastOne(this.props.filters, this.props.filters.vegetables)) this.props.changeVegetablesFilter()
                        }}/>
            </div>
          </Paper>
        </div>
    );
  }
}

function atLeastOne(filters, newFilter) {
  let cont = 0;
  for (const property in filters) {
    if (filters.hasOwnProperty(property) && filters[property])
      cont++;
  }
  cont -= newFilter?1:0;
  return cont >= 1;
}

export default connect(null, {changeFarmFilter, changeFruitsFilter, changeVegetablesFilter})(Filters);
