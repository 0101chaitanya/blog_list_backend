const userRouter = require('express').Router();
const User = require('../models/user');
var bcrypt = require('bcryptjs');


userRouter.get('/', async(request, response) => {

    const users = await User
        .find({});

    response.json(users);

})

userRouter.post('/', async(request, response) => {

    const { username, blogs, name, password } = request.body;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({
        username,
        name,
        hash,
        salt,
        blogs: blogs ? [...blogs] : [],
    })

    user
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = userRouter;