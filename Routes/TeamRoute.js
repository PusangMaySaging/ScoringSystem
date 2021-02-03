const express = require('express')
const teamController = require('../Controller/TeamController')
const route = express.Router()


route.get('/',teamController.getTeam) //read
route.post('/create',teamController.createTeam)//create
route.delete('/delete/:id',teamController.deleteTeam)//delete
route.patch('/update',teamController.updateTeam)//update

module.exports = route;