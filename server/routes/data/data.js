const express = require('express')
// const passport = require("passport")

const router = express.Router()

router.get("/ping", (req, res) => {
  res.json({ data: "pong" })
})

router.get("/unprotected", (req, res) => {
  res.json({ data: "Anyone can see uprotected route." })
})

// router.get("/protected", passport.authenticate('jwt', { session: false }), (req, res) => {
//   res.json({ data: "Success! This is the protected data!" })
// })

module.exports = router
