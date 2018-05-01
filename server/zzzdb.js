const mongoose = require('mongoose')

db = mongoose.connect(process.env.MONGODB)

module.exports = db
