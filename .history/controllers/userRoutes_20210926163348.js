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

userRouter.get('/showAll', async(request, response) => {

    const users = await User
        .find({});

    response.json(users);

})

userRouter.post('/register', async(request, response) => {

    const { username, blogs, name, password } = request.body;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({
        username,
        name,
        hash,
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
    const passwordCorrect = user === null ?
        false :
        await validPassword(body.password, user.hash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})



module.exports = userRouter;