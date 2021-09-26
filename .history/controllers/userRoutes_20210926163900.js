const userRouter = require('express').Router();
const User = require('../models/user');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../models/user')
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

    const { username, blogs, name, password } = request.body;

    const { salt, hash } = await genPassword(password);
    const user = new User({
        username,
        name,
        hash,
        salt,
        admin: true,
        blogs: blogs ? [...blogs] : [],
    })

    const savedUser = await user
        .save();

    const { token, expires } = utils.issueJWT(savedUser);

    response.json({ success: true, token: token, expiresIn: expires, })


});

userRouter.post('/login', async(request, response) => {
    const body = request.body

    const user = await User.findOne({ username: body.username })
    if (!user) {
        res.status(401).json({ success: true, msg: "could not find user" });
    }
    const isValid = utils.validPassword(password, user.hash);
    if (isValid) {
        const { token, expires } = utils.issueJWT(user);

        res.json({ success: true, user, token, expiresIn: expires })

    } else {
        res.status(401).json({ success: true, msg: "you entered the wrong password" })
    }
})



module.exports = userRouter;