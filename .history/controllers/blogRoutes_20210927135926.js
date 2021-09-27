const BlogRouter = require('express').Router();
const Blog = require('../models/blog');
const passport = require("passport")

BlogRouter.get('/', passport.authenticate("jwt", { session: false }), async(request, response) => {

    const blogs = await Blog
        .find({}).populate("user", { username: 1, name: 1, blogs: 1 }).lean();

    response.json(blogs);

})

BlogRouter.post('/', passport.authenticate("jwt", { session: false }), async(request, response) => {
    const {
        title,
        user,
        url,
        likes
    } = request.body;

    const blog = new Blog({
        title,
        user: mongoose.Types.ObjectId(user),
        url,
        likes
    })

    const createdBLog = await blog
        .save();
    response.status(201).json(createdBLog)
})

module.exports = BlogRouter;