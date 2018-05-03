import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../../../redux/actions'

import React from 'react'

import './Location.css'

class Location extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      newLocStr: '',
      suggestNum: -1
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.updateInputValue = this.updateInputValue.bind(this)
  }

  handleSubmit(str) {
    this.props.checkLocation(this.props.locSlot, str)
    this.setState({ newLocStr: '', suggestNum: -1 })
  }

  updateInputValue(e) {
    if (e.target === 'Enter') {
      this.handleSubmit(this.state.newLocStr)
    }
    this.setState({ newLocStr:  e.target.value })
    if (e.target.value.length >= 3) {
      this.props.getSuggest(this.props.locSlot, this.state.newLocStr)
    }
  }

  handleKeyDown(e) {
    switch (e.key) {
      case 'Enter':
        e.stopPropagation();
        e.preventDefault();
        this.handleSubmit(this.state.newLocStr)
        break
      case 'ArrowUp':
        if (this.state.suggestNum > 0)
          this.setState({
            newLocStr: this.props.suggest[this.state.suggestNum-1],
            suggestNum: this.state.suggestNum-1
          })
        break
      case 'ArrowDown':
        if (this.state.suggestNum < this.props.suggest.length - 1)
        this.setState({
          newLocStr: this.props.suggest[this.state.suggestNum+1],
          suggestNum: this.state.suggestNum+1
        })
        break
      default:
        break
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

    const timeStr = (h, m, s) => `${(h+11)%12+1}:${leadZ(m)}:${leadZ(s)} ${((h+24)%24)/12<1?'am':'pm'}`

    let curTimeStr =  DAYS[lDate.getUTCDay()] + ' ' +
                      lDate.getUTCDate() + '-' +
                      MONTHS[lDate.getUTCMonth()] + '-' +
                      lDate.getUTCFullYear() + ' ' +
                      timeStr(lDate.getUTCHours(), lDate.getUTCMinutes(), lDate.getUTCSeconds())

    const renderSuggest = this.props.suggest.map((s, idx) => {
      if (this.props.suggest[idx]) {
        let liClass = 'liUnselected'
        if (idx === this.state.suggestNum)
          liClass = 'liSelected'

        return (
          <li
            key={idx}
            className={liClass}
            onClick={() => this.setState({ newLocStr: this.props.suggest[idx] })}
            onDoubleClick={() => this.handleSubmit(this.props.suggest[idx])}
          >
            {s}
          </li>
        )
      } else {
        return null
      }
    })


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
          <input
            type="text"
            autoComplete="off"
            name="location"
            value={this.state.newLocStr}
            onChange={this.updateInputValue}
            onKeyDown={this.handleKeyDown}
          />
          <ul id="suggest-list">
            { renderSuggest }
          </ul>
          <span className="submitBtn" onClick={() => this.handleSubmit(this.state.newLocStr)}>+</span>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    locations: state.locations,
    suggest: state.suggest[ownProps.locSlot]
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Location)
