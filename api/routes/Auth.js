const User = require('../models/User.js');
const router = require('express').Router();
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken')

//REGISTER_USER

router.post('/register', async (req, res) => {
    const {username, email, password} = req.body;

    const newUser = new User({
        username: username,
        email: email,
        password: CryptoJs.AES.encrypt(password, process.env.PASSWORD_SECRET).toString()
    })

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.post('/login', async (req, res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email: email});
        !user && res.status(401).json("Incorrect Email");
        const hashedPassword = CryptoJs.AES.decrypt(user.password , process.env.PASSWORD_SECRET);

        const Originalpass = hashedPassword.toString(CryptoJs.enc.Utf8);
        if (Originalpass !== req.body.password ) return res.status(401).json("Incorrect Password");

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, 
        process.env.JWT_KEY,
        {expiresIn: '7d'}
        );
        const {password, ...others} = user._doc;
        res.status(200).json({...others, accessToken})
        
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router;