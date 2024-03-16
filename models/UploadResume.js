const mongoose = require('mongoose');

const resumeSehema = new mongoose.Schema({
    path: {
        type: String
    },
})

module.exports = Resume = mongoose.model("Resume", resumeSehema)