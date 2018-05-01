require('./env')

const http = require('http')
// const mongoose = require('mongoose')

const app = require('./app')
// const db = require('./db')

if (app.address().port)
  console.log(`server listening on port: ${app.address().port}`)
else
  console.error('### server failed to open port')

// if (mongoose.connection.readyState)
//   console.log(`mongo listening on url: ${mongoose.connections[0].host}/${mongoose.connections[0].name} on port ${mongoose.connections[0].port}`)
// else
//   console.error('### mongo failed to load')
