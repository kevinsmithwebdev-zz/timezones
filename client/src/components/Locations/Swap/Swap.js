import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as locationsActions from '../../../redux/actions'

import React from 'react'

import './Swap.css'

const Swap = ({ swapLocations }) => {
  return (
    <button onClick={swapLocations} id="Swap">⇆</button>
  )
}

function mapStateToProps(state) {
  return { }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...locationsActions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Swap)
