import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip';
import Avatar from 'material-ui/Avatar';
import './Marker.css';

class Marker extends Component {
  render() {
    if (this.props.avatar) {
      return (
          <div data-tip={this.props.tooltip}>
            <Avatar src={this.props.avatar} onClick={()=>{console.log('click')}}/>
            <ReactTooltip place="right" type="dark" effect="float"/>
          </div>
      );
    }
    else {
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

}

export default Marker;
