const router = require('express').Router({ mergeParams: true })
const { newRequest } = require('../controllers')

router.post('/modRp', newRequest)

module.exports = router
