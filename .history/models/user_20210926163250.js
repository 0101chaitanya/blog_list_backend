const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    hash: String,
    salt: String,
    admin: Boolean,
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }]
});


userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
            // the passwordHash should not be revealed
        delete returnedObject.passwordHash
        delete returnedObject.salt
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User