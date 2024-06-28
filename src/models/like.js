"use strict"


const { mongoose } = require('../configs/dbConnection')


/* ------------------------------------------------------- */
// Likes Model:

const LikeSchema = new mongoose.Schema({

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
    }

}, { collection: 'likes', timestamps: true })


module.exports = mongoose.model('Like', LikeSchema)