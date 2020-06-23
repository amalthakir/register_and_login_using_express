const express = require("express");
const router = express.Router();
const User= require("../modules/UserModules");
const uuid =require("uuid");

router.get('/', async (req,res) => {
    const users= await User.find();
    res.json(users);
    //res.send("hi amal you are in post");
});

router.post('/register',(req,res)=>{

    let user = new  User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });
   
    console.log(req.body);

    user.save()
    .then(data =>{
        res.json(data)
    })
    .catch(err=>{
        res.json({mass:err});
    });

    //console.log(req.body);

});



module.exports=router;