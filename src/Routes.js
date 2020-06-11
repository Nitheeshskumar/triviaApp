const express = require('express')
const router = express.Router()
const Question = require('./models/Question')
const User = require('./models/Users')
module.exports = router

// create one quiz question
router.post('/questions', async (req, res) => {
    try {
        const { description ,alternatives,correct} = req.body

        const question = await Question.create({
            description,
            alternatives,
            correct,
            type:'question'
        })

        return res.status(201).json(question)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})
// get all quiz questions
router.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find({type:'question'})
        return res.status(200).json(questions)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// get one quiz question
router.get('/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id

        const question = await Question.findOne({_id})
        if(!question){
            return res.status(404).json({})
        }else{
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// update one quiz question
router.put('/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const { description, alternatives } = req.body

        let question = await Question.findOne({_id})

        if(!question){
            question = await Question.create({
                description,
                alternatives
            })
            return res.status(201).json(question)
        }else{
            question.description = description
            question.alternatives = alternatives
            await question.save()
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})


// update score or create user
router.put('/user', async (req, res) => {
    try {

        const { name,email,attempts,score } = req.body

        let user = await User.findOne({email})

        if(!user){
            user = await User.create({
                name,email
            })
            return res.status(201).json(user)
        }else{
            if(attempts){user.attempts = attempts;}
            if(score){user.score = score}
            await user.save()
            return res.status(200).json(user)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

router.get('/dashboard', async (req, res) => {
    try {
        const user = await User.find({type:'user'})
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})
// delete one quiz question
router.delete('/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id

        const question = await Question.deleteOne({_id})

        if(question.deletedCount === 0){
            return res.status(404).json()
        }else{
            return res.status(204).json()
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})