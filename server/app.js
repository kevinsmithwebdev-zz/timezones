const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const routes = require('./routes')

// *************

const app = express()

// middleware

app.use(cors())
app.use(bodyParser.json())

// routes

routes.map(route => app.use(route.path, route.router))

module.exports = app.listen(process.env.PORT)
