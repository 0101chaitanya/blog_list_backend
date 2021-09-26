const BlogRouter = require('express').Router();
const Blog = require('../models/blog');


BlogRouter.get('/', async(request, response) => {

    const blogs = await Blog
        .find({}).populate("user");

    response.json(blogs);

})

BlogRouter.post('/', async(request, response) => {
    const blog = new Blog(request.body)

    const createdBLog = blog
        .save();
    response.status(201).json(createdBLog)
})

module.exports = BlogRouter;