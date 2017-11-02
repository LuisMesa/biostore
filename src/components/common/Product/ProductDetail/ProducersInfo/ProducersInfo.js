import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import ReactTooltip from 'react-tooltip';
import Photos from './Photos';
import Map from '../../../Map/Map';
import './ProducersInfo.css';

class ProducersInfo extends Component {
  state = {
    view: 'Map'
  };

  handleTouchTap = () => {
    alert('You clicked the Chip.');
  };


  render() {
    return (
        <div className="ProducersInfo">
          <h3>Productores</h3>
          {this.state.view == 'Photos' ?
              <FlatButton className='FlatButton' label="Mapa" primary={true} onClick={() => this.setState({view: 'Map'})}/>
              :
              <FlatButton className='FlatButton' label="Fotos" primary={true} onClick={() => this.setState({view: 'Photos'})}/>
          }

          <div style={styles.wrapper}>
            {producers.map((producer, index) => {
              return (
                  <div key={index}>
                    <Avatar src={producer.producerImg} onClick={this.handleTouchTap} style={styles.chip} data-tip={producer.name} />
                    <ReactTooltip place="left" type="dark" effect="float" multiline={true} style={{fontSize: '10px'}} />
                  </div>
              )
            })}

          </div>
          {this.state.view == 'Photos' ? <Photos producers={producers}/> : <Map markers={markers}/>}
        </div>
    );
  }
}

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

const producers = [
  {
    farmImg: './img/farms/farm1.jpg',
    producerImg: './img/producers/producer1.jpg',
    name: 'Juan M.',
  },
  {
    farmImg: './img/farms/farm2.jpg',
    producerImg: './img/producers/producer2.jpg',
    name: 'Alejandro R.',
  },
  {
    farmImg: './img/farms/farm3.jpg',
    producerImg: './img/producers/producer3.jpg',
    name: 'Josefina S.',
  },
  {
    farmImg: './img/farms/farm4.jpg',
    producerImg: './img/producers/producer4.jpg',
    name: 'Daniel A.',
  },
]

const markers = [
  {
    tooltip: 'Juan M.',
    lat: '4.7010032',
    lng: '-74.055497',
    // avatar: './img/producers/producer1.jpg',
  }
];
export default ProducersInfo;