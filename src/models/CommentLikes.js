"use strict"


const { mongoose } = require('../configs/dbConnection')


/* ------------------------------------------------------- */

// For comment likes

const CommentsLikesSchema = new mongoose.Schema({

    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: true
    },
    isClickked: {
        type: Boolean,
        default: false
    }

}, { collection: 'commentLikes', timestamps: true })

/* ------------------------------------------------------- */

CommentsLikesSchema.pre('init', function(data) {
    data.id = data._id
    data.createds = data.createdAt.toLocaleDateString('tr-tr')
})
/* ------------------------------------------------------- */

module.exports = mongoose.model('CommentLikes', CommentsLikesSchema)