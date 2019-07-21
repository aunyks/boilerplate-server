const express = require('express')
const router = express.Router()

router.get('/hello', (req, res) => {
  res.send('hello from v2')
})

module.exports = router