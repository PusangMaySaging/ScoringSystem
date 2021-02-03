require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.SERVER_PORT || 9000
const teamRoute = require('./Routes/TeamRoute')
const gameRoute = require('./Routes/GameRoute')
const scoreRoute = require('./Routes/ScoreRoute')
const bodyParser = require('body-parser')
const cors = require('cors')
const corsConfig = {
    origin:'*',
    methods:['GET','POST','PUT','DELETE','PATCH'],
    allowedHeaders:'X-Requested-With,content-type',
    credentials:true
}
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors(corsConfig))
app.use('/team',teamRoute)
app.use('/game',gameRoute)
app.use('/score',scoreRoute)




app.listen(port,()=>{
    console.log("Server is up and running at Port: " + port);
})