const router = require('express').Router();
const User = require('../models/user_model');
const {registerValidation , loginValidation} = require('../validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.route('/register').post(async (req, res) => {
    // req body validation
    const {error} = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    // Check for email existence
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email alreay exists');
    // hash the passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    try{
        console.log(req.body);
        const user = new User({
        username:req.body.username,
        password:hashedPassword,
        email:req.body.email,
        }); 
        await user.save();
        res.send({user: user._id});
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});



router.route('/login').post(async (req,res)=>{
    // req body validation
    const {error} = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    // Check for email existence
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email does not exist');
    // valid password
    const validpass = await bcrypt.compare(req.body.password,user.password);
    if (!validpass) return res.status(400).send('Invalid password');

    const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET);
    res.header('authToken',token).send(token);
    
});

module.exports = router;