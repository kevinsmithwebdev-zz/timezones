import React from 'react'

import Location from './Location/Location'
import Swap from './Swap/Swap'

import './Locations.css'

class Locations extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      zDate: Date.now(),
      interval: null
    }
  }

  componentWillMount() {
    let interval = setInterval(() => {
      this.setState({ zDate: Date.now() })
    }, 1000)
    this.setState({ interval })
  }
  componentWillUnmount() {
    clearInterval(this.state.interval)
    this.setState({ interval: null })
  }

  render() {
    return (
      <section id="Locations">
        <Location locSlot={0} zDate={this.state.zDate} />
        <Swap />
        <Location locSlot={1} zDate={this.state.zDate} />
      </section>
    )
  }
}
export default Locations
