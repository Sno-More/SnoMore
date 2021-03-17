const mongoose = require('mongoose');
const { Schema } = mongoose;

const JobSchema = new Schema({
    location: {
        type: String,
        required: true
    },
    zipCode: {
        type: Number,
        required: true
    },
    poster: {
        type: Schema.Types.ObjectId,
        required: true
    },
    shoveler: {
        type: Schema.Types.ObjectId,
        required: false
    },
    pay: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        validate: {
            validator: function (str) {
                return str === 'car' || str === 'driveway'
           },
           message: 'Post type must be car or driveway.'
        }
    },
    title: {
        type: String,
        required: true,
        validate: {
            validator: function (str) {
                return str.length <= 30
           },
           message: 'Job title cannot be more than 30 characters.'
        }
    },
    description: {
        type: String,
        required: true,
        validate: {
            validator: function (str) {
                return str.length >= 30
           },
           message: 'Job description must be at least 30 characters.'
        }
    },
    date: {
        type: Date,
        required: true,
    },
    complete: {
        type: Boolean,
        default: false
    },
    pending: {
        type: Boolean,
        default: false
    },
    paid: {
        type: Boolean,
        default: false
    }
});

const Job = mongoose.model('Job', JobSchema);

module.exports = Job;