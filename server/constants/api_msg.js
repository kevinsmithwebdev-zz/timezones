//***************************************

// AUTH

exports.loginSuccess = {
  message: (user, token) => ({
    user,
    token,
    success: `User '${user.username}' logged in.`
  }),
  code: 200
}

exports.loginFailure = {
  message: (message) => ({
    error: `Login failure: ${message}`
  }),
  log: (log) => log,
  code: 401
}

exports.logoutSuccess = {
  message: {
    success: `User logged out.`
  },
  code: 200
}

exports.checkjwtSuccess = {
  message: user => ({
    user,
    success: `JWT good, logged in.`
  }),
  code: 200
}

//***************************************

// User

exports.registerIncomplete = {
  message: {
    error: 'Username and password required.'
  },
  code: 400
}

exports.registerUsernameTaken = {
  message: (username) => ({
    error: `Username '${username}' already taken.`
  }),
  code: 400
}

exports.registerSuccess = {
  message: (user) => ({
    success: `User '${user.username}' registered.`,
    user
  }),
  code: 201
}

exports.registerServerError = {
  message: (error) => ({
    error: `Server-side error: ${error}`
  }),
  code: (code) => code || 500
}

exports.deleteUserSuccess = {
  message: (username) => ({
    success: `User '${username}' deleted.`
  }),
  code: 200
}

exports.deleteUserFailure = {
  message: (username) => ({
    success: `Problem deleting '${username}'.`
  }),
  code: 401
}
