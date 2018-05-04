require('./env')

const http = require('http')

const app = require('./app')

if (app.address().port)
  console.log(`server listening on port: ${app.address().port}`)
else
  console.error('### server failed to open port')
