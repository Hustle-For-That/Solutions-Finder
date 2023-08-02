const QuestionModel = require('../models/questionModel');

/**
 * Description: Create Contact
 * @param { quest,category, solution } req
 * @param {*} res
 * @param {*} next
 */

exports.createQuestion = async (req, res, next) => {
    console.log(req, "check req")
    try {
        const { quest, category, solution } = req.body
        const body = { quest, category, solution }
        const doc = await QuestionModel.create(body);
        return res.status(201).json({
            data: doc
        })
    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }
}

exports.getQuestions = async (req, res, next) => {
    try {
        const data =QuestionModel.find().populate('category');
        const doc = await data
        return res.status(200).json({
            data: doc
        })
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}

exports.getSingleQuestion = async (req, res, next) => {
    try {
        const qId = req.params.id;
        const question = await QuestionModel.findOne({
            _id: qId
        }).populate('category');
        if (!question) {
            return res.status(404).json({
                error: "Qustion not found"
            })
        }
        res.status(200).json({
            data: question
        })
    } catch (error) {
        return res.status(404).json({
            error: error.message
        })
    }
}

exports.updateQuestion = async (req, res, next) => {
    try {
        const { questionId, quest, solution, category } = req.body; // Assuming you receive these fields in the request body

        // Find the document by its ID and update it
        const updatedQuestion = await QuestionModel.findOneAndUpdate(
            { _id: questionId }, // The filter for finding the document
            { quest, solution, category }, // The new values to update
            { new: true } // To return the updated document in the response
        );

        if (!updatedQuestion) {
            return res.status(404).json({ error: 'Question not found' });
        }

        // Send the updated question as a response
        res.status(200).json({ message: 'content updated', data: updatedQuestion });
    } catch (error) {
        // Handle any errors that occur during the update process
        next(error);
    }
}

exports.deleteQuestion = async (req, res, next) => {
    const id = req.params.id;
    const response = await QuestionModel.deleteOne({ _id: id });
    if (!response) {
        return res.status(404).json({
            error: "contact not found"
        })
    }
    return res.status(200).json({
        message: 'Document deleted!',
        data: null
    })
}