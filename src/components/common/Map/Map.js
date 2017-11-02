import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

import './Map.css';

class Map extends Component {
  handleClick(event) {
    console.log('lat', event.lat);
    console.log('lng', event.lng);
  }

  render() {
    return (
        <div className="Map">
          <GoogleMapReact
              options={{
                styles: [{
                  "featureType": "all",
                  "elementType": "labels",
                  "stylers": [{
                    "visibility": "#on"
                  }]
                }]
              }}
              center={{lat: 4.699494, lng: -74.055148}}
              zoom={15}
              onClick={(event) => this.handleClick(event)}
          >
            {this.props.markers.map((marker, index) => {
              return <Marker tooltip={marker.tooltip} lat={marker.lat} lng={marker.lng} avatar={marker.avatar} key={index}/>
            })}

          </GoogleMapReact>
        </div>
    );
  }
}


export default Map;
