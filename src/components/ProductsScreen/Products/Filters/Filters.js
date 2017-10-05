import React, {Component} from 'react'
import {Paper, Checkbox } from 'material-ui';

import './Filters.css';
class Filters extends Component {
  render() {
    return (
        <div className="Filters">
          <Paper className="filters">
            <div name="filters" className="checkBoxGroup">
              <Checkbox value="Granja" label="Granja" className="checkBox" />
              <Checkbox value="Frutas" label="Frutas" className="checkBox" />
              <Checkbox value="Verduras" label="Verduras" className="checkBox"/>
            </div>
          </Paper>
        </div>
    );
  }
}

export default Filters;
