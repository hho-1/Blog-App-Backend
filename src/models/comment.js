"use strict"


const { mongoose } = require('../configs/dbConnection')


/* ------------------------------------------------------- */
// Comment Model:


const CommentSchema = new mongoose.Schema({

    contribution_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contribution',
        required: true
    },
    title: {
        type: String,
        trim: true
    },
    content: {
        type: String,
        trim: true,
        required: true
    },
    username: {
        type: String,
        trim: true,
        required: true
    },
    publish_date: {
        type: Date,
        default: Date.now
    },
    comment_likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommentLikes',
    }],
    likes_num: {
        type: Number,
        default: 0
    },
    comment_dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommentDisikes',
    }],
    dislikes_num: {
        type: Number,
        default: 0
    }

}, { collection: 'comments', timestamps: true })

/* ------------------------------------------------------- */
// FOR REACT PROJECT:
CommentSchema.pre('init', function(data) {
    data.id = data._id
    data.createds = data.createdAt.toLocaleDateString('tr-tr')
})
/* ------------------------------------------------------- */
module.exports = mongoose.model('Comment', CommentSchema)