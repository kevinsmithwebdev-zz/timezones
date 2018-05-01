const mongoose = require("mongoose")
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    index: true
  },
  hash:     { type: String },
  password: { type: String },
  salt:     { type: String },
  zipCode:  { type: String }
})


// Automatically strip hash and salt before sending back to the client
// must be function to use *this*
UserSchema.methods.toJSON = function() {
  let obj = this.toObject()

  delete obj.hash
  delete obj.salt
  delete obj.password

  return obj
}

UserSchema.plugin(passportLocalMongoose)

const User = module.exports = mongoose.model('User', UserSchema)

//*************

module.exports.getUserByUsername = (username, callback) => {
  console.log('in gubu')
  let query = { username }
  return User.findOne(query, callback)
}

module.exports.getUserById = (id, callback) => {
  User.findById(id, callback)
}

//*************

module.exports.login = (username, candidatePassword) => {
  return new Promise((resolve, reject) => {
    User.findOne({ username }).exec()
    .then(user => {
      if (user)
        return user.authenticate(candidatePassword)
      else
        throw { status: 400, message: 'username or password do not match'}
    })
    .then(user => {
      if (user.user)
        resolve(user.user)
      else
        throw { status: 400, message: 'username or password do not match'}
    })
    .catch(err => {
      if (!err.status)
        err.status = 500
      reject(err)
    })
  })
}

// module.exports.comparePassword = (candidatePassword, hash) => {
//   console.log('cp', candidatePassword)
//   console.log('cp', hash)
//   return bcrypt.compare(candidatePassword, hash)
//   // (err, isMatch) => {
//   //   if (err) throw err
//   //   callback(null, isMatch)
//   // })
// }
//
// //************
//
// module.exports.changePassword = (data, callback) => {
//   // wowsers
//   bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash(data.newPassword, salt, function(err, hash) {
//       let query = { username: data.username }
//       User.findOneAndUpdate(query, { password: hash }, {new: true}, callback)
//     })
//   })
// }
