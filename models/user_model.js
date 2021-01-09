const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username:{
        type: String,
        required : true,
        unique: false,
        trim: true,
        minlength: 3
    },
    email:{
        type: String,
        required : true,
        unique: true,
        trim: true,
        minlength: 5
    },
    password:{
        type: String,
        required : true,
        unique: true,
        trim: true,
        minlength: 8
    }
},{
    timestamps: true,
});

const User = mongoose.model('User',UserSchema);

module.exports = User;
