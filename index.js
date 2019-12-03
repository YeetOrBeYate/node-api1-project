const express = require('express');
const db = require('./data/db');

const app = express();

app.use(express.json());

const port = 8080;

app.get("/users", (req,res)=>{
    db.find()
    .then(users=>{
        res.status(200).json({users})
    })
    .catch((err)=>{
        res.status(500).json({message:'the users info could not be retrieved'})
    })
})

app.post("/users", (req,res)=>{
    const body = req.body;

    if(body.name === undefined || body.bio === undefined){
        res.status(400).json({message:'Please give name and bio'});
    }else{

    }
    db.insert(body)
    .then((user)=>{
        res.status(201).json({user})
    })
    .catch((err)=>{
        res.status(500).json({err})
    })
})

app.get('/users/:id', (req,res)=>{
    const id = req.params.id;

    db.findById(id)
    .then((user)=>{
        if(!user){
            res.status(404).json({message:'user with id does not exist'})
        }else{
            res.status(200).json({user})
        }
        
    })
    .catch((err)=>{
        res.status(500).json({message:'user info could not be retireived'})
    })
})

app.delete('/users/:id', (req,res)=>{
    const id = req.params.id;
    db.remove(id)
    .then((user)=>{
        if(!user){
            res.status(404).json({message:'user with that id not found'})
        }else{
            res.status(200).json({user})
        }
        
    })
    .catch((err)=>{
        res.status(500).json({message:"user couldn't be removed"})
    })
})

app.put('/users/:id', (req,res)=>{

    const user = req.body;
    const id = req.params.id;

    if(user === undefined || id === undefined){
        res.status(400).json({message:"put the id and user fool?!"})
    }

    db.update(id, user)
    .then(user=>{
        if(!user){
            res.status(404).json({message:'user with that id not found'})
        }else{
            res.status(200).json({user})
        }
    })
    .catch(err=>{
        res.status(500).json({message:"mistakes were made, now where we landing boys"})
    })
})



app.listen(port, ()=>{console.log(`listening: ${port}`)})

