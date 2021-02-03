const express = require('express')
const scoreController = require('../Controller/ScoreController')
const route = express.Router()



route.get('/',)
route.put('/create',scoreController.createScore)//create



module.exports = route;