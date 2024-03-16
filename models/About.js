const mongoose = require('mongoose');

const aboutSehema = new mongoose.Schema({
    name: {
        type: String
    },
    email:{
        type: String
    },
    phoneNumber: {
        type: String
    },
    description: {
        type: String
    },
    links: {
        type: Array
    }
})

module.exports = About = mongoose.model("About", aboutSehema)