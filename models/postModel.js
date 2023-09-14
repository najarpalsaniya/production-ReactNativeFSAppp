const mongoos = require('mongoose')


// Schema 
const postSchema = new mongoos.Schema({
    title: {
        type: String,
        required: [true, 'Please Add Post Title']
    },
    description: {
        type: String,
        required: [true, 'Please Add Post Description']
    },
    postedBy: {
        type: mongoos.Schema.ObjectId,
        ref: 'User',
        required:true
    }
}, { timestamps: true })

module.exports = mongoos.model('Post', postSchema)