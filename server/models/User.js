const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const options = {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
};

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: { unique: true }
    },
    email: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    }
}, options);

mongoose.model('User', UserSchema, 'users');