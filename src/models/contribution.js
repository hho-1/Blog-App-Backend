"use strict"


const { mongoose } = require('../configs/dbConnection')


/* ------------------------------------------------------- */
// Contribution Model:

const enums = {"Published":'p', "Keep as Draft": 'd'}

const ContributionSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    content: {
        type: String,
        trim: true,
        required: true,
    },
    image: { // URL
        type: String,
        trim: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    publish_date: {
        type: Date,
        default: Date.now
    },
    user_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status',
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    slug: {
        type: String,
        trim: true
    },
    category_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }],
    post_views: {
        type: Number,
        default: 0,
    },
    comment_count: {
        type: Number,
        default: 0
    },
    likes_count: {
        type: Number,
        default: 0,
    },


    

}, { collection: 'contributions', timestamps: true })

/* ------------------------------------------------------- */
// FOR REACT PROJECT:
ContributionSchema.pre('init', function(data) {
    data.id = data._id
    data.createds = data.createdAt.toLocaleDateString('tr-tr')
})
/* ------------------------------------------------------- */
module.exports = mongoose.model('Contribution', ContributionSchema)