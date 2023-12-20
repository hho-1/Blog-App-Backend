"use strict"


const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- *

/* ------------------------------------------------------- */
// User Model:

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true
    },
    first_name: {
        type: String,
        trim: true,
    },
    last_name: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true
    },
    bio: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    password2: {
        type: String,
        trim: true,
        required: true,
    },
    contributions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contribution'
    }],
    is_active: {
        type: Boolean,
        default: true
    },
    is_login: {
        type: Boolean,
        default: true
    },
    is_admin: {
        type: Boolean,
        default: false
    },

}, { collection: 'users', timestamps: true })

/* ------------------------------------------------------- */
// Schema Configs:

const passwordEncrypt = require('../helpers/passwordEncrypt')

UserSchema.pre(['save', 'updateOne'], function (next) {

    // get data from "this" when create;
    // if process is updateOne, data will receive in "this._update"
    const data = this?._update || this

    // email@domain.com
    const isEmailValidated = data.email
        ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) // test from "data".
        : true

    if (isEmailValidated) {

        if (data?.password) {

            if(data?.password === data?.password2){

                // pass == (min 1: lowerCase, upperCase, Numeric, @$!%*?& + min 8 chars)
                const isPasswordValidated = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+]).{8,}$/.test(data.password)

                if (isPasswordValidated) {

                    this.password = data.password = passwordEncrypt(data.password)
                    this._update = data // updateOne will wait data from "this._update".

                } else {

                    next(new Error('Password not validated.'))
                }
            }
            else{
                next(new Error('2 passwords must be same.'))
            }
        }

        next() // Allow to save.

    } else {

        next(new Error('Email not validated.'))
    }
})
/* ------------------------------------------------------- */
// FOR REACT PROJECT:
UserSchema.pre('init', function (data) {

    data.id = data._id
    data.createds = data.createdAt.toLocaleDateString('tr-tr')
})
/* ------------------------------------------------------- */
module.exports = mongoose.model('User', UserSchema)