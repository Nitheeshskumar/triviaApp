const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    description: String,
    type:{
        type: String,
        default: 'question' },
    alternatives: [
        {
            text: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    ],
    correct:String
})

module.exports = mongoose.model('Question', QuestionSchema)