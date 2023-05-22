const mongoose = require('mongoose')

const { Schema } = mongoose;

const BookSchema = new Schema({
    issuedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student'
    },

    bookID: {
        type: String,
        required: true
    },

    bookName: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },
    
    available:{
        type: Boolean,
        default: true
    },

    issuedDate: {
        type: String,
        default: "Not Issued"
    },

    returnDate: {
        type: String,
        default: "Not Issued"
    },

    date: {
        type: String,
        default: Date.now
    },

    fine: {
        type: Number,
        default: 0
    },

    issuerName: {
        type: String,
        default: "Not Issued"
    },

    issuerEmail: {
        type: String,
        default: "Not Issued"
    },
});
module.exports = mongoose.model('books', BookSchema);