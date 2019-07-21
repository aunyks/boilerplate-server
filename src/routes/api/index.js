const bodyParser = require('body-parser')
const express = require('express')
const router = express.Router()

router.use(bodyParser.json())

const v1Api = require('./v1')
const v2Api = require('./v2')

router.use('/v1', v1Api)
router.use('/v2', v2Api)

module.exports = router