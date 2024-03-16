const mongoose = require('mongoose') 

const heroSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    profileTitle: {
        type: String,
        required: [true, 'Profile title is required']
    },
    profileType: {
        type: String
    },
    detail: {
        type: String
    },
    extra: {
        type: String
    }

})

module.exports = Hero = mongoose.model('Hero', heroSchema)