const passport = require('passport')

module.exports = () => {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login')
  }
}