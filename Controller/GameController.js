require('dotenv').config()
const Validator = require('validatorjs')
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://Ryanali12:${process.env.DB_PASSWORD}@cluster0.wwlmp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri,{ useNewUrlParser: true,useUnifiedTopology: true})
const { v4: uuidv4 } = require('uuid');

module.exports = {

    createGame:(req,res)=>{ 
        console.log(req.body)
        const gameObj = {
            gameId: uuidv4(),
            gameName:req.body.gameName,
            category:req.body.category,
            score:0,
            participation: " ",
            isScored: false
        }
        const rules = {
            gameId:'required',
            category:'required|string',
            gameName:'required|string'
        }
        const validation = new Validator(gameObj,rules);
        
       
       
        if(validation.passes() && (gameObj.category === 'Major' || gameObj.category === 'Minor')){

            client.connect(err=>{
                if(err){
                    res.status(500)
                    res.send("Something bad happened")
                }
                client.db(process.env.DB_NAME).collection('Games').insertOne(gameObj,(err,response)=>{
                    if(err) throw err

                    res.status(201)
                    res.send("Game Created Successfully")
                    client.db(process.env.DB_NAME).collection('Teams').countDocuments({},(err,count)=>{
                        if(err) throw err
                        if(count > 0){
                            const data = {
                                $push:{games:gameObj}
                             }
                            client.db(process.env.DB_NAME).collection('Teams').updateMany({},data,(err,response)=>{
                                    console.log("inserted to teams")
                            })
                        }
                        
                    })
                    //client.close()
                })
               
            })
        }
        else{
            res.status(400)
            res.send("Empty Required Fields")
         
        }

    },
    getGame:(req,res)=>{
        client.connect(err=>{
            if(err){
                res.status(500)
                res.send("Something bad happened")
            }
            client.db(process.env.DB_NAME).collection('Games').find({}).toArray(function(err,result){
               if(err) throw err
              const objects = result.map(object => {
                return {
                    eventId: object.gameId,
                    eventName: object.gameName,
                    category:object.category
                }
              });
               res.send(JSON.stringify(objects))
            });

            
        })
    },
    deleteGame:(req,res)=>{
       
        const rules = {
            gameId:'required'
        }
        const gameObj ={
            gameId:req.params.id
        }
        const validation = new Validator(gameObj,rules);
        const query = {
            $pull:{games:{gameId:gameObj.gameId}}
        }
        if(validation.passes()){

            client.connect(err=>{
                if(err){
                    res.status(500)
                    res.send("Something bad happened")
                }
                
                client.db(process.env.DB_NAME).collection('Games').deleteOne(gameObj,(err,response)=>{
                    if(err) {
                        res.status(500)
                        res.send("Something bad happened")
                    }
                    res.status(200)
                    res.send("Game Deleted Successfully")

                    client.db(process.env.DB_NAME).collection('Teams').updateMany({},query,(err,response)=>{
                        if(err){
                            res.status(500)
                             res.send("Something bad happened")
                        }
                        console.log("deleted to teams")
                    })

                })   
                
            })
        }
        else{
            res.status(400)
            res.send("Empty Required Fields")
         
        }
    }
}