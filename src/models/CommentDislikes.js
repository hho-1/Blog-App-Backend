"use strict"


const { mongoose } = require('../configs/dbConnection')


/* ------------------------------------------------------- */

// For comment dislikes

const CommentsDislikesSchema = new mongoose.Schema({

    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    }

}, { collection: 'dislikes', timestamps: true })

/* ------------------------------------------------------- */

CommentsDislikesSchema.pre('init', function(data) {
    data.id = data._id
    data.createds = data.createdAt.toLocaleDateString('tr-tr')
})
/* ------------------------------------------------------- */

module.exports = mongoose.model('CommentDislikes', CommentsDislikesSchema)