const express = require('express')
const app = express()
require("express-async-errors")
const cors = require('cors')
const mongoose = require('mongoose')
const BlogRouter = require('./controllers/blogRoutes');
const UserRouter = require('./controllers/userRoutes');

const Blog = require('./models/blog');
const User = require('./models/user');

const config = require('./utils/config');
const { info, error } = require("./utils/logger");

const morgan = require('morgan');
mongoose.connect(config.MONGODB_URI, {

        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        info('connected to MongoDB')
    })
    .catch((error) => {
        error('error connecting to MongoDB:', error.message)
    })


//app.use(cors())
app.use(express.json())
app.use(morgan("dev"));
morgan.token('body', function getBody(req) {
    return JSON.stringify(req.body)
})
app.use(morgan(" :body"))



app.use('/api/blogs', BlogRouter)
app.use('/api/users', userRouter)



module.exports = app;