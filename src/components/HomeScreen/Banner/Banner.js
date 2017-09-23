import React, {Component} from 'react'
import './Banner.css';

class Banner extends Component {
  render() {
    return (
        <div className="Banner">
          <div className="backgroundImage" style={{backgroundImage: 'url(./img/banner2.jpg)'}}>
            <div className="title">BIOSTORE</div>
            <div className="subtitle">El mejor sitio para comprar tu comida organica</div>
          </div>
        </div>
    )
  }
}

export default Banner;
