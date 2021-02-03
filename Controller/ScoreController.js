require('dotenv').config()
const Validator = require('validatorjs')
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wwlmp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri,{ useNewUrlParser: true,useUnifiedTopology: true})



module.exports = {

    createScore:(req,res)=>{
        const score = parseInt(req.body.score)
        const remarkScore = parseInt(req.body.remarkScore);
        const sentData = {
            teamId:req.body.teamId,
            gameId: req.body.gameId,
            score:score,
            remarkScore:remarkScore,
            finalScore: score + remarkScore,
            remarkDesc :req.body.remarkDesc,
            participation:req.body.participation
        }
        console.log(sentData)

        const rules = {
                teamId: 'required|string',
                gameId: 'required|string',
                score: 'integer|required',
                remarkScore:'integer|min:0',
                finalScore: 'integer|min:0',
                remarkDesc :'string',
                participation: 'required|string'
        }
        const validation = new Validator(sentData,rules);

        if(validation.passes()){

            client.connect(err=>{
            
                if(err){
                     res.status(500)
                     console.log("Error in Database Connection")
                    res.send("Something bad happened")
                }
                const query = {
                    teamId: sentData.teamId,
                    "games.gameId": sentData.gameId
                }
                const data = {
                    $set:{
                       "games.$.score":sentData.score,
                       "games.$.remarkScore":sentData.remarkScore,
                       "games.$.finalScore": sentData.finalScore,
                       "games.$.remarkDesc":sentData.remarkDesc,
                       "games.$.participation":sentData.participation,
                       "games.$.isScored": true
                    }
                }
                client.db(process.env.DB_NAME).collection('Teams').updateOne(query,data,err=>{
                    if(err){
                        res.status(500)
                        console.log("Error in Database Operation")
                        res.send("Something bad happened")
                    }
                    res.status(200)
                    console.log("Success Operation")
                    res.send("Event Scored Successfully")
                })
    
            })
         
        }
        else{
             res.status(400)
             console.log("Error in forms: client send empty data")
            res.send("Empty required fields")
        }
    },
    getScore:(req,res)=>{

    }
}