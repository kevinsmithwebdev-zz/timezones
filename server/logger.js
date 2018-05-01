const fs = require('fs')
const path = require('path')
const rfs = require('rotating-file-stream')
const morgan = require('morgan')

//***

const logSize = '1M'
const logInterval = '10m'
const logFileName = '.csv'
const logDirName = 'log'
const logCompress = ''

//***

let logDirectory = path.join(__dirname, logDirName)
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

let returnLoggers = []

//***

const sanitize = (str) => {
  if (!str)
    return ""
  str = str.replace(/\"/g, '""')
  if (str.match(/\s|\"|,/g)) {
    str = `"${str}"`
  }
  return str
}

const csvStr = (arr) => arr.map(el => sanitize(el)).join(',')

morgan.token('log', (req, res) => req.log )
morgan.token('message', (req, res) => JSON.stringify(req.message) )

const customMorganFormat = (tokens, req, res) => {
  return csvStr([
    tokens.status(req, res),
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.referrer(req, res),
    // tokens.userAgent(req, res),
    tokens.date(req, res),
    tokens.log(req, res),
    tokens.message(req, res)
  ])
}

// wowsers - must manually match to above function!!!

const csvHeader = () => {
  return csvStr([
    "STATUS",
    "METHOD",
    "URL",
    "REFERER",
    // "USER AGENT",
    "DATE/TIME",
    "DEV LOG",
    "USR MSG"
  ]) + '\n'
}


//***

const logger = (minStatus, maxStatus) => {

  let accessLogStream = rfs(`http-codes-${minStatus}-${maxStatus}${logFileName}`, {
      size: logSize,
      initialRotation: true,
      interval: logInterval,
      //  compress: 'gzip',       // compress rotated files
      path: logDirectory
    }
  ).on('open', (fn) => {
    // write header to each new csv file
    fs.writeFile(fn, csvHeader(), (err) => {
      if (err) {
          return console.log(err)
      }
    })
  })


  return morgan(customMorganFormat, {
    skip: (req, res) => res.statusCode < minStatus || res.statusCode > maxStatus,
    stream: accessLogStream
  })
}

//***

// custom loggers by http status code and date

returnLoggers.push(logger(100, 199))
returnLoggers.push(logger(200, 299))
returnLoggers.push(logger(300, 399))
returnLoggers.push(logger(400, 499))
returnLoggers.push(logger(500, 599))

// logging to console

returnLoggers.push(morgan('tiny'))

//***

module.exports = returnLoggers
