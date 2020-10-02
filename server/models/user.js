const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({

    email : {
        type : String,
        required : true,
    },
    full_name : {
        type : String,
        required : true
    },
    resetToken : String,
    resetTokenExpiration : Date,
    password : {
        type : String,
        required : true
    },
    posts : [{
        type : Schema.Types.ObjectId,
        ref : 'posts',
    }]
})

module.exports = mongoose.model('User', userSchema);
