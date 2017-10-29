import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    maxWidth: '100%',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: '#fafafa',
  },
  gridTile: {
    width: '33.4vw',
    padding: '0px'
  }
};

const tilesData = [
  {
    img: './img/farms/farm1.jpg',
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: './img/farms/farm2.jpg',
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: './img/farms/farm3.jpg',
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: './img/farms/farm4.jpg',
    title: 'Camera',
    author: 'Danson67',
  },
]

class Photos extends Component {
  render() {
    return (
        <div style={styles.root}>
          <GridList style={styles.gridList} cols={2.2}>
            {tilesData.map((tile) => (
                <GridTile
                    key={tile.img}
                    title={tile.title}
                    titleStyle={styles.titleStyle}
                    titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                >
                  <img src={tile.img}/>
                </GridTile>
            ))}
          </GridList>
        </div>
    );
  }
}

export default Photos;