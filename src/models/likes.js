"use strict"


const { mongoose } = require('../configs/dbConnection')


/* ------------------------------------------------------- */
// Likes Model:

const LikesSchema = new mongoose.Schema({

    contribution_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contribution',
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    differ:{
        type: String,
        trim: true
    },
    quantity:{
        type: Number,
        required: true,
        default: 0
    }

}, { collection: 'likes', timestamps: true })


module.exports = mongoose.model('Likes', LikesSchema)