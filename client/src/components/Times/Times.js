import React from 'react'
import { connect } from 'react-redux'

import './Times.css'

const Map = ({ locations }) => {

  const DAYS = [ 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT' ]
  const HOUR = 60*60*1000

  const timeStr = (h) => `${(h+11)%12+1}${((h+24)%24)/12<1?'am':'pm'}`
  const normalizeDay = (d) => ((d+7)%7)
  const normalizeHour = (h) => ((h+24)%24)

  const renderedTimesArr = []

  let UTC = new Date(Math.floor((new Date().getTime())/HOUR)*HOUR)
  let utcDay = UTC.getUTCDay()
  let utcHour = UTC.getUTCHours()

  let tz1Hour = utcHour + locations[0].rawOffset + locations[0].dstOffset
  let tz2Hour = utcHour + locations[1].rawOffset + locations[1].dstOffset

  const dayAdj = (tHour) => {
    if (tHour<0)
      return -1
    if (tHour>23)
      return 1
    return 0
  }

  let tz1Day = utcDay + dayAdj(tz1Hour)
  let tz2Day = utcDay + dayAdj(tz2Hour)

  tz1Day = normalizeDay(tz1Day)
  tz2Day = normalizeDay(tz2Day)
  tz1Hour = normalizeHour(tz1Hour)
  tz2Hour = normalizeHour(tz2Hour)



  for (let i=0; i<24; i++) {
    if (tz1Hour===24)
      tz1Day++
    if (tz2Hour===24)
      tz2Day++

    tz1Day = normalizeDay(tz1Day)
    tz2Day = normalizeDay(tz2Day)
    tz1Hour = normalizeHour(tz1Hour)
    tz2Hour = normalizeHour(tz2Hour)

    renderedTimesArr.push(
      <div key={i} className="time-wrapper">
        <span className="blue-text time">
          {DAYS[tz1Day]} {timeStr(tz1Hour)}
        </span>
        <span className="green-text time">
          {DAYS[tz2Day]} {timeStr(tz2Hour)}
        </span>
      </div>
    )
    tz1Hour++
    tz2Hour++

  }

  return (
    <div id="Times">
      {renderedTimesArr}
    </div>
  )
}

function mapStateToProps(state) {
  return { locations: state.locations }
}

export default connect(mapStateToProps)(Map)
