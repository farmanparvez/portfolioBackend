const mongoose = require('mongoose')

const workSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true        
    },
    repoLink: {
        type: String,
        unique: true  
    },
    websiteLink:{
        type: String,
        unique: true  
    },
    details: {
        type: String
    }

})

module.exports = Work = mongoose.model('work', workSchema);