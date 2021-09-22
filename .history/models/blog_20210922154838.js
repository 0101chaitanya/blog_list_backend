const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})


blogSchema.set("toJSON", {

    transfrom: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.___V;
    }
})


module.exports = mongoose.model('Blog', blogSchema)