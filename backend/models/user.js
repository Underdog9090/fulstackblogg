const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({  
    username: { type: String, required: true , min: 6, max: 30},  
    password: { type: String, required: true, minLength: 3, maxlength: 300}  
});

const User = mongoose.model('User', userSchema);

module.exports = User;  