const express = require('express')
const passport = require('passport')
const authed = require('../middleware/authed')
const router = express.Router()

router.get('/login', passport.authenticate('auth0', {
  scope: 'openid email profile'
}), (req, res) => {
  res.redirect('/')
})

router.get('/callback', (req, res, next) => {
  const { User } = req.models
  passport.authenticate('auth0', (err, user) => {
    if (err) return next(err)
    req.logIn(user, async (err) => {
      if (err) return next(err)
      const [userInfo, created] = await User.findOrCreate({
        where: {
          id: user.id,
          email: user._json.email,
        }
      })
      req.session.user = userInfo.get({ plain: true })
      res.redirect('/')
    })
  })(req, res, next)
})


router.get('/logout', (req, res) => {
  const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, SERVER_DOMAIN } = process.env
  const baseUrl = `${req.protocol}://${SERVER_DOMAIN}/logout`
  if (req.isAuthenticated()) {
    req.logout()
    res.redirect(`https://${AUTH0_DOMAIN}/logout?client_id=${AUTH0_CLIENT_ID}&returnTo=${baseUrl}`)
  } else {
    res.redirect('/')
  }
})

module.exports = router