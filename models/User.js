const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// using objecet destructuring the above import can be wrtitten as follow:
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
});

mongoose.model('users', userSchema);
