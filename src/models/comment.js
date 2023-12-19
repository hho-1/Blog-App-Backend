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
    content: {
        type: String,
        trim: true,
        required: true
    },
    nickname: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['p', 'd']
    },
    publish_date: {
        type: Date,
        default: Date.now
    },
    likes_num: {
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