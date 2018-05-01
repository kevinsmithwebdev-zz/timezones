const express = require('express')
const url = require('url')
const fetch = require("node-fetch")

const router = express.Router()

//*************

router.get("/timezone", (req, res) => {

  let dt = Math.round(Date.now()/1000)
  let { lat, lon } = url.parse(req.url, true).query

  if (isNaN(lat) || isNaN(lon) || lat > 90 || lat < -90 || lon > 180 || lon < -180)
    return res.status(400).json({ error: 'lat and lon must be a number - -90<=lon<=90 and -180<=lat<=180' })

  let gUrl = `https://maps.googleapis.com/maps/api/timezone/json` +
                `?location=${lat},${lon}` +
                `&timestamp=${dt}&key=${process.env.G_KEY}`

  fetch(gUrl)
  .then(response => {
    response.json().then(json => {
      res.json(json)
    })
  })
  .catch(error => {
    console.log(error)
  })
})

//*************

router.get("/location/:loc", (req, res) => {
  let loc = req.params.loc.trim()
  let dt = Math.round(Date.now()/1000)

  if (!loc)
    return res.status(400).json({ error: 'location parameter must be a string' })

  let newLoc = null

  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${loc}&key=${process.env.G_KEY}`)
  .then(response => response.json())

  .then(json => {
    if (json.results.length) {
      newLoc = {
        locStr: json.results[0].formatted_address,
        lat: json.results[0].geometry.location.lat,
        lon: json.results[0].geometry.location.lng,
      }
    }
    return newLoc
  })
  .then(newLoc => fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${newLoc.lat},${newLoc.lon}&timestamp=${dt}&key=${process.env.G_KEY}`))
  .then(response => response.json())
  .then(json => {
    newLoc.dstOffset = json.dstOffset/3600
    newLoc.rawOffset = json.rawOffset/3600
    newLoc.timeZoneId = json.timeZoneId
    newLoc.timeZoneName = json.timeZoneName
    return res.json(newLoc)
  })
  .catch(error => {
    console.log(error)
  })
})

//*************

router.get("/ping", (req, res) => {
  res.json({ data: "pong" })
})

//*************
module.exports = router
