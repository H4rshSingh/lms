const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new schema({
    name: {
        type: String,
        required: true,
    },
    studentID: {
        type: Number,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
});




const User = mongoose.model('user', userSchema);
module.exports = User;