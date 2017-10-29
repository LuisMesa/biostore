import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip';
import './Marker.css';

class Marker extends Component {
  render() {
    return (
        <div data-tip={this.props.tooltip} className="Marker stateBusy">
          <div className="marker">
            <div className="radius"/>
          </div>
          <ReactTooltip place="right" type="dark" effect="float"/>
        </div>
    );
  }

}

export default Marker;
