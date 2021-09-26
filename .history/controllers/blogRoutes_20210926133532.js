const BlogRouter = require('express').Router();
const Blog = require('../models/blog');


BlogRouter.get('/', async(request, response) => {

    const blogs = await Blog
        .find({}).populate("user").lean();

    response.json(blogs);

})

BlogRouter.post('/', async(request, response) => {
    const {
        title,
        user,
        url,
        likes
    } = req.body;

    const blog = new Blog({
        title,
        user,
        url,
        likes
    })

    const createdBLog = blog
        .save();
    response.status(201).json(createdBLog)
})

module.exports = BlogRouter;