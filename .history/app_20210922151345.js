const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const BlogRouter = require('./controllers/blogRoutes');
const Blog = require('./models/blog');
const config = require('./utils/config');
const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())




app.get('/api/blogs', BlogRouter)



module.exports = app;