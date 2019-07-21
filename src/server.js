if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const {
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_CALLBACK_URL,
  SESSION_SECRET,
  NODE_ENV,
  SERVER_BIND_PORT,
  DB_CONNECTION_STRING
} = process.env
const Sequelize = require('sequelize')
const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const passport = require('passport')
const Auth0auth0Strategy = require('passport-auth0')
const sequelize = new Sequelize(DB_CONNECTION_STRING)

const models = require('./models')(Sequelize, sequelize)

const auth0Strategy = new Auth0auth0Strategy(
  {
    state: false,
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_CLIENT_SECRET,
    callbackURL:
      AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
)

const sessionConfig = {
  secret: SESSION_SECRET,
  cookie: {
    //domain: SERVER_DOMAIN,
    secure: NODE_ENV === 'production',
    maxAge: 86400 * 1000,
    sameSite: false
  },
  resave: false,
  saveUninitialized: true
}

const authed = require('./middleware/authed')
const apiRoutes = require('./routes/api')
const authRoutes = require('./routes/auth')

const app = express()
app.use(morgan('dev'))
app.use(express.static('static'))
app.use((req, res, next) => {
  req.models = models
  next()
})
app.use(session(sessionConfig))
passport.use(auth0Strategy)
passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done(null, user)
})
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', apiRoutes)
app.use('/', authRoutes)

app.get('/user', authed(), (req, res) => {
  res.json(req.session.user)
})

app.get('/', (req, res) => {
  res.sendStatus(200)
})

const server = app.listen(SERVER_BIND_PORT || '3000', () => {
  const boundPort = server.address().port
  console.log('Listening on port %s', boundPort)
})

module.exports = server
