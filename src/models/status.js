"use strict"


const { mongoose } = require('../configs/dbConnection')


/* ------------------------------------------------------- */
// Status Model:

const StatusSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }

}, { collection: 'status', timestamps: true })

/* ------------------------------------------------------- */
// FOR REACT PROJECT:
StatusSchema.pre('init', function(data) {
    data.id = data._id
    data.createds = data.createdAt.toLocaleDateString('tr-tr')
})
/* ------------------------------------------------------- */
module.exports = mongoose.model('Status', StatusSchema)