import React from 'react'
import { connect } from 'react-redux'

import mapImg from '../../assets/images/tz.png'

import './Map.css'

const X_LEN = 800
const Y_LEN = 419
const X_ADJ = -34.5
const Y_ADJ = 48.5

class Map extends React.Component {

  render() {
    const createXStyle = (lat, lon) => {
      return {
        top: Y_LEN * ((lat-90)/-180) + Y_ADJ,
        left: X_LEN * ((lon+180)/360) + X_ADJ
      }
    }

    const xStyle0 = createXStyle(this.props.locations[0].lat, this.props.locations[0].lon)
    const xStyle1 = createXStyle(this.props.locations[1].lat, this.props.locations[1].lon)

    return (
      <div id="Map">
        <img className="tz-map" src={mapImg} alt="time zone map" />
        <span className="pos pos-0" style={xStyle0}>◉</span>
        <span className="pos pos-1" style={xStyle1}>◉</span>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return { locations: state.locations }
}

export default connect(mapStateToProps)(Map)
