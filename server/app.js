const express = require('express')
const bodyParser = require('body-parser')
// const passport = require('passport')
const cors = require('cors')

const loggers = require('./logger')

const routes = require('./routes')

// *************

const app = express()

// middleware

app.use(loggers)
app.use(cors())
// app.use(passport.initialize())
app.use(bodyParser.json())

// routes
routes.map(route => app.use(route.path, route.router))

module.exports = app.listen(process.env.PORT)
