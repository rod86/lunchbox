const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const options = {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
};

const StandSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    address: {
        type: String
    },
    location: {
        type: { type: String },
        coordinates: [Number]
    },
    active: {
        type: Boolean,
        default: false
    }
}, options);

StandSchema.index({ 'location': '2dsphere'});

mongoose.model('Stand', StandSchema, 'stands');