const BlogRouter = require('express').Router();
const Blog = require('../models/blog');
const passport = require("passport")
const mongoose = require("mongoose");
BlogRouter.get('/', passport.authenticate("jwt", { session: false }), async(request, response) => {

    const blogs = await Blog
        .find({}).populate("user", "username name").lean();

    response.json(blogs);

})

BlogRouter.post('/', passport.authenticate("jwt", { session: false }), async(request, response) => {
    const {
        title,
        user,
        url,
        likes
    } = request.body;
    console.log(user)
    const blog = new Blog({
        title,
        user: mongoose.mongo.ObjectId(user),
        url,
        likes
    })

    const createdBLog = await blog
        .save();
    response.status(201).json(createdBLog)
})


BlogRouter.put('/:id', passport.authenticate("jwt", { session: false }), async(request, response) => {
    const {
        title,
        user,
        url,
        likes
    } = request.body;
    console.log(user)

    const updatedBLog = await Blog.findByIdAndUpdate(request.params.id, {
        likes
    }).lean();
    return response.status(201).json(updatedBLog)
})
BlogRouter.put('/:id', passport.authenticate("jwt", { session: false }), async(request, response) => {

    const deletedBlog = await Blog.findByIdAndRemove(request.params.id).lean();
    return response.status(201).json(deletedBlog)
})

module.exports = BlogRouter;