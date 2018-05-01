import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as locationsActions from '../../../redux/actions'

import React from 'react'

import './Location.css'

class Location extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      newLocStr: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.updateInputValue = this.updateInputValue.bind(this)
  }

  handleSubmit() {
    this.setState({ newLocStr: '' })
    this.props.checkLocation(this.props.locSlot, this.state.newLocStr)
  }

  updateInputValue(e) {
    console.log(e.target)
    if (e.target === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      this.handleSubmit()
    }
    this.setState({ newLocStr:  e.target.value })
  }

  handleKeyDown(e) {
   if (e.key === 'Enter') {
     e.preventDefault();
     e.stopPropagation();
     this.handleSubmit();
   }
 }

  render() {
    const DAYS = [ 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    const MONTHS = [ 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

    let color = this.props.locSlot?'green':'blue'

    let location = this.props.locations[this.props.locSlot]

    const pretty = (num) => (num).toFixed(2)
    const leadZ = (num) => (num<10)?'0' + num:num

    const offset = (location.rawOffset + location.dstOffset)*60*60*1000

    const lDate = new Date(this.props.zDate + offset)

    const hour = lDate.getHours()
    const timeStr = (h, m, s) => `${(h+11)%12+1}:${leadZ(m)}:${leadZ(s)} ${((h+24)%24)/12<1?'am':'pm'}`

    let curTimeStr =  DAYS[lDate.getUTCDay()] + ' ' +
                      lDate.getUTCDate() + '-' +
                      MONTHS[lDate.getUTCMonth()] + '-' +
                      lDate.getUTCFullYear() + ' ' +
                      timeStr(lDate.getUTCHours(), lDate.getUTCMinutes(), lDate.getUTCSeconds())

    return (
      <div id="Location" className={`${color}-border`}>
        <span className="label">Location:</span>
        <span>{location.locStr}</span>
        <br />
        <span className="label">Current Time:</span>
        <span>{curTimeStr}</span>
        <br />
        <span className="label">Coords:</span>
        <span>{`${pretty(location.lat)}, ${pretty(location.lon)}`}</span>
        <br />
        <span className="label">TZ Name:</span>
        <span>{location.timeZoneName}</span>
        <br />
        <span className="label">TZ ID:</span>
        <span>{location.timeZoneId}</span>
        <br />
        <span className="label">GMT Offset:</span>
        <span>{location.rawOffset}</span>
        <br />
        <span className="label">In DST:</span>
        <span>{location.dstOffset?'yes':'no'}</span>
        <form>
          Enter new location:<br />
          <input type="text" name="location"
            value={this.state.newLocStr}
            onChange={this.updateInputValue}
            onKeyDown={this.handleKeyDown}
          />
          <span className="submitBtn" onClick={this.handleSubmit}>+</span>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { locations: state.locations }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...locationsActions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Location)
