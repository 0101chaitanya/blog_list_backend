const userRouter = require('express').Router();
const User = require('../models/user');
var bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken')
const {
    validPassword,
    genPassword,
    issueJWT
} = require('../utils/authHelp');

userRouter.get('/showAll', passport.authenticate("jwt", { session: false }), async(request, response) => {

    const users = await User
        .find({});

    response.json(users);

})

userRouter.post('/register', async(request, response) => {

    const { username, blogs, admin, name, password } = request.body;

    const { salt, hash } = await genPassword(password);
    const user = new User({
        username,
        name,
        hash,
        salt,
        admin: admin ? admin : false,
        blogs: blogs ? [...blogs] : [],
    })

    const savedUser = await user.save();
    console.log(savedUser);

    const { token, expires } = issueJWT(savedUser);

    response.json({ success: true, token: token, expiresIn: expires, })


});

userRouter.post('/login', async(request, response) => {
    const { username, password } = request.body;

    const user = await User.findOne({ username })
    if (!user) {
        response.status(401).json({ success: true, msg: "could not find user" });
    }
    const isValid = validPassword(password, user.hash);
    if (isValid) {
        const { token, expires } = issueJWT(user);

        response.json({ success: true, user, token, expiresIn: expires })

    } else {
        response.status(401).json({ success: true, msg: "you entered the wrong password" })
    }
})



module.exports = userRouter;