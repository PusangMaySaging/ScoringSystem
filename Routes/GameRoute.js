const express = require('express')
const gameController = require('../Controller/GameController')
const route = express.Router()


//route.get('/',teamController.getTeam) //read
route.get('/',gameController.getGame)
route.post('/create',gameController.createGame)//create
route.delete('/delete/:id',gameController.deleteGame)//delete
//route.patch('/update',teamController.updateTeam)//update

module.exports = route;