const CategoryModel = require('../models/categoryModel');

/**
 * Description: Create Contact
 * @param {name} req
 * @param {*} res
 * @param {*} next
 */

exports.createCategory = async (req, res, next) => {

    try {
        const { name } = req.body
        const body = { name }
        const doc = await CategoryModel.create(body);
        return res.status(201).json({
            data: doc
        })
    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }
}

exports.getCategories = async (req, res, next) => {
    try {
        const data = CategoryModel.find({});
        const doc = await data;
        return res.status(200).json({
            data: doc
        })
    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }
}

exports.getCategoryById = async (req, res, next) => {
    try {
        const qId = req.params.id;
        const category = await CategoryModel.findOne({
            _id: qId
        })
        if (!category) {
            return res.status(404).json({
                error: "Category not found"
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

exports.updateCategory = async (req, res, next) => {
    try {
        const { categoryId, name } = req.body; // Assuming you receive these fields in the request body

        // Find the document by its ID and update it
        const updatedCategory = await CategoryModel.findOneAndUpdate(
            { _id: categoryId }, // The filter for finding the document
            { name }, // The new values to update
            { new: true } // To return the updated document in the response
        );

        if (!updatedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // Send the updated question as a response
        res.status(200).json({ message: 'content updated', data: updatedCategory });
    } catch (error) {
        // Handle any errors that occur during the update process
        next(error);
    }
}

exports.deleteCategory = async (req, res, next) => {
    const id = req.params.id;
    const response = await CategoryModel.deleteOne({ _id: id });
    if (!response) {
        return res.status(404).json({
            error: 'Category not found'
        })
    }
    return res.status(200).json({
        message: 'Document deleted!'
    })
}