import React, {Component} from 'react';
import Photos from './Photos';

class ProducersInfo extends Component {
  render() {
    return (
        <div className="ProducersInfo">
          <h3>Productores</h3>
          <Photos/>
        </div>
    );
  }
}

export default ProducersInfo;