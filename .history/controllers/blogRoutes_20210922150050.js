const BlogRouter = require('express').Router();
const Blog = require('../models/blog');


BlogRouter.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

BlogRouter.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = BlogRouter;