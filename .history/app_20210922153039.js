const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const BlogRouter = require('./controllers/blogRoutes');
const Blog = require('./models/blog');
const config = require('./utils/config');
const morgan = require('morgan');
mongoose.connect(config.MONGODB_URI).then(() => {
        console.info('connected to MongoDB')
    })
    .catch((error) => {
        console.error('error connecting to MongoDB:', error.message)
    })


app.use(cors())
app.use(express.json())
app.use(morgan("dev"));
morgan.token('body', function getBody(req) {
    return JSON.stringify(req.body)
})
app.use(morgan(" :body"))



app.get('/api/blogs', BlogRouter)



module.exports = app;