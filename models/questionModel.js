const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    quest: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        // required: true,
    },
    solution: {
        type: String,
       
    }
}, {
    timestamps: true
});

const Questions = mongoose.model('Questions', questionSchema);

module.exports = Questions
