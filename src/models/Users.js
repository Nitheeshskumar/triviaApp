const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email:String,
    type:{
        type: String,
        default: 'user' },
    attempts: {
        type: Number,
        default: 0 },
    score:{
        type: Number,
        default: 0 }
})

module.exports = mongoose.model('User', UserSchema)