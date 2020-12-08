const express = require ("express");
const router = express.Router()
const User = require("../models/User");
const {registerValidation , loginValidation} = require("../validation")
var bcrypt = require('bcryptjs');
const jwt = require ("jsonwebtoken")

//register route
router.post("/register", async (req,res) => {
    // Let's validate data before used
    const {error} = registerValidation(req.body)
    if (error) return res.status(400).send( error.details[0].message)
    // checking if a user exists in db
    const emailExist = await User.findOne({email:req.body.email})
    if (emailExist) return res.status(400).send("Email exists men")
    // Hash PASSWORD
    
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);
  
    // create new use 
    const newUser = new User ({
        name: req.body.name,
        email :req.body.email,
        password : hashPassword

    } );
    try {
        const  savedUser =  await newUser.save()
        res.json({_id:savedUser._id})
    }
    catch(err){
        res.status(400).send(err)
    }

});
//LOGIN
router.post('/login',async(req,res) => {
    // Let's validate data before used
    const {error} = loginValidation(req.body)
    if (error) return res.status(400).send( error.details[0].message)
    // checking if a user exists in db
    const user = await User.findOne({email:req.body.email})
    if (!user) return res.status(400).send("Email not found men")
    //checking if password is correct
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if (!validPass) return res.status(400).send("Invalid password men");
    //Create and  assign token
    const token = jwt.sign({_id : user._id},process.env.SECRET_TOKEN)
    res.header('auth-token',token).send(token)
    //res.send("congrats logged in")

});
module.exports = router;
