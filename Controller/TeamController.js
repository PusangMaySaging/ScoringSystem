require('dotenv').config()
const Validator = require('validatorjs')
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://Ryanali12:${process.env.DB_PASSWORD}@cluster0.wwlmp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri,{ useNewUrlParser: true,useUnifiedTopology: true})


module.exports = {
     createTeam: async(req,res)=>{
        const team = {
            teamId: req.body.teamId,
            teamName: req.body.teamName,
        }
        const rules = { 
            teamId: 'required',
            teamName: 'required|string'
        }
        const validation = new Validator(team,rules)
        if(validation.passes()){

            client.connect(err=>{
                if(err){
                    res.status(500)
                    res.send("Something bad happened")
                }
                client.db(process.env.DB_NAME).collection('Teams').insertOne(team,(err,response)=>{
                    if(err) throw err

                    res.status(201)
                    res.send("Team Created Successfully")
                    client.db(process.env.DB_NAME).collection('Games').find({}).toArray((err,arrayOfData)=>{
                        if(arrayOfData.length > 0){
                            
                            arrayOfData.forEach(obj=>{
                                const data = {
                                    $push:{games:obj}
                                 }
                                 client.db(process.env.DB_NAME).collection('Teams').updateOne({teamId:team.teamId},data,(err,response)=>{
                                    console.log("inserted to teams")
                                })
                            })
                         
                        }
                    })

                })
                
            })
        }
        else{
            res.status(400)
            res.send("Empty Required Fields")
         
        }
        
    },
    getTeam: async(req,res)=>{
        client.connect(err=>{
            if(err){
                res.status(500)
                res.send("Something bad happened")
            }
            client.db(process.env.DB_NAME).collection('Teams').find({}).toArray(function(err,result){
               if(err) throw err
              const objects = result.map(object => {
                return {
                    teamId: object.teamId,
                    teamName: object.teamName,
                    games:object.games
                }
              });
               res.send(JSON.stringify(objects))
            });

            
        })
    },
    deleteTeam: async(req,res)=>{
        
        const id = req.params.id;
        
        const query = {
            teamId: id
        }
        const rules = { 
            teamId: 'required|string'
        }
        const validation = new Validator(query,rules)
        if(validation.passes()){


        client.connect(err=>{
            if(err){
                res.status(500)
                res.send("Something bad happened")
            }
           
            client.db(process.env.DB_NAME).collection('Teams').deleteOne(query,(err,obj)=>{
                if(err) throw err;
                res.status(200)
                res.send("Team Deleted Successfully")
            })

            
        })
        }
        else{
            res.status(200)
            res.send("Empty required fields")
        }
    },
    updateTeam: async(req,res)=>{
  
        const obj = {
            id: req.body.teamId,
            name: req.body.teamName
        }
        console.log(req.body)
        console.log(obj)
        const rules = { 
            id: 'required|string',
            name: 'required|string'
        }
        const query = {teamId:obj.id}
        const validation = new Validator(obj,rules)

        if(validation.passes()){
        client.connect(err=>{
            if(err){
                res.status(500)
                res.send("Something bad happened")
            }
          
            client.db(process.env.DB_NAME).collection('Teams').updateOne(query,{$set:{teamName:obj.name}},(err,obj)=>{
                if(err) throw err;
                
                res.status(200)
                res.send("Team Updated Successfully")
    
            })
            
            
        })
    }
    else{
        res.status(400)
        res.send("Something bad happened")
    }
    }
    
}